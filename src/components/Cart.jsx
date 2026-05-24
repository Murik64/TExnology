import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart({ isOpen, onClose, onCheckoutClick }) {
  const { cart, updateQuantity, removeFromCart } = useContext(ShopContext);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        justifyContent: 'flex-end',
        padding: 0
      }}
    >
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          borderRadius: '24px 0 0 24px',
          borderLeft: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Корзина покупок</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--bg-glass)'
            }}
            className="close-cart-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content - Cart Items */}
        <div style={{
          padding: '24px',
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div 
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '16px',
                  alignItems: 'center'
                }}
              >
                {/* Product Image */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#090b11',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.product.brand}
                  </span>
                  <h4 style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginTop: '2px'
                  }}>
                    {item.product.name}
                  </h4>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginTop: '6px'
                  }}>
                    {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>
                </div>

                {/* Actions & Quantity Adjuster */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '10px'
                }}>
                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    className="trash-btn"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Quantity adjustment */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    padding: '2px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      width: '28px',
                      textAlign: 'center',
                      color: 'var(--text-primary)'
                    }}>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            /* Empty State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              <ShoppingBag size={48} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Корзина пуста</h3>
              <p style={{ fontSize: '0.88rem', maxWidth: '280px' }}>
                Добавьте товары из нашего премиального каталога, чтобы начать оформление заказа.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ marginTop: '10px' }}>
                Вернуться к покупкам
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer - Total & Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-glass)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Итого:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {subtotal.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <button 
              onClick={onCheckoutClick}
              className="btn-primary" 
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '16px',
                borderRadius: '14px',
                fontSize: '1rem'
              }}
            >
              <span>Оформить заказ</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .close-cart-btn:hover {
          color: var(--magenta-primary) !important;
          transform: rotate(90deg);
        }
        .trash-btn:hover {
          color: var(--magenta-primary) !important;
        }
      `}</style>
    </div>
  );
}
