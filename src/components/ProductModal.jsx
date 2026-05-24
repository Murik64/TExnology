import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Star, Heart, ShoppingCart, Check, ShieldCheck, Truck } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  const { cart, wishlist, addToCart, toggleWishlist } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'reviews'

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!product) return null;

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  // Generate realistic reviews for each product
  const mockReviews = [
    {
      id: 1,
      author: "Александр К.",
      date: "14 мая 2026",
      rating: 5,
      comment: "Потрясающее устройство! Качество сборки на высшем уровне, скорость работы превзошла все ожидания. Рекомендую к покупке однозначно."
    },
    {
      id: 2,
      author: "Елена М.",
      date: "02 мая 2026",
      rating: 4,
      comment: "В целом очень довольна. Все заявленные характеристики соответствуют реальности. Единственный нюанс — немного маркий корпус, но это мелочи по сравнению с его производительностью."
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          borderRadius: '24px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--border-glass)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          className="close-modal-btn"
        >
          <X size={18} />
        </button>

        {/* Modal Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          minHeight: '450px'
        }} className="modal-grid">
          
          {/* Left Column - Image & Actions */}
          <div style={{
            background: '#090b11',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            borderRight: '1px solid var(--border-glass)'
          }}>
            {/* Status tag */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              color: '#10b981',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Check size={12} />
              <span>В наличии</span>
            </div>

            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: '260px',
                objectFit: 'contain',
                borderRadius: '12px',
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))'
              }}
            />

            {/* Price Tag */}
            <div style={{
              marginTop: '30px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Стоимость</span>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginTop: '4px'
              }}>{product.price.toLocaleString('ru-RU')} ₽</h2>
            </div>
          </div>

          {/* Right Column - Specs, Tabs, Details */}
          <div style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            {/* Category and brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--accent-primary)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>{product.brand}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>•</span>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}>{product.category}</span>
            </div>

            {/* Product Title */}
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '12px'
            }}>{product.name}</h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', color: 'var(--gold)' }}>
                <Star size={16} fill="var(--gold)" />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{product.rating}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({product.reviewsCount} отзывов клиентов)</span>
            </div>

            {/* Short Description */}
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>{product.description}</p>

            {/* Tabs Navigation */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-glass)',
              marginBottom: '20px',
              gap: '20px'
            }}>
              <button
                onClick={() => setActiveTab('specs')}
                style={{
                  paddingBottom: '10px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'specs' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: activeTab === 'specs' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Характеристики
              </button>
              
              <button
                onClick={() => setActiveTab('reviews')}
                style={{
                  paddingBottom: '10px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'reviews' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: activeTab === 'reviews' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Отзывы
              </button>
            </div>

            {/* Tab content */}
            <div style={{ flexGrow: 1, marginBottom: '24px' }}>
              {activeTab === 'specs' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div 
                      key={key} 
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.01)',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '6px'
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{key}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {mockReviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{rev.author}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', color: 'var(--gold)', gap: '2px', marginBottom: '8px' }}>
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="var(--gold)" color="var(--gold)" />
                        ))}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '14px',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                <ShieldCheck size={16} color="var(--accent-primary)" />
                <span>Официальная гарантия 2 года</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                <Truck size={16} color="var(--accent-primary)" />
                <span>Быстрая бесплатная доставка</span>
              </div>
            </div>

            {/* Checkout Options */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: 'auto'
            }}>
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="btn-secondary"
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  borderColor: isInWishlist ? 'var(--magenta-primary)' : 'var(--border-glass-hover)',
                  color: isInWishlist ? 'var(--magenta-primary)' : 'var(--text-primary)'
                }}
              >
                <Heart size={18} fill={isInWishlist ? 'var(--magenta-primary)' : 'none'} />
                <span>{isInWishlist ? 'В избранном' : 'В избранное'}</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="btn-primary"
                style={{
                  flexGrow: 1.5,
                  justifyContent: 'center',
                  background: isInCart ? 'linear-gradient(135deg, var(--magenta-primary), var(--magenta-secondary))' : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  boxShadow: isInCart ? '0 4px 15px rgba(244, 63, 94, 0.25)' : '0 4px 15px rgba(0, 242, 254, 0.25)'
                }}
              >
                <ShoppingCart size={18} />
                <span>{isInCart ? 'Добавлено в корзину' : 'Добавить в корзину'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .close-modal-btn:hover {
          background: var(--bg-glass-hover) !important;
          color: var(--magenta-primary) !important;
          transform: rotate(90deg);
        }
        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--border-glass);
            padding: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
