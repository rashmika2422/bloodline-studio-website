import re

with open('src/app/globals.css', 'r') as f:
    content = f.read()

def reduce_clamp(match):
    min_val, vw_val, max_val = match.groups()
    new_min = int(float(min_val) * 0.88)
    new_vw = round(float(vw_val) * 0.88, 1)
    new_max = int(float(max_val) * 0.88)
    return f'clamp({new_min}px,{new_vw}vw,{new_max}px)'

content = re.sub(r'clamp\(\s*([\d.]+)px\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)px\s*\)', reduce_clamp, content)

def reduce_vw(match):
    vw_val = match.group(1)
    new_vw = round(float(vw_val) * 0.88, 1)
    return f'font-size: {new_vw}vw;'

content = re.sub(r'font-size:\s*([\d.]+)vw;', reduce_vw, content)

gradient_css = """
.studio-image::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 60px 15px var(--bg);
  pointer-events: none;
  z-index: 1;
}
"""

if ".studio-image::after" not in content:
    content = content.replace('.studio-image img {\n  object-fit: cover;', gradient_css + '\n.studio-image img {\n  object-fit: cover;')

with open('src/app/globals.css', 'w') as f:
    f.write(content)
