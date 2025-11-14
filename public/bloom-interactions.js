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
  
  // Handle homepage wishlist buttons (.wishlist-btn with icon) - only for product cards
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    const card = button.closest('.bestseller-card') || button.closest('.product-card');
    // Only process if it's within a product/bestseller card
    if (!card) return;
    
    const name = card.querySelector('.bestseller-name, .product-name')?.textContent?.trim() || 'Product';
    const isInWishlist = savedWishlist.some(item => item.name === name);
    const icon = button.querySelector('i');
    
    // Only process if it has a Font Awesome icon
    if (!icon) return;
    
    // Set initial state
    if (isInWishlist) {
      icon.classList.remove('far');
      icon.classList.add('fas');
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
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
        if (!icon) return;
        
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
  
  // Handle wishlist icons (.wishlist-icon with checkbox) - works for both shop page and homepage
  document.querySelectorAll('.wishlist-icon').forEach(label => {
    const card = label.closest('.product-card') || label.closest('.bestseller-card');
    if (card) {
      const name = card.querySelector('.product-name, .bestseller-name')?.textContent?.trim() || 'Product';
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
      
      const card = this.closest('.product-card') || this.closest('.bestseller-card');
      if (card) {
        const name = card.querySelector('.product-name, .bestseller-name')?.textContent?.trim() || 'Product';
        const price = card.querySelector('.product-price, .bestseller-price')?.textContent || 'SAR 0';
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
  const chatInput = document.querySelector('.chatbot-input');
  const sendBtn = document.querySelector('.chatbot-send-btn');
  const chatMessages = document.querySelector('.chatbot-messages');
  
  if (sendBtn && chatInput && chatMessages) {
    const sendMsg = () => {
      const message = chatInput.value.trim();
      if (message) {
        // Add user message
        addChatbotMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response after delay
        setTimeout(() => {
          const response = generateAIResponse(message);
          addChatbotMessage(response, 'bot');
        }, 800);
      }
    };
    
    sendBtn.addEventListener('click', sendMsg);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMsg();
      }
    });
  }
}

// Generate AI-like responses based on keywords
function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Care-related questions
  if (lowerMessage.includes('water') || lowerMessage.includes('watering')) {
    return "💧 Watering depends on the plant type! Generally, check if the top inch of soil is dry before watering. Most indoor plants prefer weekly watering, but succulents need less frequent watering.";
  }
  if (lowerMessage.includes('light') || lowerMessage.includes('sun')) {
    return "☀️ Most indoor plants thrive in bright, indirect light. Avoid direct sunlight which can burn leaves. Low-light plants like snake plants and pothos are great for dimmer spaces!";
  }
  if (lowerMessage.includes('fertilize') || lowerMessage.includes('fertilizer')) {
    return "🌱 Feed your plants during growing season (spring/summer) with balanced liquid fertilizer every 2-4 weeks. Reduce to monthly or stop in fall/winter when growth slows.";
  }
  if (lowerMessage.includes('yellow') && lowerMessage.includes('leaves')) {
    return "🍂 Yellow leaves usually indicate overwatering or poor drainage. Check if soil is soggy and ensure your pot has drainage holes. Could also be natural aging of lower leaves.";
  }
  
  // Plant recommendations
  if (lowerMessage.includes('beginner') || lowerMessage.includes('easy')) {
    return "🌿 Great beginner plants: Snake Plant, Pothos, Spider Plant, and ZZ Plant. They're forgiving, require minimal care, and adapt well to various conditions!";
  }
  if (lowerMessage.includes('low light')) {
    return "🌙 Perfect for low light: Snake Plants, Pothos, Peace Lily, and ZZ Plants. These beauties can thrive even in offices or rooms without much natural light!";
  }
  if (lowerMessage.includes('air purifying') || lowerMessage.includes('clean air')) {
    return "🌬️ Top air-purifying plants: Snake Plant, Peace Lily, Spider Plant, and Rubber Plant. They help remove toxins and improve indoor air quality!";
  }
  
  // Shopping-related
  if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
    return "📦 We offer fast delivery across Saudi Arabia! Orders typically arrive within 2-3 business days with careful packaging to ensure your plants arrive healthy.";
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "💰 Our plants range from SAR 150 to SAR 500+ depending on size and rarity. Check our Shop page for current prices and special offers!";
  }
  if (lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
    return "📋 Our subscription plans deliver fresh plants monthly! Choose from Basic (1 plant), Standard (2 plants), or Premium (3 plants + care guide). Visit our Plans page for details!";
  }
  
  // General questions
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "🌟 I'm here to help! Ask me about plant care (watering, light, fertilizing), recommendations for beginners, or our products and services. What would you like to know?";
  }
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! 🌿 Happy to help! Feel free to ask if you have more questions about plants or our services.";
  }
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hi there! 👋 Welcome to Bloom! How can I assist you with your plant journey today?";
  }
  
  // Default response
  return "🌿 That's a great question! For specific plant care advice or detailed information, please contact our expert team at bloom@plants.com or call +966 500000000. I can also help with general questions about watering, light, plant recommendations, or our services!";
}

// Add message to chatbot
function addChatbotMessage(text, sender) {
  const chatMessages = document.querySelector('.chatbot-messages');
  if (chatMessages) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <img src="images/bloom_logo_trimmed.png" alt="Bloom" class="avatar-logo">
        </div>
        <div class="message-content">
          <p>${text}</p>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${text}</p>
        </div>
      `;
    }
    
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
