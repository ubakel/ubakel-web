"""Reference/visibility checker for a Make blueprint.

A module may reference {{N.x}} only if N ran earlier on the same path:
earlier modules in its own flow, modules before the router in parent flows,
or (inside an error route) the failing module and everything before it.
Modules in sibling router routes are NOT visible.
"""
import json, re, sys

bp = json.load(open(sys.argv[1], encoding='utf-8'))
bp = bp.get('blueprint', bp)
REF = re.compile(r'(?<![\w.`])(\d+)\.(?=[A-Za-z_`])')
problems, ids, count = [], [], [0]


def exprs(obj):
    s = json.dumps(obj, ensure_ascii=False)
    for block in re.findall(r'\{\{(.*?)\}\}', s):
        yield block


def check(m, visible):
    count[0] += 1
    ids.append(m['id'])
    for part in ('mapper', 'filter'):
        for block in exprs(m.get(part)):
            for n in REF.findall(block):
                n = int(n)
                if n not in visible:
                    problems.append(f"[{m['id']}] {m['module']} {part}: references {n} which is not visible")
    if m['module'] == 'builtin:BasicAggregator':
        f = (m.get('parameters') or {}).get('feeder')
        if f not in visible:
            problems.append(f"[{m['id']}] aggregator feeder {f} not visible")
    if m['module'] == 'builtin:BasicRouter' and not m.get('routes'):
        problems.append(f"[{m['id']}] router without routes")


def walk(flow, visible):
    visible = list(visible)
    for i, m in enumerate(flow):
        check(m, set(visible))
        if m.get('onerror'):
            walk(m['onerror'], visible + [m['id']])
        if m['module'] == 'builtin:BasicRouter':
            if i != len(flow) - 1:
                problems.append(f"[{m['id']}] router is not last in its flow")
            for r in m.get('routes', []):
                walk(r.get('flow', []), visible + [m['id']])
        visible.append(m['id'])


walk(bp['flow'], [])
dups = sorted({i for i in ids if ids.count(i) > 1})
if dups:
    problems.append(f'duplicate module ids: {dups}')
print(f'{count[0]} modules checked')
print('\n'.join(problems) if problems else 'no reference problems')
