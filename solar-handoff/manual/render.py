"""Inline the logos, print the manual to PDF with Edge, and rasterise each page for review."""
import base64, pathlib, subprocess, sys
import pymupdf

here = pathlib.Path(__file__).parent
b64 = lambda p: 'data:image/png;base64,' + base64.b64encode((here / p).read_bytes()).decode()
html = (here / 'manual.html').read_text(encoding='utf-8')
html = html.replace('{{LOGO_B}}', b64('logo_burgundy.png')).replace('{{LOGO_W}}', b64('logo_white.png'))
html = (html.replace('{{LOGO_FW}}', b64('logo_full_white.png')).replace('{{LOGO_FBS}}', b64('logo_full_burgundy_sm.png'))
        .replace('{{LOGO_FWS}}', b64('logo_full_white_sm.png')))
built = here / 'manual_built.html'
built.write_text(html, encoding='utf-8')

out = here / (sys.argv[2] if len(sys.argv) > 2 else 'Solar-Bill-Review-System-User-Manual.pdf')
edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
subprocess.run([edge, '--headless=new', '--disable-gpu', '--no-first-run', f'--user-data-dir={here / "edge_profile"}', '--no-pdf-header-footer', '--print-to-pdf-no-header',
                '--virtual-time-budget=15000', f'--print-to-pdf={out}', built.as_uri()],
               check=True, capture_output=True, timeout=180)

doc = pymupdf.open(out)
print('pages:', doc.page_count, '| size (in):', round(doc[0].rect.width / 72, 2), 'x', round(doc[0].rect.height / 72, 2))
fonts = {f[3] for p in doc for f in p.get_fonts()}
print('fonts:', sorted(fonts))
prev = here / 'preview'
prev.mkdir(exist_ok=True)
for i, page in enumerate(doc, 1):
    page.get_pixmap(dpi=int(sys.argv[1]) if len(sys.argv) > 1 else 70).save(prev / f'p{i:02d}.png')
print('previews in', prev)
