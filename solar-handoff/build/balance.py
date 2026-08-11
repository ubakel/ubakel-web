import json, re, sys
def bal(expr):
    depth, ins = 0, False
    for ch in expr:
        if ch == '"': ins = not ins
        elif not ins:
            if ch == '(': depth += 1
            elif ch == ')':
                depth -= 1
                if depth < 0: return 'EXTRA )'
    return 'ok' if depth == 0 and not ins else f'unbalanced depth={depth} inString={ins}'
bp = json.load(open(sys.argv[1], encoding='utf-8')); bp = bp.get('blueprint', bp)
bad = 0
for block in re.findall(r'\{\{(.*?)\}\}', json.dumps(bp, ensure_ascii=False).replace('\\"', '"')):
    r = bal(block)
    if r != 'ok':
        bad += 1; print(r, '::', block[:120], '...', block[-60:])
print('unbalanced blocks:', bad)
