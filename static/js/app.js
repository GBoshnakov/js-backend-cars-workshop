document.getElementById('cars-section').addEventListener('click', (event) => {
    if (event.target.className == 'btn-desc btn') {
        const btn = event.target;
        const description = event.target.parentElement.querySelector('.description');

        btn.textContent = btn.textContent == 'Show More' ? 'Hide' : 'Show More';
        description.style.display = description.style.display == 'block' ? 'none' : 'block';
    }
});