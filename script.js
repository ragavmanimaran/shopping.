/**
 * ============================================================
 * SHOPSPHERE AI — script.js
 * Complete E-Commerce JavaScript Logic
 * ============================================================
 *
 * Sections:
 *  1. Product Data
 *  2. State Management (localStorage)
 *  3. Utility Functions
 *  4. Toast Notifications
 *  5. Navigation & Routing
 *  6. Dark Mode
 *  7. Product Rendering
 *  8. Search & Filter
 *  9. Cart Management
 * 10. Billing & Discount Calculation
 * 11. Coupon System
 * 12. Wishlist Management
 * 13. Checkout & Order Placement
 * 14. Quick View Modal
 * 15. Budget Mode
 * 16. Recently Viewed
 * 17. Category Cards
 * 18. Event Listeners & Init
 */

'use strict';

/* ============================================================
   1. PRODUCT DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'electronics',
    categoryLabel: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    price: 29999,
    originalPrice: 39999,
    rating: 4.8,
    reviewCount: 2843,
    stock: 15,
    isNew: false,
    isHot: true,
    description: 'Industry-leading noise cancellation with up to 30-hour battery life. Crystal-clear call quality and multipoint connection to connect to two devices simultaneously.',
  },
  {
    id: 2,
    name: 'Apple Watch Series 9 (GPS, 41mm)',
    category: 'electronics',
    categoryLabel: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    price: 41999,
    originalPrice: 49900,
    rating: 4.9,
    reviewCount: 5621,
    stock: 8,
    isNew: false,
    isHot: true,
    description: 'The most advanced Apple Watch yet. Track your health metrics, stay connected, and more with a stunning always-on display.',
  },
  {
    id: 3,
    name: 'Samsung 65" 4K QLED Smart TV',
    category: 'electronics',
    categoryLabel: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    price: 74999,
    originalPrice: 99999,
    rating: 4.7,
    reviewCount: 1247,
    stock: 5,
    isNew: false,
    isHot: false,
    description: 'Quantum Dot technology delivers brilliant color and contrast. Enjoy your favorite content in stunning 4K resolution with built-in streaming apps.',
  },
  {
    id: 4,
    name: "Men's Premium Slim Fit Blazer",
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    price: 3499,
    originalPrice: 6999,
    rating: 4.5,
    reviewCount: 892,
    stock: 30,
    isNew: false,
    isHot: false,
    description: 'Tailored for the modern professional. Premium wool-blend fabric with a sleek slim-fit design that keeps you sharp all day.',
  },
  {
    id: 5,
    name: "Women's Floral Wrap Midi Dress",
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    price: 1899,
    originalPrice: 3299,
    rating: 4.6,
    reviewCount: 1543,
    stock: 20,
    isNew: true,
    isHot: false,
    description: 'Effortlessly elegant floral wrap dress perfect for any occasion. Made with lightweight, breathable fabric for all-day comfort.',
  },
  {
    id: 6,
    name: 'Ray-Ban Aviator Classic Sunglasses',
    category: 'accessories',
    categoryLabel: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    price: 8499,
    originalPrice: 12000,
    rating: 4.7,
    reviewCount: 3201,
    stock: 25,
    isNew: false,
    isHot: false,
    description: 'Iconic aviator design with superior UV protection. Timeless style meets premium quality – a must-have accessory.',
  },
  {
    id: 7,
    name: 'Fossil Gen 6 Smart Watch',
    category: 'accessories',
    categoryLabel: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    price: 18999,
    originalPrice: 24999,
    rating: 4.4,
    reviewCount: 768,
    stock: 12,
    isNew: false,
    isHot: false,
    description: "Wear OS by Google brings you the apps you love. Track fitness, receive notifications, and control your smart home devices from your wrist.",
  },
  {
    id: 8,
    name: 'Ergonomic Office Chair Pro',
    category: 'home',
    categoryLabel: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    price: 12999,
    originalPrice: 19999,
    rating: 4.8,
    reviewCount: 2156,
    stock: 7,
    isNew: false,
    isHot: false,
    description: 'Lumbar support, adjustable armrests, and breathable mesh back. Designed for long work sessions to keep you comfortable and focused.',
  },
  {
    id: 9,
    name: 'Minimalist Ceramic Table Lamp',
    category: 'home',
    categoryLabel: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    price: 2299,
    originalPrice: 3500,
    rating: 4.5,
    reviewCount: 421,
    stock: 18,
    isNew: true,
    isHot: false,
    description: 'Add a warm, modern touch to any room with this elegant ceramic lamp. Features adjustable color temperature and touch dimmer.',
  },
  {
    id: 10,
    name: 'Nike Air Max 270 Running Shoes',
    category: 'sports',
    categoryLabel: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    price: 11499,
    originalPrice: 14995,
    rating: 4.8,
    reviewCount: 4892,
    stock: 22,
    isNew: false,
    isHot: true,
    description: 'Engineered for all-day comfort with Max Air 270 cushioning. Perfect for running, training, or casual wear.',
  },
  {
    id: 11,
    name: 'Yoga Mat Premium Non-Slip 6mm',
    category: 'sports',
    categoryLabel: 'Sports',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    price: 1299,
    originalPrice: 2199,
    rating: 4.6,
    reviewCount: 1876,
    stock: 50,
    isNew: false,
    isHot: false,
    description: 'Extra-thick 6mm mat with superior non-slip surface. Eco-friendly TPE material, sweat-resistant and easy to clean.',
  },
  {
    id: 12,
    name: 'Bosch Cordless Drill Set 18V',
    category: 'home',
    categoryLabel: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
    price: 6999,
    originalPrice: 9999,
    rating: 4.7,
    reviewCount: 934,
    stock: 14,
    isNew: false,
    isHot: false,
    description: 'Professional-grade 18V cordless drill with 25+1 torque settings, LED work light, and long-lasting lithium battery.',
  },
  {
    id: 13,
    name: "Levi's 511 Slim Fit Jeans",
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    price: 2999,
    originalPrice: 4499,
    rating: 4.5,
    reviewCount: 3456,
    stock: 40,
    isNew: false,
    isHot: false,
    description: 'Classic slim-fit jeans with a modern cut. Premium denim construction that moves with you from morning to night.',
  },
  {
    id: 14,
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    category: 'electronics',
    categoryLabel: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    price: 8999,
    originalPrice: 11999,
    rating: 4.6,
    reviewCount: 2213,
    stock: 16,
    isNew: false,
    isHot: false,
    description: 'Bold, immersive JBL Original Pro Sound with IP67 waterproof rating. 12 hours of playtime for any adventure.',
  },
  {
    id: 15,
    name: 'Leather Crossbody Bag for Women',
    category: 'accessories',
    categoryLabel: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    price: 3799,
    originalPrice: 6500,
    rating: 4.6,
    reviewCount: 1124,
    stock: 11,
    isNew: true,
    isHot: false,
    description: 'Genuine leather crossbody bag with adjustable strap, multiple compartments, and a premium zipper closure for everyday elegance.',
  },
  {
    id: 16,
    name: 'Adjustable Dumbbell Set 20kg',
    category: 'sports',
    categoryLabel: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    price: 4599,
    originalPrice: 7999,
    rating: 4.7,
    reviewCount: 743,
    stock: 9,
    isNew: false,
    isHot: false,
    description: 'Space-saving adjustable dumbbell set from 2.5kg to 20kg. Quick-change weight system with ergonomic grip for home workouts.',
  },
];

/* ============================================================
   2. STATE MANAGEMENT (localStorage)
   ============================================================ */

/**
 * Loads cart data from localStorage.
 * Returns an empty array if no data is found.
 */
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('shopsphere_cart')) || [];
  } catch { return []; }
}

/** Saves the current cart array to localStorage. */
function saveCart() {
  localStorage.setItem('shopsphere_cart', JSON.stringify(state.cart));
}

/** Loads wishlist data from localStorage. */
function loadWishlist() {
  try {
    return JSON.parse(localStorage.getItem('shopsphere_wishlist')) || [];
  } catch { return []; }
}

/** Saves wishlist to localStorage. */
function saveWishlist() {
  localStorage.setItem('shopsphere_wishlist', JSON.stringify(state.wishlist));
}

/** Loads recently viewed product IDs from localStorage. */
function loadRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem('shopsphere_recent')) || [];
  } catch { return []; }
}

/** Saves recently viewed IDs to localStorage. */
function saveRecentlyViewed() {
  localStorage.setItem('shopsphere_recent', JSON.stringify(state.recentlyViewed));
}

/** Loads theme preference from localStorage. */
function loadTheme() {
  return localStorage.getItem('shopsphere_theme') || 'light';
}

/** Saves theme preference to localStorage. */
function saveTheme(theme) {
  localStorage.setItem('shopsphere_theme', theme);
}

// ─── Central Application State ───────────────────────────────
const state = {
  cart: loadCart(),               // Array of { id, qty }
  wishlist: loadWishlist(),       // Array of product IDs
  recentlyViewed: loadRecentlyViewed(), // Array of product IDs (max 6)
  theme: loadTheme(),
  activeCategory: 'all',
  sortOrder: 'default',
  maxPrice: 50000,
  minRating: 0,
  searchQuery: '',
  appliedCoupon: null,            // { code, discount } or null
  budget: null,                   // number or null
  activePage: 'home',
};

/* ============================================================
   3. UTILITY FUNCTIONS
   ============================================================ */

/** Formats a number as Indian Rupee currency string. */
function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/** Returns the discount percentage for a product. */
function getDiscount(product) {
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

/** Generates star rating HTML string. */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  const empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) stars += '☆';
  return stars;
}

/** Generates a random order number. */
function generateOrderNumber() {
  return 'SS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

/** Computes estimated delivery date (3–7 business days from today). */
function estimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * 4) + 3);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Gets a product by its id. Returns undefined if not found. */
function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* ============================================================
   4. TOAST NOTIFICATIONS
   ============================================================ */
const TOAST_ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

/**
 * Shows a toast notification.
 * @param {string} title  - Bold heading
 * @param {string} msg    - Subtitle message
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {number} duration - Auto-dismiss in ms (default 3500)
 */
function showToast(title, msg = '', type = 'success', duration = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-icon">${TOAST_ICONS[type] || '🔔'}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
    </div>
    <span class="toast-close" title="Dismiss" aria-label="Dismiss notification">✕</span>
  `;

  // Dismiss on close button
  toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));

  container.appendChild(toast);

  // Auto dismiss
  const timer = setTimeout(() => dismissToast(toast), duration);
  toast._timer = timer;
}

function dismissToast(toast) {
  clearTimeout(toast._timer);
  toast.classList.add('removing');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

/* ============================================================
   5. NAVIGATION & ROUTING
   ============================================================ */

/**
 * Navigates to a named page section.
 * Manages page visibility and active nav links.
 * @param {string} page - 'home' | 'products' | 'cart' | 'wishlist' | 'checkout' | 'confirmation'
 */
function navigate(page) {
  // Map page names to section IDs
  const pageMap = {
    home: 'home',
    products: 'products-page',
    cart: 'cart-page',
    wishlist: 'wishlist-page',
    checkout: 'checkout-page',
    confirmation: 'order-confirmation-page',
  };

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const targetId = pageMap[page];
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');
  }

  state.activePage = page;

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const navLinkMap = { home: 'nav-home', products: 'nav-products', };
  const activeNavId = navLinkMap[page];
  if (activeNavId) {
    const activeLink = document.getElementById(activeNavId);
    if (activeLink) activeLink.classList.add('active');
  }

  // Close mobile menu
  closeMobileMenu();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Render page content if needed
  if (page === 'products') renderAllProducts();
  if (page === 'cart') renderCart();
  if (page === 'wishlist') renderWishlist();
  if (page === 'checkout') renderCheckoutSummary();
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.remove('open');
  hamburger.classList.remove('open');
}

/* ============================================================
   6. DARK MODE
   ============================================================ */

/** Applies the given theme to the document root. */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  saveTheme(theme);
}

function toggleTheme() {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

/* ============================================================
   7. PRODUCT RENDERING
   ============================================================ */

/**
 * Builds HTML for a single product card.
 * @param {Object} product - Product data object
 * @param {Object} options - { showBudget, showWishlist }
 */
function buildProductCard(product, options = {}) {
  const discount = getDiscount(product);
  const isBestDeal = discount >= 40;
  const inCart = state.cart.some(c => c.id === product.id);
  const isWishlisted = state.wishlist.includes(product.id);
  const isAffordable = state.budget && product.price <= state.budget;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  let badges = '';
  if (isOutOfStock) badges += `<span class="product-badge badge-out">Out of Stock</span>`;
  else if (isBestDeal) badges += `<span class="product-badge badge-best-deal">🏆 Best Deal</span>`;
  if (discount > 0) badges += `<span class="product-badge badge-discount">${discount}% OFF</span>`;
  if (product.isNew) badges += `<span class="product-badge badge-new">New</span>`;
  if (product.isHot && !isOutOfStock) badges += `<span class="product-badge badge-hot">🔥 Hot</span>`;
  if (isAffordable && state.budget) badges += `<span class="product-badge badge-affordable">✓ In Budget</span>`;

  const stockText = isOutOfStock
    ? `<span class="out">Out of Stock</span>`
    : isLowStock
    ? `<span class="low">Only ${product.stock} left!</span>`
    : `In Stock`;

  return `
    <article class="product-card${isAffordable && state.budget ? ' affordable' : ''}" data-product-id="${product.id}" aria-label="${product.name}">
      <div class="product-img-wrapper">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-img"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80'"
        />
        <div class="product-badges">${badges}</div>
        <button
          class="product-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}"
          data-id="${product.id}"
          aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          title="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="product-quick-view" data-id="${product.id}" aria-label="Quick view ${product.name}">
          👁 Quick View
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoryLabel}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviewCount.toLocaleString('en-IN')})</span>
        </div>
        <div class="product-pricing">
          <span class="price-current">${formatINR(product.price)}</span>
          ${product.originalPrice > product.price
            ? `<span class="price-original">${formatINR(product.originalPrice)}</span>
               <span class="price-save">Save ${formatINR(product.originalPrice - product.price)}</span>`
            : ''}
        </div>
        <p class="product-stock">${stockText}</p>
        <div class="product-card-actions">
          <button
            class="add-to-cart-btn"
            data-id="${product.id}"
            ${isOutOfStock ? 'disabled aria-disabled="true"' : ''}
            aria-label="Add ${product.name} to cart"
          >
            ${inCart ? '✓ Added' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  `;
}

/** Renders a list of product cards into the given container element. */
function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (products.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = products.map(p => buildProductCard(p)).join('');
}

/* ============================================================
   HOME PAGE SECTIONS
   ============================================================ */

/** Renders featured products (top 4 by rating). */
function renderFeaturedProducts() {
  const featured = [...PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  renderProductGrid(featured, 'featured-products-grid');
}

/** Renders trending / hot products (those with isHot or high discount). */
function renderTrendingProducts() {
  const trending = [...PRODUCTS]
    .filter(p => p.isHot || getDiscount(p) >= 25)
    .sort((a, b) => getDiscount(b) - getDiscount(a))
    .slice(0, 4);
  renderProductGrid(trending, 'trending-products-grid');
}

/* ============================================================
   8. SEARCH & FILTER (ALL PRODUCTS PAGE)
   ============================================================ */

/** Applies active filters/sort and re-renders the all-products grid. */
function renderAllProducts() {
  let filtered = [...PRODUCTS];

  // Apply search query
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Apply category filter
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  // Apply max price filter
  filtered = filtered.filter(p => p.price <= state.maxPrice);

  // Apply min rating filter
  if (state.minRating > 0) {
    filtered = filtered.filter(p => p.rating >= state.minRating);
  }

  // Apply sort order
  switch (state.sortOrder) {
    case 'price-low':  filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'popularity': filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    case 'discount':   filtered.sort((a, b) => getDiscount(b) - getDiscount(a)); break;
    default: break;
  }

  const grid = document.getElementById('all-products-grid');
  const noResults = document.getElementById('no-results');
  const countLabel = document.getElementById('products-count-label');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    countLabel.textContent = 'No products found';
  } else {
    noResults.style.display = 'none';
    grid.innerHTML = filtered.map(p => buildProductCard(p)).join('');
    countLabel.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
  }
}

/** Updates category chip active state and triggers re-render. */
function setCategory(cat) {
  state.activeCategory = cat;

  document.querySelectorAll('.chip').forEach(chip => {
    const isActive = chip.dataset.cat === cat;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-pressed', isActive);
  });

  renderAllProducts();
}

/** Renders search suggestions dropdown below navbar search. */
function renderSearchSuggestions(query) {
  const box = document.getElementById('search-suggestions');
  if (!query || query.length < 2) {
    box.classList.remove('open');
    return;
  }
  const q = query.toLowerCase();
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5);
  if (matches.length === 0) {
    box.classList.remove('open');
    return;
  }
  box.innerHTML = matches.map(p => `
    <div class="suggestion-item" data-id="${p.id}" role="option" tabindex="0" aria-label="${p.name} - ${formatINR(p.price)}">
      <img src="${p.image}" alt="${p.name}" class="suggestion-img" loading="lazy" />
      <div>
        <div style="font-weight:600;font-size:0.85rem">${p.name}</div>
        <div style="color:var(--primary);font-weight:700;font-size:0.8rem">${formatINR(p.price)}</div>
      </div>
    </div>
  `).join('');
  box.classList.add('open');
}

/* ============================================================
   9. CART MANAGEMENT
   ============================================================ */

/**
 * Adds a product to the cart by its id.
 * Respects stock limits. Updates badge and triggers re-render.
 */
function addToCart(productId) {
  const product = getProduct(productId);
  if (!product || product.stock === 0) {
    showToast('Out of Stock', 'This item is currently unavailable.', 'error');
    return;
  }

  const existing = state.cart.find(c => c.id === productId);

  if (existing) {
    if (existing.qty >= product.stock) {
      showToast('Stock Limit Reached', `Only ${product.stock} units available.`, 'warning');
      return;
    }
    existing.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  refreshAllProductCards();
  showToast('Added to Cart! 🎉', product.name, 'success');
}

/** Updates cart item quantity. Enforces min=1 and stock limits. */
function updateQty(productId, delta) {
  const item = state.cart.find(c => c.id === productId);
  if (!item) return;

  const product = getProduct(productId);
  const newQty = item.qty + delta;

  if (newQty < 1) return; // Minimum 1
  if (newQty > product.stock) {
    showToast('Stock Limit', `Only ${product.stock} units in stock.`, 'warning');
    return;
  }

  item.qty = newQty;
  saveCart();
  renderCart();
  updateCartTotals();
}

/** Removes a product from the cart after optional confirmation. */
function removeFromCart(productId) {
  const product = getProduct(productId);
  state.cart = state.cart.filter(c => c.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
  refreshAllProductCards();
  showToast('Removed', product ? product.name + ' removed from cart.' : 'Item removed.', 'info');
}

/** Clears all cart items. */
function clearCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadge();
  renderCart();
  refreshAllProductCards();
  showToast('Cart Cleared', 'All items have been removed.', 'info');
}

/** Updates the cart badge number. */
function updateCartBadge() {
  const total = state.cart.reduce((sum, c) => sum + c.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = total;
    badge.classList.add('bump');
    badge.addEventListener('animationend', () => badge.classList.remove('bump'), { once: true });
  }
}

/** Updates the wishlist badge number. */
function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-count');
  if (badge) badge.textContent = state.wishlist.length;
}

/**
 * Renders the full cart page.
 * Shows cart items list or empty cart state.
 */
function renderCart() {
  const cartLayout = document.getElementById('cart-layout');
  const emptyCart = document.getElementById('empty-cart');
  const itemsList = document.getElementById('cart-items-list');
  const countEl = document.getElementById('cart-items-count');

  if (!cartLayout) return;

  const totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0);
  if (countEl) countEl.textContent = `(${totalQty})`;

  if (state.cart.length === 0) {
    cartLayout.style.display = 'none';
    emptyCart.style.display = 'block';
    return;
  }

  cartLayout.style.display = 'grid';
  emptyCart.style.display = 'none';

  // Build cart items HTML
  itemsList.innerHTML = state.cart.map(item => {
    const product = getProduct(item.id);
    if (!product) return '';
    const subtotal = product.price * item.qty;
    return `
      <div class="cart-item" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80'" />
        <div class="cart-item-details">
          <div class="cart-item-category">${product.categoryLabel}</div>
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">
            <strong>${formatINR(product.price)}</strong>
            ${product.originalPrice > product.price ? `<span style="margin-left:0.5rem;text-decoration:line-through;font-size:0.78rem;color:var(--text-muted)">${formatINR(product.originalPrice)}</span>` : ''}
          </div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" data-action="decrease" data-id="${product.id}" aria-label="Decrease quantity" ${item.qty <= 1 ? 'disabled' : ''}>−</button>
            <span class="qty-value" aria-label="Quantity: ${item.qty}">${item.qty}</span>
            <button class="qty-btn" data-action="increase" data-id="${product.id}" aria-label="Increase quantity" ${item.qty >= product.stock ? 'disabled' : ''}>+</button>
          </div>
          <span class="cart-item-subtotal">${formatINR(subtotal)}</span>
          <button class="cart-item-remove" data-id="${product.id}" aria-label="Remove ${product.name} from cart" title="Remove item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  updateCartTotals();
}

/** Re-renders product grids on the home page to update "Added" button states. */
function refreshAllProductCards() {
  renderFeaturedProducts();
  renderTrendingProducts();
  renderRecentlyViewed();
  if (state.activePage === 'products') renderAllProducts();
  if (state.activePage === 'wishlist') renderWishlist();
}

/* ============================================================
   10. BILLING & DISCOUNT CALCULATION
   ============================================================ */

/**
 * Calculates the full price breakdown.
 * Returns an object with all amounts.
 *
 * Rules:
 *  - Product-level discounts are ALREADY reflected in product.price vs product.originalPrice
 *  - Order discount: 10% if subtotal > ₹2000, 15% if subtotal > ₹5000
 *  - Coupon discount: applied after order discount
 *  - GST: 5% on (subtotal - order discount - coupon discount)
 *  - Shipping: free if taxable amount > ₹999 else ₹49
 */
function calculateBill() {
  // Subtotal = sum of (discounted price × qty)
  const subtotal = state.cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  // Product-level savings (original price - discounted price)
  const productSavings = state.cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + (product.originalPrice - product.price) * item.qty : sum;
  }, 0);

  // Order-level discount
  let orderDiscountRate = 0;
  if (subtotal > 5000) orderDiscountRate = 0.15;
  else if (subtotal > 2000) orderDiscountRate = 0.10;
  const orderDiscount = subtotal * orderDiscountRate;

  // Taxable amount after order discount
  const afterOrderDiscount = subtotal - orderDiscount;

  // Coupon discount
  let couponDiscount = 0;
  if (state.appliedCoupon) {
    couponDiscount = afterOrderDiscount * state.appliedCoupon.discount;
  }

  // Taxable amount after coupon
  const taxableAmount = afterOrderDiscount - couponDiscount;

  // GST at 5%
  const gst = taxableAmount * 0.05;

  // Shipping
  const shipping = subtotal > 999 ? 0 : 49;

  // Total
  const total = taxableAmount + gst + shipping;

  // Total savings (product + order + coupon)
  const totalSavings = productSavings + orderDiscount + couponDiscount + (subtotal > 999 ? 49 : 0);

  return {
    subtotal,
    productSavings,
    orderDiscount,
    orderDiscountRate,
    couponDiscount,
    taxableAmount,
    gst,
    shipping,
    total,
    totalSavings,
  };
}

/** Updates all price display elements in the cart summary. */
function updateCartTotals() {
  const bill = calculateBill();

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const show = (id, visible) => { const el = document.getElementById(id); if (el) el.style.display = visible ? 'flex' : 'none'; };

  set('summary-subtotal', formatINR(bill.subtotal));
  set('summary-gst', formatINR(bill.gst));
  set('summary-shipping', bill.shipping === 0 ? '🎉 FREE' : formatINR(bill.shipping));
  set('summary-total', formatINR(bill.total));

  // Order discount
  if (bill.orderDiscount > 0) {
    set('summary-order-discount', `-${formatINR(bill.orderDiscount)}`);
    show('order-discount-row', true);
  } else {
    show('order-discount-row', false);
  }

  // Coupon discount
  if (bill.couponDiscount > 0 && state.appliedCoupon) {
    set('summary-coupon-discount', `-${formatINR(bill.couponDiscount)}`);
    set('coupon-code-display', state.appliedCoupon.code);
    show('coupon-discount-row', true);
  } else {
    show('coupon-discount-row', false);
  }

  // Savings badge
  const savingsBadge = document.getElementById('savings-badge');
  const savingsAmount = document.getElementById('savings-amount');
  if (savingsBadge && savingsAmount) {
    if (bill.totalSavings > 0) {
      savingsBadge.style.display = 'block';
      savingsAmount.textContent = formatINR(bill.totalSavings);
    } else {
      savingsBadge.style.display = 'none';
    }
  }

  // Cart stats panel
  const totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0);
  set('stat-items', totalQty);
  set('stat-savings', formatINR(bill.totalSavings));
  set('stat-total', formatINR(bill.total));

  // Shipping progress bar
  updateShippingProgressBar(bill.subtotal);
}

/** Updates the shipping progress bar based on cart subtotal. */
function updateShippingProgressBar(subtotal) {
  const textEl = document.getElementById('shipping-progress-text');
  const fillEl = document.getElementById('shipping-progress-fill');
  if (!textEl || !fillEl) return;

  const FREE_THRESHOLD = 999;

  if (subtotal >= FREE_THRESHOLD) {
    textEl.textContent = '🎉 You've unlocked FREE shipping!';
    fillEl.style.width = '100%';
  } else {
    const remaining = FREE_THRESHOLD - subtotal;
    textEl.textContent = `Add ${formatINR(remaining)} more to unlock free shipping!`;
    const pct = Math.min((subtotal / FREE_THRESHOLD) * 100, 100);
    fillEl.style.width = pct + '%';
  }
}

/* ============================================================
   11. COUPON SYSTEM
   ============================================================ */

// Valid coupons: code → discount rate
const COUPONS = {
  SAVE10: 0.10,    // 10% off
  WELCOME5: 0.05,  // 5% off
};

/**
 * Applies a coupon code if valid. Only one coupon can be active at a time.
 * Displays success or error message.
 */
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  const msgEl = document.getElementById('coupon-message');
  const code = input.value.trim().toUpperCase();

  if (!code) {
    showCouponMsg(msgEl, 'Please enter a coupon code.', 'error');
    return;
  }

  if (state.cart.length === 0) {
    showCouponMsg(msgEl, 'Add products to cart first.', 'error');
    return;
  }

  if (COUPONS[code] !== undefined) {
    state.appliedCoupon = { code, discount: COUPONS[code] };
    const pct = COUPONS[code] * 100;
    showCouponMsg(msgEl, `✓ Coupon "${code}" applied! ${pct}% off.`, 'success');
    showToast('Coupon Applied!', `${pct}% discount unlocked.`, 'success');
    updateCartTotals();
  } else {
    state.appliedCoupon = null;
    showCouponMsg(msgEl, '✕ Invalid coupon code. Try SAVE10 or WELCOME5.', 'error');
    showToast('Invalid Coupon', 'Please check the coupon code.', 'error');
    updateCartTotals();
  }
}

function showCouponMsg(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = `coupon-message ${type}`;
}

function removeCoupon() {
  state.appliedCoupon = null;
  const msgEl = document.getElementById('coupon-message');
  if (msgEl) { msgEl.textContent = ''; msgEl.className = 'coupon-message'; }
  const input = document.getElementById('coupon-input');
  if (input) input.value = '';
  updateCartTotals();
}

/* ============================================================
   12. WISHLIST MANAGEMENT
   ============================================================ */

/**
 * Toggles a product in/out of the wishlist.
 * Saves to localStorage and updates badge.
 */
function toggleWishlist(productId) {
  const product = getProduct(productId);
  if (!product) return;

  const idx = state.wishlist.indexOf(productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    showToast('Added to Wishlist ❤️', product.name, 'success');
  } else {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist', product.name, 'info');
    if (state.activePage === 'wishlist') renderWishlist();
  }

  saveWishlist();
  updateWishlistBadge();
  refreshAllProductCards();
}

/** Renders the wishlist page. */
function renderWishlist() {
  const grid = document.getElementById('wishlist-grid');
  const empty = document.getElementById('empty-wishlist');
  if (!grid) return;

  const products = state.wishlist.map(id => getProduct(id)).filter(Boolean);

  if (products.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = products.map(p => buildProductCard(p)).join('');
  }
}

/** Moves a product from wishlist to cart. */
function moveToCartFromWishlist(productId) {
  addToCart(productId);
  // Remove from wishlist
  state.wishlist = state.wishlist.filter(id => id !== productId);
  saveWishlist();
  updateWishlistBadge();
  renderWishlist();
}

/* ============================================================
   13. CHECKOUT & ORDER PLACEMENT
   ============================================================ */

/** Renders the order summary on the checkout page. */
function renderCheckoutSummary() {
  const itemsContainer = document.getElementById('checkout-order-items');
  if (!itemsContainer) return;

  itemsContainer.innerHTML = state.cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return '';
    return `
      <div class="checkout-item">
        <img src="${p.image}" alt="${p.name}" class="checkout-item-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80'" />
        <div class="checkout-item-info">
          <div class="checkout-item-name">${p.name}</div>
          <div class="checkout-item-qty">Qty: ${item.qty}</div>
        </div>
        <div class="checkout-item-price">${formatINR(p.price * item.qty)}</div>
      </div>
    `;
  }).join('');

  // Update price breakdown
  const bill = calculateBill();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const show = (id, visible) => { const el = document.getElementById(id); if (el) el.style.display = visible ? 'flex' : 'none'; };

  set('checkout-subtotal', formatINR(bill.subtotal));
  set('checkout-gst', formatINR(bill.gst));
  set('checkout-shipping', bill.shipping === 0 ? '🎉 FREE' : formatINR(bill.shipping));
  set('checkout-total', formatINR(bill.total));

  if (bill.orderDiscount > 0) {
    set('checkout-order-discount', `-${formatINR(bill.orderDiscount)}`);
    show('checkout-order-discount-row', true);
  } else {
    show('checkout-order-discount-row', false);
  }

  if (bill.couponDiscount > 0) {
    set('checkout-coupon-discount', `-${formatINR(bill.couponDiscount)}`);
    show('checkout-coupon-row', true);
  } else {
    show('checkout-coupon-row', false);
  }
}

/**
 * Validates checkout form fields.
 * Returns true if valid, false otherwise.
 * Shows inline error messages for invalid fields.
 */
function validateCheckoutForm() {
  let valid = true;

  // Helper to show/clear field errors
  const fieldError = (id, errorId, msg) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById(errorId);
    if (!el || !errEl) return;
    if (!el.value.trim()) {
      errEl.textContent = msg;
      el.classList.add('error');
      valid = false;
    } else {
      errEl.textContent = '';
      el.classList.remove('error');
    }
  };

  fieldError('checkout-name', 'name-error', 'Full name is required.');
  fieldError('checkout-address', 'address-error', 'Delivery address is required.');
  fieldError('checkout-city', 'city-error', 'City is required.');

  // Email
  const emailEl = document.getElementById('checkout-email');
  const emailErr = document.getElementById('email-error');
  const emailVal = emailEl ? emailEl.value.trim() : '';
  if (!emailVal) {
    if (emailErr) emailErr.textContent = 'Email address is required.';
    if (emailEl) emailEl.classList.add('error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
    if (emailEl) emailEl.classList.add('error');
    valid = false;
  } else {
    if (emailErr) emailErr.textContent = '';
    if (emailEl) emailEl.classList.remove('error');
  }

  // Phone
  const phoneEl = document.getElementById('checkout-phone');
  const phoneErr = document.getElementById('phone-error');
  const phoneVal = phoneEl ? phoneEl.value.trim() : '';
  if (!phoneVal) {
    if (phoneErr) phoneErr.textContent = 'Mobile number is required.';
    if (phoneEl) phoneEl.classList.add('error');
    valid = false;
  } else if (!/^\d{10}$/.test(phoneVal)) {
    if (phoneErr) phoneErr.textContent = 'Enter a valid 10-digit mobile number.';
    if (phoneEl) phoneEl.classList.add('error');
    valid = false;
  } else {
    if (phoneErr) phoneErr.textContent = '';
    if (phoneEl) phoneEl.classList.remove('error');
  }

  // PIN Code
  const pinEl = document.getElementById('checkout-pincode');
  const pinErr = document.getElementById('pincode-error');
  const pinVal = pinEl ? pinEl.value.trim() : '';
  if (!pinVal) {
    if (pinErr) pinErr.textContent = 'PIN code is required.';
    if (pinEl) pinEl.classList.add('error');
    valid = false;
  } else if (!/^\d{6}$/.test(pinVal)) {
    if (pinErr) pinErr.textContent = 'Enter a valid 6-digit PIN code.';
    if (pinEl) pinEl.classList.add('error');
    valid = false;
  } else {
    if (pinErr) pinErr.textContent = '';
    if (pinEl) pinEl.classList.remove('error');
  }

  return valid;
}

/** Handles the order placement flow. */
function placeOrder(e) {
  e.preventDefault();

  if (state.cart.length === 0) {
    showToast('Empty Cart', 'Please add products before placing an order.', 'warning');
    navigate('cart');
    return;
  }

  if (!validateCheckoutForm()) {
    showToast('Form Incomplete', 'Please fill in all required fields.', 'error');
    return;
  }

  // Collect form data
  const name = document.getElementById('checkout-name').value.trim();
  const email = document.getElementById('checkout-email').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  const bill = calculateBill();
  const orderNum = generateOrderNumber();
  const delivery = estimatedDelivery();

  // Map payment method to label
  const paymentLabels = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit/Debit Card' };

  // Build confirmation items HTML
  const orderedItems = state.cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return '';
    return `
      <div class="checkout-item">
        <img src="${p.image}" alt="${p.name}" class="checkout-item-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80'" />
        <div class="checkout-item-info">
          <div class="checkout-item-name">${p.name}</div>
          <div class="checkout-item-qty">Qty: ${item.qty} × ${formatINR(p.price)}</div>
        </div>
        <div class="checkout-item-price">${formatINR(p.price * item.qty)}</div>
      </div>
    `;
  }).join('');

  // Populate confirmation page
  document.getElementById('order-number-display').textContent = orderNum;
  document.getElementById('confirm-customer').textContent = name;
  document.getElementById('confirm-email').textContent = email;
  document.getElementById('confirm-payment').textContent = paymentLabels[payment];
  document.getElementById('confirm-delivery').textContent = delivery;
  document.getElementById('confirm-items').innerHTML = orderedItems;
  document.getElementById('confirm-total').textContent = formatINR(bill.total);

  // Clear cart after successful order
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadge();
  refreshAllProductCards();

  navigate('confirmation');
  showToast('Order Placed! 🎉', `Order #${orderNum} confirmed.`, 'success', 5000);
}

/* ============================================================
   14. QUICK VIEW MODAL
   ============================================================ */

/** Opens the quick view modal for a given product. */
function openQuickView(productId) {
  const product = getProduct(productId);
  if (!product) return;

  const discount = getDiscount(product);
  const isWishlisted = state.wishlist.includes(productId);

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-img-section">
      <img src="${product.image}" alt="${product.name}" class="modal-img" onerror="this.src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80'" />
    </div>
    <div class="modal-info-section">
      <div class="modal-category">${product.categoryLabel}</div>
      <h2 class="modal-name" id="quick-view-title">${product.name}</h2>
      <div class="modal-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span style="font-size:0.82rem;color:var(--text-muted)">(${product.reviewCount.toLocaleString('en-IN')} reviews)</span>
      </div>
      <div class="modal-pricing">
        <span class="modal-price-current">${formatINR(product.price)}</span>
        ${product.originalPrice > product.price
          ? `<span class="modal-price-original">${formatINR(product.originalPrice)}</span>
             <span class="modal-discount-badge">${discount}% OFF</span>`
          : ''}
      </div>
      <p class="modal-desc">${product.description}</p>
      <p class="modal-stock">
        ${product.stock === 0
          ? '❌ Out of Stock'
          : product.stock <= 5
          ? `⚡ Only ${product.stock} left in stock!`
          : `✅ In Stock (${product.stock} units)`}
      </p>
      <div class="modal-actions">
        <button
          class="add-to-cart-btn"
          data-id="${product.id}"
          ${product.stock === 0 ? 'disabled' : ''}
          aria-label="Add ${product.name} to cart"
        >
          🛒 Add to Cart
        </button>
        <button
          class="product-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}"
          data-id="${product.id}"
          aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          style="position:static;width:44px;height:44px;"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Track as recently viewed
  trackRecentlyViewed(productId);

  const modal = document.getElementById('quick-view-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

/* ============================================================
   15. BUDGET MODE
   ============================================================ */

/** Sets the budget and re-renders to highlight affordable products. */
function setBudget() {
  const input = document.getElementById('budget-input');
  const val = parseFloat(input.value);

  if (isNaN(val) || val <= 0) {
    showToast('Invalid Budget', 'Please enter a positive amount.', 'error');
    return;
  }

  state.budget = val;
  showToast('Budget Set! 💡', `Showing products within ${formatINR(val)}`, 'info');

  document.getElementById('clear-budget-btn').style.display = 'inline-flex';
  refreshAllProductCards();
}

/** Clears the budget mode. */
function clearBudget() {
  state.budget = null;
  document.getElementById('budget-input').value = '';
  document.getElementById('clear-budget-btn').style.display = 'none';
  refreshAllProductCards();
  showToast('Budget Cleared', 'Showing all products.', 'info');
}

/* ============================================================
   16. RECENTLY VIEWED PRODUCTS
   ============================================================ */

/**
 * Tracks a product as recently viewed.
 * Keeps a max of 6 items, most recent first.
 */
function trackRecentlyViewed(productId) {
  // Remove if already exists (to bring to front)
  state.recentlyViewed = state.recentlyViewed.filter(id => id !== productId);
  state.recentlyViewed.unshift(productId);
  // Max 6 items
  state.recentlyViewed = state.recentlyViewed.slice(0, 6);
  saveRecentlyViewed();
  renderRecentlyViewed();
}

/** Renders the recently viewed section on the home page. */
function renderRecentlyViewed() {
  const section = document.getElementById('recently-viewed-section');
  const grid = document.getElementById('recently-viewed-grid');
  if (!section || !grid) return;

  if (state.recentlyViewed.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  const products = state.recentlyViewed.map(id => getProduct(id)).filter(Boolean);
  grid.innerHTML = products.map(p => buildProductCard(p)).join('');
}

/* ============================================================
   17. CATEGORY CARDS (Home page)
   ============================================================ */

const CATEGORIES = [
  { key: 'electronics', label: 'Electronics', icon: '💻', color: '#7c3aed' },
  { key: 'fashion', label: 'Fashion', icon: '👗', color: '#ec4899' },
  { key: 'accessories', label: 'Accessories', icon: '⌚', color: '#f59e0b' },
  { key: 'home', label: 'Home & Living', icon: '🏠', color: '#10b981' },
  { key: 'sports', label: 'Sports', icon: '🏋️', color: '#3b82f6' },
];

/** Renders category cards on the home page. */
function renderCategoryCards() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat.key).length;
    return `
      <div class="category-card"
           data-cat="${cat.key}"
           role="button"
           tabindex="0"
           aria-label="Browse ${cat.label} — ${count} products"
           style="--cat-color:${cat.color}">
        <span class="category-icon">${cat.icon}</span>
        <div class="category-name">${cat.label}</div>
        <div class="category-count">${count} Products</div>
      </div>
    `;
  }).join('');
}

/* ============================================================
   18. SIDEBAR CATEGORIES
   ============================================================ */

/** Renders sidebar category buttons for the filter panel. */
function renderSidebarCategories() {
  const container = document.getElementById('sidebar-categories');
  if (!container) return;

  const cats = [{ key: 'all', label: 'All Categories' }, ...CATEGORIES];
  container.innerHTML = cats.map(cat => {
    const count = cat.key === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.key).length;
    return `
      <button class="sidebar-cat-btn ${state.activeCategory === cat.key ? 'active' : ''}"
              data-cat="${cat.key}"
              aria-label="Filter by ${cat.label}">
        ${cat.label} <span>(${count})</span>
      </button>
    `;
  }).join('');
}

/* ============================================================
   18. EVENT LISTENERS & INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Apply saved theme ──────────────────────────────────── */
  applyTheme(state.theme);

  /* ── Initialize badges ──────────────────────────────────── */
  updateCartBadge();
  updateWishlistBadge();

  /* ── Render home page content ───────────────────────────── */
  renderCategoryCards();
  renderFeaturedProducts();
  renderTrendingProducts();
  renderRecentlyViewed();
  renderSidebarCategories();

  /* ── Navbar scroll effect ───────────────────────────────── */
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    const backToTop = document.getElementById('back-to-top');
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  /* ── Back to Top ────────────────────────────────────────── */
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Theme Toggle ───────────────────────────────────────── */
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  /* ── Hamburger Menu ─────────────────────────────────────── */
  document.getElementById('hamburger').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  /* ── Nav Link Clicks ────────────────────────────────────── */
  document.getElementById('nav-home').addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
  document.getElementById('nav-products').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); });
  document.getElementById('nav-categories').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); setCategory('all'); });
  document.getElementById('nav-deals').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); setCategory('all'); state.sortOrder = 'discount'; document.getElementById('price-sort').value = 'discount'; renderAllProducts(); });

  /* ── Mobile nav links ───────────────────────────────────── */
  document.getElementById('mob-home').addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
  document.getElementById('mob-products').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); });
  document.getElementById('mob-categories').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); });
  document.getElementById('mob-deals').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); state.sortOrder = 'discount'; renderAllProducts(); });

  /* ── Logo click → home ──────────────────────────────────── */
  document.getElementById('logo-link').addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });

  /* ── Hero Buttons ───────────────────────────────────────── */
  document.getElementById('start-shopping-btn').addEventListener('click', () => navigate('products'));
  document.getElementById('hero-deals-btn').addEventListener('click', () => { navigate('products'); state.sortOrder = 'discount'; if (document.getElementById('price-sort')) document.getElementById('price-sort').value = 'discount'; renderAllProducts(); });
  document.getElementById('view-all-featured').addEventListener('click', () => navigate('products'));
  document.getElementById('promo-shop-btn').addEventListener('click', () => navigate('products'));

  /* ── Cart / Wishlist nav icons ──────────────────────────── */
  document.getElementById('cart-nav-btn').addEventListener('click', () => navigate('cart'));
  document.getElementById('wishlist-nav-btn').addEventListener('click', () => navigate('wishlist'));

  /* ── Empty cart / wishlist buttons ─────────────────────── */
  document.getElementById('empty-cart-shop-btn').addEventListener('click', () => navigate('products'));
  document.getElementById('empty-wishlist-shop-btn').addEventListener('click', () => navigate('products'));

  /* ── Navbar Search ──────────────────────────────────────── */
  const navSearchInput = document.getElementById('nav-search-input');
  navSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSearchSuggestions(e.target.value);
  });
  navSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      closeSuggestions();
      navigate('products');
      renderAllProducts();
    }
  });

  // Mobile search
  const mobileSearch = document.getElementById('mobile-search-input');
  mobileSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      state.searchQuery = e.target.value;
      navigate('products');
      renderAllProducts();
      closeMobileMenu();
    }
  });

  // Close suggestions on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#nav-search-wrapper')) {
      closeSuggestions();
    }
  });

  function closeSuggestions() {
    document.getElementById('search-suggestions').classList.remove('open');
  }

  // Suggestion item click
  document.getElementById('search-suggestions').addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
      const id = parseInt(item.dataset.id);
      closeSuggestions();
      openQuickView(id);
    }
  });

  /* ── Filter & Sort Controls ─────────────────────────────── */
  document.getElementById('price-sort').addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    renderAllProducts();
  });

  document.getElementById('price-range').addEventListener('input', (e) => {
    state.maxPrice = parseInt(e.target.value);
    document.getElementById('price-range-display').textContent =
      `₹0 – ${formatINR(state.maxPrice)}`;
    renderAllProducts();
  });

  document.getElementById('sidebar-price-range').addEventListener('input', (e) => {
    state.maxPrice = parseInt(e.target.value);
    document.getElementById('sidebar-price-display').textContent = formatINR(state.maxPrice);
    document.getElementById('price-range').value = state.maxPrice;
    document.getElementById('price-range-display').textContent = `₹0 – ${formatINR(state.maxPrice)}`;
    renderAllProducts();
  });

  // Category chip clicks
  document.getElementById('category-chips').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) setCategory(chip.dataset.cat);
  });

  // Filter sidebar toggle
  document.getElementById('filter-sidebar-toggle').addEventListener('click', () => {
    const sidebar = document.getElementById('filter-sidebar');
    const btn = document.getElementById('filter-sidebar-toggle');
    sidebar.classList.toggle('open');
    btn.classList.toggle('active');
    btn.setAttribute('aria-expanded', sidebar.classList.contains('open'));
  });

  // Sidebar category buttons (delegated)
  document.getElementById('sidebar-categories').addEventListener('click', (e) => {
    const btn = e.target.closest('.sidebar-cat-btn');
    if (!btn) return;
    setCategory(btn.dataset.cat);
    // Update active state on sidebar buttons
    document.querySelectorAll('.sidebar-cat-btn').forEach(b => b.classList.toggle('active', b === btn));
  });

  // Rating filter
  document.addEventListener('change', (e) => {
    if (e.target.name === 'rating') {
      state.minRating = parseFloat(e.target.value);
      renderAllProducts();
    }
  });

  // Clear filters button
  document.getElementById('clear-filters-btn').addEventListener('click', () => {
    state.activeCategory = 'all';
    state.sortOrder = 'default';
    state.maxPrice = 50000;
    state.minRating = 0;
    state.searchQuery = '';
    if (navSearchInput) navSearchInput.value = '';
    document.getElementById('price-sort').value = 'default';
    document.getElementById('price-range').value = 50000;
    document.getElementById('price-range-display').textContent = '₹0 – ₹50,000';
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
    document.querySelector('input[name="rating"][value="0"]').checked = true;
    renderAllProducts();
  });

  /* ── Category Cards (home page) ─────────────────────────── */
  document.getElementById('categories-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.category-card');
    if (card) {
      navigate('products');
      setCategory(card.dataset.cat);
    }
  });
  document.getElementById('categories-grid').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.category-card');
      if (card) { navigate('products'); setCategory(card.dataset.cat); }
    }
  });

  /* ── Product Card Interactions (event delegation) ───────── */
  document.addEventListener('click', (e) => {
    // Add to Cart
    const addBtn = e.target.closest('.add-to-cart-btn[data-id]');
    if (addBtn) {
      addToCart(parseInt(addBtn.dataset.id));
      return;
    }

    // Wishlist toggle
    const wishBtn = e.target.closest('.product-wishlist-btn[data-id]');
    if (wishBtn) {
      toggleWishlist(parseInt(wishBtn.dataset.id));
      return;
    }

    // Quick View
    const qvBtn = e.target.closest('.product-quick-view[data-id]');
    if (qvBtn) {
      openQuickView(parseInt(qvBtn.dataset.id));
      return;
    }

    // Cart: qty buttons
    const qtyBtn = e.target.closest('.qty-btn[data-id]');
    if (qtyBtn) {
      const delta = qtyBtn.dataset.action === 'increase' ? 1 : -1;
      updateQty(parseInt(qtyBtn.dataset.id), delta);
      return;
    }

    // Cart: remove button
    const removeBtn = e.target.closest('.cart-item-remove[data-id]');
    if (removeBtn) {
      removeFromCart(parseInt(removeBtn.dataset.id));
      return;
    }
  });

  /* ── Clear Cart Button ──────────────────────────────────── */
  document.getElementById('clear-cart-btn').addEventListener('click', () => {
    if (state.cart.length === 0) return;
    if (confirm('Are you sure you want to clear the entire cart?')) clearCart();
  });

  /* ── Coupon System ──────────────────────────────────────── */
  document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);
  document.getElementById('coupon-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyCoupon();
  });

  // Coupon hint buttons
  document.querySelectorAll('.coupon-hint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('coupon-input').value = btn.dataset.coupon;
      applyCoupon();
    });
  });

  /* ── Checkout Button ────────────────────────────────────── */
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Empty Cart', 'Please add products before checkout.', 'warning');
      return;
    }
    navigate('checkout');
  });

  /* ── Checkout Form Submit ───────────────────────────────── */
  document.getElementById('checkout-form').addEventListener('submit', placeOrder);

  /* ── Continue Shopping (from confirmation) ──────────────── */
  document.getElementById('continue-shopping-btn').addEventListener('click', () => navigate('home'));

  /* ── Quick View Modal ───────────────────────────────────── */
  document.getElementById('modal-close-btn').addEventListener('click', closeQuickView);
  document.getElementById('quick-view-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('quick-view-modal')) closeQuickView();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });

  /* ── Budget Mode ────────────────────────────────────────── */
  document.getElementById('set-budget-btn').addEventListener('click', setBudget);
  document.getElementById('clear-budget-btn').addEventListener('click', clearBudget);
  document.getElementById('budget-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') setBudget();
  });

  /* ── Newsletter Form ────────────────────────────────────── */
  document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    emailInput.value = '';
    showToast('Subscribed! 🎉', "You've subscribed to our newsletter.", 'success');
  });

  /* ── Footer Category Links ──────────────────────────────── */
  document.querySelectorAll('.footer-links-col a[data-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('products');
      setCategory(link.dataset.cat);
    });
  });

  document.getElementById('footer-home').addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
  document.getElementById('footer-products').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); });
  document.getElementById('footer-categories').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); });
  document.getElementById('footer-deals').addEventListener('click', (e) => { e.preventDefault(); navigate('products'); state.sortOrder = 'discount'; renderAllProducts(); });

  /* ── Initial page: Home ─────────────────────────────────── */
  navigate('home');

  /* ── Show info toast on first visit ─────────────────────── */
  if (!localStorage.getItem('shopsphere_visited')) {
    setTimeout(() => {
      showToast('Welcome to ShopSphere AI! 🛍️', 'Shop smarter, save more with AI-powered deals.', 'info', 5000);
      localStorage.setItem('shopsphere_visited', '1');
    }, 1000);
  }

}); // end DOMContentLoaded
