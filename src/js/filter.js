document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    let activeFilters = new Set();

    // Inicializar con el filtro 'all' activo
    const allFilter = document.querySelector('[data-filter="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
        activeFilters.add('all');
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;

            // Si es el botón "all", manejar de forma especial
            if (filterValue === 'all') {
                // Limpiar todos los filtros y activar solo 'all'
                activeFilters.clear();
                activeFilters.add('all');
                
                // Actualizar clases de botones
                filterButtons.forEach(btn => {
                    if (btn.dataset.filter === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            } else {
                // Si 'all' está activo, quitarlo
                if (activeFilters.has('all')) {
                    activeFilters.delete('all');
                    if (allFilter) allFilter.classList.remove('active');
                }

                // Alternar el filtro actual
                if (activeFilters.has(filterValue)) {
                    activeFilters.delete(filterValue);
                    button.classList.remove('active');
                    
                    // Si no quedan filtros activos, activar 'all'
                    if (activeFilters.size === 0) {
                        activeFilters.add('all');
                        if (allFilter) allFilter.classList.add('active');
                    }
                } else {
                    activeFilters.add(filterValue);
                    button.classList.add('active');
                }
            }

            // Filtrar productos
            filterProducts();
        });
    });

    function filterProducts() {
        productCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            
            // Si 'all' está activo, mostrar todos los productos
            if (activeFilters.has('all')) {
                card.classList.remove('hide');
                return;
            }
            
            // Comprobar si el producto tiene TODAS las categorías activas
            const hasAllCategories = Array.from(activeFilters).every(filter => 
                categories.includes(filter)
            );
            
            if (hasAllCategories) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
        
        // Mostrar mensaje si no hay productos que coincidan
        const visibleProducts = document.querySelectorAll('.product-card:not(.hide)');
        let noProductsMessage = document.querySelector('.no-products');
        
        if (visibleProducts.length === 0) {
            if (!noProductsMessage) {
                noProductsMessage = document.createElement('div');
                noProductsMessage.className = 'no-products';
                noProductsMessage.textContent = 'No hay productos que coincidan con todos los filtros seleccionados.';
                document.querySelector('.products-grid').appendChild(noProductsMessage);
            }
        } else if (noProductsMessage) {
            noProductsMessage.remove();
        }
    }
});