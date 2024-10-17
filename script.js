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
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default anchor behavior
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll to the target section smoothly
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

let currentProductIndex = 0; // Keep track of the current product index
const productsPerLoad = 4; // Number of products to load each time
function createProductCard(product) {
    return `
        <div class="item-container">
            <div class="image-box">
                <img src="${product.image}" alt="${product.name}" class="thumbnail">
                ${product.discount ? `<span class="discount-tag">-${product.discount}%</span>` : ''}
                ${product.isNew ? '<span class="badge-new">New</span>' : ''}
            </div>
            <div class="details-section">
                <h3 class="item-title">${product.name}</h3>
                <p class="item-description">${product.description}</p>
                <p class="item-cost">
                    Rp ${product.price.toLocaleString()}
                    ${product.originalPrice ? `<span class="previous-price">Rp ${product.originalPrice.toLocaleString()}</span>` : ''}
                </p>
                <button class="cart-btn">Add to Cart</button>
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


// Consolidated displayProducts function with updated class names
function displayProducts(products) {
    const productContainer = document.getElementById("product-list");
    if (!productContainer) {
        console.error("Product container not found!");
        return;
    }

    productContainer.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productWrapper = document.createElement("div");
        productWrapper.classList.add("item-wrapper");

        productWrapper.innerHTML = `
        <div class="product-cards-product">
            <img src="${product.image}" alt="${product.name}" class="item-image">
            <div class="item-details">
                <h3><a href="product-detail.html?id=${product.id}" class="item-title">${product.name}</a></h3>
                <p class="item-description">${product.description}</p>
                <p class="item-price">Price: Rp ${product.price.toLocaleString()}</p>
                ${product.discount ? `<p class="item-discount">Discount: ${product.discount}%</p>` : ''}
            
                </div>
            </div>
        `;

        productContainer.appendChild(productWrapper);
    });

    // Add click event to product titles for navigation
    document.querySelectorAll(".item-title").forEach(title => {
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
