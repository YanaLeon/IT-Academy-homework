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
    if (formValidDef[i].fieldName !== 'payment' && formValidDef[i].fieldName !== 'first') {
      let field = formFirst.elements[formValidDef[i].fieldName];
      field.addEventListener(formValidDef[i].event, function () {formValidDef[i].validFunction (field)})
    } else if (formValidDef[i].fieldName === 'first') {
      formFirst.addEventListener(formValidDef[i].event, function (eo) {
        let count = 0;
        for (let y = formValidDef.length - 2; y >= 0; y--) {
          let field = formFirst.elements[formValidDef[y].fieldName];
          count+= formValidDef[y].validFunction (field);
          if (formValidDef[y].fieldName !== 'payment' && formValidDef[y].validFunction(field)) {
            field.focus();
          } else if (formValidDef[y].fieldName === 'payment' && formValidDef[y].validFunction(field)) {
            let element = document.querySelector('#radio1');
            element.scrollIntoView();
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