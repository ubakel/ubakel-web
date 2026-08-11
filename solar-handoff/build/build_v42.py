"""v4.2 = live Pro scenario 7628024 + customer name from the FORM (first + last name), not from the bills,
plus the email header wordmark changed from UBAKEL to NetSolar.

[64] writes the report's customer block (name, address, email, phone).
- name   : was {{60.billName}} (Gemini account_holder_name) -> now {{1.first_name}} {{1.last_name}}
- filter : was "a bill carried a name" -> now also runs for a NEW customer, so the form name is written
           even when the first submission has no readable bill (e.g. only a pre-solar bill).
Address and phone still come from the bills; email still comes from the form.
"""
import json

bp = json.load(open('new_live.json', encoding='utf-8'))


def walk(flow):
    for m in flow:
        yield m
        for r in m.get('routes', []) or []:
            yield from walk(r.get('flow', []))
        if m.get('onerror'):
            yield from walk(m['onerror'])


M = {m['id']: m for m in walk(bp['flow'])}
m = M[64]
assert m['module'] == 'google-sheets:updateMultipleRows'
rows = m['mapper']['rows']
assert rows[0] == {'values': ['{{60.billName}}']}, rows[0]
rows[0] = {'values': ['{{1.first_name}} {{1.last_name}}']}

assert m['filter'] == {'name': 'Bill carried customer details',
                       'conditions': [[{'a': '{{60.billName}}', 'b': '', 'o': 'text:notequal'}]]}, m['filter']
# same new-customer test the provisioning route [11] uses
assert any(c.get('a') == '{{4.array[1].phone}}' and c.get('o') == 'text:equal'
           for g in (M[11].get('filter') or {}).get('conditions', []) for c in g), M[11].get('filter')
m['filter'] = {'name': 'Write customer details',
               'conditions': [[{'a': '{{60.billName}}', 'b': '', 'o': 'text:notequal'}],
                              [{'a': '{{4.array[1].phone}}', 'b': '', 'o': 'text:equal'}]]}

# email header wordmark: UBAKEL -> NetSolar (all 13 team emails; the "contact Ubakel" support lines stay)
OLD_MARK = 'letter-spacing:.5px">UBAKEL<span'
NEW_MARK = 'letter-spacing:.5px">NetSolar<span'
marks = 0
for mm in walk(bp['flow']):
    if mm['module'] == 'google-email:sendAnEmail':
        html = mm['mapper'].get('content', '')
        assert html.count(OLD_MARK) == 1, (mm['id'], html.count(OLD_MARK))
        mm['mapper']['content'] = html.replace(OLD_MARK, NEW_MARK)
        marks += 1
assert marks == 13, marks
assert 'UBAKEL' not in json.dumps(bp, ensure_ascii=False)

out = {k: bp[k] for k in ('name', 'flow', 'metadata')}
json.dump(out, open('patched_v42.json', 'w', encoding='utf-8'), ensure_ascii=False)
open(r'C:\Users\ahmed\Downloads\solar-v42.patch.json', 'w', encoding='utf-8').write(
    json.dumps({'blueprint': json.dumps(out, ensure_ascii=False)}, ensure_ascii=False))
print('v4.2 written: [64] name from form + new-customer filter; email wordmark NetSolar in', marks, 'emails')
