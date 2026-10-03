with open('src/app/layout.tsx', 'r') as f:
    content = f.read()

font_import = """import { Syne, Manrope } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});
"""

if "import { Syne" not in content:
    content = content.replace('import "./globals.css";', font_import + '\nimport "./globals.css";')
    content = content.replace('<body>', '<body className={`${syne.variable} ${manrope.variable}`}>')

with open('src/app/layout.tsx', 'w') as f:
    f.write(content)
