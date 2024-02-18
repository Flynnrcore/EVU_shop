import i18n from '../i18next.js';

const getBasketForm = () => {
  const buyForm = document.createElement('form');
  buyForm.classList.add('buy-form');
  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'userName');
  nameInput.setAttribute('placeholder', i18n.t('nameInput'));
  const emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('placeholder', i18n.t('emailInput'));
  const numberInput = document.createElement('input');
  numberInput.setAttribute('type', 'text');
  numberInput.setAttribute('name', 'number');
  numberInput.setAttribute('placeholder', i18n.t('numberInput'));
  const addressInput = document.createElement('input');
  addressInput.setAttribute('type', 'text');
  addressInput.setAttribute('name', 'address');
  addressInput.setAttribute('placeholder', i18n.t('addressInput'));
  const buyBtn = document.createElement('button');
  buyBtn.textContent = i18n.t('buy');
  buyBtn.classList.add('buy-button');
  buyForm.append(nameInput);
  buyForm.append(emailInput);
  buyForm.append(numberInput);
  buyForm.append(addressInput);
  buyForm.append(buyBtn); 

  return buyForm;
};

export default getBasketForm;
