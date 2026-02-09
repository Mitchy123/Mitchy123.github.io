document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const responseMessage = document.getElementById('response-message');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set Valentine's Day date (February 14)
    const valentinesDay = new Date();
    const currentYear = valentinesDay.getFullYear();
    const currentMonth = valentinesDay.getMonth();
    const currentDate = valentinesDay.getDate();
    
    // If we're past February 14 this year, set for next year
    if (currentMonth > 1 || (currentMonth === 1 && currentDate > 14)) {
        valentinesDay.setFullYear(currentYear + 1);
    }
    valentinesDay.setMonth(1); // February (0-indexed)
    valentinesDay.setDate(14);
    valentinesDay.setHours(0, 0, 0, 0);
    
    // Update countdown every second
    function updateCountdown() {
        const now = new Date();
        const diff = valentinesDay - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial call to countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        responseMessage.innerHTML = "You've made me the happiest person in the world! ❤️";
        responseMessage.style.display = "block";
        
        // Create confetti celebration
        createConfetti();
        
        // Add romantic message after a delay
        setTimeout(() => {
            const romanticMsg = document.createElement('p');
            romanticMsg.innerHTML = "For the record, everyday feels like valentines with you babe!";
            romanticMsg.style.fontSize = "1.5rem";
            romanticMsg.style.marginTop = "15px";
            romanticMsg.style.color = "#9c27b0";
            romanticMsg.style.fontStyle = "italic";
            responseMessage.appendChild(romanticMsg);
        }, 1500);
    });
    
    // No button click handler (with some fun interaction)
    noBtn.addEventListener('click', function() {
        // Move the no button randomly when hovered or clicked
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = "fixed";
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        // Change the text of the no button sometimes
        const messages = [
            "Are you sure?",
            "Think again!",
            "Please say yes!",
            "You don't mean that!",
            "Try again!",
            "My heart! 💔",
            "Pretty please?",
            "I'll be so sad!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        noBtn.innerHTML = `<i class="fas fa-heart-broken"></i> ${randomMessage}`;
        
        // Show a playful message
        responseMessage.innerHTML = "Hmm, I think you clicked the wrong button! Try the other one! 😉";
        responseMessage.style.display = "block";
    });
    
    // No button hover effect - makes it harder to click
    noBtn.addEventListener('mouseover', function() {
        // Only move if it hasn't been clicked yet
        if (!noBtn.style.position || noBtn.style.position !== "fixed") {
            const maxX = window.innerWidth - noBtn.offsetWidth - 100;
            const maxY = window.innerHeight - noBtn.offsetHeight - 100;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            noBtn.style.transition = "all 0.5s ease";
            noBtn.style.transform = `translate(${randomX/10}px, ${randomY/10}px)`;
        }
    });
    
    // Confetti function
    function createConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#e91e63', '#9c27b0', '#2196F3', '#4CAF50', '#FFC107'];
        
        // Create confetti pieces
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 10 + 5,
                d: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 10,
                tiltAngleIncrement: Math.random() * 0.05 + 0.05,
                tiltAngle: 0
            });
        }
        
        function drawConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confettiPieces.forEach((p) => {
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
                ctx.stroke();
                
                // Update position
                p.y += p.d;
                p.tiltAngle += p.tiltAngleIncrement;
                p.tilt = Math.sin(p.tiltAngle) * 15;
                
                // If piece is out of screen, reset it
                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
            });
            
            requestAnimationFrame(drawConfetti);
        }
        
        drawConfetti();
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
            canvas.style.opacity = "0";
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.opacity = "1";
            }, 1000);
        }, 5000);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('confetti-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Add some floating hearts in the background
    function createFloatingHearts() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.opacity = Math.random() * 0.3 + 0.1;
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.zIndex = '0';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            container.appendChild(heart);
        }
    }
    
    // Add floating hearts animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-1000px) rotate(720deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create the floating hearts
    createFloatingHearts();
});