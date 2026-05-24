import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ product, onOpenModal }) {
  const { cart, wishlist, addToCart, toggleWishlist } = useContext(ShopContext);

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      {/* Wishlist Button (Heart) */}
      <button
        onClick={() => toggleWishlist(product)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 10,
          background: 'rgba(15, 17, 26, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: isInWishlist ? 'var(--magenta-primary)' : '#ffffff',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="wishlist-btn-hover"
      >
        <Heart size={18} fill={isInWishlist ? 'var(--magenta-primary)' : 'none'} />
      </button>

      {/* Image and Hover Actions */}
      <div style={{
        position: 'relative',
        height: '220px',
        overflow: 'hidden',
        background: '#0c0e14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} className="card-image-container">
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
          }}
          className="card-image"
        />
        
        {/* Hover overlay with button */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(8, 9, 14, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(4px)'
        }} className="card-overlay">
          <button
            onClick={() => onOpenModal(product)}
            className="btn-secondary"
            style={{
              padding: '10px 18px',
              fontSize: '0.85rem',
              background: '#08090e',
              border: '1px solid var(--accent-primary)',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0, 242, 254, 0.15)'
            }}
          >
            <Eye size={16} color="var(--accent-primary)" />
            <span>Подробнее</span>
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '12px'
      }}>
        {/* Brand and category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--accent-primary)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>{product.brand}</span>
          
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 600
          }}>{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onOpenModal(product)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            lineHeight: 1.4,
            height: '42px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            margin: '2px 0 6px 0'
          }}
          className="product-title-hover"
        >
          {product.name}
        </h3>

        {/* Rating stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', color: 'var(--gold)' }}>
            <Star size={14} fill="var(--gold)" />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{product.rating}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({product.reviewsCount} отзывов)</span>
        </div>

        {/* Specifications snippet */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px 10px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          border: '1px solid var(--border-glass)'
        }}>
          {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{key}:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Price and Cart Action */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-glass)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Цена</span>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)'
            }}>{formatPrice(product.price)}</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="btn-primary"
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              background: isInCart ? 'linear-gradient(135deg, var(--magenta-primary), var(--magenta-secondary))' : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              boxShadow: isInCart ? '0 4px 15px rgba(244, 63, 94, 0.25)' : '0 4px 15px rgba(0, 242, 254, 0.25)'
            }}
          >
            <ShoppingCart size={16} />
            <span>{isInCart ? 'В корзине' : 'Купить'}</span>
          </button>
        </div>
      </div>

      {/* Styled hover states injection */}
      <style>{`
        .card-image-container:hover .card-image {
          transform: scale(1.08);
        }
        .card-image-container:hover .card-overlay {
          opacity: 1 !important;
        }
        .product-title-hover:hover {
          color: var(--accent-primary) !important;
        }
        .wishlist-btn-hover:hover {
          transform: scale(1.15) !important;
          background: rgba(15, 17, 26, 0.9) !important;
        }
      `}</style>
    </div>
  );
}
