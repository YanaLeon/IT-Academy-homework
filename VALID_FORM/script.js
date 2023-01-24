let formDef1=
[
{label:'Разработчики:',kind:'longtext',name:'devname'},
{label:'Название сайта:',kind:'longtext',name:'sitename'},
{label:'URL сайта:',kind:'longtext',name:'siteurl'},
{label:'Дата запуска сайта:',kind:'date',name:'sitedate'},
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
let formFirst = document.forms.first;

function createForm (array, form) {
    for (let i = 0; i < array.length; i++) {
        if(array[i].kind === 'longtext') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let input = document.createElement('input');
            input.type = 'text';
            input.name = array[i].name;
            input.id = array[i].name;
            label.appendChild(input);
            form.appendChild(label);
        } else if (array[i].kind === 'date') {
            // let dateNow = new Date();
            // let dateFormatRus = formatDateTime(dateNow);
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let input = document.createElement('input');
            input.type = 'date';
            input.name = array[i].name;
            input.id = array[i].name;
            // input.max = `${dateFormatRus}`;
            label.appendChild(input);
            form.appendChild(label);
        } else if (array[i].kind === 'number') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let input = document.createElement('input');
            input.name = array[i].name;
            input.type = 'number';
            input.id = array[i].name;
            label.appendChild(input);
            form.appendChild(label);
        } else if (array[i].kind === 'shorttext') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let input = document.createElement('input');
            input.name = array[i].name;
            input.type = 'e-mail';
            input.id = array[i].name;
            label.appendChild(input);
            form.appendChild(label);
        } else if (array[i].kind === 'combo') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let select = document.createElement('select');
            select.name = array[i].name;
            select.id = array[i].name;
            label.appendChild(select);
            array[i].variants.forEach(element => {
                let option = document.createElement('option');
                option.textContent = element.text;
                option.value = element.value;
                select.appendChild(option);
            });
            form.appendChild(label);
            let optionSelected = form.elements[array[i].name];
            optionSelected.value = 3;
        } else if (array[i].kind === 'radio') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            array[i].variants.forEach(element => {
                let input = document.createElement('input');
                input.type = 'radio';
                input.value = element.value;
                input.name = array[i].name;
                let span = document.createElement('span');
                span.textContent = element.text;
                label.appendChild(input);
                label.appendChild(span);
            });
            form.appendChild(label);
        } else if (array[i].kind === 'check') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let input = document.createElement('input');
            input.name = array[i].name;
            input.type = 'checkbox';
            input.id = array[i].name;
            label.appendChild(input);
            form.appendChild(label);
        } else if (array[i].kind === 'memo') {
            let label = document.createElement('label');
            label.htmlFor = array[i].name;
            label.textContent = array[i].label;
            label.id = array[i].name;
            let input = document.createElement('textarea');
            input.name = array[i].name;
            input.id = array[i].name;
            label.appendChild(input);
            form.appendChild(label);
        } else if (array[i].kind === 'submit') {
            let input = document.createElement('input');
            input.type = 'submit';
            input.value = array[i].caption;
            form.appendChild(input);
        }
    }
}

createForm (formDef1, formFirst);

// function formatDateTime(dt) {
//     const year=dt.getFullYear();
//     const month=dt.getMonth()+1;
//     const day=dt.getDate();
//     return `${year}-${str0l(month,2)}-${str0l(day,2)}`;
// }
// 
// function str0l(val,len) {
//     let strVal=val.toString();
//     while ( strVal.length < len )
//         strVal='0'+strVal;
//     return strVal;
// }