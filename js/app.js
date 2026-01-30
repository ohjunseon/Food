document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const recipeGrid = document.getElementById('recipe-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const allRecipes = [...koreanRecipes, ...japaneseRecipes, ...italianRecipes, ...mexicanRecipes];

    // State
    let currentFilter = 'all';

    // --- Init ---
    renderRecipes(allRecipes);

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
                ? allRecipes
                : allRecipes.filter(r => r.category === currentFilter);

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
        const matchingRecipes = allRecipes.filter(r => r.mood.includes(mood));

        // Fallback if no specific match
        const candidates = matchingRecipes.length > 0 ? matchingRecipes : allRecipes;

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

    // Recipe page navigation
    window.openRecipe = (id) => {
        window.location.href = `recipe.html?id=${id}`;
    };

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
