import i18n from './i18next.js';
import ru from './locales/ru.js';
import data from './dist/data.js';
import getItemCard from './dist/item.js';
import getBasketForm from './dist/basketForm.js';

i18n.init({
  lng: 'ru',
  resources: {
    ru,
  },
});

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
const basketCandles = {
  total: {},
};

const addBasketPrice = (id) => {
  const priceEl = document.querySelector(`#price-${id}`);
  const price = Number(priceEl.textContent.slice(0, -5));
  const newPrice = Number(elements.basketCount.textContent.slice(0, -5)) + price;

  basketItemsCount += 1;
  basketFullPrice += price;


  if (!basketCandles.total.hasOwnProperty(id)) {
    basketCandles.total[id] = {
      id: Number(id),
      count: 1,
      price,
    };
  } else {
    basketCandles.total[id].count += 1;
    basketCandles.total[id].price += price;
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
    const [currentItem] = data.candles.filter(({id}) => id === Number(target.id));
    const { name, size, price } = currentItem;
    elements.modal.addCartBtn.addEventListener('click', () => {
      addBasketPrice(target.id);
    });
    elements.modal.itemCardPic.src = `./image/${size}-${name}.png`
    elements.modal.itemCardName.textContent = i18n.t(name);
    elements.modal.itemCardPrice.textContent = `${price} ${i18n.t('currency')}`;
    const [{ describe, notes}] = data.candlesDescription.filter(({ candleName }) => candleName === name);
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
    const item = getItemCard(candle);
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
renderItemCards(data.candles);

document.querySelector('.new-button').addEventListener('click', (e) => {
  e.preventDefault();
  const newItems = data.candles.filter((candle) => candle.newItem === true);
  renderItemCards(newItems);
});

document.querySelector('.katalog-button').addEventListener('click', () => renderItemCards(data.candles));

const { leftMenu, leftMenuBox, leftMenuContext, showAboutBtn, showDeliveryBtn, closeLeftMenuBtn } = elements.modal;
let isLeftMenuOpen = false;

showAboutBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = data.aboutText;
  leftMenu.showModal();
  isLeftMenuOpen = true;
  e.stopPropagation();
});

showDeliveryBtn.addEventListener('click', (e) => {
  leftMenuContext.textContent = data.deliveryText;
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


  if (Object.keys(basketCandles.total).length !== 0) {
    while (basketList.firstChild) {
      basketList.removeChild(basketList.firstChild);
    }

    const candlesList = Object.values(basketCandles.total);
    candlesList.forEach(({id, count, price}) => {
      const [candle] = data.candles.filter((item) => item.id === id);
      const basketLiEl = document.createElement('li');
      basketLiEl.textContent = `${i18n.t(candle.name)} (${i18n.t(candle.size)}) ${count}шт. - ${price} руб.`;
      basketList.append(basketLiEl);
    })

    if (!(document.querySelector('.buy-button'))) {   
      const buyForm = getBasketForm();
      basketBox.append(buyForm);

      buyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const buyFormData = new FormData(e.target);
        const order = `Пользователь ${buyFormData.get('userName')} сделал заказ на сумму ${basketFullPrice}.
        Состав заказа: ${basketCandles.total}
        Данные для доставки -
        адресс: ${buyFormData.get('address')}, 
        эл.почта: ${buyFormData.get('email')},
        телефон: ${buyFormData.get('number')}`;
        console.log(order);

        basketCandles.total = {};
        basketItemsCount = 0;
        basketFullPrice = 0;
        elements.basketCount.textContent = `0 ${i18n.t('currency')}`;
        basket.close();
        isBasketOpen = false;
      });
    }
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
  const filterDescription = data.candlesDescription
    .filter((candleDesc) => Object.values(candleDesc).some((value) => value.toLowerCase().includes(searchValue)))
    .map((filterDesc) => filterDesc.candleName);
  const filterCandles = data.candles.filter(({ name }) => filterDescription.some((candlesName) => candlesName === name));
  renderItemCards(filterCandles);
});
