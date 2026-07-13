// Shooting Star Animation
function makeWish() {
    const wishText = document.getElementById('wishInput').value;
    
    if (wishText.trim() === '') {
        alert('Please write a wish first! ✨');
        return;
    }

    // Create shooting stars
    for (let i = 0; i < 3; i++) {
        createShootingStar();
    }

    // Show confirmation message
    alert('🌟 Your wish has been made! 💕');
    document.getElementById('wishInput').value = '';
}

function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 2);
    
    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    
    document.body.appendChild(shootingStar);
    
    // Remove the star after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, 2000);
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
