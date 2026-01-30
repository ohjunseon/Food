
# Project Blueprint

## Overview

This project will display a menu of food items fetched from an external data source. It will be a single-page application that dynamically renders the food items using JavaScript.

## Design and Features (Current)

*   **Dynamic Food Menu:** The application will fetch food data from a JSON file hosted on GitHub and display it as a list of items.
*   **Card-based Layout:** Each food item will be displayed in a "card" containing an image, the name of the food, and its price.
*   **Modern Styling:** The application will use a clean, modern design with a responsive layout that works on different screen sizes.
*   **Interactive Elements:** Future iterations could include features like filtering the menu or a shopping cart.

## Current Task: Connect to GitHub Food Repository

The goal is to integrate resources from the `ohjunseon/Food` GitHub repository.

**Plan:**

1.  **HTML:** Add a container element to `index.html` that will hold the food menu.
2.  **JavaScript:**
    *   Use the `fetch` API in `main.js` to get the `food.json` data from the GitHub repository.
    *   Dynamically create HTML elements for each food item using the fetched data.
    *   The images for each item will be linked directly from the GitHub repository using a CDN service.
3.  **CSS:**
    *   Add styles to `style.css` to create a visually appealing card-based layout for the food menu.
    *   Ensure the layout is responsive.
