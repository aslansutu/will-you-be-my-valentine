const xWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const xHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const answers = [
    "Are you sure?",
    "Are you really sure??",
    "Are you really really sure???",
    "Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Let's just start over.."
];

const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
const banner = document.getElementById('banner');
const message = document.querySelector('.message');

let i = 0;
let size = 50;
let noWidth = 150;
let clicks = 0;
let dodgeEnabled = false;

function dodgeNoButton() {
    if (!dodgeEnabled) return;
    const w = no_button.offsetWidth || 60;
    const h = no_button.offsetHeight || 40;
    const maxX = window.innerWidth - w - 10;
    const maxY = window.innerHeight - h - 10;
    no_button.style.position = 'fixed';
    no_button.style.zIndex = '10';
    no_button.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
    no_button.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';
    no_button.style.margin = '0';
}

no_button.addEventListener('mouseover', dodgeNoButton);
no_button.addEventListener('touchstart', () => {
    setTimeout(dodgeNoButton, 50);
}, { passive: true });

no_button.addEventListener('click', () => {
    if (clicks === 0) {
        banner.src = "./public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    if (clicks >= 3) dodgeEnabled = true;

    const sizes = [40, 50, 30, 35, 45];
    size += sizes[Math.floor(Math.random() * sizes.length)];
    const maxSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.45);
    const cappedSize = Math.min(size, maxSize);
    yes_button.style.height = `${cappedSize}px`;
    yes_button.style.width = `${cappedSize}px`;
    yes_button.style.fontSize = `${Math.max(12, Math.round(cappedSize * 0.22))}px`;

    if (no_button.style.position !== 'fixed') {
        noWidth = Math.max(80, noWidth - 10);
        no_button.style.width = `${noWidth}px`;
        no_button.style.fontSize = `${Math.max(7, Math.round(noWidth * 0.12))}px`;
    }

    no_button.innerHTML = answers[i%answers.length];
    i++;
});

yes_button.addEventListener('click', () => {
    banner.src = "./public/images/yes.gif";
    refreshBanner();
    yes_button.style.display = "none";
    no_button.style.display = "none";
    message.style.display = "block";
});

function refreshBanner() {
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

const valentineColors = [
    "#FF0000",
    "#FF1493",
    "#FF69B4",
    "#FFC0CB",
    "#800080",
    "#FF6347",
];

function createHeart(idx) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    const randomColor = valentineColors[Math.floor(Math.random() * valentineColors.length)];
    const randomTop = Math.floor(Math.random() * (xHeight - 90));
    const randomLeft = Math.floor(Math.random() * (xWidth - 100));
    const maxHeartScale = Math.min(3.5, Math.max(0.7, xWidth / 300));
    const minHeartScale = Math.max(0.3, maxHeartScale * 0.2);
    const randomScale = Math.random() * (maxHeartScale - minHeartScale) + minHeartScale;
    const randomAnimationDuration = Math.floor(Math.random() * 20) + 10;

    heart.style.width = "100px";
    heart.style.height = "90px";
    heart.style.top = randomTop + 'px';
    heart.style.left = randomLeft + 'px';
    heart.style.transform = `scale(${randomScale})`;
    heart.style.opacity = 0.7;

    const animationName = "heartScale" + idx + Date.now();
    heart.style.animation = `${animationName} ${randomAnimationDuration}s infinite alternate`;

    const keyframes = `@keyframes ${animationName} {
        0% { transform: scale(${randomScale * 0.7}); }
        50% { transform: scale(${randomScale * 1.2}); }
        100% { transform: scale(${randomScale * 0.7}); }
    }`;
    document.styleSheets[0].insertRule(keyframes, document.styleSheets[0].cssRules.length);

    const before = document.createElement('div');
    before.style.position = "absolute";
    before.style.top = "0";
    before.style.width = "52px";
    before.style.height = "80px";
    before.style.borderRadius = "50px 50px 0 0";
    before.style.background = randomColor;
    before.style.left = "50px";
    before.style.transform = "rotate(-45deg)";
    before.style.transformOrigin = "0 100%";

    const after = document.createElement('div');
    after.style.position = "absolute";
    after.style.top = "0";
    after.style.width = "52px";
    after.style.height = "80px";
    after.style.borderRadius = "50px 50px 0 0";
    after.style.background = randomColor;
    after.style.left = "0";
    after.style.transform = "rotate(45deg)";
    after.style.transformOrigin = "100% 100%";

    heart.appendChild(before);
    heart.appendChild(after);
    document.querySelector('.hearts').appendChild(heart);
}

function createHearts(numHearts) {
    for (let i = 0; i < numHearts; i++) {
        createHeart(i);
    }
}

createHearts(Math.min(60, Math.floor(xWidth * xHeight * 0.0001)));
