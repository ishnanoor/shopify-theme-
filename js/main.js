/**
 * LUMORA - Core Application Engine
 * Cart Drawer, Wishlist, Search Modal, Dynamic Interactions, Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartSystem();
  initWishlistSystem();
  initSearchModal();
  initStickyHeader();
  initMobileMenu();
  initNewsletter();
  initAccordions();
  initProductPageFeatures();
  initReadingProgressBar();
  initFaqSearch();
  initContactForm();
});

/* ----------------- 1. Cart System (Matching Screenshot Badge "2") ----------------- */
let cartState = [
  { id: 'luxe-handbag', name: 'Luxe Structured Handbag', price: 129.00, quantity: 1, image: 'assets/images/luxe-handbag.jpg' },
  { id: 'scented-candle', name: 'Bohemian Amber Scented Candle', price: 26.00, quantity: 1, image: 'assets/images/candle.jpg' }
];

function initCartSystem() {
  const cartTriggers = document.querySelectorAll('.cart-trigger-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');

  // Open Cart
  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Close Cart
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Quick Add Buttons on Cards
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      e.preventDefault();
      const productId = addBtn.dataset.id;
      const product = LUMORA_DATA.products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    }
  });

  renderCart();
}

function openCart() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCart(product, qty = 1) {
  const existing = cartState.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cartState.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image
    });
  }
  renderCart();
  showToast(`Added ${product.name} to your bag`);
  openCart();
}

function updateCartQty(productId, change) {
  const item = cartState.find(p => p.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cartState = cartState.filter(p => p.id !== productId);
    }
    renderCart();
  }
}

function removeFromCart(productId) {
  cartState = cartState.filter(p => p.id !== productId);
  renderCart();
  showToast('Item removed from bag');
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items-container');
  const countBadges = document.querySelectorAll('.cart-count-badge');
  const subtotalEl = document.getElementById('cart-subtotal-price');
  const shippingBar = document.getElementById('cart-shipping-fill');
  const shippingNotice = document.getElementById('cart-shipping-notice');

  // Total count
  const totalCount = cartState.reduce((sum, item) => sum + item.quantity, 0);
  countBadges.forEach(badge => {
    badge.textContent = totalCount;
    badge.style.transform = 'scale(1.25)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  });

  // Total amount
  const subtotal = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotalEl) {
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Free shipping threshold ($50)
  const freeThreshold = 50.00;
  if (shippingBar && shippingNotice) {
    if (subtotal >= freeThreshold) {
      shippingBar.style.width = '100%';
      shippingNotice.innerHTML = '✨ Congratulations! You unlocked <strong>Complimentary Express Shipping</strong>';
    } else {
      const needed = (freeThreshold - subtotal).toFixed(2);
      const percent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      shippingBar.style.width = `${percent}%`;
      shippingNotice.innerHTML = `Add <strong>$${needed}</strong> more to unlock <strong>Free Express Shipping</strong>`;
    }
  }

  if (!cartContainer) return;

  if (cartState.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-state">
        <svg class="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <h4>Your shopping bag is empty</h4>
        <p style="font-size: 0.88rem; margin: 8px 0 20px;">Discover curated new arrivals crafted for mindful living.</p>
        <button class="btn-primary" onclick="closeCart()">Start Exploring</button>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = cartState.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-controls">
          <div class="quantity-btn-group">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ----------------- 2. Wishlist System ----------------- */
let wishlist = new Set(['luxe-handbag']);

function initWishlistSystem() {
  document.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.wishlist-toggle');
    if (wishBtn) {
      e.preventDefault();
      const productId = wishBtn.dataset.id || 'luxe-handbag';
      if (wishlist.has(productId)) {
        wishlist.delete(productId);
        wishBtn.classList.remove('active');
        showToast('Removed from your Wishlist');
      } else {
        wishlist.add(productId);
        wishBtn.classList.add('active');
        showToast('Saved to your Lumora Wishlist ✨');
      }
    }
  });
}

/* ----------------- 3. Search Modal ----------------- */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  const searchOverlay = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchOverlay) return;

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 150);
      }
      document.body.style.overflow = 'hidden';
    });
  });

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay || e.target.closest('.search-close-btn')) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = `
          <div style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 12px;">Trending Searches</div>
          <div class="trending-pills">
            <a href="product.html" class="trend-pill">Luxe Handbag</a>
            <a href="product.html" class="trend-pill">Linen Shirts</a>
            <a href="product.html" class="trend-pill">Gold Hoops</a>
            <a href="product.html" class="trend-pill">Amber Candles</a>
            <a href="product.html" class="trend-pill">Straw Boater</a>
          </div>
        `;
        return;
      }

      const matches = LUMORA_DATA.products.filter(p => 
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `<p style="padding: 20px 0; color: var(--color-text-muted);">No products found matching "${q}".</p>`;
      } else {
        searchResults.innerHTML = matches.map(p => `
          <a href="${p.slug}" class="cart-item-row" style="text-decoration: none; border-bottom: 1px solid var(--color-border-light); padding: 12px 0;">
            <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
            <div>
              <div style="font-weight: 600; color: var(--color-text-title); font-size: 0.95rem;">${p.name}</div>
              <div style="font-size: 0.84rem; color: var(--color-primary); font-weight: 700;">$${p.price.toFixed(2)} · <span style="color: var(--color-text-muted); font-weight: normal;">${p.category}</span></div>
            </div>
          </a>
        `).join('');
      }
    });
  }
}

/* ----------------- 4. Sticky Header ----------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ----------------- 5. Mobile Menu ----------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#FAF7F2';
      nav.style.padding = '24px';
      nav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      nav.style.borderBottom = '1px solid var(--color-border)';
    });
  }
}

/* ----------------- 6. Newsletter Subscription ----------------- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.includes('@')) {
        showToast('Welcome to the Lumora Circle! Your 15% VIP welcome code has been sent.');
        input.value = '';
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  });
}

/* ----------------- 7. Interactive Accordions ----------------- */
function initAccordions() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header, .faq-question-btn');
    if (header) {
      const item = header.closest('.accordion-item, .faq-accordion-card');
      if (item) {
        item.classList.toggle('active');
      }
    }
  });
}

/* ----------------- 8. Product Page Interactive Features ----------------- */
function initProductPageFeatures() {
  // Gallery Switcher
  const mainImg = document.getElementById('gallery-main-image');
  const thumbs = document.querySelectorAll('.gallery-thumb-item');
  if (mainImg && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const newSrc = thumb.dataset.img || thumb.querySelector('img').src;
        mainImg.src = newSrc;
      });
    });
  }

  // Color Swatches
  const swatchBtns = document.querySelectorAll('.color-swatch-btn');
  const swatchLabel = document.getElementById('selected-color-name');
  if (swatchBtns.length) {
    swatchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        swatchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (swatchLabel && btn.dataset.name) {
          swatchLabel.textContent = btn.dataset.name;
        }
        showToast(`Selected shade: ${btn.dataset.name || 'Custom'}`);
      });
    });
  }

  // Size Selector Pills
  const sizePills = document.querySelectorAll('.size-pill-btn');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Quantity on product page
  const qtyMinus = document.getElementById('qty-minus-btn');
  const qtyPlus = document.getElementById('qty-plus-btn');
  const qtyInput = document.getElementById('product-qty-input');
  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });
  }

  // Main Add to Bag button on product page
  const mainAddBag = document.getElementById('product-main-add-bag');
  if (mainAddBag) {
    mainAddBag.addEventListener('click', () => {
      const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
      const product = LUMORA_DATA.products[0]; // Luxe Handbag
      addToCart(product, qty);
    });
  }
}

/* ----------------- 9. Reading Progress Bar ----------------- */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPos = window.scrollY;
    const progress = (scrollPos / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ----------------- 10. FAQ Search & Category Filter ----------------- */
function initFaqSearch() {
  const faqSearchInput = document.getElementById('faq-search');
  const faqCards = document.querySelectorAll('.faq-accordion-card');
  const faqPills = document.querySelectorAll('.faq-pill');

  if (faqSearchInput && faqCards.length) {
    faqSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      faqCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  if (faqPills.length) {
    faqPills.forEach(pill => {
      pill.addEventListener('click', () => {
        faqPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.category;

        faqCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

/* ----------------- 11. Contact Form Simulation ----------------- */
function initContactForm() {
  const contactForm = document.getElementById('lumora-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Message...';

      setTimeout(() => {
        showToast('Your message has been received. Our VIP Concierge will respond within 4 hours.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }, 1000);
    });
  }
}

/* ----------------- 12. Toast Notification Engine ----------------- */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--color-blush);">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
