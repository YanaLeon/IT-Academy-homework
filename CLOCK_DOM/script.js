let button = document.querySelector('input[type=button]');
let diameter = document.querySelector('input[type=number]');
button.addEventListener('click', createClock);

function createClock () {
    let diameterValue = diameter.value; // размеры часов
    diameter.className = 'get-value';
    button.className = 'get-value';
    let dial = document.createElement('div'); // рисуем большой круг
    dial.style.width = parseInt(diameterValue) + 'px';
    dial.style.height = parseInt(diameterValue) + 'px';
    dial.className = 'dial';
    document.body.appendChild(dial); // добавляем в документ
    const dialCenterX = dial.offsetLeft + dial.offsetWidth/2; // после добавления можем читать размеры
    const dialCenterY = dial.offsetTop + dial.offsetHeight/2;
    let angle = 30; // угол 0 вверх, цикл начинается с 1, позиционируем под углом 30
    for (let i = 1; i <= 12; i++) {
        let number = document.createElement('div');
        number.style.width = parseInt(diameterValue/10) + 'px'; // круги с цифрами будут в 10 раз меньше, чем основной круг
        number.style.height = parseInt(diameterValue/10) + 'px';
        number.className = 'number';
        document.body.appendChild(number);
        let itemNumber = document.createElement('p');
        itemNumber.textContent = i;
        itemNumber.className = 'item-number';
        number.appendChild(itemNumber);
        if (diameterValue >= 400 && diameterValue < 600) {
            itemNumber.style.fontSize = '25px';
        } else if (diameterValue >= 600 && diameterValue <= 800) {
            itemNumber.style.fontSize = '35px';
        }
        let radius = diameterValue/2 - number.offsetWidth; // значение радиуса (диаметр/2) и отнимаем ширину элемента, чтобы позиционировать не к самому краю
        const numberCenterX = dialCenterX + radius*Math.sin((angle)/180*Math.PI);
        const numberCenterY = dialCenterY - radius*Math.cos((angle)/180*Math.PI);
        number.style.left = Math.round(numberCenterX-number.offsetWidth/2)+'px';
        number.style.top  = Math.round(numberCenterY-number.offsetHeight/2)+'px';
        angle += 30; // каждый час на 30 градусов больше
    }
    let hour = document.createElement('div');
    let minute = document.createElement('div');
    let second = document.createElement('div');
    hour.style.width = parseInt(diameterValue/60) + 'px'; // размеры стрелки также будут относительно введённого диаметра
    hour.style.height =parseInt(diameterValue/4.5) + 'px';
    minute.style.width = parseInt(diameterValue/80) + 'px';
    minute.style.height =parseInt(diameterValue/3) + 'px';
    second.style.width = parseInt(diameterValue/150) + 'px';
    second.style.height =parseInt(diameterValue/2.5) + 'px';
    dial.appendChild(hour);
    dial.appendChild(minute);
    dial.appendChild(second);
    hour.className = 'arrow';
    minute.className = 'arrow';
    second.className = 'arrow';
    hour.style.left = Math.round(dial.offsetWidth/2 - hour.offsetWidth/2) + 'px';
    hour.style.bottom = Math.round(dial.offsetHeight/2) + 'px';
    minute.style.left = Math.round(dial.offsetWidth/2 - minute.offsetWidth/2) + 'px';
    minute.style.bottom = Math.round(dial.offsetHeight/2) + 'px';
    second.style.left = Math.round(dial.offsetWidth/2 - second.offsetWidth/2) + 'px';
    second.style.bottom = Math.round(dial.offsetHeight/2) + 'px';
    let dialTimeDiv = document.createElement('div');
    let dialTime = document.createElement('span');
    dialTimeDiv.appendChild(dialTime);
    document.body.appendChild(dialTimeDiv);
    dialTimeDiv.style.width = parseInt(diameterValue) + 'px';
    dialTimeDiv.style.height = parseInt(diameterValue) + 'px';
    dialTimeDiv.className = 'dial-time';
    dialTime.className = 'dial-time-span';
    dialTimeDiv.style.top = Math.round(dialCenterY/2) + 'px';
    if (diameterValue >= 400 && diameterValue < 600) {
        dialTime.style.fontSize = '25px';
    } else if (diameterValue >= 600 && diameterValue <= 800) {
        dialTime.style.fontSize = '35px';
    }
    let deg = 6; // 360/60 = 6 за 60 секунд стрелка поворачивается на 360, за 1 с - на 6, за 60 минут стрелка поворачивается на 360, за 1 м - на 6
    let degHour = 30; // 360/12 = 30, за 1 час часовая стрелка поворачивается на 30 градусов
    let timeStart = new Date ();
    let lag = 0; // здесь храним разницу между временем запуска функции и реальным временем
    let sec = 0; // здесь будем хранить значение 1000 - 1 секунда для расчётов
    function getTime () {
        let time = new Date();
        let difference = (time-timeStart);
        if (difference > 1000) {
            sec += 1000;
            lag = difference - sec;
        }
        setTimeout(getTime, (1000 - lag));
        let formatTime = formatDateTime(time);
        dialTime.textContent = formatTime;
        let hourNow = time.getHours();
        let minuteNow = time.getMinutes() ;
        let secondNow = time.getSeconds();
        second.style.transform = `rotate(${deg * secondNow}deg)`
        minute.style.transform = `rotate(${deg*(minuteNow + (secondNow/60))}deg)`
        hour.style.transform = `rotate(${degHour * (hourNow + (minuteNow/60))}deg)`
        console.log(hourNow, minuteNow, secondNow);
    }
    getTime ()
}
function formatDateTime(dt) {
    const hours=dt.getHours();
    const minutes=dt.getMinutes();
    const seconds=dt.getSeconds();
    return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}
function str0l(val,len) {
    let strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}
