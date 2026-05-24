import React from 'react';
import { Cpu, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{
      margin: '40px 20px 20px 20px',
      padding: '40px 40px 20px 40px',
      borderRadius: '24px',
      border: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      {/* Upper features banners */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        borderBottom: '1px solid var(--border-glass)',
        paddingBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--accent-glow)', padding: '10px', borderRadius: '10px', color: 'var(--accent-primary)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Официальная гарантия</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>100% оригинальная продукция</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--magenta-glow)', padding: '10px', borderRadius: '10px', color: 'var(--magenta-primary)' }}>
            <RotateCcw size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Легкий возврат</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>14 дней на обмен без лишних вопросов</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--gold)' }}>
            <CreditCard size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Удобная оплата</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Карты, СБП, Рассрочка 0%</p>
          </div>
        </div>
      </div>

      {/* Footer Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr',
        gap: '40px',
        flexWrap: 'wrap'
      }} className="footer-links-grid">
        
        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={18} color="#08090e" />
            </div>
            <span className="glow-text" style={{ fontSize: '1.2rem', fontWeight: 800 }}>ЭлектроСфера</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '320px' }}>
            Премиальный интернет-магазин современной техники и умной электроники. Воплощение инновационных технологий и эстетики в каждом заказе.
          </p>
        </div>

        {/* Column 2: Specs & Tech Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>Технологии</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li>Реализовано на React + Vite</li>
            <li>Стиль: стеклянный морфизм (Glass)</li>
            <li>Библиотека иконок Lucide-React</li>
            <li>Адаптивная верстка (Mobile First)</li>
          </ul>
        </div>

        {/* Column 3: Contact details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>Контакты</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li>📍 г. Москва, Пресненская наб., д. 12</li>
            <li>📞 8 (800) 555-35-35</li>
            <li>✉️ support@electrosphere.dev</li>
            <li>🤖 Готов к Telegram-боту</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid var(--border-glass)',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        © 2026 ЭлектроСфера. Все права защищены. Разработано специально для демонстрации премиального интернет-магазина.
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </footer>
  );
}
