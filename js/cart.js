/* ============================================================
   BLOK SUPPLY — Cart Logic
   localStorage-based cart management
   ============================================================ */

const CART_KEY = 'bloksupply_cart';

const PRODUCTS = {
  'BSC-001': { id: 'BSC-001', name: 'Oversized Logo Tee', price: 45, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=140&fit=crop&q=80', category: 'Tops', url: 'product-oversized-logo-tee.html' },
  'BSC-002': { id: 'BSC-002', name: 'Cargo Utility Pants', price: 120, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&h=140&fit=crop&q=80', category: 'Bottoms', url: 'product-cargo-utility-pants.html' },
  'BSC-003': { id: 'BSC-003', name: 'Block Letter Hoodie', price: 95, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=120&h=140&fit=crop&q=80', category: 'Tops', url: 'product-block-letter-hoodie.html' },
  'BSC-004': { id: 'BSC-004', name: 'Mesh Trucker Cap', price: 35, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=120&h=140&fit=crop&q=80', category: 'Accessories', url: 'product-mesh-trucker-cap.html' },
  'BSC-005': { id: 'BSC-005', name: 'Canvas Tote Bag', price: 28, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120&h=140&fit=crop&q=80', category: 'Accessories', url: 'product-canvas-tote-bag.html' },
  'BSC-006': { id: 'BSC-006', name: 'Fleece Quarter-Zip', price: 85, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=120&h=140&fit=crop&q=80', category: 'Tops', url: 'product-fleece-quarter-zip.html' },
  'BSC-007': { id: 'BSC-007', name: 'Graphic Bomber Jacket', price: 175, image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=120&h=140&fit=crop&q=80', category: 'Outerwear', url: 'product-graphic-bomber-jacket.html' },
  'BSC-008': { id: 'BSC-008', name: 'Ribbed Knit Beanie', price: 25, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=120&h=140&fit=crop&q=80', category: 'Accessories', url: 'product-ribbed-beanie.html' },
  'BSC-009': { id: 'BSC-009', name: 'Cropped Windbreaker', price: 110, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=120&h=140&fit=crop&q=80', category: 'Outerwear', url: 'product-cropped-windbreaker.html' },
  'BSC-010': { id: 'BSC-010', name: 'Jogger Set (2-piece)', price: 140, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=120&h=140&fit=crop&q=80', category: 'Sets', url: 'product-jogger-set.html' }
};

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateAllBadges();
}

function addToCart(productId, size, qty) {
  const cart = getCart();
  const key = productId + '-' + size;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    const p = PRODUCTS[productId];
    if (!p) return;
    cart.push({ key, id: productId, name: p.name, price: p.price, image: p.image, size, qty });
  }
  saveCart(cart);
}

function removeFromCart(key) {
  const cart = getCart().filter(i => i.key !== key);
  saveCart(cart);
}

function updateQty(key, newQty) {
  if (newQty < 1) { removeFromCart(key); return; }
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (item) { item.qty = newQty; saveCart(cart); }
}

function getCartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function getCartSubtotal() {
  return getCart().reduce((s, i) => s + (i.price * i.qty), 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateAllBadges();
}

function updateAllBadges() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

// Auto-init badge on load
document.addEventListener('DOMContentLoaded', updateAllBadges);
