import re

with open('src/app/globals.css', 'r') as f:
    content = f.read()

# Replace global font family
content = re.sub(
    r'font-family: Arial,Helvetica,sans-serif;',
    'font-family: var(--font-manrope), sans-serif;\n  -webkit-font-smoothing: antialiased;',
    content
)

# Apply Syne to headers
headers_css = """
h1, h2, h3, .display, .hero-title, .intro-title, .entry-word, .marquee-track > span, .panel-number {
  font-family: var(--font-syne), sans-serif;
  letter-spacing: -0.04em;
}
"""
if "var(--font-syne)" not in content:
    content = content.replace('box-sizing: border-box;\n}', 'box-sizing: border-box;\n}' + headers_css)

with open('src/app/globals.css', 'w') as f:
    f.write(content)
