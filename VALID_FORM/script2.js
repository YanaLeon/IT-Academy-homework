let devField = formFirst.elements.devname;
let siteField = formFirst.elements.sitename;
let urlField = formFirst.elements.siteurl;
let dateField = formFirst.elements.sitedate;
let visitField = formFirst.elements.visitors;
let emailField = formFirst.elements.email;
let divisionField = formFirst.elements.division;
let paymentField = formFirst.elements.payment;
let votesField = formFirst.elements.votes;
let descriptionField = formFirst.elements.description;

formFirst.addEventListener("submit", validateInfoForm);
formFirst.addEventListener("submit", searchElem);
devField.addEventListener("blur", createMistake);
devField.addEventListener("change", checkField);
siteField.addEventListener("blur", createMistake);
siteField.addEventListener("change", checkField);
urlField.addEventListener("blur", createMistake);
urlField.addEventListener("change", checkField);
dateField.addEventListener("blur", createMistake);
dateField.addEventListener("change", checkField);
visitField.addEventListener("blur", createMistake);
visitField.addEventListener("change", checkField);
emailField.addEventListener("blur", createMistake);
emailField.addEventListener("change", checkField);
divisionField.addEventListener("blur", createMistake);
divisionField.addEventListener("change", checkField);
votesField.addEventListener("change", checkField);
descriptionField.addEventListener("blur", createMistake);
descriptionField.addEventListener("change", checkField);

let objectTeg = {}; // здесь будем хранить input.name у которого ошибка

// =============================================================================
let paymentName; // отдельно получаем input.name для радиокнопок
let paymentChecked = paymentField.checked; // храним выбранный input radio
for (let radio of paymentField) {
  paymentName = radio.name;
  radio.onchange = paymentChange; // событие для radio, если кнопка изменяется
  function paymentChange() {
    if (this.value) {
      paymentChecked = this.value; // сохарняем, что кнопка нажата
      let div = document.querySelector(`#${this.name} > div`).remove(); // удаляем ошибку
      delete objectTeg[this.name];
    }
  }
}

// =============================================================================
function searchElem(ev) { // перед submit проверяем есть ли ошибки в объекте, если есть - отменяем отправку и фокусируемся на input
  ev = ev || window.event;
  for (let item of formFirst) {
    if (item.name in objectTeg) {
      item.focus();
      ev.preventDefault();
      break;
    }
  }
}

// =============================================================================
function validateInfoForm(ev) { // проверка формы при событии submit
  ev = ev || window.event;
  let devValue = devField.value.trim();
  let siteValue = siteField.value.trim();
  let urlValue = urlField.value.trim();
  let dateValue = dateField.value;
  let visitValue = visitField.value;
  let emailValue = emailField.value;
  let divisionValue = divisionField.value;
  let votesValue = votesField.checked;
  let descriptionValue = descriptionField.value;
  if (devValue.length === 0) {
    if (!(devField.name in objectTeg)) {
      let label = document.querySelector(`#${devField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[devField.name] = true;
    }
    ev.preventDefault();
  }
  if (siteValue.length === 0) {
    if (!(siteField.name in objectTeg)) {
      let label = document.querySelector(`#${siteField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[siteField.name] = true;
    }
    ev.preventDefault();
  }
  if (urlValue.length === 0) {
    if (!(urlField.name in objectTeg)) {
      let label = document.querySelector(`#${urlField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[urlField.name] = true;
    }
    ev.preventDefault();
  }
  if (dateValue.length === 0) {
    if (!(dateField.name in objectTeg)) {
      let label = document.querySelector(`#${dateField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[dateField.name] = true;
    }
    ev.preventDefault();
  }
  if (visitValue.length === 0) {
    if (!(visitField.name in objectTeg)) {
      let label = document.querySelector(`#${visitField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[visitField.name] = true;
    }
    ev.preventDefault();
  }
  if (emailValue.length === 0) {
    if (!(emailField.name in objectTeg)) {
      let label = document.querySelector(`#${emailField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[emailField.name] = true;
    }
    ev.preventDefault();
  }
  if (divisionValue === "3") {
    if (!(divisionField.name in objectTeg)) {
      let label = document.querySelector(`#${divisionField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Рубрика 'бытовая техника' запрещена для выбора***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[divisionField.name] = true;
    }
    ev.preventDefault();
  }
  if (!paymentChecked) {
    if (!(paymentName in objectTeg)) {
      let label = document.querySelector(`#${paymentName}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Необходимо выбрать***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[paymentName] = true;
    }
    ev.preventDefault();
  }
  if (!votesValue) {
    if (!(votesField.name in objectTeg)) {
      let label = document.querySelector(`#${votesField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Необходимо ваше согласие на размещение отзыва***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[votesField.name] = true;
    }
    ev.preventDefault();
  }
  if (descriptionValue.length === 0) {
    if (!(descriptionField.name in objectTeg)) {
      let label = document.querySelector(`#${descriptionField.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[descriptionField.name] = true;
    }
    ev.preventDefault();
  }
}

// =============================================================================
function createMistake(ev) { // проерка каждого input после введения данных, реакция на события blur
  ev = ev || window.event;
  ev.preventDefault();
  if (ev.target.value.trim() === "") {
    if (!(ev.target.name in objectTeg)) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Поле должно быть заполнено***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
  if (ev.target.name === "siteurl" && !(ev.target.name in objectTeg)) {
    let urlValue = ev.target.value.trim();
    let urlProtocol = ["https:", "http:"];
    let urlArry = urlValue.split("/");
    if (!urlProtocol.includes(urlArry[0])) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("URL должен начинаться с протокола https или http***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
  if (ev.target.name === "visitors" && !(ev.target.name in objectTeg)) {
    let visitValue = ev.target.value;
    let checkVisitNumber = parseInt(visitValue);
    let signNumber = Math.sign(checkVisitNumber);
    if (signNumber === -1) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Число не может быть с минусом***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
  if (ev.target.name === "email" && !(ev.target.name in objectTeg)) {
    let emailValue = ev.target.value;
    let arrayEmail = emailValue.split("");
    if (!arrayEmail.includes("@")) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Введите адрес e-mail***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
  if (ev.target.name === "division" && !(ev.target.name in objectTeg)) {
    let divisionValue = ev.target.value;
    if (divisionValue === "3") {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Рубрика 'бытовая техника' запрещена для выбора***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
  if (ev.target.name === "description" && ev.target.value.trim().length < 10) {
    if (!(ev.target.name in objectTeg)) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Не скупитесь на слова***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
}

// =============================================================================
dateField.addEventListener("change", focusDate);
function focusDate(ev) { // проверяем отдельно дату по событию change
  ev = ev || window.event;
  ev.preventDefault();
  let dateValue = ev.target.value;
  let chooseDate = formatDateTime(new Date(dateValue));
  let array = chooseDate.split(".");
  let arrayDateNow = dateNow.split(".");
  if (parseInt(array[2]) < 1990 || parseInt(array[2]) > 2023) {
    if (!(ev.target.name in objectTeg)) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode("Максимальное значение года 2023, минимальное - 1990***");
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
  if ((parseInt(array[2]) === 2023 && parseInt(array[0]) > parseInt(arrayDateNow[0])) ||(parseInt(array[2]) === 2023 && parseInt(array[1]) > parseInt(arrayDateNow[1]))) {
    if (!(ev.target.name in objectTeg)) {
      let label = document.querySelector(`#${ev.target.name}`);
      let tegMistake = document.createElement("div");
      let textMistake = document.createTextNode(`Максимальное значение даты ${dateNow} ***`);
      tegMistake.appendChild(textMistake);
      label.appendChild(tegMistake);
      objectTeg[ev.target.name] = true;
    }
  }
}

// =============================================================================
function checkField() { // события на change рповеряем введено значение или нет
  if (this.value) {     // если введено - удаляем из объекта, если была ошибка удаляем и её
    if (document.querySelector(`#${this.name} > div`)) { // по событию blur проверим значение повторно
        document.querySelector(`#${this.name} > div`).remove()
    }
    delete objectTeg[this.name];
  }
  console.log(objectTeg)
}

// =============================================================================
let dateNow; // получаем дату сейчас в привычном формате, это ограничитель для выбора в форме
document.body.addEventListener("click", function () {
  let dt = new Date();
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  dateNow = str0l(day, 2) + "." + str0l(month, 2) + "." + year;
  dateField.max = dateNow;
  return dateNow;
});

// =============================================================================
function formatDateTime(dt) { // форматирование даты в привычный формат
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  return str0l(day, 2) + "." + str0l(month, 2) + "." + year;
}

function str0l(val, len) {
  let strVal = val.toString();
  while (strVal.length < len) strVal = "0" + strVal;
  return strVal;
}
