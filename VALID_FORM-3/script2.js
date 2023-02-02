let devField = formFirst.elements.devname;
let siteField = formFirst.elements.sitename;
let urlField = formFirst.elements.siteurl;
let divisionField = formFirst.elements.division;
let paymentField = formFirst.elements.payment;
let descriptionField = formFirst.elements.description;

let formValidDef = [
  {fieldName: 'devname', validFunction: validateDev, event: 'blur'},
  {fieldName: 'sitename', validFunction: validateSite, event: 'blur'},
  {fieldName: 'siteurl', validFunction: validateURL, event: 'blur'},
  {fieldName: 'division', validFunction: validateDivision, event: 'blur'},
  {fieldName: 'payment', validFunction: validatePayment},
  {fieldName: 'description', validFunction: validateDescription, event: 'blur'},
  {fieldName: 'first', event: 'submit'}
]
  for (let i = 0; i < formValidDef.length; i++) {
    if(formValidDef[i].fieldName === 'devname') {
      devField.addEventListener(formValidDef[i].event, function () {formValidDef[i].validFunction (devField)})
    }
    if(formValidDef[i].fieldName === 'sitename') {
      siteField.addEventListener(formValidDef[i].event, function () {formValidDef[i].validFunction (siteField)})
    }
    if(formValidDef[i].fieldName === 'siteurl') {
      urlField.addEventListener(formValidDef[i].event, function () {formValidDef[i].validFunction (urlField)})
    }
    if(formValidDef[i].fieldName === 'division') {
      divisionField.addEventListener(formValidDef[i].event, function () {formValidDef[i].validFunction (divisionField)})
    }
    if(formValidDef[i].fieldName === 'description') {
      descriptionField.addEventListener(formValidDef[i].event, function () {formValidDef[i].validFunction (descriptionField)})
    }
    if(formValidDef[i].fieldName === 'first') {
      formFirst.addEventListener(formValidDef[i].event, function (eo) {
        let count = 0;
        for (let y = formValidDef.length - 1; y >= 0; y--) {
          if (formValidDef[y].validFunction === validateDev) {
            count+= validateDev(devField);
            if (validateDev(devField)) {
              devField.focus();
            }
          } else if (formValidDef[y].validFunction === validateSite) {
            count+= validateSite(siteField);
            if (validateSite(siteField)) {
              siteField.focus();
            }
          } else if (formValidDef[y].validFunction === validateURL) {
            count+= validateURL(urlField);
            if (validateURL(urlField)) {
              urlField.focus();
            }
          } else if (formValidDef[y].validFunction === validateDivision) {
            count+= validateDivision(divisionField);
            if (validateDivision(divisionField)) {
              divisionField.focus();
            }
          } else if (formValidDef[y].validFunction === validatePayment) {
            count+= validatePayment(paymentField);
            if (validatePayment(paymentField)) {
              let element = document.querySelector('#radio1');
              element.scrollIntoView();;
            }
          } else if (formValidDef[y].validFunction === validateDescription) {
            count+= validateDescription(descriptionField);
            if (validateDescription(descriptionField)) {
              descriptionField.focus();
            }
          }
        }
        if (count > 0) {
          eo.preventDefault();
        }
      })
    }
  }
function validateDev (nameField) {
  let value = nameField.value.trim();
  let countError = 0;

  if (!value) {
    nameField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countError++;
  } else {
    nameField.nextSibling.innerHTML = "";
  }
  return countError;
}
function validateSite (nameField) {
  let value = nameField.value.trim();
  let countError = 0;

  if (!value) {
    nameField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countError++;
  } else {
    nameField.nextSibling.innerHTML = "";
  }
  return countError;
}
function validateURL (nameField) {
  let value = nameField.value.trim();
  let countError = 0;

  if (!value) {
    nameField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countError++;
  } else {
    nameField.nextSibling.innerHTML = "";
  }
  return countError;
}
function validateDivision (nameField) {
  let value = nameField.value;
  let countError = 0;

  if (value === '3') {
    nameField.nextSibling.innerHTML = "Рубрика 'бытовая техника' запрещена для выбора***";
    countError++;
  } else {
    nameField.nextSibling.innerHTML = "";
  }
  return countError;
}
function validatePayment (nameField) {
  let valueCheck = nameField.value;
  let paymentError = document.querySelector('#paymentError');
  let countError = 0;
  for (let item of nameField) {
    item.onchange = function () {
      if (this.value) {
        valueCheck = this.value;
        paymentError.innerHTML = "";
      }
    }
  }
  if (!valueCheck) {
    paymentError.innerHTML = "Поле должно быть заполнено***";
    countError++;
  } else {
    paymentError.innerHTML = "";
  }
  return countError;
}
function validateDescription (nameField) {
  let value = nameField.value.trim();
  let countError = 0;

  if (!value) {
    nameField.nextSibling.innerHTML = "Поле должно быть заполнено***";
    countError++;
  } else if (value.length < 15) {
    nameField.nextSibling.innerHTML = "Текста должно быть больше***";
    countError++;
  } else {
    nameField.nextSibling.innerHTML = "";
  }
  return countError;
}