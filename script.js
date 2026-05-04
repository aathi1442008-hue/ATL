document.addEventListener('DOMContentLoaded', () => {
    // Bottom Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // In a real app, this would change the view/route
            const sectionName = item.querySelector('span').innerText;
            console.log(`Navigating to ${sectionName}`);
            
            // Add a small scale animation
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        indicators.forEach((ind, index) => {
            if (index === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    // Auto slide every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 3000);

    // Make action items clickable
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', () => {
            const actionName = item.querySelector('span').innerText;
            alert(`${actionName} feature coming soon!`);
        });
    });

    // Copy UPI ID functionality
    const copyIcon = document.querySelector('.fa-copy');
    if(copyIcon) {
        copyIcon.addEventListener('click', () => {
            // In a real browser context this uses navigator.clipboard
            alert('UPI ID copied to clipboard: 9876543210@atl');
        });
    }
});
