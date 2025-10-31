
        // Global variables
        let currentSection = 'home';

        // Initialize the website
        document.addEventListener('DOMContentLoaded', function() {
            initializeAnimations();
            initializeScrollEffects();
            showSection('home');
        });

        // Navigation functions
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            currentSection = sectionId;
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Reinitialize animations for the new section
            setTimeout(() => {
                initializeAnimations();
            }, 100);
        }

        function toggleMobileNav() {
            const mobileNav = document.getElementById('mobile-Nav');
            mobileNav.classList.toggle('active');
        }

        // Scroll effects
        function initializeScrollEffects() {
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });
        }

        // Animation on scroll
        function initializeAnimations() {
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Customer details function
        function showCustomerDetails(type) {
            const details = {
                residential: {
                    title: 'Residential Solar Solutions',
                    description: 'Transform your home with our customized solar solutions. Reduce your electricity bills while contributing to a sustainable future.',
                    benefits: [
                        'Customized solutions tailored to your energy needs',
                        'High-quality, aesthetic solar panels',
                        'Proven track record of successful installations',
                        'Ongoing support and maintenance'
                    ]
                },
                commercial: {
                    title: 'Commercial Solar Solutions',
                    description: 'Empower your business with solar efficiency. From reducing operational costs to enhancing your corporate image, solar energy is a strategic investment.',
                    benefits: [
                        'Customized solutions to meet your energy goals',
                        'Comprehensive energy assessments',
                        'Proven ROI and cost savings',
                        'Professional project management'
                    ]
                },
                industrial: {
                    title: 'Industrial Solar Solutions',
                    description: 'Unlock the potential of solar energy for your industrial operations with our scalable and efficient solutions.',
                    benefits: [
                        'Scalable solutions for large-scale operations',
                        'Energy efficiency and cost reduction',
                        'Expertise in complex industrial installations',
                        'Proactive maintenance and support'
                    ]
                }
            };

            // const detail = details[type];
            // alert(`${detail.title}\n\n${detail.description}\n\nKey Benefits:\n• ${detail.benefits.join('\n• ')}\n\nContact us for a free consultation!`);
        }

        // Solar calculator function
        function calculateSolar(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const customerType = formData.get('customerType');
            const energyConsumption = parseInt(formData.get('energyConsumption'));
            const roofArea = parseInt(formData.get('roofArea'));
            
            // Basic calculation logic (simplified)
            const baseCostPerKwh = 6; // ₹6 per kWh in UP
            const solarRate = 3; // ₹3 per kWh for solar
            const systemEfficiency = 0.8;
            const sunlightHours = 5.5; // Average for UP
            
            // Calculate potential system size (kW)
            const systemSize = Math.min(
                (roofArea / 100), // 1kW per 100 sq ft
                (energyConsumption / (sunlightHours * 30 * systemEfficiency))
            );
            
            const monthlyGeneration = systemSize * sunlightHours * 30 * systemEfficiency;
            const monthlySavings = Math.min(monthlyGeneration, energyConsumption) * (baseCostPerKwh - solarRate);
            const yearlySavings = monthlySavings * 12;
            const co2Reduction = (monthlyGeneration * 12 * 0.7) / 1000; // 0.7 kg CO2 per kWh
            
            // ROI calculation (simplified)
            const systemCost = systemSize * (customerType === 'residential' ? 60000 : 
                                           customerType === 'commercial' ? 55000 : 50000);
            const roiPeriod = Math.round(systemCost / yearlySavings * 10) / 10;
            
            // Display results
            document.getElementById('monthlySavings').textContent = `₹${Math.round(monthlySavings).toLocaleString()}`;
            document.getElementById('yearlySavings').textContent = `₹${Math.round(yearlySavings).toLocaleString()}`;
            document.getElementById('co2Reduction').textContent = `${Math.round(co2Reduction * 10) / 10}`;
            document.getElementById('roiPeriod').textContent = `${roiPeriod}`;
            
            // Show results
            document.getElementById('calculatorResults').classList.add('show');
            
            // Scroll to results
            document.getElementById('calculatorResults').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }

        // Contact form submission
        function submitContactForm(event) {
            event.preventDefault();
            
            // Simulate form submission
            const submitButton = event.target.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                document.getElementById('contactSuccess').classList.add('show');
                event.target.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('contactSuccess').classList.remove('show');
                }, 5000);
            }, 2000);
        }

        // Chat function
        function openChat() {
            const message = "Hi! I'm interested in learning more about solar solutions from Moon Solar. Can you help me?";
            const whatsappUrl = `https://wa.me/918923678741?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // Smooth scrolling for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                if (targetId !== currentSection) {
                    showSection(targetId);
                }
            }
        });

        // Close mobile nav on outside click
        document.addEventListener('click', function(e) {
            const mobileNav = document.getElementById('mobile-Nav');
            const mobileMenuBtn = document.querySelector('.mobile-menu');
            
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        });

        // Add some interactive features
        document.addEventListener('mousemove', function(e) {
            const cards = document.querySelectorAll('.customer-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                }
            });
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    