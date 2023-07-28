import i18n from './i18next.js';
import ru from './locales/ru.js';

const candles = [
  { name: 'blueberry', size: 'big', price: '1800' },
  { name: 'cappuccino', size: 'big', price: '1800'},
  { name: 'firework', size: 'big', price: '1800'},
  { name: 'grass', size: 'big', price: '1800'},
  { name: 'lavender', size: 'big', price: '1800'},
  { name: 'nuts', size: 'big', price: '1800'},
  { name: 'blueberry', size: 'small', price: '1200' },
  { name: 'cappuccino', size: 'small', price: '1200'},
  { name: 'firework', size: 'small', price: '1800'},
  { name: 'grass', size: 'small', price: '1200'},
  { name: 'lavender', size: 'small', price: '1200'},
  { name: 'nuts', size: 'small', price: '1200'},
];

i18n.init({
  lng: 'ru',
  resources: {
    ru,
  },
});

const itemsList = document.querySelector('.items');
const renderItemCards = () => {
  candles.map((candle) => {
    const item = document.createElement('div');
    item.classList.add('item-card');
    const { name, size, price } = candle;
    item.innerHTML = `<img class="item-image" src="./image/${size}-${name}.png" alt="candle ${name} pic">
    <p class="item-name">Ароматическая свеча<br>"${i18n.t(name)}"</p>
    <p class="item-price">${price} руб.</p>
    <button class="item-button"><a class="item-button-link">${i18n.t('addToCart')}</a></button>`;
    itemsList.append(item);
  });
};

renderItemCards();