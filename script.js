document.addEventListener('DOMContentLoaded', () => {
    class NavbarMenuToggle {
        constructor() {
            this.hamburgerMenu = document.querySelector('.hamburger-menu');
            this.navbarMenu = document.querySelector('.navbar-menu');
            this.currentScrollPosition = 0;
            
            this.init();
        }

        init() {
            if (!this.hamburgerMenu || !this.navbarMenu) {
                console.error('Navbar menu elements not found');
                return;
            }

            this.hamburgerMenu.setAttribute('aria-expanded', 'false');
            this.hamburgerMenu.setAttribute('aria-label', 'Toggle navigation menu');

            this.hamburgerMenu.addEventListener('click', this.toggleMenu.bind(this));
        }

        toggleMenu(event) {
            event.preventDefault();
            
            if (!this.navbarMenu.classList.contains('show')) {
                this.currentScrollPosition = window.pageYOffset;
            }

            const isMenuOpen = this.navbarMenu.classList.toggle('show');
            
            this.hamburgerMenu.setAttribute('aria-expanded', isMenuOpen.toString());

            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${this.currentScrollPosition}px`;
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                
                window.scrollTo(0, this.currentScrollPosition);
            }
        }
    }

    class WordCardManager {
        constructor() {
            this.wordCards = document.querySelectorAll('.word-card');
            this.init();
        }

        init() {
            this.wordCards.forEach(card => {
                const word = card.querySelector('.word');
                const audioButton = card.querySelector('.audio-button');
                const audioElement = card.querySelector('.word-audio');
                const translationElement = card.querySelector('.translation');
                const wordImage = card.querySelector('.word-image');

                // Populate card data
                const russianWord = card.dataset.russian;
                const englishTranslation = card.dataset.english;
                const pronunciation = card.dataset.pronunciation;
                const imageSrc = card.dataset.image;
                const audioSrc = card.dataset.audio;

                // Set sources
                audioElement.src = audioSrc;
                wordImage.src = imageSrc;
                wordImage.alt = `Image of ${russianWord}`;

                // Card expansion
                card.addEventListener('click', () => {
                    // Close other open cards
                    this.wordCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('expanded');
                        }
                    });

                    // Toggle current card
                    card.classList.toggle('expanded');

                    // Update translation
                    if (card.classList.contains('expanded')) {
                        translationElement.textContent = `${englishTranslation} (${pronunciation})`;
                    } else {
                        translationElement.textContent = '';
                    }
                });

                // Audio button functionality
                audioButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    
                    // Pause all other audio elements
                    this.wordCards.forEach(otherCard => {
                        const otherAudio = otherCard.querySelector('.word-audio');
                        if (otherAudio !== audioElement) {
                            otherAudio.pause();
                        }
                    });

                    // Play current audio
                    audioElement.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });
                });
            });
        }
    }

    class HeroImageManager {
        constructor() {
            this.heroImage = document.querySelector('.hero-image');
            this.init();
        }

        init() {
            this.updateHeroImage();
            window.addEventListener('resize', this.updateHeroImage.bind(this));
        }

        updateHeroImage() {
            if (!this.heroImage) return;

            this.heroImage.src = window.innerWidth <= 768 
                ? 'hero-background2.jpg' 
                : 'hero-background.jpg';
        }
    }

    class SmoothScroll {
        constructor() {
            this.heroButton = document.querySelector('.hero-button');
            this.wordCardsSection = document.getElementById('word-cards');
            this.init();
        }

        init() {
            if (this.heroButton && this.wordCardsSection) {
                this.heroButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.wordCardsSection.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                });
            }
        }
    }

    // Initialize modules
    new NavbarMenuToggle();
    new WordCardManager();
    new HeroImageManager();
    new SmoothScroll();
});
