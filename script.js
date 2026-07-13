// Wish Upon A Star Animation
function makeWish() {
    const wishInput = document.getElementById('wishInput');
    const wishText = wishInput.value;

    if (wishText.trim() === '') {
        alert('Please write a wish first! ✨');
        return;
    }

    flyWishingStar(wishText.trim());
    wishInput.value = '';
}

// Sends a glowing star flying across the whole screen carrying the wish,
// leaving a trail of sparkles behind it.
function flyWishingStar(wishText) {
    const star = document.createElement('div');
    star.className = 'wishing-star';
    star.textContent = '⭐';

    // Attach the wish text as a little floating label next to the star
    const label = document.createElement('span');
    label.className = 'wish-label';
    label.textContent = wishText.length > 40 ? wishText.slice(0, 40) + '…' : wishText;
    star.appendChild(label);

    // Start just off-screen at the bottom, somewhere along the bottom third
    const startX = window.innerWidth * (0.05 + Math.random() * 0.2);
    const startY = window.innerHeight + 40;

    // End point: off-screen top-right, so it travels diagonally across everything
    const endX = window.innerWidth * (0.85 + Math.random() * 0.2);
    const endY = -100;

    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    document.body.appendChild(star);

    const duration = 2600; // ms
    const startTime = performance.now();

    // Animate manually with requestAnimationFrame so we can drop sparkles along the path
    function step(now) {
        const t = Math.min((now - startTime) / duration, 1);
        // ease-in-out
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const currentX = startX + (endX - startX) * eased;
        const currentY = startY + (endY - startY) * eased;

        star.style.transform = `translate(-50%, -50%) rotate(${t * 720}deg) scale(${1.1 - t * 0.5})`;
        star.style.left = currentX + 'px';
        star.style.top = currentY + 'px';
        star.style.opacity = t < 0.08 ? t / 0.08 : (t > 0.9 ? (1 - t) / 0.1 : 1);

        // Drop a sparkle every couple frames
        if (Math.random() < 0.5) {
            createSparkle(currentX, currentY);
        }

        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            star.remove();
            showWishConfirmation();
        }
    }

    requestAnimationFrame(step);
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'wish-sparkle';
    const size = 4 + Math.random() * 6;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.left = (x + (Math.random() * 20 - 10)) + 'px';
    sparkle.style.top = (y + (Math.random() * 20 - 10)) + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
}

function showWishConfirmation() {
    // A gentle in-page confirmation instead of a jarring alert()
    const toast = document.createElement('div');
    toast.textContent = '🌟 Your wish has been sent to the stars! 💕';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.background = 'linear-gradient(135deg, #FF69B4, #FF1493)';
    toast.style.color = '#fff';
    toast.style.padding = '14px 26px';
    toast.style.borderRadius = '30px';
    toast.style.fontWeight = 'bold';
    toast.style.boxShadow = '0 8px 20px rgba(255, 20, 147, 0.45)';
    toast.style.zIndex = 6000;
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 2600);
}

// Toggle Music
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.querySelector('.btn-music');
    
    if (audio.paused) {
        audio.play();
        btn.textContent = '🎵 Stop Music';
    } else {
        audio.pause();
        btn.textContent = '🎵 Play Our Song';
    }
}

// Generate floating hearts on page load
function generateHearts() {
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Initialize on page load
window.addEventListener('load', generateHearts);

// ===================== //
// Confirmation Gate      //
// ===================== //
(function setupGate() {
    const gateOverlay = document.getElementById('gateOverlay');
    const mainContainer = document.getElementById('mainContainer');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const gateButtons = document.getElementById('gateButtons');

    if (!gateOverlay || !btnYes || !btnNo) return;

    // "Yes" reveals the actual page
    btnYes.addEventListener('click', () => {
        gateOverlay.classList.add('gate-hide');
        mainContainer.classList.add('reveal');
        setTimeout(() => gateOverlay.remove(), 700);
    });

    // "No" runs away the moment you try to reach it
    function dodge() {
        const btnWidth = btnNo.offsetWidth || 100;
        const btnHeight = btnNo.offsetHeight || 50;
        const margin = 20;

        const maxX = window.innerWidth - btnWidth - margin;
        const maxY = window.innerHeight - btnHeight - margin;

        const newX = margin + Math.random() * Math.max(maxX - margin, 0);
        const newY = margin + Math.random() * Math.max(maxY - margin, 0);

        btnNo.classList.add('dodging');
        btnNo.style.left = newX + 'px';
        btnNo.style.top = newY + 'px';
    }

    // Move it away before the click can land (desktop hover)
    btnNo.addEventListener('mouseenter', dodge);
    // Also dodge on click/touch in case a hover was missed (e.g. mobile)
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        dodge();
    });
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodge();
    }, { passive: false });

    // Keep it inside the viewport if the window resizes
    window.addEventListener('resize', () => {
        if (btnNo.classList.contains('dodging')) dodge();
    });

    // Little twinkling stars behind the gate question
    const gateStars = document.querySelector('.gate-stars');
    if (gateStars) {
        for (let i = 0; i < 25; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.style.width = s.style.height = (Math.random() * 3 + 1) + 'px';
            s.style.left = Math.random() * 100 + '%';
            s.style.top = Math.random() * 100 + '%';
            s.style.animationDelay = Math.random() * 3 + 's';
            gateStars.appendChild(s);
        }
    }
})();
