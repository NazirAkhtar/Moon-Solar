function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
            }
        }

        // Add smooth scrolling for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });