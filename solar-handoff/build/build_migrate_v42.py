"""Re-point the verified live v4.2 blueprint (Pro account eu1, scenario 7628024) at the new us2 account
(org 9177395, team 3096762, data store 164085).

usage: python build_migrate_v42.py <drive> <sheets> <gmail> <gemini> <hook> [--dry]
Writes patched_us2.json and Downloads/solar-us2.create.json (REST POST body). --dry checks only.
"""
import json, sys

args = [a for a in sys.argv[1:] if a != '--dry']
DRY = '--dry' in sys.argv
OLD_CONN = {'google-drive': 11303388, 'google-sheets': 11303550, 'google-email': 11303573, 'gemini-ai': 11303634}
NEW_CONN = dict(zip(['google-drive', 'google-sheets', 'google-email', 'gemini-ai'], map(int, args[0:4])))
OLD_DS, NEW_DS = 198561, 164085
OLD_HOOK, NEW_HOOK = 3789867, int(args[4])
TEAM = 3096762

bp = json.load(open('live_v42.json', encoding='utf-8'))
count = {'conn': 0, 'ds': 0, 'hook': 0}


def walk(flow):
    for m in flow:
        yield m
        for r in m.get('routes', []) or []:
            yield from walk(r.get('flow', []))
        if m.get('onerror'):
            yield from walk(m['onerror'])


for m in walk(bp['flow']):
    app = m['module'].split(':')[0]
    p = m.get('parameters') or {}
    for k in list(p):
        if k.startswith('__IMTCONN__'):
            assert p[k] == OLD_CONN[app], (m['id'], app, p[k])
            p[k] = NEW_CONN[app]; count['conn'] += 1
        elif k == 'datastore':
            assert p[k] == OLD_DS, (m['id'], p[k]); p[k] = NEW_DS; count['ds'] += 1
        elif k == 'hook':
            assert p[k] == OLD_HOOK, (m['id'], p[k]); p[k] = NEW_HOOK; count['hook'] += 1
    # restore metadata may carry the old connection labels; drop only those stale hints
    rest = (m.get('metadata') or {}).get('restore', {}).get('parameters', {})
    for k in list(rest):
        if k.startswith('__IMTCONN__') or k in ('datastore', 'hook'):
            rest.pop(k)

assert count == {'conn': 42, 'ds': 9, 'hook': 1}, count

# module [2] settings: the client's Drive files (shared with / owned by netsolaradvisor@gmail.com) and team inbox
VARS = {
    'templateFileId': ('1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0', '1fjEaZJhHnJRc-yMzoZaAIZl8TW6sS5jesj808cl6X_Q'),
    'parentFolderId': ('1Krmdqux3lyQgxC_-ojK4Vz9FQwgnWnRz', '1Q-UE09qSb0j17BKkVwjSS_ZnHsVusEa9'),
    'logSheetId': ('1U_a2cR6FozSK5-svWRFubI0d9oCrWAp2WvAGFethLp0', '1up0EcSvSJmPUkfMPpnFKd7mkGOTPr8A2GjFNzjZOUQ8'),
    'opsEmail': ('ahmedalaqel26@gmail.com', 'netsolaradvisor@gmail.com'),
}
m2 = next(m for m in bp['flow'] if m['id'] == 2)
for v in m2['mapper']['variables']:
    if v['name'] in VARS:
        old, new = VARS.pop(v['name'])
        assert v['value'] == old, (v['name'], v['value']); v['value'] = new
assert not VARS, ('not found in [2]', VARS)
s = json.dumps(bp, ensure_ascii=False)
for old in map(str, [*OLD_CONN.values(), OLD_DS, OLD_HOOK, '1lwwk6nQsW7KgJpc', '1Krmdqux3lyQgxC', '1U_a2cR6FozSK5', 'ahmedalaqel26']):
    assert old not in s, ('old id still present', old)

bp['name'] = 'Solar Bill Review System v4.2'
out = {k: bp[k] for k in ('name', 'flow', 'metadata')}
if DRY:
    print('dry run OK:', count, '| size', len(json.dumps(out, ensure_ascii=False)) // 1024, 'KB')
    sys.exit()
json.dump(out, open('patched_us2.json', 'w', encoding='utf-8'), ensure_ascii=False)
body = {'blueprint': json.dumps(out, ensure_ascii=False), 'teamId': TEAM,
        'scheduling': json.dumps({'type': 'immediately', 'maximum_runs_per_minute': 100})}
open(r'C:\Users\ahmed\Downloads\solar-us2.create.json', 'w', encoding='utf-8').write(json.dumps(body, ensure_ascii=False))
print('re-pointed:', count, '| connections:', NEW_CONN, '| hook', NEW_HOOK, '| data store', NEW_DS)
