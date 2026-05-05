document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 500); // Wait for transition to finish
        }, 1500); // Show splash for 1.5 seconds
    }

    // 2. Bottom Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Switch screen
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                screens.forEach(screen => {
                    screen.classList.remove('active');
                    if (screen.id === targetId) {
                        screen.classList.add('active');
                    }
                });
            }
            
            // Add a small scale animation to icon
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // 3. Payment Modal Logic
    const btnToMobile = document.getElementById('btn-to-mobile');
    const paymentModal = document.getElementById('payment-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const payBtn = document.getElementById('pay-btn');
    const modalBody = document.querySelector('.modal-body');
    const successScreen = document.getElementById('success-screen');
    const payAmountInput = document.getElementById('pay-amount');
    const successAmountSpan = document.getElementById('success-amount');
    const payeeNumberInput = document.getElementById('payee-number');

    if (btnToMobile && paymentModal) {
        // Open Modal
        btnToMobile.addEventListener('click', () => {
            paymentModal.classList.add('active');
            // Reset state
            modalBody.classList.remove('hidden');
            successScreen.classList.add('hidden');
            payAmountInput.value = '';
            payeeNumberInput.value = '';
        });

        // Close Modal
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                paymentModal.classList.remove('active');
            });
        });

        // Pay Button Click
        payBtn.addEventListener('click', () => {
            const amount = payAmountInput.value;
            const mobile = payeeNumberInput.value;
            
            if (!mobile || mobile.length < 10) {
                alert("Please enter a valid 10-digit mobile number");
                return;
            }
            if (!amount || amount <= 0) {
                alert("Please enter a valid amount");
                return;
            }

            // Simulate payment processing
            payBtn.innerText = "Processing...";
            payBtn.style.opacity = "0.7";

            setTimeout(() => {
                payBtn.innerText = "Pay Now";
                payBtn.style.opacity = "1";
                
                // Show success screen
                successAmountSpan.innerText = amount;
                modalBody.classList.add('hidden');
                successScreen.classList.remove('hidden');
            }, 1500); // 1.5 second processing delay
        });
    }

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    if (track && slides.length > 0) {
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
    }

    // Copy UPI ID functionality
    const copyIcon = document.querySelector('.fa-copy');
    if(copyIcon) {
        copyIcon.addEventListener('click', () => {
            alert('UPI ID copied to clipboard: 9876543210@atl');
        });
    }
});
