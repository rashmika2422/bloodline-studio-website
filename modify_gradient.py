with open('src/app/globals.css', 'r') as f:
    content = f.read()

# Add box-shadow to the combined rule
target = """.editorial-gallery .studio-image::after,
.experience-panel .studio-image::after,
.project-grid .studio-image::after,
.service-detail .studio-image::after,
.service-preview .studio-image::after {"""

replacement = target + """
  box-shadow: inset 0 0 60px 20px var(--bg);"""

content = content.replace(target, replacement)

# What about regular .studio-image that aren't in these lists? Let's add a default rule right after .studio-image img.
default_gradient = """
.studio-image::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 60px 20px var(--bg);
  pointer-events: none;
  z-index: 1;
}
"""
if "box-shadow: inset" not in default_gradient:
    pass # Wait, I don't need to replace, I can just add this default rule. 

# Let's check if the default rule is already there. If not, add it.
if ".studio-image::after {\n  content" not in content:
    content = content.replace('.studio-image {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n}', '.studio-image {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n}\n' + default_gradient)

with open('src/app/globals.css', 'w') as f:
    f.write(content)
