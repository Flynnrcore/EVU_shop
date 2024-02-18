import i18n from '../i18next.js';

const getItemCard = (candle) => {
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

  return item;
};

export default getItemCard;
