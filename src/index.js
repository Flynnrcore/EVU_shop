import i18n from './i18next.js';
import ru from './locales/ru.js';

i18n.init({
  lng: 'ru',
  resources: {
    ru,
  },
});

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
  {
    candleName: 'blueberry',
    describe: 'Пахнет, как вкусный черничный йогурт.\r\n',
    notes: 'Верхние ноты: Черника, слива\r\n Средние ноты: Сахар, сливки\r\n Базовые ноты: Ваниль\r\n',
    tags: 'Черника со сливками, Черника, слива, Сахар, сливки, Ваниль',
  },
  {
    candleName: 'cappuccino',
    describe: 'Обожаю запах кофе, особенно капучино.\r\n Раньше нужно было покупать кофе только для того, чтобы почувствовать аромат, теперь у Вас будет свеча таким ароматом\r\n',
    notes: 'Верхние ноты: Миндаль, какао\r\n Средние ноты: Кофе, горячее молоко\r\n Базовые ноты: Ваниль, пралине\r\n',
    tags: 'Ароматный капучино, Миндаль, какао, Кофе, горячее молоко, Ваниль, пралине',
  },
  {
    candleName: 'firework',
    describe: 'Великолепный летний аромат.\r\n Пахнет экзотическими фруктами с преобладающим ароматом сочного ананаса.\r\n',
    notes: 'Верхние ноты: Лайм, апельсин, персик\r\n Средние ноты: Ананас, лицея\r\n Базовые ноты: Сахар, ириска',
    tags: 'Экзотический фейерверк, Лайм, апельсин, персик, Ананас, лицея, Сахар, ириска',
  },
  {
    candleName: 'grass',
    describe: 'Пахнет действительно как свежая сочная зелёная трава.\r\n',
    notes: 'Верхние ноты: Свежесрезанная трава\r\n Средние ноты: Прерия\r\n Базовые ноты: Трава\r\n',
    tags: 'Скошенная трава, Свежесрезанная трава, Прерия, Трава',
  },
  {
    candleName: 'lavender',
    describe: 'Не просто аромат лаванды, который можно услышать от любого мыла, геля для душа или пены для ванны с ароматом лаванды.\r\n Такой аромат вы ещё не пробовали!\r\n Он глубокий и сложный. Звучит «дорого» (по моему мнению). Я влюбилась в него с первого вдоха.\r\n', 
    notes: 'Верхние ноты: Эвкалипт\r\n Средние ноты: Лаванда\r\n  Базовые ноты: Амбра, ваниль, мускус\r\n ',
    tags: 'Лаванда и ваниль, Эвкалипт, Амбра, ваниль, мускус',
  },
  {
    candleName: 'nuts',
    describe: 'Пахнет, как шоколадный батончик nuts, нугой\r\n',
    notes: 'Верхние ноты: Какао, бобы тонка, ваниль, карамель\r\n Средние ноты: Молоко\r\n Базовые ноты: Лесной орех\r\n',
    tags: 'nuts, какао, бобы тонка, ваниль, карамель, молоко, лесной орех',
  },
];

const elements = {
  basketCount: document.querySelector('.basket-count'),
  itemsList: document.querySelector('.items'),
  searchForm: document.querySelector('#search-form'),
  modal: {
    itemCard: document.querySelector('.modal-item-card'),
    itemCardBox: document.querySelector('.modal-item-card-box'),
    closeItemCard: document.getElementById('close-item-card'),
    addCartBtn: document.getElementById('add-cart-button'),
    itemCardPic: document.querySelector('#modal-item-card-pic'),
    itemCardName: document.querySelector('.modal-item-card-name'),
    itemCardPrice: document.querySelector('.modal-item-card-price'),
    itemCardDescribe: document.querySelector('.modal-item-card-describe'),
    leftMenu: document.querySelector('.modal-left-menu'),
    leftMenuBox: document.querySelector('.modal-left-menu-box'),
    leftMenuContext: document.querySelector('.modal-left-menu-content'),
    showAboutBtn: document.querySelector('.about-button'),
    showDeliveryBtn: document.querySelector('.delivery-button'),
    closeLeftMenuBtn: document.getElementById('close-left-menu'),
    basket: document.getElementById('modal-basket'),
    basketBox: document.getElementById('modal-basket-box'),
    basketText: document.querySelector('.modal-basket-content'),
    basketList: document.querySelector('.modal-basket-list'),
    showBasketBtn: document.querySelector('.basket-button'),
    closeBasketBtn: document.getElementById('close-basket'),
  },
};

let basketItemsCount = 0;
let basketFullPrice = 0;
const basketCandles = {};

const addBasketPrice = (id) => {
  const priceEl = document.querySelector(`#price-${id}`);
  const price = Number(priceEl.textContent.slice(0, -5));
  const newPrice = Number(elements.basketCount.textContent.slice(0, -5)) + price;

  basketItemsCount += 1;
  basketFullPrice += price;


  if (!basketCandles.hasOwnProperty(id)) {
    basketCandles[id] = {
      id: Number(id),
      count: 1,
      price,
    };
  } else {
    basketCandles[id].count += 1;
    basketCandles[id].price += price;
  }

  elements.basketCount.textContent = `${newPrice} ${i18n.t('currency')}`;
};

let isItemCardOpen = false;

elements.modal.closeItemCard.addEventListener('click', () => {
  elements.modal.itemCard.close();
  isItemCardOpen = false;
});

document.addEventListener('click', (e) => {
  if (isItemCardOpen && !elements.modal.itemCardBox.contains(e.target)) {
    elements.modal.itemCard.close();
  }
});

const openItemCart = (target) => {
  const showItemCardBtn = target;

  showItemCardBtn.addEventListener('click', (e) => {
    const [currentItem] = candles.filter(({id}) => id === Number(target.id));
    const { name, size, price } = currentItem;
    elements.modal.addCartBtn.addEventListener('click', () => {
      addBasketPrice(target.id);
    });
    elements.modal.itemCardPic.src = `./image/${size}-${name}.png`
    elements.modal.itemCardName.textContent = i18n.t(name);
    elements.modal.itemCardPrice.textContent = `${price} ${i18n.t('currency')}`;
    const [{ describe, notes}] = candlesDescription.filter(({ candleName }) => candleName === name);
    elements.modal.itemCardDescribe.textContent = describe + notes;

    elements.modal.itemCard.showModal();
    isItemCardOpen = true;
    e.stopPropagation();
  });
}

const renderItemCards = (items) => {
  const { itemsList } = elements;
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  items.map((candle) => {
    const item = document.createElement('div');
    item.classList.add('item-card');
    const { name, id, size, price, newItem } = candle;

    if (newItem) {
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
    itemBtn.classList.add('add-cart');
    itemBtn.setAttribute('id', id);
    itemBtn.textContent = i18n.t('addToCart');
    item.append(itemBtn);
    itemsList.append(item);
  });

  const buttons = document.querySelectorAll('.add-cart');
  buttons.forEach((button) => {
    button.addEventListener('click',({ target }) => {
      const { id } = target;
      addBasketPrice(id);
    });
  });

  const images = document.querySelectorAll('.item-image');
  images.forEach((img) => openItemCart(img));
};
renderItemCards(candles);

document.querySelector('.new-button').addEventListener('click', (e) => {
  e.preventDefault();
  const newItems = candles.filter((candle) => candle.newItem === true);
  renderItemCards(newItems);
});

document.querySelector('.katalog-button').addEventListener('click', () => renderItemCards(candles));

const { leftMenu, leftMenuBox, leftMenuContext, showAboutBtn, showDeliveryBtn, closeLeftMenuBtn } = elements.modal;
let isLeftMenuOpen = false;

showAboutBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = `Мы знаем секретную формулу!\r\n
  “EVU candles” - бренд свечей из кокосового воска.\r\n
  Мы сами вручную изготавливаем для вас невероятные ароматические свечи!
  Много месяцев мы оттачивали своё мастерство в свечеварении.
  В поисках самых лучших материалов мы испробовали множество различных восков, ароматов, фитилей, подсвечников и др. И в результате выбрали самые качественные ингредиенты, самые вкусные и стойкие ароматы! 
  Нам хочется, чтобы вы поскорее узнали обо всех ароматах наших свечей и о необычном деревянном фитиле, который приятно потрескивает при горении, как маленький костёр.\r\n
  Скорее выбирай свой любимый аромат и делай заказ пока все ароматы есть в наличии.`;
  leftMenu.showModal();
  isLeftMenuOpen = true;
  e.stopPropagation();
});

showDeliveryBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = `Доставка осуществляется с помощью курьерских служб СДЭК и BoxBerry в пункты выдачи по всей стране.\r\n
  Доставка от 1 дня от 390₽ в зависимости от местоположения. Стоимость доставки включена в цену свечи.`;
  leftMenu.showModal();
  isLeftMenuOpen = true;
  e.stopPropagation();
});

closeLeftMenuBtn.addEventListener('click', () => {
  leftMenu.close();
  isLeftMenuOpen = false;
});

document.addEventListener('click', (e) => {
  if (isLeftMenuOpen && !leftMenuBox.contains(e.target)) {
    leftMenu.close();
  }
});

const { basket, basketBox, basketText, showBasketBtn, closeBasketBtn, basketList } = elements.modal;
let isBasketOpen = false;

showBasketBtn.addEventListener('click', (e) => {
  basketText.textContent = `В корзине ${basketItemsCount} ${i18n.t('key', { count: basketItemsCount})} на ${basketFullPrice} руб.`;

  if (Object.keys(basketCandles).length !== 0) {
    while (basketList.firstChild) {
      basketList.removeChild(basketList.firstChild);
    }

    const candlesList = Object.values(basketCandles);
    candlesList.forEach(({id, count, price}) => {
      const [candle] = candles.filter((item) => item.id === id);
      const basketLiEl = document.createElement('li');
      basketLiEl.textContent = `${i18n.t(candle.name)} (${i18n.t(candle.size)}) ${count}шт. - ${price} руб.`;
      basketList.append(basketLiEl);
    })
  }
  basket.showModal();
  isBasketOpen = true;
  e.stopPropagation();
});

closeBasketBtn.addEventListener('click', () => {
  basket.close();
  isBasketOpen = false;
});

document.addEventListener('click', (e) => {
  if (isBasketOpen && !basketBox.contains(e.target)) {
    basket.close();
  }
});

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const searchValue = formData.get('search').toLowerCase();
  const filterDescription = candlesDescription
    .filter((candleDesc) => Object.values(candleDesc).some((value) => value.toLowerCase().includes(searchValue)))
    .map((filterDesc) => filterDesc.candleName);
  const filterCandles = candles.filter(({ name }) => filterDescription.some((candlesName) => candlesName === name));
  renderItemCards(filterCandles);
  console.log(filterCandles);
});
