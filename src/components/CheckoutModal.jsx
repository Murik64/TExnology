import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Send, CheckCircle2, Loader2, Sparkles, AlertCircle, Settings, Check, RefreshCw } from 'lucide-react';

const BOT_TOKEN = '8855801220:AAE5EzWknMlnTfe1_ycZ8BpvhPKasD2OpV8';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, clearCart } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    delivery: 'courier',
    notes: ''
  });

  // Telegram Integration States
  const [chatId, setChatId] = useState(() => localStorage.getItem('tg_chat_id') || '');
  const [botUsername, setBotUsername] = useState('');
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [tgStatus, setTgStatus] = useState({ loading: false, message: '', type: '' }); // 'success' or 'error'

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Disable body scroll when modal is open
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

  // Fetch Bot Profile on Open
  useEffect(() => {
    if (isOpen) {
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
        .then(res => res.json())
        .then(data => {
          if (data.ok && data.result) {
            setBotUsername(data.result.username);
          }
        })
        .catch(err => console.error("Ошибка при получении данных о боте:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Automated Chat ID Lookup Logic
  const handleAutoDetectChatId = async () => {
    setTgStatus({ loading: true, message: 'Сканирование входящих сообщений бота...', type: '' });
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-1`);
      const data = await res.json();
      
      if (data.ok && data.result && data.result.length > 0) {
        const latestUpdate = data.result[data.result.length - 1];
        let chat = null;
        let senderName = '';

        if (latestUpdate.message) {
          chat = latestUpdate.message.chat;
          senderName = latestUpdate.message.from.first_name || 'Администратор';
        } else if (latestUpdate.callback_query) {
          chat = latestUpdate.callback_query.message.chat;
          senderName = latestUpdate.callback_query.from.first_name || 'Администратор';
        }

        if (chat && chat.id) {
          const detectedId = chat.id.toString();
          setChatId(detectedId);
          localStorage.setItem('tg_chat_id', detectedId);
          setTgStatus({
            loading: false,
            message: `Бот успешно привязан к чату: ${senderName} (ID: ${detectedId})`,
            type: 'success'
          });
        } else {
          throw new Error('Не удалось извлечь Chat ID из сообщения.');
        }
      } else {
        setTgStatus({
          loading: false,
          message: 'Активных сообщений не обнаружено. Пожалуйста, напишите вашему боту любое сообщение в Telegram (или нажмите /start) и повторите попытку!',
          type: 'error'
        });
      }
    } catch (err) {
      console.error(err);
      setTgStatus({
        loading: false,
        message: 'Не удалось подключиться к Telegram API. Проверьте интернет-соединение или повторите попытку.',
        type: 'error'
      });
    }
  };

  // Order Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setError('Пожалуйста, заполните все обязательные поля (Имя, Телефон, Адрес)');
      return;
    }

    if (!chatId && !isSandboxMode) {
      setError('Укажите ваш Telegram Chat ID в панели настроек ниже или включите «Тестовый режим»!');
      setShowAdminPanel(true);
      return;
    }

    setError('');
    setLoading(true);

    // Format Product details for message
    const itemsText = cart.map(item => 
      `• *${item.product.name}* (${item.quantity} шт.) — ${(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽`
    ).join('\n');

    // Build Premium Markdown invoice message
    const messageText = `📦 *НОВЫЙ ЗАКАЗ В МАГАЗИНЕ «ЭЛЕКТРОСФЕРА»*\n\n` +
      `👤 *Клиент:* ${formData.name}\n` +
      `📞 *Телефон:* ${formData.phone}\n` +
      `📍 *Адрес доставки:* ${formData.address}\n` +
      `🚚 *Способ:* ${formData.delivery === 'courier' ? 'Курьерская экспресс-доставка' : 'Самовывоз из шоурума'}\n` +
      (formData.notes ? `💬 *Комментарий:* ${formData.notes}\n` : '') +
      `\n---------------------------------------\n` +
      `💻 *ЗАКАЗАННЫЕ ТОВАРЫ:*\n${itemsText}\n` +
      `---------------------------------------\n\n` +
      `💰 *ИТОГО К ОПЛАТЕ: ${subtotal.toLocaleString('ru-RU')} ₽*`;

    if (isSandboxMode) {
      // Simulate sandbox order delay
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1200);
    } else {
      // Send real Telegram message
      try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: 'Markdown'
          })
        });

        const resData = await response.json();

        if (resData.ok) {
          setLoading(false);
          setSuccess(true);
        } else {
          throw new Error(resData.description || 'Неизвестная ошибка Telegram API');
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(`Ошибка отправки в Telegram: ${err.message}. Убедитесь, что вы активировали вашего бота (нажали /start) перед отправкой заказа!`);
      }
    }
  };

  const handleFinalize = () => {
    clearCart();
    setSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '580px',
          borderRadius: '24px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--border-glass)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            {success ? 'Заказ оформлен!' : 'Оформление заказа'}
          </h3>
          {!loading && (
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
              className="close-checkout-btn"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div style={{ padding: '24px' }}>
          {loading ? (
            /* Loading State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 0',
              gap: '20px',
              textAlign: 'center'
            }}>
              <Loader2 size={48} className="spinner" color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Отправка заказа...</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                {isSandboxMode ? 'Регистрация тестовой покупки...' : 'Передача заказа администратору в Telegram-бот...'}
              </p>
            </div>
          ) : success ? (
            /* Success View */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px',
              padding: '10px 0'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '2px solid #10b981',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
              }} className="pulse-glow-success">
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Заявка успешно отправлена!</h2>
              
              <div className="glass-panel" style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-glass)',
                textAlign: 'left',
                fontSize: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '6px', fontWeight: 700 }}>
                  Детали заказа для отправки:
                </div>
                <div>👤 <strong>Получатель:</strong> {formData.name}</div>
                <div>📞 <strong>Телефон:</strong> {formData.phone}</div>
                <div>📍 <strong>Адрес доставки:</strong> {formData.address}</div>
                <div>🚚 <strong>Метод доставки:</strong> {formData.delivery === 'courier' ? 'Курьерская экспресс-доставка' : 'Самовывоз из шоурума'}</div>
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                  <span>Сумма покупки:</span>
                  <span style={{ color: 'var(--accent-primary)' }}>{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <div style={{
                background: isSandboxMode ? 'rgba(0, 242, 254, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                border: '1px dashed ' + (isSandboxMode ? 'var(--accent-primary)' : '#10b981'),
                padding: '16px',
                borderRadius: '16px',
                textAlign: 'left',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                color: 'var(--text-secondary)'
              }}>
                {isSandboxMode ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '6px' }}>
                      <Sparkles size={16} color="var(--accent-primary)" />
                      <span>Тестовая покупка</span>
                    </div>
                    Заказ оформлен в демонстрационном режиме без отправки уведомления.
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, marginBottom: '6px' }}>
                      <Check size={16} />
                      <span>Отправлено в Telegram</span>
                    </div>
                    Заказ успешно отправлен администратору в ваш Telegram-чат! Бот отправил детальный чек со всеми товарами и контактными данными клиента.
                  </>
                )}
              </div>

              <button 
                onClick={handleFinalize} 
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  marginTop: '10px'
                }}
              >
                Закрыть и продолжить покупки
              </button>
            </div>
          ) : (
            /* Main Form View */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div style={{
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid var(--magenta-primary)',
                  color: 'var(--magenta-primary)',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div className="form-group">
                <label className="form-label">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Иван Иванов"
                  className="form-input"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">Номер телефона *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (999) 123-45-67"
                  className="form-input"
                  required
                />
              </div>

              {/* Address */}
              <div className="form-group">
                <label className="form-label">Адрес доставки *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="г. Москва, ул. Пушкина, д. 10, кв. 5"
                  className="form-input"
                  required
                />
              </div>

              {/* Delivery method */}
              <div className="form-group">
                <label className="form-label">Способ доставки</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <label style={{
                    border: '1px solid ' + (formData.delivery === 'courier' ? 'var(--accent-primary)' : 'var(--border-glass)'),
                    background: formData.delivery === 'courier' ? 'rgba(0, 242, 254, 0.05)' : 'transparent',
                    padding: '12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '0.8rem',
                    gap: '4px'
                  }}>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="courier" 
                      checked={formData.delivery === 'courier'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <strong style={{ color: 'var(--text-primary)' }}>Курьерская</strong>
                    <span style={{ color: 'var(--text-muted)' }}>Бесплатно, 1-2 дня</span>
                  </label>

                  <label style={{
                    border: '1px solid ' + (formData.delivery === 'pickup' ? 'var(--accent-primary)' : 'var(--border-glass)'),
                    background: formData.delivery === 'pickup' ? 'rgba(0, 242, 254, 0.05)' : 'transparent',
                    padding: '12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '0.8rem',
                    gap: '4px'
                  }}>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="pickup" 
                      checked={formData.delivery === 'pickup'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <strong style={{ color: 'var(--text-primary)' }}>Самовывоз</strong>
                    <span style={{ color: 'var(--text-muted)' }}>Из шоурума, сегодня</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label">Комментарий к заказу</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Дополнительные пожелания к заказу..."
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                />
              </div>

              {/* Telegram bot admin settings panel */}
              <div className="glass-panel" style={{
                borderRadius: '16px',
                border: '1px solid var(--border-glass)',
                overflow: 'hidden'
              }}>
                <button
                  type="button"
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: 'none',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={16} color="var(--accent-primary)" />
                    <span>⚙️ Настройка Telegram (для Администратора)</span>
                  </div>
                  <span>{showAdminPanel ? '▼' : '▶'}</span>
                </button>

                {showAdminPanel && (
                  <div style={{ padding: '16px', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    
                    {botUsername && (
                      <div style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        background: 'rgba(0, 242, 254, 0.05)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-glass)'
                      }}>
                        🤖 Подключен бот: <strong>@{botUsername}</strong>
                      </div>
                    )}

                    {/* Chat ID Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Ваш Chat ID</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={chatId}
                          onChange={(e) => {
                            setChatId(e.target.value);
                            localStorage.setItem('tg_chat_id', e.target.value);
                          }}
                          placeholder="Введите ваш Chat ID (например, 123456789)"
                          className="form-input"
                          style={{ padding: '8px 12px', fontSize: '0.82rem', flexGrow: 1 }}
                        />
                        <button
                          type="button"
                          onClick={handleAutoDetectChatId}
                          disabled={tgStatus.loading}
                          className="btn-secondary"
                          style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '0.75rem', gap: '4px', flexShrink: 0 }}
                          title="Определить автоматически из последнего входящего сообщения боту"
                        >
                          {tgStatus.loading ? (
                            <Loader2 size={14} className="spinner" />
                          ) : (
                            <RefreshCw size={14} />
                          )}
                          <span>Определить</span>
                        </button>
                      </div>
                    </div>

                    {/* Telegram auto status */}
                    {tgStatus.message && (
                      <div style={{
                        fontSize: '0.78rem',
                        color: tgStatus.type === 'error' ? 'var(--magenta-primary)' : tgStatus.type === 'success' ? '#10b981' : 'var(--text-secondary)',
                        padding: '8px 10px',
                        background: tgStatus.type === 'error' ? 'rgba(244, 63, 94, 0.05)' : tgStatus.type === 'success' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.02)',
                        borderRadius: '8px',
                        border: '1px solid ' + (tgStatus.type === 'error' ? 'rgba(244, 63, 94, 0.2)' : tgStatus.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-glass)'),
                        lineHeight: 1.4
                      }}>
                        {tgStatus.message}
                      </div>
                    )}

                    {/* Instruction */}
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                      borderTop: '1px solid rgba(255,255,255,0.03)',
                      paddingTop: '10px'
                    }}>
                      💡 <strong>Как настроить уведомления:</strong><br />
                      1. Откройте в Telegram вашего бота {botUsername ? <strong>@{botUsername}</strong> : 'по токену'} и нажмите кнопку <strong>Запустить</strong> (или отправьте любое сообщение).<br />
                      2. Нажмите кнопку <strong>Определить</strong> выше, чтобы сайт автоматически получил ваш Chat ID.<br />
                      3. Или укажите ID вручную (можно узнать в боте <code>@userinfobot</code>).
                    </div>

                    {/* Mode toggles */}
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      borderTop: '1px solid rgba(255,255,255,0.03)',
                      paddingTop: '10px'
                    }}>
                      <input
                        type="checkbox"
                        checked={isSandboxMode}
                        onChange={(e) => setIsSandboxMode(e.target.checked)}
                      />
                      <span>Включить тестовый режим (симуляция без отправки в Telegram)</span>
                    </label>

                  </div>
                )}
              </div>

              {/* Price summary & CTA */}
              <div style={{
                marginTop: '10px',
                borderTop: '1px solid var(--border-glass)',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>К оплате:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {subtotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    borderRadius: '12px'
                  }}
                >
                  <Send size={16} />
                  <span>{isSandboxMode ? 'Разместить тест-заказ' : 'Подтвердить и отправить заказ'}</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

      <style>{`
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .close-checkout-btn:hover {
          color: var(--magenta-primary) !important;
          transform: rotate(90deg);
        }
        @keyframes pulseGlowSuccess {
          0% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.1); }
          100% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.35); }
        }
        .pulse-glow-success {
          animation: pulseGlowSuccess 2s infinite alternate;
        }
      `}</style>
    </div>
  );
}
