import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Sun, Moon, Cpu } from 'lucide-react';

export default function Header({ onCartClick, onWishlistClick }) {
  const { theme, toggleTheme, cart, wishlist, search, setSearch } = useContext(ShopContext);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '20px',
      zIndex: 100,
      margin: '0 20px 30px 20px',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      borderRadius: '20px',
      border: '1px solid var(--border-glass)',
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          padding: '8px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 242, 254, 0.2)'
        }}>
          <Cpu size={24} color="#08090e" />
        </div>
        <span className="glow-text" style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          letterSpacing: '1px',
          fontFamily: 'Outfit'
        }}>ЭлектроСфера</span>
      </div>

      {/* Modern Search Bar */}
      <div style={{
        position: 'relative',
        maxWidth: '480px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
        <input
          type="text"
          placeholder="Поиск новейшей техники..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{
            width: '100%',
            padding: '10px 16px 10px 48px',
            borderRadius: '14px',
            fontSize: '0.9rem',
          }}
        />
        <Search size={18} color="var(--text-secondary)" style={{
          position: 'absolute',
          left: '16px',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Interactive Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Wishlist Button */}
        <button 
          onClick={onWishlistClick}
          className="btn-icon" 
          title="Избранное"
          style={{ position: 'relative' }}
        >
          <Heart size={20} fill={wishlistItemsCount > 0 ? "var(--magenta-primary)" : "none"} color={wishlistItemsCount > 0 ? "var(--magenta-primary)" : "var(--text-primary)"} />
          {wishlistItemsCount > 0 && (
            <span className="badge" style={{ background: 'linear-gradient(135deg, var(--magenta-primary), var(--magenta-secondary))' }}>
              {wishlistItemsCount}
            </span>
          )}
        </button>

        {/* Shopping Cart Button */}
        <button 
          onClick={onCartClick}
          className="btn-icon" 
          title="Корзина"
          style={{ position: 'relative' }}
        >
          <ShoppingBag size={20} />
          {cartItemsCount > 0 && (
            <span className="badge" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', color: '#08090e' }}>
              {cartItemsCount}
            </span>
          )}
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="btn-icon" 
          title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
