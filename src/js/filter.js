document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase 'active' de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir 'active' al botón clickeado
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            // Filtrar productos
            productCards.forEach(card => {
                const categories = card.dataset.category.split(' '); // Dividir categorías por espacios
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
});