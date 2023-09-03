import i18n from './i18next.js';
import ru from './locales/ru.js';

const candles = [
  { name: 'blueberry', id: 0, size: 'big', price: '1800', newItem: true },
  { name: 'cappuccino', id: 1, size: 'big', price: '1800', newItem: false },
  { name: 'firework', id: 2, size: 'big', price: '1800', newItem: false },
  { name: 'grass', id: 3, size: 'big', price: '1800', newItem: true },
  { name: 'lavender', id: 4, size: 'big', price: '1800', newItem: false },
  { name: 'nuts', id: 5, size: 'big', price: '1800', newItem: false },
  { name: 'blueberry', id: 6, size: 'small', price: '1200', newItem: false },
  { name: 'cappuccino', id: 7, size: 'small', price: '1200', newItem: true },
  { name: 'firework', id: 8, size: 'small', price: '1800', newItem: false },
  { name: 'grass', id: 9, size: 'small', price: '1200', newItem: true },
  { name: 'lavender', id: 10, size: 'small', price: '1200', newItem: false },
  { name: 'nuts', id: 11, size: 'small', price: '1200', newItem: false },
];

i18n.init({
  lng: 'ru',
  resources: {
    ru,
  },
});

const basketCount = document.querySelector('.basket-count');
let basketItemsCount = 0;
let basketFullPrice = 0;

const itemsList = document.querySelector('.items');
const renderItemCards = (items) => {
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  items.map((candle) => {
    const item = document.createElement('div');
    item.classList.add('item-card');
    const { name, id, size, price, newItem } = candle;

    if(newItem) {
      const pElNew = document.createElement('p');
      pElNew.classList.add('new-item');
      pElNew.textContent = 'new';
      item.append(pElNew);
    }

    const img = document.createElement('img');
    img.classList.add('item-image');
    img.setAttribute('src', `./image/${size}-${name}.png`);
    img.setAttribute('alt', `candle ${name} pic`);
    item.append(img);

    const pElName = document.createElement('p');
    pElName.classList.add('item-name');
    pElName.textContent = 'Ароматическая свеча \n' + '"' + i18n.t(name) + '"';
    item.append(pElName);

    const pElPrice = document.createElement('p');
    pElPrice.classList.add('item-price');
    pElPrice.setAttribute('id', `price-${id}`);
    pElPrice.textContent = `${price} ${i18n.t('currency')}`;
    item.append(pElPrice);

    const itemBtn = document.createElement('button');
    itemBtn.classList.add('item-button');
    itemBtn.setAttribute('id', id);
    itemBtn.textContent = i18n.t('addToCart');
    item.append(itemBtn);
    itemsList.append(item);
  });

  const buttons = document.querySelectorAll('.item-button');
  buttons.forEach((button) => {
    button.addEventListener('click',({ target }) => {
      const { id } = target;
      const priceEl = document.querySelector(`#price-${id}`);
      const price = Number(priceEl.textContent.slice(0, -5));
      const newPrice = Number(basketCount.textContent.slice(0, -5)) + price;
      basketItemsCount += 1;
      basketFullPrice += price;
      basketCount.textContent = `${newPrice} ${i18n.t('currency')}`;
    });
  });
};
renderItemCards(candles);

document.querySelector('.new-button').addEventListener('click', (e) => {
  e.preventDefault();
  const newItems = candles.filter((candle) => candle.newItem === true);
  console.log(newItems);
  renderItemCards(newItems);
});

document.querySelector('.katalog-button').addEventListener('click', () => renderItemCards(candles));

const leftMenuModal = document.querySelector('.modal-left-menu');
const leftMenuModalBox = document.querySelector('.modal-left-menu-box');
const leftMenuContext = document.querySelector('.modal-left-menu-content');
const showAboutModalBtn = document.querySelector('.about-button');
const showDeliveryModalBtn = document.querySelector('.delivery-button');
const closeLeftMenuModalBtn = document.getElementById('close-left-menu');

let isModalLeftMenuOpen = false;

showAboutModalBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = 'Мы знаем секретную формулу! Мы бренд свечей из кокосового воска “EVU candles” (читается как ЭВУ кэндлз). Мы сами вручную изготавливаем для вас невероятные ароматические свечи!  Много месяцев мы оттачивали своё мастерство в свечеварении. В поисках самых лучших материалов мы испробовали множество различных восков, ароматов, фитилей, подсвечников и др. И в результате выбрали самые качественные ингредиенты, самые вкусные и стойкие ароматы! Нам хочется, чтобы вы поскорее узнали обо всех ароматах наших свечей и о необычном деревянном фитиле, который приятно потрескивает при горении, как маленький костёр. Скорее выбирай свой любимый аромат и делай заказ пока все ароматы есть в наличии.';
  leftMenuModal.showModal();
  isModalLeftMenuOpen = true;
  e.stopPropagation();
});

showDeliveryModalBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = 'Доставка осуществляется с помощью курьерских служб СДЭК и BoxBerry в пункты выдачи по всей стране. Доставка от 1 дня от 390₽ в зависимости от местоположения. Стоимость доставки включена в цену свечи.';
  leftMenuModal.showModal();
  isModalLeftMenuOpen = true;
  e.stopPropagation();
});

closeLeftMenuModalBtn.addEventListener('click', () => {
  leftMenuModal.close();
  isModalLeftMenuOpen = false;
});

document.addEventListener('click', (e) => {
  if (isModalLeftMenuOpen && !leftMenuModalBox.contains(e.target)) {
    leftMenuModal.close();
  }
});

const basketModal = document.getElementById('modal-basket');
const basketModalBox = document.getElementById('modal-basket-box');
const basketModalText = document.querySelector('.modal-basket-content');
const showBasketModalBtn = document.querySelector('.basket-button');
const closeBasketModalBtn = document.getElementById('close-basket');

let isModalBasketOpen = false;

showBasketModalBtn.addEventListener('click', (e) => {
  basketModalText.textContent = `В корзине ${basketItemsCount} ${i18n.t('key', { count: basketItemsCount})} на ${basketFullPrice} руб.`;
  basketModal.showModal();
  isModalBasketOpen = true;
  e.stopPropagation();
});

closeBasketModalBtn.addEventListener('click', () => {
  basketModal.close();
  isModalBasketOpen = false;
});

document.addEventListener('click', (e) => {
  if (isModalBasketOpen && !basketModalBox.contains(e.target)) {
    basketModal.close();
  }
});
