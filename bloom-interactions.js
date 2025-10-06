// Bloom Plant Shop - Interactive Features

// Cart Management
let cart = JSON.parse(localStorage.getItem('bloomCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bloomWishlist')) || [];

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
  updateCartBadge();
  showNotification(`${productName} added to cart!`, 'success');
}

// Add to Wishlist Function
function addToWishlist(productName, price, image) {
  const existingItem = wishlist.find(item => item.name === productName);
  
  if (!existingItem) {
    wishlist.push({
      name: productName,
      price: parseFloat(price.replace('SAR', '').trim()),
      image: image
    });
    localStorage.setItem('bloomWishlist', JSON.stringify(wishlist));
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
  document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.bestseller-card') || this.closest('.product-card');
      if (card) {
        const name = card.querySelector('.bestseller-name, .product-name')?.textContent || 'Product';
        const price = card.querySelector('.bestseller-price, .product-price')?.textContent || 'SAR 0';
        const image = card.querySelector('img')?.src || '';
        addToCart(name, price, image);
      }
    });
  });
}

// Initialize Wishlist Buttons
function initializeWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const card = this.closest('.bestseller-card') || this.closest('.product-card');
      if (card) {
        const name = card.querySelector('.bestseller-name, .product-name')?.textContent || 'Product';
        const price = card.querySelector('.bestseller-price, .product-price')?.textContent || 'SAR 0';
        const image = card.querySelector('img')?.src || '';
        
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          addToWishlist(name, price, image);
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
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
  updateCartBadge();
  initializeCartButtons();
  initializeWishlistButtons();
  initializeChatbot();
});
