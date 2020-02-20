import "./styles.css";
import PNotify from "../node_modules/pnotify/dist/es/PNotify.js";
import PNotifyButtons from "../node_modules/pnotify/dist/es/PNotifyButtons.js";
import {debounce} from "lodash";
// import PNotifyStyleMaterial from '../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js';
import oneCountry from "./tamplates/oneCountryTamplate.hbs";
import someCountries from "./tamplates/someCountriesTamplate.hbs";
import fetchCountries from "./fetchCountries.js";
import "../node_modules/pnotify/dist/PNotifyBrightTheme.css";

const refs = {
  input: document.querySelector("#input-id"),
  country: document.querySelector("#country-list")
};

refs.input.addEventListener("input", _.debounce(handlerInputSearchQuery, 500));

//функция, которая передает результат инпута в fetchCountries, т.е. является аргументом для параметра searchQuery

function handlerInputSearchQuery(event) {
  fetchCountries(event.target.value, renderCountriesList);
}

//функция, которая отрисовывает результат в ДОМ
function renderCountriesList(data) {
  //если одна страна
  clearInput();
  if (data.length === 1) {
    const markupOneCountry = data.reduce(
      (acc, country) => acc + oneCountry(country),
      ""
    );
    refs.country.insertAdjacentHTML("beforeend", markupOneCountry);
  }
  //если несколько стран, но меньше десяти
  else if (data.length > 1 && data.length <= 10) {
    const markupSomeCounties = data.reduce(
      (acc, country) => acc + someCountries(country),
      ""
    );
    refs.country.insertAdjacentHTML("beforeend", markupSomeCounties);
  }
  // если несколько стран, но меньше десяти
  else if (data.length > 10) {
    PNotify.error({
      text: "Too many matches found. Please enter a more specific query!",
      type: "error"
    });
  } else {
    PNotify.error({
      text: "Please, enter correct country!",
      type: "error"
    });
  }
}

function clearInput() {
  refs.country.innerHTML = "";
}
