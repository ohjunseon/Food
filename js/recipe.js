document.addEventListener('DOMContentLoaded', () => {
    const recipeDetailsContainer = document.getElementById('recipe-details');
    const allRecipes = [...koreanRecipes, ...japaneseRecipes, ...italianRecipes, ...mexicanRecipes];

    // Get recipe ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'));

    // Find the recipe
    const recipe = allRecipes.find(r => r.id === recipeId);

    if (recipe) {
        // Set the page title
        document.title = `${recipe.title} - GourmetFlow`;

        // Render the recipe details
        recipeDetailsContainer.innerHTML = `
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
                ${recipe.tips && recipe.tips.length > 0 ? `
                <div class="section tips-section">
                    <h3><i data-lucide="lightbulb" style="display:inline; width:20px; vertical-align:middle; color:#ffb700;"></i> 셰프의 팁</h3>
                    <ul class="tips-list">
                        ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
             <div style="text-align: center; margin-top: 40px;">
                <a href="index.html#recipes" class="btn btn-outline">모든 레시피 보기</a>
            </div>
        `;

        // Initialize any new icons
        lucide.createIcons();
    } else {
        // Handle case where recipe is not found
        recipeDetailsContainer.innerHTML = `
            <div style="text-align: center;">
                <h2>레시피를 찾을 수 없습니다.</h2>
                <p>요청한 레시피를 찾을 수 없습니다. 홈페이지로 돌아가 다른 레시피를 찾아보세요.</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 20px;">홈으로 돌아가기</a>
            </div>
        `;
    }
});