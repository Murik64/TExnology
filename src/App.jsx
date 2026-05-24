import React, { useState, useContext, useEffect } from 'react';
import { ShopProvider, ShopContext } from './context/ShopContext';
import Header from './components/Header';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { Sparkles, Heart, Trash2, ShoppingCart, ArrowRight, X } from 'lucide-react';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { wishlist, toggleWishlist, addToCart, cart } = useContext(ShopContext);

  // Centralized body scroll lock for all interactive overlays
  useEffect(() => {
    if (isCartOpen || isCheckoutOpen || isWishlistOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen, isCheckoutOpen, isWishlistOpen, selectedProduct]);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const handleCheckoutTrigger = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Header component */}
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />

      {/* Hero Banner Section (Rich Aesthetics) */}
      <section style={{
        margin: '0 20px 30px 20px',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-main)',
        border: '1px solid var(--border-glass)'
      }} className="hero-banner">
        
        {/* Animated colorful gradient background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(8, 9, 14, 0.95) 0%, rgba(15, 17, 26, 0.9) 100%)',
          zIndex: 1
        }} />
        
        {/* Glow circles behind text */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
          zIndex: 1
        }} className="pulse-glow" />

        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, transparent 70%)',
          zIndex: 1
        }} />

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '60px 50px',
          maxWidth: '680px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }} className="hero-content">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--accent-glow)',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '6px 14px',
            borderRadius: '20px',
            alignSelf: 'flex-start'
          }}>
            <Sparkles size={14} />
            <span>Технологии Будущего Сегодня</span>
          </div>

          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px'
          }} className="hero-title">
            Премиальная техника для ценителей <span className="glow-text">прогресса</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            Добро пожаловать в ЭлектроСферу. Исследуйте нашу кураторскую подборку ультрасовременных ноутбуков, смартфонов и умных гаджетов с гарантией высшего качества.
          </p>

          <button 
            onClick={() => window.scrollTo({ top: 580, behavior: 'smooth' })}
            className="btn-primary" 
            style={{ alignSelf: 'flex-start', marginTop: '10px' }}
          >
            <span>Перейти к покупкам</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Main Catalog Section */}
      <Catalog onOpenModal={handleOpenProduct} />

      {/* Product Specification Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseProduct}
        />
      )}

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutClick={handleCheckoutTrigger}
      />

      {/* Checkout Process Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Wishlist Modal Overlay */}
      {isWishlistOpen && (
        <div className="modal-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div 
            className="modal-content glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '520px',
              borderRadius: '24px',
              border: '1px solid var(--border-glass)',
              padding: '24px',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-glass)',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={20} fill="var(--magenta-primary)" color="var(--magenta-primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Избранное</h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="close-wishlist-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div style={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {wishlist.length > 0 ? (
                wishlist.map((prod) => {
                  const isInCart = cart.some(item => item.product.id === prod.id);
                  return (
                    <div 
                      key={prod.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '14px'
                      }}
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'contain', background: '#090b11', borderRadius: '8px', padding: '4px' }} 
                      />
                      
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{prod.name}</h4>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{prod.price.toLocaleString('ru-RU')} ₽</span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => addToCart(prod)}
                          style={{
                            background: isInCart ? 'var(--magenta-primary)' : 'var(--accent-primary)',
                            border: 'none',
                            color: '#08090e',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ShoppingCart size={14} />
                        </button>
                        
                        <button
                          onClick={() => toggleWishlist(prod)}
                          style={{
                            background: 'none',
                            border: '1px solid var(--border-glass)',
                            color: 'var(--magenta-primary)',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 0',
                  gap: '12px',
                  color: 'var(--text-muted)',
                  textAlign: 'center'
                }}>
                  <Heart size={36} />
                  <span style={{ fontSize: '0.9rem' }}>В избранном пока пусто</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer component */}
      <Footer />

      <style>{`
        .close-wishlist-btn:hover {
          color: var(--magenta-primary) !important;
          transform: rotate(90deg);
        }
        @media (max-width: 768px) {
          .hero-banner {
            margin: 0 10px 20px 10px !important;
          }
          .hero-content {
            padding: 30px 20px !important;
          }
          .hero-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
