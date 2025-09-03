
const header = document.querySelector('.header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    
    const rotation = 135 + (scrollProgress * 30);+
    const stop1 = Math.max(0, scrollProgress * 30);
    const stop2 = 25 + (scrollProgress * 20);
    const stop3 = 50 + (scrollProgress * 10);
    const stop4 = 75 - (scrollProgress * 10);
    const stop5 = 100 - (scrollProgress * 20);
    
   
    let background = document.querySelector('.background');
    if (!background) {
        background = document.createElement('div');
        background.className = 'background';
        document.body.appendChild(background);
        
        
        const overlay = document.createElement('div');
        overlay.className = 'background-overlay';
        document.body.appendChild(overlay);
    }
    
    background.style.background = `linear-gradient(
        ${rotation}deg,
        #1a0b2e ${stop1}%,
        #16213e ${stop2}%,
        #0f3460 ${stop3}%,
        #1a1a2e ${stop4}%,
        #000000 ${stop5}%
    )`;
});

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
    });
});


const style = document.createElement('style');
style.textContent = `button {
        position: relative;
        overflow: hidden;
    }`;
document.head.appendChild(style);


