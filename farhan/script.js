function toggleMenu() {
    document.getElementById("hamburger-menu").classList.toggle("icon");
    document.getElementById("nav-hamburger").classList.toggle("change");
}


console.log(window.innerWidth);
console.log(window.innerHeight);

//service 
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.service-slider');
    const items = document.querySelectorAll('.service-item');
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const prevImg = document.createElement('img');
    const nextImg = document.createElement('img');

    let currentIndex = 0;

    prevButton.classList.add('prev');
    nextButton.classList.add('next');
    
    // Set the source of the images
    prevImg.src = 'Images/left-arrow.png'; // Replace with the path to your previous image
    nextImg.src = 'Images/right-arrow.png'; // Replace with the path to your next image

    // Clear existing content of the buttons (if any)
    prevButton.textContent = '';
    nextButton.textContent = '';

    // Append img elements to the buttons
    prevButton.appendChild(prevImg);
    nextButton.appendChild(nextImg);

    slider.appendChild(prevButton);
    slider.appendChild(nextButton);

    function updateSlider() {
        items.forEach((item, index) => {
            const position = (index - currentIndex) * 670;
            if (index === currentIndex) {
                item.classList.add('active');
                item.style.transform = `translateX(${position}px) scale(1.2)`;
            } else {
                item.classList.remove('active');
                item.style.transform = `translateX(${position}px) scale(1)`;
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    updateSlider();
});

// numbers starting from zero animation

document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.c-b-b-b-v h1');
    const duration = 1000; // 1 second in milliseconds
    const frameRate = 60; // 60 frames per second

    const startCounting = (counter) => {
        const targetNumber = parseInt(counter.innerText.replace(/\D/g, '')); // Extract only the number
        const originalText = counter.innerText.replace(/[0-9]/g, ''); // Extract non-digit characters (like % or +)
        const increment = targetNumber / (duration / (1000 / frameRate));
        let currentNumber = 0;

        const updateCounter = () => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counterInterval);
            }
            counter.innerText = Math.floor(currentNumber) + originalText;
        };

        const counterInterval = setInterval(updateCounter, 1000 / frameRate);
    };

    const options = {
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target.querySelector('h1'));
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.c-b-b-b-v').forEach(section => {
        observer.observe(section);
    });
});
