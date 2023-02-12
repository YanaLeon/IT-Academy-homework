const canvas = document.querySelector('#canvas');
const button = document.querySelector('input[type=button]');
const diameter = document.querySelector('input[type=number]');
button.addEventListener('click', styleForButton);
button.addEventListener('click', createClock);

function styleForButton () {
    diameter.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'block';
}

function createClock () {
    let diameterValue = diameter.value; // размеры часов

    let context = canvas.getContext('2d');
    context.globalCompositeOperation='source-over';

    context.clearRect (0, 0, canvas.width, canvas.height); // метод для очистки, иначе у стрелок появляется тень

    let radius = diameterValue/2;
    let dialCenterX = diameterValue/2;
    let dialCenterY = diameterValue/2;
    context.fillStyle='rgba(255, 166, 0, 0.829)';
    context.beginPath();
    context.arc(dialCenterX, dialCenterY, radius, 0, Math.PI*2, false);
    context.fill();

    let k; // переменная для позиционирования кругов цифр для разных размеров часов
    if (diameterValue >= 200 && diameterValue < 400) {
        k = 25;
    } else if (diameterValue >= 400 && diameterValue < 600) {
        k = 50;
    } else if (diameterValue >= 600 && diameterValue <= 800) {
        k = 70;
    }
    let angle = 30; // угол 0 вверх, цикл начинается с 1, позиционируем под углом 30
    let radiusNumber = Math.round(diameterValue/15);
    for(let i = 1; i <= 12; i++){
        context.beginPath(); // рисуем круги для цифр
        const numberCenterX = dialCenterX + (radius-k)*Math.sin((angle)/180*Math.PI);
        const numberCenterY = dialCenterY - (radius-k)*Math.cos((angle)/180*Math.PI);
        context.fillStyle='rgba(0, 128, 0, 0.832)';
        context.beginPath();
        context.arc(numberCenterX, numberCenterY, radiusNumber, 0, Math.PI*2, false);
        context.fill();

        context.beginPath(); // рисуем цифры
        if (diameterValue >= 200 && diameterValue < 400) {
            if (i <= 9) {
                context.font='bold 15px Arial';
                context.fillStyle='black';
                context.fillText(i, numberCenterX - context.measureText(i).width/2, numberCenterY + 5);
            } else if (i >= 10) {
                context.font='bold 15px Arial';
                context.fillStyle='black';
                context.fillText(i, numberCenterX - context.measureText(i).width/2, numberCenterY + 5);
            }
        } else if (diameterValue >= 400 && diameterValue < 600) {
            if (i <= 9) {
                context.font='bold 25px Arial';
                context.fillStyle='black';
                context.fillText(i, numberCenterX - context.measureText(i).width/2, numberCenterY + 10);
            } else if (i >= 10) {
                context.font='bold 25px Arial';
                context.fillStyle='black';
                context.fillText(i, numberCenterX - context.measureText(i).width/2, numberCenterY + 5);
            }
        } else if (diameterValue >= 600 && diameterValue <= 800) {
            if (i <= 9) {
                context.font='bold 35px Arial';
                context.fillStyle='black';
                context.fillText(i, numberCenterX - context.measureText(i).width/2, numberCenterY + 10);
            } else if (i >= 10) {
                context.font='bold 35px Arial';
                context.fillStyle='black';
                context.fillText(i, numberCenterX - context.measureText(i).width/2, numberCenterY + 5);
            }
        }
        angle += 30;
      }

      let time = new Date();
      let formatTime = formatDateTime(time);
      if (diameterValue >= 200 && diameterValue < 400) {
        context.fillStyle='black';
        context.font='bold 15px Arial';
        context.fillText(formatTime, dialCenterX - context.measureText(formatTime).width/2, dialCenterY/1.5);
    } else if (diameterValue >= 400 && diameterValue < 600) {
        context.fillStyle='black';
        context.font='bold 30px Arial';
        context.fillText(formatTime, dialCenterX - context.measureText(formatTime).width/2, dialCenterY/1.5);
    } else if (diameterValue >= 600 && diameterValue <= 800) {
        console.log(1)
        context.fillStyle='black';
        context.font='bold 45px Arial';
        context.fillText(formatTime, dialCenterX - context.measureText(formatTime).width/2, dialCenterY/1.5);
    }

    let deg = 6; // 360/60 = 6 за 60 секунд стрелка поворачивается на 360, за 1 с - на 6, за 60 минут стрелка поворачивается на 360, за 1 м - на 6
    let degHour = 30; // 360/12 = 30, за 1 час часовая стрелка поворачивается на 30 градусов
    let hourNow = time.getHours();
    let minuteNow = time.getMinutes();
    let secondNow = time.getSeconds();
    let milisecondNow = time.getMilliseconds();

    let arrowSeconds = parseInt(diameterValue/2.5);
    let arrowMinute = parseInt(diameterValue/4);
    let arrowHour = parseInt(diameterValue/6);

    context.beginPath(); // секундная стрелка
    context.strokeStyle =  "black";
    context.lineWidth = 2;
    context.moveTo(dialCenterX, dialCenterY);
    context.lineTo(dialCenterX + arrowSeconds * Math.cos(Math.PI/2 - (deg * secondNow)/180*Math.PI),
                   dialCenterY - arrowSeconds * Math.sin(Math.PI/2 - (deg * secondNow)/180*Math.PI));
    context.stroke();

    context.beginPath(); // минутная стрелка
    context.strokeStyle =  "black";
    context.lineWidth = 4;
    context.moveTo(dialCenterX, dialCenterY);
    context.lineTo(dialCenterX + arrowMinute * Math.cos(Math.PI/2 - (deg * (minuteNow + (secondNow/60))/180*Math.PI)),
                   dialCenterY - arrowMinute * Math.sin(Math.PI/2 - (deg * (minuteNow + (secondNow/60))/180*Math.PI)));
    context.stroke();

    context.beginPath(); // часовая стрелка
    context.strokeStyle =  "black";
    context.lineWidth = 6;
    context.moveTo(dialCenterX, dialCenterY);
    context.lineTo(dialCenterX + arrowHour * Math.cos(Math.PI/2 - (degHour * (hourNow + (minuteNow/60))/180*Math.PI)),
                   dialCenterY - arrowHour * Math.sin(Math.PI/2 - (degHour * (hourNow + (minuteNow/60))/180*Math.PI)));
    context.stroke();

    console.log(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds())
    setTimeout(createClock, (1010 - milisecondNow));
}
// createClock ()
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

