# Bloodline Studio

A responsive Next.js studio website using the supplied photographs and videos, GSAP/ScrollTrigger and Motion.

## Run

```sh
npm install
npm run dev
npm run build
npm run start
npm run lint
```

If your environment blocks Turbopack's local worker port, use `npm run build -- --webpack`. No remote fonts or image providers are required.

## Before launch

Edit `src/lib/studio.ts` with the real email, phone, WhatsApp number (international digits only), and full Instagram/YouTube/TikTok URLs. Blank values display clear coming-soon labels. The form does not submit to a server: when email is configured it prepares an enquiry in the visitor's email app. Add a backend if direct online submission is needed.

The sound showcase is deliberately visual only. Add real audio assets and an accessible player when recordings are ready. Session images are presented as a journal without invented artist names or release credits.

The hero uses `studio03.mp4` on both mobile and desktop. The showreel loads `studio04.mp4` only when opened. Original assets are preserved.

## Verification

Production compilation, TypeScript and ESLint pass. Browser checks cover widths 390, 430, 768, 1024, 1280, 1440 and 1728px, menu Escape/focus behavior, showreel and session photo dialogs, service expansion, horizontal keyboard controls, booking visibility and reduced motion. The existing development server is also verified. Default Turbopack builds hit a sandbox worker-port restriction here; production compilation succeeds with the Webpack command above.

## Motion system

GSAP handles masked hero lines, scroll-driven type color, image masks, gallery parallax, desktop horizontal pinning and layered media transitions. Motion handles menus, dialogs and the major magnetic controls. The typing component uses a small local timer, and the single marquee uses CSS animation with a pause control.

Pointer tracking, custom cursor labels, ambient glow, drag-to-scroll and magnetic motion are enabled only on large screens with a fine pointer. Mobile uses native horizontal swipes, expandable service rows and a safe-area booking pill that appears after the hero and hides near contact/footer.

Reduced motion disables the intro, type loop, parallax, pinning, ambient motion and cursor. Typing, marquee and hero video pause off-screen; hidden tabs pause typing/video. All GSAP media contexts and native event listeners clean up when their components unmount. No new animation libraries were added.
