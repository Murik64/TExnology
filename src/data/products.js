export const products = [
  {
    id: 1,
    name: "Apple MacBook Pro 16\"",
    category: "Laptops",
    brand: "Apple",
    price: 349990,
    rating: 4.9,
    reviewsCount: 124,
    description: "Ультимативный ноутбук для профессионалов. Оснащен чипом M3 Max, 36 ГБ объединенной памяти и накопителем на 1 ТБ. Невероятный дисплей Liquid Retina XDR 16 дюймов.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Процессор": "Apple M3 Max (14 ядер)",
      "Оперативная память": "36 ГБ",
      "Накопитель": "1 ТБ SSD",
      "Дисплей": "16.2\" Liquid Retina XDR (3456x2234)",
      "Время работы": "До 22 часов",
      "Вес": "2.16 кг"
    }
  },
  {
    id: 2,
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    brand: "ASUS",
    price: 189990,
    rating: 4.8,
    reviewsCount: 86,
    description: "Мощный игровой ноутбук в компактном 14-дюймовом корпусе. Процессор AMD Ryzen 9 и видеокарта NVIDIA RTX 4070 обеспечивают бескомпромиссную производительность.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Процессор": "AMD Ryzen 9 7940HS",
      "Видеокарта": "NVIDIA GeForce RTX 4070 8GB",
      "Оперативная память": "16 ГБ DDR5",
      "Накопитель": "1 ТБ SSD NVMe",
      "Дисплей": "14\" QHD+ OLED 120Hz",
      "Вес": "1.65 кг"
    }
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max 256GB",
    category: "Phones",
    brand: "Apple",
    price: 139990,
    rating: 4.9,
    reviewsCount: 312,
    description: "Первый iPhone в титановом корпусе космического уровня. Революционный чип A17 Pro, настраиваемая кнопка Action и самая мощная система камер в истории iPhone.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Материал корпуса": "Титан",
      "Процессор": "Apple A17 Pro",
      "Экран": "6.7\" Super Retina XDR OLED 120Гц",
      "Основная камера": "48 Мп + 12 Мп + 12 Мп (5x зум)",
      "Вес": "221 г",
      "Влагозащита": "IP68"
    }
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    brand: "Samsung",
    price: 124990,
    rating: 4.7,
    reviewsCount: 198,
    description: "Встречайте эру мобильного AI с Galaxy S24 Ultra. Титановый корпус, встроенное перо S Pen и революционная камера 200 Мп с интеллектуальным зумом.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Процессор": "Snapdragon 8 Gen 3 for Galaxy",
      "Оперативная память": "12 ГБ",
      "Встроенная память": "256 ГБ",
      "Экран": "6.8\" Dynamic AMOLED 2X QHD+",
      "Камера": "200 Мп + 50 Мп + 12 Мп + 10 Мп",
      "Аккумулятор": "5000 мАч"
    }
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    category: "Audio",
    brand: "Sony",
    price: 39990,
    rating: 4.8,
    reviewsCount: 245,
    description: "Лучшие в классе беспроводные наушники с активным шумоподавлением. Превосходный звук высокой четкости, 30 часов работы и интеллектуальное управление Smart Listening.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Тип наушников": "Полноразмерные, закрытые",
      "Подключение": "Bluetooth 5.2 / проводное",
      "Шумоподавление": "Активное (ANC), 8 микрофонов",
      "Время работы": "До 30 часов (с ANC)",
      "Быстрая зарядка": "3 минуты на 3 часа работы",
      "Вес": "250 г"
    }
  },
  {
    id: 6,
    name: "Apple AirPods Max",
    category: "Audio",
    brand: "Apple",
    price: 64990,
    rating: 4.6,
    reviewsCount: 154,
    description: "Идеальное сочетание роскошного звука высокой четкости и передового активного шумоподавления. Индивидуальный дизайн оголовья обеспечивает невероятный комфорт.",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Акустическое оформление": "Закрытое",
      "Шумоподавление": "Активное (ANC) + прозрачный режим",
      "Процессор": "Apple H1 (в каждом наушнике)",
      "Время работы": "До 20 часов",
      "Материал амбушюр": "Сетчатая ткань / пена с эффектом памяти",
      "Вес": "384.8 г"
    }
  },
  {
    id: 7,
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    brand: "Apple",
    price: 89990,
    rating: 4.9,
    reviewsCount: 95,
    description: "Самые прочные и функциональные часы Apple Watch. Титановый корпус 49 мм, сверхъяркий дисплей Always-On Retina и до 36 часов работы в обычном режиме.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Размер корпуса": "49 мм",
      "Материал": "Аэрокосмический титан, сапфировое стекло",
      "Яркость дисплея": "До 3000 нит",
      "Защита от воды": "До 100 метров (WR100)",
      "Датчики": "Глубиномер, температура воды, ЭКГ, пульс",
      "Время работы": "До 36 часов (до 72 часов в энергосбережении)"
    }
  },
  {
    id: 8,
    name: "Garmin Fenix 7X Pro",
    category: "Wearables",
    brand: "Garmin",
    price: 98990,
    rating: 4.8,
    reviewsCount: 73,
    description: "Мультиспортивные GPS-часы премиум-класса с подзарядкой от солнечной энергии и встроенным светодиодным фонариком. Созданы для самых суровых испытаний.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Материал стекла": "Power Sapphire (солнечная батарея)",
      "Диаметр корпуса": "51 мм",
      "Навигация": "Многополосный GPS, ГЛОНАСС, Galileo",
      "Фонарик": "Встроенный светодиодный (белый/красный)",
      "Время работы": "До 37 дней в режиме смарт-часов",
      "Вес": "89 г"
    }
  },
  {
    id: 9,
    name: "Apple HomePod 2nd Gen",
    category: "Smart Home",
    brand: "Apple",
    price: 34990,
    rating: 4.7,
    reviewsCount: 112,
    description: "Акустическая система с потрясающим богатым звуком глубокого баса и чистых высоких частот. Встроенный датчик температуры и влажности, интеграция с умным домом HomeKit.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Динамики": "Низкочастотный 4\" + 5 высокочастотных",
      "Процессор": "Apple S7",
      "Микрофоны": "4 микрофона для Siri",
      "Беспроводная связь": "Wi-Fi, Bluetooth 5.0, Thread",
      "Датчики": "Температура, влажность, распознавание звуков",
      "Вес": "2.3 кг"
    }
  },
  {
    id: 10,
    name: "Philips Hue Starter Kit",
    category: "Smart Home",
    brand: "Philips",
    price: 19990,
    rating: 4.5,
    reviewsCount: 68,
    description: "Стартовый набор умного освещения Philips Hue. Включает 3 цветные светодиодные лампы E27, пульт управления и блок Hue Bridge. 16 миллионов цветов для идеальной атмосферы.",
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Тип цоколя": "E27",
      "Мощность лампы": "9 Вт (эквивалент 75 Вт)",
      "Световой поток": "1100 люмен",
      "Цветовая температура": "2000K - 6500K + 16 млн цветов",
      "Срок службы": "До 25 000 часов",
      "Управление": "Приложение, Siri, Google Assistant, Alexa"
    }
  },
  {
    id: 11,
    name: "DJI Mini 4 Pro Fly More",
    category: "Smart Home",
    brand: "DJI",
    price: 114990,
    rating: 4.9,
    reviewsCount: 104,
    description: "Миниатюрный квадрокоптер весом менее 249 грамм. Запись видео в формате 4K/60fps HDR, вертикальная съемка и всенаправленное обнаружение препятствий для максимальной безопасности.",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Вес": "249 г",
      "Разрешение видео": "4K HDR @ 60fps / 4K @ 100fps",
      "Время полета": "До 34 минут (на одной батарее)",
      "Дальность передачи": "До 20 км (O4 FHD)",
      "Безопасность": "Всенаправленное распознавание препятствий",
      "Комплектация": "Пульт DJI RC 2, 3 батареи, сумка, зарядный хаб"
    }
  },
  {
    id: 12,
    name: "Sony PlayStation 5 Slim",
    category: "Smart Home",
    brand: "Sony",
    price: 54990,
    rating: 4.8,
    reviewsCount: 388,
    description: "Новая облегченная версия легендарной игровой консоли PlayStation 5. Молниеносный SSD обеспечивает мгновенную загрузку, а тактильная отдача DualSense погружает в игру целиком.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Тип": "Игровая консоль",
      "Процессор": "AMD Ryzen Zen 2 (8 ядер)",
      "Графический процессор": "AMD Radeon RDNA 2 (10.3 TFLOPS)",
      "Оперативная память": "16 ГБ GDDR6",
      "Накопитель": "1 ТБ SSD",
      "Оптический привод": "Ultra HD Blu-ray (съемный)",
      "Поддержка разрешения": "До 4K 120Hz / 8K"
    },
  },
  {
    id: 12,
    name: "Sony PlayStation 5 Slim",
    category: "Smart Home",
    brand: "Sony",
    price: 54990,
    rating: 4.8,
    reviewsCount: 388,
    description: "Новая облегченная версия легендарной игровой консоли PlayStation 5. Молниеносный SSD обеспечивает мгновенную загрузку, а тактильная отдача DualSense погружает в игру целиком.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    specs: {
      "Тип": "Игровая консоль",
      "Процессор": "AMD Ryzen Zen 2 (8 ядер)",
      "Графический процессор": "AMD Radeon RDNA 2 (10.3 TFLOPS)",
      "Оперативная память": "16 ГБ GDDR6",
      "Накопитель": "1 ТБ SSD",
      "Оптический привод": "Ultra HD Blu-ray (съемный)",
      "Поддержка разрешения": "До 4K 120Hz / 8K"
    },
  }
];
