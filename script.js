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

    // 4. Settings Panel & Dark Mode Logic
    const profileBtn = document.getElementById('profile-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const closePanelBtn = document.getElementById('close-panel');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (profileBtn && settingsPanel) {
        profileBtn.addEventListener('click', () => {
            settingsPanel.classList.add('active');
        });

        closePanelBtn.addEventListener('click', () => {
            settingsPanel.classList.remove('active');
        });

        // Dark Mode Toggle
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }

    // 5. QR Scanner Logic
    const qrBtn = document.getElementById('qr-btn');
    const qrScannerScreen = document.getElementById('qr-scanner');
    const closeQrBtn = document.getElementById('close-qr');
    const videoElem = document.getElementById('qr-video');
    let stream = null;

    if (qrBtn && qrScannerScreen) {
        qrBtn.addEventListener('click', async () => {
            // Show Scanner Screen
            screens.forEach(screen => screen.classList.remove('active'));
            qrScannerScreen.classList.add('active');

            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoElem.srcObject = stream;
            } catch (err) {
                console.error("Error accessing camera: ", err);
                alert("Camera access denied or unavailable.");
            }
        });

        closeQrBtn.addEventListener('click', () => {
            // Stop Camera
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoElem.srcObject = null;
            }
            
            // Go back to Home
            screens.forEach(screen => screen.classList.remove('active'));
            document.getElementById('home').classList.add('active');
        });
    }
});
