import re

with open('src/app/globals.css', 'r') as f:
    content = f.read()

# Replace root variables
content = re.sub(r'--bg: #050505;', '--bg: #030304;\n  --accent: #dca341;\n  --accent-glow: #e25822;', content)

# Replace the text selection color to match the new warm accent
content = re.sub(r'::selection \{\n  background: #e7e5dc;\n  color: #050505;\n\}', '::selection {\n  background: var(--accent);\n  color: #050505;\n}', content)

# Replace outline focus
content = re.sub(r'outline: 2px solid #f4d76f;', 'outline: 2px solid var(--accent);', content)

# Change the hero shade to match new background
content = re.sub(r'background: linear-gradient\(180deg,#0003 0%,#0001 30%,#0008 75%,#050505 100%\);', 'background: linear-gradient(180deg,#0003 0%,#0001 30%,#0008 75%,var(--bg) 100%);', content)
content = re.sub(r'background: linear-gradient\(#0003,#0000 25%,#0006 60%,#050505\);', 'background: linear-gradient(#0003,#0000 25%,#0006 60%,var(--bg));', content)

# Change the gradient backgrounds to warm amber and deep violet combinations (classic music studio aesthetic)
old_gradients = """  background:
    linear-gradient(135deg, rgba(58, 83, 176, .12), transparent 38%),
    linear-gradient(315deg, rgba(124, 57, 160, .1), transparent 38%),
    linear-gradient(0deg, rgba(5, 5, 5, .18), transparent 28%);"""
new_gradients = """  background:
    linear-gradient(135deg, rgba(220, 163, 65, .15), transparent 45%),
    linear-gradient(315deg, rgba(226, 88, 34, .12), transparent 45%),
    linear-gradient(0deg, var(--bg), transparent 35%);"""
content = content.replace(old_gradients, new_gradients)

old_gradients_2 = """  background:
    linear-gradient(135deg, rgba(205, 155, 60, .09), transparent 40%),
    linear-gradient(315deg, rgba(92, 62, 163, .1), transparent 38%),
    linear-gradient(0deg, rgba(5, 5, 5, .18), transparent 28%);"""
new_gradients_2 = """  background:
    linear-gradient(135deg, rgba(220, 163, 65, .12), transparent 40%),
    linear-gradient(315deg, rgba(110, 50, 180, .15), transparent 40%),
    linear-gradient(0deg, var(--bg), transparent 35%);"""
content = content.replace(old_gradients_2, new_gradients_2)

old_shade = """  background:
    linear-gradient(120deg, rgba(70, 45, 124, .16), transparent 50%),
    linear-gradient(310deg, rgba(34, 67, 138, .12), transparent 50%),
    linear-gradient(180deg, rgba(5, 5, 5, .27), rgba(5, 5, 5, .82) 65%, #050505);"""
new_shade = """  background:
    linear-gradient(120deg, rgba(220, 163, 65, .12), transparent 50%),
    linear-gradient(310deg, rgba(110, 50, 180, .15), transparent 50%),
    linear-gradient(180deg, transparent, rgba(3, 3, 4, .85) 65%, var(--bg));"""
content = content.replace(old_shade, new_shade)

old_mob_grad = """  background:
    linear-gradient(135deg, rgba(205, 155, 60, .08), transparent 35%),
    linear-gradient(315deg, rgba(48, 75, 153, .10), transparent 40%),
    linear-gradient(0deg, rgba(5, 5, 5, .16), transparent 25%);"""
new_mob_grad = """  background:
    linear-gradient(135deg, rgba(220, 163, 65, .12), transparent 35%),
    linear-gradient(315deg, rgba(226, 88, 34, .12), transparent 40%),
    linear-gradient(0deg, var(--bg), transparent 25%);"""
content = content.replace(old_mob_grad, new_mob_grad)


# Update hardcoded #050505 to var(--bg) for consistency where needed
content = content.replace('background: #050505;', 'background: var(--bg);')
content = content.replace('background: #0a0a0a;', 'background: #060608;')
content = content.replace('background: #101010;', 'background: #09090c;')
content = content.replace('background: #0d0d0d;', 'background: #07070a;')

with open('src/app/globals.css', 'w') as f:
    f.write(content)
