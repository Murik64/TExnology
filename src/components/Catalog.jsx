import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function Catalog({ onOpenModal }) {
  const {
    search,
    category,
    setCategory,
    brand,
    setBrand,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = useContext(ShopContext);

  // Extract unique brands and categories for filtering
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const brands = ['All', ...new Set(products.map(p => p.brand))];

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.brand.toLowerCase().includes(search.toLowerCase()) ||
                          product.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    const matchesBrand = brand === 'All' || product.brand === brand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default popularity: reviewsCount * rating
    return (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating);
  });

  // Pagination Logic
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setCategory('All');
    setBrand('All');
    setPriceRange([0, 400000]);
    setMinRating(0);
    setSortBy('popularity');
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '30px',
      margin: '0 20px 40px 20px',
      alignItems: 'start'
    }} className="catalog-container">
      
      {/* Sidebar Filters */}
      <aside className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'sticky',
        top: '120px',
        maxHeight: 'calc(100vh - 160px)',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
          <SlidersHorizontal size={18} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Фильтры</h2>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span className="form-label">Категория</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: category === cat ? 'var(--bg-glass-hover)' : 'transparent',
                  border: '1px solid ' + (category === cat ? 'var(--accent-primary)' : 'transparent'),
                  color: category === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: category === cat ? 700 : 500,
                  fontSize: '0.9rem',
                }}
                className="filter-btn-hover"
              >
                {cat === 'All' ? 'Все категории' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span className="form-label">Бренд</span>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="form-input"
            style={{
              padding: '10px 12px',
              fontSize: '0.85rem',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.15)',
              cursor: 'pointer'
            }}
          >
            {brands.map(b => (
              <option key={b} value={b} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                {b === 'All' ? 'Все бренды' : b}
              </option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="form-label">Цена (до)</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {priceRange[1].toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="400000"
            step="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>10 000 ₽</span>
            <span>400 000 ₽</span>
          </div>
        </div>

        {/* Ratings Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span className="form-label">Минимальный рейтинг</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[0, 4.5, 4.7, 4.8, 4.9].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                style={{
                  flexGrow: 1,
                  padding: '8px 0',
                  borderRadius: '8px',
                  background: minRating === rating ? 'var(--accent-primary)' : 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  color: minRating === rating ? '#08090e' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                {rating === 0 ? 'Все' : `${rating}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Buttons */}
        <button
          onClick={handleResetFilters}
          className="btn-secondary"
          style={{
            marginTop: '10px',
            justifyContent: 'center',
            fontSize: '0.85rem',
            padding: '10px'
          }}
        >
          Сбросить фильтры
        </button>
      </aside>

      {/* Main Grid View */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Sort and Count Header */}
        <div className="glass-panel" style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderRadius: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Найдено товаров: <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{
                padding: '8px 12px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <option value="popularity" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>По популярности</option>
              <option value="price-low" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Сначала дешевые</option>
              <option value="price-high" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Сначала дорогие</option>
              <option value="rating" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>По рейтингу</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {currentItems.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {currentItems.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{
            padding: '80px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <SlidersHorizontal size={48} color="var(--text-muted)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Ничего не найдено</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '0.9rem' }}>
              К сожалению, по вашим параметрам фильтрации не нашлось товаров. Попробуйте сбросить фильтры или изменить поисковый запрос.
            </p>
            <button onClick={handleResetFilters} className="btn-primary" style={{ marginTop: '10px' }}>
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '30px',
            padding: '16px',
          }}>
            {/* Prev button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ArrowLeft size={16} />
            </button>

            {/* Pages mapping */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: currentPage === pageNum ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--bg-glass)',
                  border: '1px solid ' + (currentPage === pageNum ? 'var(--accent-primary)' : 'var(--border-glass)'),
                  color: currentPage === pageNum ? '#08090e' : 'var(--text-primary)',
                  cursor: 'pointer',
                  boxShadow: currentPage === pageNum ? '0 4px 10px rgba(0, 242, 254, 0.2)' : 'none'
                }}
              >
                {pageNum}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </main>

      <style>{`
        .filter-btn-hover:hover {
          background: var(--border-glass) !important;
          color: var(--text-primary) !important;
        }
        @media (max-width: 1024px) {
          .catalog-container {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: relative !important;
            top: 0 !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
}
