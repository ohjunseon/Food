document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const recipeGrid = document.getElementById('recipe-grid');
    const modalOverlay = document.getElementById('recipe-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // State
    let currentFilter = 'all';

    // --- Init ---
    renderRecipes(recipes);

    // --- Event Listeners ---

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
    });

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            // Filter
            currentFilter = btn.dataset.filter;
            const filtered = currentFilter === 'all'
                ? recipes
                : recipes.filter(r => r.category === currentFilter);

            renderRecipes(filtered);
        });
    });

    // Recommendation Engine
    const moodBtns = document.querySelectorAll('.option-card');
    const resultView = document.getElementById('result-view');
    const recommendedDishContainer = document.getElementById('recommended-dish');
    const step1 = document.getElementById('step-1');
    const restartBtn = document.getElementById('restart-btn');

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.value;
            recommendFood(mood);
        });
    });

    restartBtn.addEventListener('click', () => {
        resultView.classList.add('hidden');
        step1.classList.remove('hidden');
    });

    function recommendFood(mood) {
        // Filter recipes by mood tag
        const matchingRecipes = recipes.filter(r => r.mood.includes(mood));

        // Fallback if no specific match
        const candidates = matchingRecipes.length > 0 ? matchingRecipes : recipes;

        // Random pick
        const randomRecipe = candidates[Math.floor(Math.random() * candidates.length)];

        // Render Result
        renderRecommendation(randomRecipe);

        // Transition
        step1.classList.add('hidden');
        resultView.classList.remove('hidden');
    }

    function renderRecommendation(recipe) {
        recommendedDishContainer.innerHTML = `
            <div class="card-image-large">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="card-content">
                <h4>${recipe.title}</h4>
                <p>${recipe.description}</p>
                <div class="meta">
                    <span><i data-lucide="clock"></i> ${recipe.time}</span>
                    <span><i data-lucide="flame"></i> ${recipe.calories}</span>
                </div>
                <button class="btn btn-primary" onclick="openRecipe(${recipe.id})">레시피 보기</button>
            </div>
        `;
        lucide.createIcons(); // Re-init icons for new content
    }

    // Modal Logic
    window.openRecipe = (id) => {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${recipe.title}</h2>
                <div class="modal-tags">
                    <span class="tag">${recipe.category === 'breakfast' ? '아침' : recipe.category === 'lunch' ? '점심' : recipe.category === 'dinner' ? '저녁' : recipe.category}</span>
                    <span class="tag">${recipe.time}</span>
                </div>
            </div>
            <img src="${recipe.image}" alt="${recipe.title}" class="modal-img">
            
            <div class="modal-details">
                <div class="section">
                    <h3>재료</h3>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="section">
                    <h3>조리법</h3>
                    <ol>
                        ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;

        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    };

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // --- Rendering Helpers ---
    function renderRecipes(list) {
        recipeGrid.innerHTML = list.map(recipe => `
            <div class="recipe-card" onclick="openRecipe(${recipe.id})">
                <div class="card-img">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <span class="category-badge">${recipe.category === 'breakfast' ? '아침' : recipe.category === 'lunch' ? '점심' : recipe.category === 'dinner' ? '저녁' : recipe.category}</span>
                </div>
                <div class="card-info">
                    <h3>${recipe.title}</h3>
                    <p class="desc">${recipe.description}</p>
                    <div class="card-meta">
                        <span>${recipe.time}</span>
                        <span>${recipe.calories}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
});
