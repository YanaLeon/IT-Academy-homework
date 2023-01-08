let formFirst = document.forms.first;
let formSecond = document.forms.second;

var formDef1=
[
{label:'Название сайта:',kind:'longtext',name:'sitename'},
{label:'URL сайта:',kind:'longtext',name:'siteurl'},
{label:'Посетителей в сутки:',kind:'number',name:'visitors'},
{label:'E-mail для связи:',kind:'shorttext',name:'email'},
{label:'Рубрика каталога:',kind:'combo',name:'division',
variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
{label:'Размещение:',kind:'radio',name:'payment',
variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
{label:'Разрешить отзывы:',kind:'check',name:'votes'},
{label:'Описание сайта:',kind:'memo',name:'description'},
{caption:'Опубликовать',kind:'submit'},
];

var formDef2=
[
{label:'Фамилия:',kind:'longtext',name:'lastname'},
{label:'Имя:',kind:'longtext',name:'firstname'},
{label:'Отчество:',kind:'longtext',name:'secondname'},
{label:'Возраст:',kind:'number',name:'age'},
{caption:'Зарегистрироваться',kind:'submit'},
];

function createForm (array, form) {
    for (let i = 0; i < array.length; i++){
        if(array[i].kind === 'longtext'){
            let teg = document.createElement('input');
            let label = document.createElement('label');
            teg.name = array[i].name;
            teg.type = 'text';
            teg.id = array[i].name;
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.appendChild(teg);
            form.appendChild(label);
        } else if (array[i].kind === 'number'){
            let teg = document.createElement('input');
            let label = document.createElement('label');
            teg.name = array[i].name;
            teg.type = 'number';
            teg.id = array[i].name;
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.appendChild(teg);
            form.appendChild(label);
        } else if (array[i].kind === 'shorttext'){
            let teg = document.createElement('input');
            let label = document.createElement('label');
            teg.name = array[i].name;
            teg.type = 'e-mail';
            teg.id = array[i].name;
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.appendChild(teg);
            form.appendChild(label);
        } else if (array[i].kind === 'combo') {
            let teg = document.createElement('select');
            let label = document.createElement('label');
            teg.name = array[i].name;
            teg.id = array[i].name;
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.appendChild(teg);
            array[i].variants.forEach(element => {
                let option = document.createElement('option');
                option.value = element.value;
                option.textContent = element.text;
                teg.appendChild(option);
            });
            form.appendChild(label);
            let elem = form.elements[array[i].name];
            elem.value = 3;
        } else if (array[i].kind === 'radio') {
            let tegP = document.createElement('p');
            tegP.textContent = array[i].label;
            array[i].variants.forEach(element => {
                let teg = document.createElement('input');
                teg.type = 'radio';
                teg.name = array[i].name;
                teg.value = element.value;
                let span = document.createElement('span');
                span.textContent = element.text;
                tegP.appendChild(teg);
                tegP.appendChild(span);
            });
            form.appendChild(tegP);
        } else if (array[i].kind === 'check') {
            let teg = document.createElement('input');
            let label = document.createElement ('label');
            teg.type = 'checkbox';
            teg.name = array[i].name;
            teg.id = array[i].name;
            teg.checked = true;
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.appendChild(teg);
            form.appendChild(label);
        } else if (array[i].kind === 'memo') {
            let teg = document.createElement('textarea');
            let label = document.createElement('label');
            teg.name = array[i].name;
            teg.id = array[i].name;
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.appendChild(teg);
            form.appendChild(label);
        } else if (array[i].kind = 'submit') {
            let teg = document.createElement('input');
            teg.type = 'submit';
            teg.value = array[i].caption;
            form.appendChild(teg);
        }
    }
    console.log(form)
}

console.log(createForm(formDef1, formFirst));
console.log(createForm(formDef2, formSecond));

