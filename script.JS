const products = [
    {
        id: 1,
        title: "Apple iPhone 15 Pro (Natural Titanium)",
        category: "electronics",
        price: "₹1,34,900",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Sony WH-1000XM5 Noise Cancelling Headphones",
        category: "electronics",
        price: "₹29,990",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Nike Air Force 1 '07 Premium Men's Shoes",
        category: "fashion",
        price: "₹8,495",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Apple MacBook Air M2 (16GB RAM, 512GB)",
        category: "electronics",
        price: "₹1,14,900",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Casio Vintage Series Digital Watch",
        category: "fashion",
        price: "₹3,995",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray)",
        category: "electronics",
        price: "₹1,29,999",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 7,
        title: "Minimalist Ceramic Vase",
        category: "home",
        price: "₹1,499",
        image: "https://images.unsplash.com/photo-1612152605347-f93296cb657d?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 8,
        title: "Adjustable 24kg Dumbbell Set",
        category: "fitness",
        price: "₹12,499",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 9,
        title: "Levi's Men's 511 Slim Fit Jeans",
        category: "fashion",
        price: "₹2,899",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 10,
        title: "Premium Anti-Slip Yoga Mat",
        category: "fitness",
        price: "₹1,250",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 11,
        title: "Modern Ambient Table Lamp",
        category: "home",
        price: "₹2,450",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 12,
        title: "Dyson V12 Detect Slim Vacuum",
        category: "home",
        price: "₹49,900",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop",
    }
];

const grid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

let currentFilter = 'all';
let searchQuery = '';

function renderProducts() {
    grid.innerHTML = '';
    
    const filteredByCategory = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
        
    const filteredProducts = filteredByCategory.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: #94a3b8;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <h3>No products found for "${searchQuery}"</h3>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">Try adjusting your search criteria</p>
        </div>`;
        return;
    }

    filteredProducts.forEach((product, index) => {
        const card = document.createElement('a');
        card.href = product.flipkartUrl;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = 'product-card';
        
        const animationDelay = index * 0.1;
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price-row">
                    <span class="product-price">${product.price}</span>
                    <div class="view-btn">
                        Buy Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                </div>
            </div>
        `;
        
        card.style.animation = `fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
        card.style.animationDelay = `${animationDelay}s`;
        card.style.opacity = '0';
        
        grid.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProducts();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderProducts();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});