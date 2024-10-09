// Creating a star
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    return star;
}

// Generate stars
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    starsContainer.innerHTML = ''; // Clear existing stars
    const numberOfStars = 100; // Adjust as needed

    for (let i = 0; i < numberOfStars; i++) {
        starsContainer.appendChild(createStar());
    }
}

// Click event handler
function handleNewStarsClick() {
    generateStars();
}

// Listener
document.addEventListener('DOMContentLoaded', () => {
    generateStars();

    const newStarsButton = document.querySelector('.regen-stars');
    if (newStarsButton) {
        newStarsButton.addEventListener('click', handleNewStarsClick);
    }
});