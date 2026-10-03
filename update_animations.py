import re

with open('src/components/ui/CinematicSections.tsx', 'r') as f:
    content = f.read()

# Replace header animation
content = content.replace(
    'gsap.from(header, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: header, start: "top 85%", once: true } });',
    'gsap.from(header, { y: 60, opacity: 0, rotationX: -15, transformOrigin: "bottom center", duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: header, start: "top 85%", once: true } });'
)

# Replace image scale animation with an advanced clip-path reveal + scale
img_anim_old = """gsap.fromTo(img, 
          { scale: 1.15 }, 
          { scale: 1, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: img, start: "top 95%", once: true } }
        );"""
img_anim_new = """gsap.fromTo(img.parentElement, 
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, 
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: { trigger: img.parentElement, start: "top 90%", once: true } }
        );
        gsap.fromTo(img, 
          { scale: 1.3, filter: "brightness(0.5)" }, 
          { scale: 1, filter: "brightness(1)", duration: 2, ease: "power3.out", scrollTrigger: { trigger: img.parentElement, start: "top 90%", once: true } }
        );"""
content = content.replace(img_anim_old, img_anim_new)

# Replace marker animation
content = content.replace(
    'gsap.from(marker, { y: 20, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: marker, start: "top 90%", once: true } });',
    'gsap.from(marker, { y: 30, opacity: 0, letterSpacing: "0.4em", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: marker, start: "top 90%", once: true } });'
)

with open('src/components/ui/CinematicSections.tsx', 'w') as f:
    f.write(content)

with open('src/components/ui/RevealText.tsx', 'r') as f:
    rt_content = f.read()

# Make RevealText more advanced (blur and stagger y)
rt_old = 'gsap.fromTo(line, { y: 40, opacity: .3 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 90%", end: "top 55%", scrub: 1 } });'
rt_new = 'gsap.fromTo(line, { y: 60, opacity: 0, filter: "blur(8px)", rotationX: -10 }, { y: 0, opacity: 1, filter: "blur(0px)", rotationX: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 95%", end: "top 50%", scrub: 1 } });'
rt_content = rt_content.replace(rt_old, rt_new)

with open('src/components/ui/RevealText.tsx', 'w') as f:
    f.write(rt_content)
