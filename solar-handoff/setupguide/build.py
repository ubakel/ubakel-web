"""Setup Guide: reuse the user manual's styles and logos, print to PDF with Edge, rasterise pages for review.

usage: python build.py [preview_dpi]
"""
import base64, pathlib, re, subprocess, sys
import pymupdf

here = pathlib.Path(__file__).parent
man = here.parent / 'manual'
b64 = lambda p: 'data:image/png;base64,' + base64.b64encode((man / p).read_bytes()).decode()

style = re.search(r'<style>(.*?)</style>', (man / 'manual.html').read_text(encoding='utf-8'), re.S).group(1)
extra = """
  .tl6 .tn { width: 16.66%; } .tl6:before { left: 8.33%; right: 8.33%; }
  .tl6 .tn .t { font-size: 9pt; }
  .tl5 .tn { width: 20%; } .tl5:before { left: 10%; right: 10%; }
  ol.steps { margin: 4px 0 0; padding-left: 0; list-style: none; counter-reset: s; }
  ol.steps[start="5"] { counter-reset: s 4; }
  ol.steps li { counter-increment: s; position: relative; padding: 5px 0 5px 36px; font-size: 9.8pt; }
  ol.steps li:before { content: counter(s); position: absolute; left: 0; top: 3px; width: 24px; height: 24px; border-radius: 50%;
    background: var(--burg); color: #fff; font-weight: 700; font-size: 9pt; display: flex; align-items: center; justify-content: center; }
  .divider { height: 1px; background: var(--line); margin: 22px 0 18px; }
  .flow .step { padding: 12px 10px 11px; }
"""
html = ('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<title>Solar Bill Review System – Setup Guide</title>\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n'
        f'<style>{style}{extra}</style>\n</head>\n<body>\n'
        + (here / 'body.html').read_text(encoding='utf-8') + '\n</body>\n</html>\n')
html = html.replace('{{LOGO_FW}}', b64('logo_full_white.png')).replace('{{LOGO_FBS}}', b64('logo_full_burgundy_sm.png'))
assert '{{' not in html
built = here / 'guide_built.html'
built.write_text(html, encoding='utf-8')

out = here / 'Solar-Bill-Review-System-Setup-Guide.pdf'
out.unlink(missing_ok=True)
edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
subprocess.run([edge, '--headless=new', '--disable-gpu', '--no-first-run', f'--user-data-dir={man / "edge_profile"}',
                '--no-pdf-header-footer', '--print-to-pdf-no-header', '--virtual-time-budget=15000',
                f'--print-to-pdf={out}', built.as_uri()], check=True, capture_output=True, timeout=180)

import time
for _ in range(30):
    if out.exists() and out.stat().st_size > 0:
        break
    time.sleep(1)
doc = pymupdf.open(out)
print('pages:', doc.page_count, '| size (in):', round(doc[0].rect.width / 72, 2), 'x', round(doc[0].rect.height / 72, 2))
print('fonts:', sorted({f[3] for p in doc for f in p.get_fonts()}))
prev = here / 'preview'
prev.mkdir(exist_ok=True)
for i, page in enumerate(doc, 1):
    page.get_pixmap(dpi=int(sys.argv[1]) if len(sys.argv) > 1 else 70).save(prev / f'p{i:02d}.png')
print('previews in', prev)
