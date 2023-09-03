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
  { name: 'grass', id: 8, size: 'small', price: '1200', newItem: true },
  { name: 'lavender', id: 9, size: 'small', price: '1200', newItem: false },
  { name: 'nuts', id: 10, size: 'small', price: '1200', newItem: false },
  { name: 'firework', id: 11, size: 'small', price: '1800', newItem: false },
];

const candlesDescription = [
  { candleName: 'blueberry', describe: 'Пахнет, как вкусный черничный йогурт.\r\n', notes: 'Верхние ноты: Черника, слива\r\n Средние ноты: Сахар, сливки\r\n Базовые ноты: Ваниль\r\n' },
  { candleName: 'cappuccino', describe: 'Обожаю запах кофе, особенно капучино.\r\n Раньше нужно было покупать кофе только для того, чтобы почувствовать аромат, теперь у Вас будет свеча таким ароматом\r\n', notes: 'Верхние ноты: Миндаль, какао\r\n Средние ноты: Кофе, горячее молоко\r\n Базовые ноты: Ваниль, пралине\r\n' },
  { candleName: 'firework', describe: 'Великолепный летний аромат.\r\n Пахнет экзотическими фруктами с преобладающим ароматом сочного ананаса.\r\n', notes: 'Верхние ноты: Лайм, апельсин, персик\r\n Средние ноты: Ананас, лицея\r\n Базовые ноты: Сахар, ириска' },
  { candleName: 'grass', describe: 'Пахнет действительно как свежая сочная зелёная трава.\r\n', notes: 'Верхние ноты: Свежесрезанная трава\r\n Средние ноты: Прерия\r\n Базовые ноты: Трава\r\n' },
  { candleName: 'lavender', describe: 'Не просто аромат лаванды, который можно услышать от любого мыла, геля для душа или пены для ванны с ароматом лаванды.\r\n Такой аромат вы ещё не пробовали!\r\n Он глубокий и сложный. Звучит «дорого» (по моему мнению). Я влюбилась в него с первого вдоха.\r\n', notes: 'Верхние ноты: Эвкалипт\r\n Средние ноты: Лаванда\r\n  Базовые ноты: Амбра, ваниль, мускус\r\n '},
  { candleName: 'nuts', describe: 'Пахнет, как шоколадный батончик nuts, нугой\r\n', notes: 'Верхние ноты: Какао, бобы тонка, ваниль, карамель\r\n Средние ноты: Молоко\r\n Базовые ноты: Лесной орех\r\n' },
];

const itemCardModal = document.querySelector('.modal-item-card');
const itemCardModalBox = document.querySelector('.modal-item-card-box');
const closeItemCardModalBtn = document.getElementById('close-item-card');
let isModalItemCardOpen = false;

closeItemCardModalBtn.addEventListener('click', () => {
  itemCardModal.close();
  isModalItemCardOpen = false;
});

document.addEventListener('click', (e) => {
  if (isModalItemCardOpen && !itemCardModalBox.contains(e.target)) {
    itemCardModal.close();
  }
});

const openItemCart = (target) => {
  const showItemCardModalBtn = target;

  showItemCardModalBtn.addEventListener('click', (e) => {
    const [currentItem] = candles.filter(({id}) => id === Number(target.id));
    const {name, size, price } = currentItem;
    const cardItemPic = document.querySelector('#modal-item-card-pic');
    cardItemPic.src = `./image/${size}-${name}.png`
    document.querySelector('.modal-item-card-name').textContent = i18n.t(name);
    document.querySelector('.modal-item-card-price').textContent = `${price} ${i18n.t('currency')}`;
    const [{ describe, notes}] = candlesDescription.filter(({ candleName }) => candleName === name);
    document.querySelector('.modal-item-card-describe').textContent = describe + notes;

    itemCardModal.showModal();
    isModalItemCardOpen = true;
    e.stopPropagation();
  });
}

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
    img.setAttribute('id', id);
    item.append(img);

    const pElName = document.createElement('p');
    pElName.classList.add('item-name');
    pElName.textContent = `Ароматическая свеча\r\n "${i18n.t(name)}"`;
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

  const images = document.querySelectorAll('.item-image');
  images.forEach((img) => openItemCart(img));
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
  leftMenuContext.textContent = `Мы знаем секретную формулу!\r\n
  “EVU candles” - бренд свечей из кокосового воска.\r\n
  Мы сами вручную изготавливаем для вас невероятные ароматические свечи!
  Много месяцев мы оттачивали своё мастерство в свечеварении.
  В поисках самых лучших материалов мы испробовали множество различных восков, ароматов, фитилей, подсвечников и др. И в результате выбрали самые качественные ингредиенты, самые вкусные и стойкие ароматы! 
  Нам хочется, чтобы вы поскорее узнали обо всех ароматах наших свечей и о необычном деревянном фитиле, который приятно потрескивает при горении, как маленький костёр.\r\n
  Скорее выбирай свой любимый аромат и делай заказ пока все ароматы есть в наличии.`;
  leftMenuModal.showModal();
  isModalLeftMenuOpen = true;
  e.stopPropagation();
});

showDeliveryModalBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = `Доставка осуществляется с помощью курьерских служб СДЭК и BoxBerry в пункты выдачи по всей стране.\r\n
  Доставка от 1 дня от 390₽ в зависимости от местоположения. Стоимость доставки включена в цену свечи.`;
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
