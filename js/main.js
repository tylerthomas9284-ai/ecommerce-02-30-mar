/* ============================================================
   BLOK SUPPLY — Main JS
   Modal, Cookie Consent, Newsletter, Mobile Nav
   ============================================================ */

// ===================== LEAD FORM MODAL =====================
function openModal(context) {
  const overlay = document.getElementById('leadModal');
  if (!overlay) return;
  const msgField = document.getElementById('modalMessage');
  if (msgField && context) msgField.value = context;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('leadModal');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ===================== SUCCESS POPUP =====================
function showSuccess(title, desc) {
  const popup = document.getElementById('successPopup');
  if (!popup) return;
  const t = document.getElementById('successTitle');
  const d = document.getElementById('successDesc');
  if (t) t.textContent = title;
  if (d) d.textContent = desc;
  popup.classList.add('active');
}

function closeSuccess() {
  const popup = document.getElementById('successPopup');
  if (popup) popup.classList.remove('active');
}

// ===================== ORDER SUCCESS MODAL =====================
function showOrderSuccess(payMethod) {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  const numEl = document.getElementById('orderNumber');
  const msgEl = document.getElementById('orderMsg');
  const orderNum = 'BS-' + Math.floor(100000 + Math.random() * 900000);
  if (numEl) numEl.textContent = 'Order #' + orderNum;
  if (msgEl) {
    if (payMethod === 'cod') {
      msgEl.textContent = 'Your order has been placed! Pay with cash upon delivery. Our team will confirm your order via phone within 24 hours.';
    } else if (payMethod === 'paypal') {
      msgEl.textContent = 'Redirecting to PayPal... Once payment is complete, your order will be confirmed and shipped within 2-3 business days.';
    } else {
      msgEl.textContent = 'Your payment was processed successfully. Your order will be packed and shipped within 2-3 business days.';
    }
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  clearCart();
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
  window.location.href = 'index.html';
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', function () {

  // --- Lead form submit ---
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const consent = document.getElementById('modalConsent');
      if (!consent || !consent.checked) {
        alert('Please accept the privacy policy to continue.');
        return;
      }
      closeModal();
      showSuccess('Message Received!', 'Thanks for reaching out. Our team will get back to you within 24 hours. Stay fresh.');
      leadForm.reset();
    });
  }

  // Close modal on overlay click
  const leadModal = document.getElementById('leadModal');
  if (leadModal) {
    leadModal.addEventListener('click', function (e) {
      if (e.target === leadModal) closeModal();
    });
  }

  // --- Newsletter forms ---
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showSuccess("You're In!", 'Thanks for subscribing. Welcome to the BLOK. Check your inbox for an exclusive discount.');
      form.reset();
    });
  });

  // --- Contact form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const consent = document.getElementById('contactConsent');
      if (!consent || !consent.checked) { alert('Please accept the privacy policy to continue.'); return; }
      showSuccess('Message Sent!', "We've received your message and will respond within 24 hours.");
      contactForm.reset();
    });
  }

  // --- Cookie consent ---
  const banner = document.getElementById('cookieBanner');
  if (banner && !localStorage.getItem('blok_cookie_consent')) {
    banner.style.display = 'flex';
  }
  const acceptBtn = document.getElementById('acceptCookies');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('blok_cookie_consent', 'accepted');
      if (banner) banner.style.display = 'none';
    });
  }
  const declineBtn = document.getElementById('declineCookies');
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      localStorage.setItem('blok_cookie_consent', 'declined');
      if (banner) banner.style.display = 'none';
    });
  }

  // --- Mobile nav ---
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', function () { mobileNav.classList.remove('open'); document.body.style.overflow = ''; });
  }

  // --- Payment method toggle on checkout ---
  document.querySelectorAll('.payment-opt').forEach(function (opt) {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.payment-opt').forEach(o => o.classList.remove('active'));
      document.querySelectorAll('.payment-panel').forEach(p => p.classList.remove('show'));
      opt.classList.add('active');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const panelId = radio.value + 'Panel';
        const panel = document.getElementById(panelId);
        if (panel) panel.classList.add('show');
      }
    });
  });

  // --- Size buttons ---
  document.querySelectorAll('.size-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = btn.closest('.size-options');
      if (group) group.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});
