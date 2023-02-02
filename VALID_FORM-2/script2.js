let devField = formFirst.elements.devname;
let siteField = formFirst.elements.sitename;
let urlField = formFirst.elements.siteurl;
let divisionField = formFirst.elements.division;
let paymentField = formFirst.elements.payment;
let descriptionField = formFirst.elements.description;

formFirst.addEventListener("submit", validateInfoForm);
devField.addEventListener("blur", (eo)=>validateElemDev(false)); // стрелочная функция нужна потому что фунция аргументом получает
siteField.addEventListener("blur", (eo)=>validateElemSite(false)); // объект события eo, чтобы можно было использоывать другие аргументы
urlField.addEventListener("blur", (eo)=>validateElemURL(false)); // вызывем стрлочную функцию
divisionField.addEventListener("blur", (eo)=>validateElemDivision(false));
descriptionField.addEventListener("blur", (eo)=>validateElemDescription(false));



function validateElemDev (focusMistake) {
  let valueDevField = devField.value.trim();
  let countMistake = 0;

  if (!valueDevField) {
    devField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countMistake++;
    if(focusMistake) {
      devField.focus();
    }
  } else {
    devField.nextSibling.innerHTML = "";
  }
  return countMistake;
}
function validateElemSite (focusMistake) {
  let valueSiteField = siteField.value.trim();
  let countMistake = 0;

  if (!valueSiteField) {
    siteField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countMistake++;
    if(focusMistake) {
      siteField.focus();
    }
  } else {
    siteField.nextSibling.innerHTML = "";
  }
  return countMistake;
}
function validateElemURL (focusMistake) {
  let valueurlField = urlField.value.trim();
  let countMistake = 0;

  if (!valueurlField) {
    urlField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countMistake++;
    if(focusMistake) {
      urlField.focus();
    }
  } else {
    urlField.nextSibling.innerHTML = "";
  }
  return countMistake;
}
function validateElemDivision (focusMistake) {
  let valuedivisionField = divisionField.value;
  let countMistake = 0;

  if (valuedivisionField === '3') {
    divisionField.nextSibling.innerHTML = "Рубрика 'бытовая техника' запрещена для выбора***";
    countMistake++;
    if(focusMistake) {
      divisionField.focus();
    }
  } else {
    divisionField.nextSibling.innerHTML = "";
  }
  return countMistake;
}
let paymentErro = document.querySelector('#paymentErro');
let paymentCheck;
  for (let item of paymentField) {
    item.onchange = function () {
      if(this.value){
        paymentCheck = this.value;
        paymentErro.innerHTML = "";
      }
    }
  }

function validateElemPayment () {
  let countMistake = 0;
  if(!paymentCheck) {
    paymentErro.innerHTML = "Поле должно быть заполнено***";
    countMistake++;
  } else {
    paymentErro.innerHTML = "";
  }
  return countMistake;
}
function validateElemDescription (focusMistake) {
  let valuedescriptionField = descriptionField.value;
  let countMistake = 0;

  if (!valuedescriptionField) {
    descriptionField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countMistake++;
    if(focusMistake) {
      descriptionField.focus();
    }
  } else if (valuedescriptionField.length < 15 ) {
    descriptionField.nextSibling.innerHTML = "Текста должно быть больше***";
    countMistake++;
    if(focusMistake) {
      descriptionField.focus();
    }
  } else {
    descriptionField.nextSibling.innerHTML = "";
  }
  return countMistake;
}

function validateInfoForm (eo) {
  eo = eo || window.event;
  let generalCountMistake = 0;

  generalCountMistake+= validateElemDev (!generalCountMistake);
  generalCountMistake+= validateElemSite (!generalCountMistake);
  generalCountMistake+= validateElemURL (!generalCountMistake);
  generalCountMistake+= validateElemDivision (!generalCountMistake);
  generalCountMistake+= validateElemDescription (!generalCountMistake);
  generalCountMistake+= validateElemPayment ();

  if (generalCountMistake > 0) {
    eo.preventDefault();
  }
}