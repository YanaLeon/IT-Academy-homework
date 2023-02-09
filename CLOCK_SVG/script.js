let button = document.querySelector('input[type=button]');
let diameter = document.querySelector('input[type=number]');
button.addEventListener('click', createClock);

function createClock () {
    let diameterValue = diameter.value;
    diameter.className = 'get-value';
    button.className = 'get-value';
    let div = document.createElement('div');
    div.style.width = parseInt(diameterValue) + 'px';
    div.style.height = parseInt(diameterValue) + 'px';
    div.style.position = 'relative';
    document.body.appendChild(div);
    let dialSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dialSVG.style.width = parseInt(diameterValue) + 'px';
    dialSVG.style.height = parseInt(diameterValue) + 'px';
    div.appendChild(dialSVG);
    let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('r', diameterValue/2);
    circle.setAttribute('cx', diameterValue/2);
    circle.setAttribute('cy', diameterValue/2);
    circle.setAttribute('fill', 'rgba(255, 166, 0, 0.829)');
    dialSVG.appendChild(circle);
    const divCenterX = div.offsetLeft + div.offsetWidth/2;
    const divCenterY = div.offsetTop + div.offsetHeight/2;
    let angle = 30; // угол 0 вверх, цикл начинается с 1, позиционируем под углом 30
    for (let i = 1; i <= 12; i++) {
        let divNumber = document.createElement('div');
        document.body.appendChild(divNumber);
        divNumber.style.width = parseInt(diameterValue/10) + 'px';
        divNumber.style.height = parseInt(diameterValue/10) + 'px';
        let radius = diameterValue/2 - divNumber.offsetWidth; // значение радиуса (диаметр/2) и отнимаем ширину элемента, чтобы позиционировать не к самому краю
        divNumber.style.position = 'absolute';
        divNumber.className = 'div';
        const divNumberCenterX = divCenterX + radius*Math.sin((angle)/180*Math.PI);
        const divNumberCenterY = divCenterY - radius*Math.cos((angle)/180*Math.PI);
        divNumber.style.left = Math.round(divNumberCenterX-divNumber.offsetWidth/2)+'px';
        divNumber.style.top  = Math.round(divNumberCenterY-divNumber.offsetHeight/2)+'px';
        let span = document.createElement('span');
        span.textContent = i;
        span.style.position = 'absolute';
        if (diameterValue >= 200 && diameterValue < 400) {
            span.style.fontSize = '15px';
        } else if (diameterValue >= 400 && diameterValue <= 600) {
            span.style.fontSize = '25px';
        } else if (diameterValue >= 600 && diameterValue <= 800) {
            span.style.fontSize = '35px';
        }
        divNumber.appendChild(span);
        let numberSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        numberSVG.style.width = parseInt(diameterValue/10) + 'px';
        numberSVG.style.height = parseInt(diameterValue/10) + 'px';
        divNumber.appendChild(numberSVG);
        let numberCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        numberCircle.setAttribute('r',numberSVG.getBoundingClientRect().width/2);
        numberCircle.setAttribute('cx', numberSVG.getBoundingClientRect().width/2);
        numberCircle.setAttribute('cy', numberSVG.getBoundingClientRect().height/2);
        numberCircle.setAttribute('fill', 'rgba(0, 128, 0, 0.832)');
        numberSVG.appendChild(numberCircle);
        angle += 30; // каждый час на 30 градусов больше
    }
    let hour = document.createElement('div');
    let minute = document.createElement('div');
    let second = document.createElement('div');
    hour.className = 'arrow';
    minute.className = 'arrow';
    second.className = 'arrow';
    hour.style.width = parseInt(diameterValue/60) + 'px';
    hour.style.height = parseInt(diameterValue/4.5) + 'px';
    minute.style.width = parseInt(diameterValue/80) + 'px';
    minute.style.height = parseInt(diameterValue/3) + 'px';
    second.style.width = parseInt(diameterValue/150) + 'px';
    second.style.height = parseInt(diameterValue/2.5) + 'px';
    div.appendChild(hour);
    div.appendChild(minute);
    div.appendChild(second);
    hour.style.left = Math.round(div.offsetWidth/2 - hour.offsetWidth/2) + 'px';
    hour.style.bottom = Math.round(div.offsetHeight/2) + 'px';
    minute.style.left = Math.round(div.offsetWidth/2 - minute.offsetWidth/2) + 'px';
    minute.style.bottom = Math.round(div.offsetHeight/2) + 'px';
    second.style.left = Math.round(div.offsetWidth/2 - second.offsetWidth/2) + 'px';
    second.style.bottom = Math.round(div.offsetHeight/2) + 'px';
    let hourSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    hourSVG.style.width = parseInt(diameterValue/60) + 'px';
    hourSVG.style.height = parseInt(diameterValue/4.5) + 'px';
    hour.appendChild(hourSVG);
    let arrowHourSVG = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrowHourSVG.setAttribute('x1', 0);
    arrowHourSVG.setAttribute('y1', 0);
    arrowHourSVG.setAttribute('x2', 0);
    arrowHourSVG.setAttribute('y2', hourSVG.getBoundingClientRect().height);
    arrowHourSVG.setAttribute('stroke', 'black');
    arrowHourSVG.setAttribute('stroke-width', `${hourSVG.getBoundingClientRect().width * 2}px`);
    hourSVG.appendChild(arrowHourSVG);
    let minuteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    minuteSVG.style.width = parseInt(diameterValue/80) + 'px';
    minuteSVG.style.height = parseInt(diameterValue/3) + 'px';
    minute.appendChild(minuteSVG);
    let arrowMinuteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrowMinuteSVG.setAttribute('x1', 0);
    arrowMinuteSVG.setAttribute('y1', 0);
    arrowMinuteSVG.setAttribute('x2', 0);
    arrowMinuteSVG.setAttribute('y2', minuteSVG.getBoundingClientRect().height);
    arrowMinuteSVG.setAttribute('stroke', 'black');
    arrowMinuteSVG.setAttribute('stroke-width', `${minuteSVG.getBoundingClientRect().width * 2}px`);
    minuteSVG.appendChild(arrowMinuteSVG);
    let secondSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    secondSVG.style.width = parseInt(diameterValue/150) + 'px';
    secondSVG.style.height = parseInt(diameterValue/2.5) + 'px';
    second.appendChild(secondSVG);
    let arrowSecondSVG = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrowSecondSVG.setAttribute('x1', 0);
    arrowSecondSVG.setAttribute('y1', 0);
    arrowSecondSVG.setAttribute('x2', 0);
    arrowSecondSVG.setAttribute('y2', secondSVG.getBoundingClientRect().height);
    arrowSecondSVG.setAttribute('stroke', 'black');
    arrowSecondSVG.setAttribute('stroke-width', `${secondSVG.getBoundingClientRect().width * 2}px`);
    secondSVG.appendChild(arrowSecondSVG);
    let dialTimeDiv = document.createElement('div');
    let dialTime = document.createElement('span');
    dialTimeDiv.appendChild(dialTime);
    div.appendChild(dialTimeDiv);
    dialTimeDiv.style.width = parseInt(diameterValue) + 'px';
    dialTimeDiv.style.height = parseInt(diameterValue) + 'px';
    dialTimeDiv.className = 'dial-time';
    dialTime.className = 'dial-time-span';
    dialTimeDiv.style.top = Math.round(divCenterY/2) + 'px';
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
