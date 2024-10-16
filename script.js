const products = [
    { id: 1, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, originalPrice: 3500000, discount: 30, image: "image 100.png" },
    { id: 2, name: "Leviosa", description: "Stylish cafe chair", price: 2500000, image: "image 101.png" },
    { id: 3, name: "Lolito", description: "Luxury big sofa", price: 7000000, originalPrice: 14000000, discount: 50, image: "image 106.png" },
    { id: 4, name: "Respira", description: "Outdoor bar table and stool", price: 500000, isNew: true, image: "image 101.png" },
    { id: 5, name: "Grifo", description: "Night lamp", price: 1500000, image: "image 100.png" },
    { id: 6, name: "Muggo", description: "Small mug", price: 150000, isNew: true, image: "image 106.png" },
    { id: 7, name: "Pingky", description: "Cute bed set", price: 7000000, originalPrice: 14000000, discount: 50, image: "image 101.png" },
    { id: 8, name: "Potty", description: "Minimalist flower pot", price: 500000, isNew: true, image: "image 106.png" },
    { id: 9, name: "Doodle", description: "Artistic sketchbook", price: 300000, image: "image 100.png" },
    { id: 10, name: "Bubble", description: "High-quality bubble wrap", price: 200000, image: "image 101.png" }
];

let currentProductIndex = 0; // Keep track of the current product index
const productsPerLoad = 4; // Number of products to load each time

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                ${product.isNew ? '<span class="new-badge">New</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">
                    Rp ${product.price.toLocaleString()}
                    ${product.originalPrice ? `<span class="original-price">Rp ${product.originalPrice.toLocaleString()}</span>` : ''}
                </p>
                <button class="add-to-cart">Add to cart</button>
            </div>
        </div>
    `;
}

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) {
        console.error("Product grid not found!");
        return;
    }

    const endIndex = currentProductIndex + productsPerLoad; // Calculate the end index
    const productHTML = products.slice(currentProductIndex, endIndex).map(createProductCard).join('');
    productGrid.insertAdjacentHTML('beforeend', productHTML);
    currentProductIndex = endIndex; // Update the current product index
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(); // Load the first set of products

    const showMoreButton = document.getElementById('showMore');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', () => {
            if (currentProductIndex < products.length) {
                renderProducts(); // Load the next set of products
            }

            // Hide the button if all products are displayed
            if (currentProductIndex >= products.length) {
                showMoreButton.classList.add('hidden');
            }
        });
    }

    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                alert('Product added to cart!');
            }
        });
    }

    // Initial display of all products
    displayProducts(products);
});

// Consolidated displayProducts function
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("Product list not found!");
        return;
    }

    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3><a href="product-detail.html?id=${product.id}" class="product-title">${product.name}</a></h3>
                <p>${product.description}</p>
                <p class="product-price">Price: Rp ${product.price.toLocaleString()}</p>
                ${product.discount ? `<p class="product-discount">Discount: ${product.discount}%</p>` : ''}
            </div>
        `;

        productList.appendChild(productCard);
    });

    // Add click event to product titles for navigation
    document.querySelectorAll(".product-title").forEach(title => {
        title.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

// Search products based on input
function searchProducts() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
    });

    displayProducts(filteredProducts);
}

