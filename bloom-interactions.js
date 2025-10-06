// Bloom Plant Shop - Interactive Features

// Cart Management
let cart = JSON.parse(localStorage.getItem('bloomCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bloomWishlist')) || [];

// Expose to window for global access
window.cart = cart;
window.wishlist = wishlist;

// Update cart badge
function updateCartBadge() {
  const badge = document.querySelector('.cart-btn .badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

// Add to Cart Function
function addToCart(productName, price, image) {
  // Reload from localStorage to ensure consistency
  cart = JSON.parse(localStorage.getItem('bloomCart')) || [];
  
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(price.replace('SAR', '').trim()),
      image: image,
      quantity: 1
    });
  }
  
  localStorage.setItem('bloomCart', JSON.stringify(cart));
  window.cart = cart; // Update global reference
  updateCartBadge();
  showNotification(`${productName} added to cart!`, 'success');
}

// Add to Wishlist Function
function addToWishlist(productName, price, image) {
  // Reload from localStorage to ensure consistency
  wishlist = JSON.parse(localStorage.getItem('bloomWishlist')) || [];
  
  const existingItem = wishlist.find(item => item.name === productName);
  
  if (!existingItem) {
    wishlist.push({
      name: productName,
      price: parseFloat(price.replace('SAR', '').trim()),
      image: image
    });
    localStorage.setItem('bloomWishlist', JSON.stringify(wishlist));
    window.wishlist = wishlist; // Update global reference
    showNotification(`${productName} added to wishlist!`, 'success');
  } else {
    showNotification(`${productName} is already in your wishlist!`, 'info');
  }
}

// Show Notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize Add to Cart Buttons
function initializeCartButtons() {
  // Handle both .btn-add-cart (homepage) and .add-to-cart (shop page)
  document.querySelectorAll('.btn-add-cart, .add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.bestseller-card') || this.closest('.product-card');
      if (card) {
        const name = card.querySelector('.bestseller-name, .product-name')?.textContent?.trim() || 'Product';
        const price = card.querySelector('.bestseller-price, .product-price')?.textContent || 'SAR 0';
        const image = card.querySelector('img')?.src || '';
        addToCart(name, price, image);
      }
    });
  });
}

// Initialize Wishlist Buttons
function initializeWishlistButtons() {
  // First, set initial heart states based on saved wishlist
  const savedWishlist = JSON.parse(localStorage.getItem('bloomWishlist')) || [];
  
  // Handle homepage wishlist buttons (.wishlist-btn with icon)
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    const card = button.closest('.bestseller-card') || button.closest('.product-card');
    if (card) {
      const name = card.querySelector('.bestseller-name, .product-name')?.textContent?.trim() || 'Product';
      const isInWishlist = savedWishlist.some(item => item.name === name);
      const icon = button.querySelector('i');
      
      // Set initial state
      if (isInWishlist) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    }
    
    // Add click handler
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const card = this.closest('.bestseller-card') || this.closest('.product-card');
      if (card) {
        const name = card.querySelector('.bestseller-name, .product-name')?.textContent?.trim() || 'Product';
        const price = card.querySelector('.bestseller-price, .product-price')?.textContent || 'SAR 0';
        const image = card.querySelector('img')?.src || '';
        
        const icon = this.querySelector('i');
        const wishlist = JSON.parse(localStorage.getItem('bloomWishlist')) || [];
        const existingIndex = wishlist.findIndex(item => item.name === name);
        
        if (icon.classList.contains('far')) {
          // Add to wishlist
          icon.classList.remove('far');
          icon.classList.add('fas');
          addToWishlist(name, price, image);
        } else {
          // Remove from wishlist
          icon.classList.remove('fas');
          icon.classList.add('far');
          
          if (existingIndex > -1) {
            const updatedWishlist = wishlist.filter(item => item.name !== name);
            localStorage.setItem('bloomWishlist', JSON.stringify(updatedWishlist));
            
            // Update the global wishlist variable
            window.wishlist = updatedWishlist;
          }
          showNotification(`${name} removed from wishlist!`, 'info');
        }
      }
    });
  });
  
  // Handle shop page wishlist icons (.wishlist-icon with checkbox)
  document.querySelectorAll('.wishlist-icon').forEach(label => {
    const card = label.closest('.product-card');
    if (card) {
      const name = card.querySelector('.product-name')?.textContent?.trim() || 'Product';
      const isInWishlist = savedWishlist.some(item => item.name === name);
      const checkbox = label.previousElementSibling; // Get the checkbox input
      
      // Set initial state
      if (checkbox && isInWishlist) {
        checkbox.checked = true;
      }
    }
    
    // Add click handler
    label.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const card = this.closest('.product-card');
      if (card) {
        const name = card.querySelector('.product-name')?.textContent?.trim() || 'Product';
        const price = card.querySelector('.product-price')?.textContent || 'SAR 0';
        const image = card.querySelector('img')?.src || '';
        const checkbox = this.previousElementSibling;
        
        const wishlist = JSON.parse(localStorage.getItem('bloomWishlist')) || [];
        const existingIndex = wishlist.findIndex(item => item.name === name);
        
        if (!checkbox.checked) {
          // Add to wishlist
          checkbox.checked = true;
          addToWishlist(name, price, image);
        } else {
          // Remove from wishlist
          checkbox.checked = false;
          
          if (existingIndex > -1) {
            const updatedWishlist = wishlist.filter(item => item.name !== name);
            localStorage.setItem('bloomWishlist', JSON.stringify(updatedWishlist));
            
            // Update the global wishlist variable
            window.wishlist = updatedWishlist;
          }
          showNotification(`${name} removed from wishlist!`, 'info');
        }
      }
    });
  });
}

// Chatbot functionality
function initializeChatbot() {
  const chatbotBtn = document.querySelector('.chatbot-btn');
  const chatbotWidget = document.querySelector('.chatbot-widget');
  const closeChatbot = document.querySelector('.close-chatbot');
  const sendMessage = document.querySelector('.send-message');
  const chatInput = document.querySelector('.chat-input');
  const chatMessages = document.querySelector('.chat-messages');
  
  if (chatbotBtn && chatbotWidget) {
    chatbotBtn.addEventListener('click', () => {
      chatbotWidget.classList.toggle('active');
    });
    
    if (closeChatbot) {
      closeChatbot.addEventListener('click', () => {
        chatbotWidget.classList.remove('active');
      });
    }
    
    if (sendMessage && chatInput) {
      const sendMsg = () => {
        const message = chatInput.value.trim();
        if (message) {
          addChatMessage(message, 'user');
          chatInput.value = '';
          
          setTimeout(() => {
            addChatMessage('Thank you for your message! Our plant care experts will assist you shortly. 🌿', 'bot');
          }, 1000);
        }
      };
      
      sendMessage.addEventListener('click', sendMsg);
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMsg();
        }
      });
    }
  }
}

function addChatMessage(text, sender) {
  const chatMessages = document.querySelector('.chat-messages');
  if (chatMessages) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for header to load, then update cart badge
  setTimeout(() => {
    updateCartBadge();
  }, 100);
  
  // Initialize buttons after a slight delay to ensure header is loaded
  setTimeout(() => {
    initializeCartButtons();
    initializeWishlistButtons();
  }, 150);
  
  initializeChatbot();
  
  // Also update cart badge when header is loaded
  const observer = new MutationObserver(() => {
    if (document.querySelector('.cart-btn .badge')) {
      updateCartBadge();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
