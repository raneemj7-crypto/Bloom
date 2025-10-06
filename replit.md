# Bloom - Plant E-commerce Platform

## Recent Changes

**October 6, 2025 - Latest Updates**
- ✅ **Footer Logo Fix**: Footer now displays actual Bloom logo image (bloom_logo_trimmed.png) with proper CSS flexbox styling instead of emoji
- ✅ **Hanging Plant Position**: Lowered plant decoration to sit more inside footer area (top: -80px) on right side (2% from edge)
- ✅ **Footer Enhancements**: Repositioned hanging plant to right side (2% from edge), increased transparency to 70% (0.3 opacity), replaced emoji with actual logo image, added 6rem spacing above footer
- ✅ **Logo Structure Redesign**: Updated header logo to display image on left + "Bloom" H3 heading + "Refresh Every Room" tagline (instead of single logo image)
- ✅ **Hamburger Menu Removal**: Completely removed mobile hamburger menu - all navigation elements now stay visible on mobile using flex-wrap
- ✅ **Wishlist JavaScript Fix**: Added guards to prevent crashes when encountering header wishlist button (which uses SVG instead of Font Awesome icons)
- ✅ **Unified Wishlist Pattern**: Homepage bestsellers now use checkbox + SVG pattern matching shop page style, JavaScript handles both .bestseller-card and .product-card containers
- ✅ **Header Wishlist Link**: Header wishlist icon now properly links to wishlist.html page
- ✅ **Unified Chatbot Design**: Implemented shop page checkbox-toggle chatbot style across all pages (about, plans, contact, cart, profile, wishlist) with AI response functionality
- ✅ **Navigation Cleanup**: Removed emoji icons from all navigation links (Home, Shop, Plans, About Us, Contact Us)
- ✅ **Active Page Indicator Fix**: Corrected navigation underline to highlight only one link per page
- ✅ **Footer Consistency**: Updated footer hanging plant to match hero plant image (homeplant.png)
- ✅ **Enhanced Cart Compatibility**: JavaScript now handles both .btn-add-cart and .add-to-cart button classes
- ✅ **Wishlist Heart Icons**: Unified wishlist heart style across homepage and shop page - outline SVG hearts in white circular backgrounds positioned in top right corner
- ✅ **Chatbot CSS Integration**: Complete chatbot styles (from shop.css) added to bloom-style.css for unified styling

**October 6, 2025 - Interactive Features & Design Enhancements**
- ✅ **Responsive Best Sellers Grid**: 4 columns on large screens, 2 on tablets, 1 on mobile
- ✅ **Wider What We Offer Cards**: Increased from 45%/55% to 40%/60% split, max-width 1100px
- ✅ **Section Dividers**: Added decorative leaf borders between all sections
- ✅ **Enhanced About Section**: Gradient background, decorative leaf elements, styled content card
- ✅ **Wishlist System**: Removed from header, created dedicated wishlist.html page, linked from profile
- ✅ **Mobile Hamburger Menu**: Functional dropdown navigation for mobile devices
- ✅ **Interactive Add to Cart**: Full cart management with localStorage persistence and notifications
- ✅ **Wishlist Functionality**: Add/remove items with heart icon toggle, state persists across sessions
- ✅ **AI Chatbot Widget**: Floating chat button on all pages with message functionality
- ✅ **Shop Page Spacing**: Improved header and search bar spacing
- ✅ **Profile Order Navigation**: "My Orders" link smoothly scrolls to "Recently Ordered" section
- ✅ **Product Images**: All images from attached_assets integrated into pages
- ✅ **Footer Enhancement**: Added hanging plant decoration with transparent green background
- ✅ **Notification System**: Toast notifications for cart/wishlist actions
- ✅ **Cart Badge**: Live item count display that updates in real-time

**October 5, 2025 - Initial Implementation Complete**
- ✅ Full HTML/CSS static website implementation
- ✅ All 11 pages created with responsive design
- ✅ Leaf-green color palette with CSS Variables theming
- ✅ Product images integrated from attached_assets
- ✅ Creative animations (hero floating circles, hover effects)
- ✅ Simple HTTP server running on port 5000
- ✅ Complete navigation structure across all pages

**Pages Implemented:**
- Home (about.html), Shop (shop-page.html), Plans, Cart, Contact, Profile, Wishlist, Login, Register

**Design Features:**
- Gradient hero section with animated background elements
- Product cards with hover animations and wishlist hearts
- Filter buttons for shop categories
- Responsive grid layouts (Flexbox/Grid)
- Form styling with modern inputs
- Comprehensive footer with quick links and hanging plant decoration
- Chatbot widget across all pages

## Overview

Bloom is a modern plant-centric web application that combines e-commerce, subscription services, and community features to help users discover, purchase, and care for indoor plants. The platform offers a curated catalog of plants (indoor, succulents, tropical), subscription-based delivery plans, and care guidance to make plant ownership accessible and enjoyable.

**Core Capabilities:**
- Browse and purchase individual plants with detailed care profiles
- Subscribe to monthly plant delivery boxes with tiered membership options
- Manage shopping cart, checkout, and order history
- User authentication and profile management
- Customer feedback and contact support forms

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML5/CSS3 with semantic markup
- CSS Variables for consistent theming (green/earth-tone color palette)
- Vanilla JavaScript for interactivity (bloom-interactions.js)
- LocalStorage for cart and wishlist persistence
- Responsive design using CSS Flexbox and Grid
- Font Awesome icons for UI elements

**Design Pattern:**
- Multi-page application (MPA) with static HTML pages
- Shared navigation header across all pages
- Modular CSS using CSS custom properties for theming
- Component-based styling (cards, forms, buttons) for reusability

**Rationale:** The static HTML approach provides simplicity and fast initial loads, suitable for a content-focused e-commerce site. CSS Variables enable easy theme customization without preprocessors.

### Page Structure & Routing

**Public Pages:**
- `index.html` - Homepage with hero section, features, and plant previews
- `shop.html` - Product catalog with filtering capabilities
- `product.html` - Individual product detail pages
- `plan-details.html` - Subscription plan comparison and selection
- `contact.html` - Customer inquiry form
- `feedback.html` - User feedback submission

**E-commerce Flow:**
- `cart.html` - Shopping cart management
- `checkout.html` - Order completion with shipping/payment forms

**User Account:**
- `login.html` - User authentication
- `register.html` - New user registration
- `wishlist.html` - User's saved favorite plants
- `profile.html` - User dashboard with orders and saved plants

**Design Decision:** Traditional multi-page structure chosen for SEO benefits and simplicity. Future enhancement could migrate to SPA with client-side routing for smoother navigation.

### State Management

**Current Approach:**
- Client-side state management through JavaScript
- Form data handled via standard HTML forms
- No persistent state management framework

**Future Consideration:** As the application grows, implementing localStorage for cart persistence and session management would improve user experience.

### Styling System

**CSS Architecture:**
- Custom CSS variables for color theming (`--primary-green`, `--cream`, etc.)
- Reusable component classes (`.product-card`, `.form-group`, `.btn`)
- Responsive grid layouts for product displays and forms
- Consistent spacing and shadow variables

**Pros:**
- Lightweight with no build step required
- Easy theme customization through CSS variables
- Fast loading times

**Cons:**
- Manual consistency enforcement across pages
- Limited component reusability compared to CSS-in-JS solutions

### Form Handling & Validation

**Approach:**
- HTML5 native form validation (`required` attributes)
- Client-side JavaScript validation for enhanced UX
- Standard form submissions (no AJAX currently implemented)

**Future Enhancement:** Implementing fetch API for AJAX submissions would enable smoother form interactions without page reloads.

### Authentication Strategy

**Current Implementation:**
- Static login/register pages with client-side validation
- No backend authentication currently implemented

**Recommended Future Architecture:**
- JWT-based authentication for stateless sessions
- Secure cookie storage for auth tokens
- Backend user session management
- Role-based access control for admin features

## External Dependencies

### Asset Storage
- **Location:** `/attached_assets/` directory
- **Content:** Product images, logo, design documentation
- **Format:** Images (WEBP, PNG, JPG), text files

### Planned Integrations (Not Yet Implemented)

**Payment Processing:**
- Stripe or PayPal integration required for checkout functionality
- PCI compliance considerations for payment data handling

**Email Services:**
- Transactional email provider (SendGrid, Mailgun) for order confirmations and notifications
- Newsletter service for subscription plan communications

**AI Plant Assistant:**
- Integration with AI/ML API (OpenAI, custom model) for plant care recommendations
- Real-time chat widget embedded site-wide

**Content Delivery:**
- CDN recommended for image optimization and global delivery
- Image optimization service for product photos

### Database Requirements (Future)

**Recommended Schema:**
- **Users:** Authentication credentials, profile information, preferences
- **Products:** Plant catalog with care specifications, pricing, inventory
- **Orders:** Transaction history, shipping details, order status
- **Subscriptions:** Plan tiers, recurring billing, delivery schedules
- **Reviews:** Product ratings and user feedback

**Technology Options:**
- PostgreSQL for relational data (products, orders, users)
- Redis for session management and cart caching
- Object storage (S3, Cloudinary) for product images

**Rationale:** Relational database chosen for transactional integrity in e-commerce operations. The structured nature of products, orders, and subscriptions fits well with SQL schemas.

### Third-Party Services (Planned)

**Analytics:**
- Google Analytics or privacy-focused alternative for user behavior tracking
- E-commerce tracking for conversion funnel analysis

**Search & Filtering:**
- Algolia or Elasticsearch for advanced product search
- Currently implemented with basic client-side filtering

**Shipping & Logistics:**
- ShipStation or EasyPost for shipping label generation
- Real-time shipping rate calculation API