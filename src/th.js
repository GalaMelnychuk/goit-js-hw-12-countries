import './styles.css';
import countryInput from './fetchCountries.js';
import * as _ from 'lodash';
import countryInputOne from './templates/countryOne.hbs';
import countryInputAll from './templates/countryAll.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
const divCountry = document.querySelector('.container');

const inputCountry = document.querySelector('#inputCountry');
inputCountry.addEventListener('input', _.debounce(inputValue, 1000));

function inputValue(data) {
  countryInput(data.target.value, buildResult);
}

function buildResult(data) {
  if (data.length > 10) {
    clearInput();
    PNotify.error({
      title: 'Oh No!',
      text: 'Too many countries!',
    });
  } else if (data.length === 1) {
    const markupOne = data.map(name => countryInputOne(name)).join('');
    clearInput();
    divCountry.insertAdjacentHTML('beforeend', markupOne);
    PNotify.closeAll();
  } else if (data.length >= 2 && data.length <= 10) {
    const markupAll = data.map(name => countryInputAll(name)).join('');
    clearInput();
    divCountry.insertAdjacentHTML('beforeend', markupAll);
    PNotify.closeAll();
  } else {
    return;
    PNotify.closeAll();
    clearInput();
  }
}

function clearInput() {
  divCountry.innerHTML = '';
}