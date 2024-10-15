const products = [
    { name: "Syltherine", description: "Stylish cafe chair", price: 2500000, originalPrice: 3500000, discount: 30, image: "image 100.png" },
    { name: "Leviosa", description: "Stylish cafe chair", price: 2500000, image: "image 101.png" },
    { name: "Lolito", description: "Luxury big sofa", price: 7000000, originalPrice: 14000000, discount: 50, image: "image 106.png" },
    { name: "Respira", description: "Outdoor bar table and stool", price: 500000, isNew: true, image: "image 101.png" },
    { name: "Grifo", description: "Night lamp", price: 1500000, image: "image 100.png" },
    { name: "Muggo", description: "Small mug", price: 150000, isNew: true, image: "image 106.png" },
    { name: "Pingky", description: "Cute bed set", price: 7000000, originalPrice: 14000000, discount: 50, image: "image 101.png" },
    { name: "Potty", description: "Minimalist flower pot", price: 500000, isNew: true, image: "image 106.png" },
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
    const endIndex = currentProductIndex + productsPerLoad; // Calculate the end index
    const productHTML = products.slice(currentProductIndex, endIndex).map(createProductCard).join('');
    productGrid.insertAdjacentHTML('beforeend', productHTML);
    currentProductIndex = endIndex; // Update the current product index
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(); // Load the first set of products

    const showMoreButton = document.getElementById('showMore');
    showMoreButton.addEventListener('click', () => {
        if (currentProductIndex < products.length) {
            renderProducts(); // Load the next set of products
        }

        // Hide the button if all products are displayed
        if (currentProductIndex >= products.length) {
            showMoreButton.classList.add('hidden');
        }
    });

    document.getElementById('productGrid').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            alert('Product added to cart!');
        }
    });
});
// Smooth scrolling function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,  // Adjust this offset as needed
                behavior: 'smooth'
            });
        }
    });
});