"use strict";
// аудио для игры
let playList = [
    {
        title: 'Л.Бетховен Лунная соната',
        src: 'audio/L.Betxoven-lunnaya-conata.mp3'
    },
    {
        title: 'А.Вивальди Времена года. Лето',
        src: 'audio/A.Vivaldi-vremena-goda-leto.mp3',
    },
    {
        title: 'И.С.Бах. Ария из сюиты 3',
        src: 'audio/I.S.Bax-ariya.mp3',
    }
];
let player = document.querySelector('.player');
let play = document.querySelector('.play-button');
let playNext = document.querySelector('.play-next-button');
let playPrev = document.querySelector('.play-prev-button');
let textAudio = document.querySelector('.text-music');
let audio = new Audio ();
let isPlay = false;
let numberPlay = 0;

play.addEventListener('click', playAudio);
function playAudio () {
    audio.src = playList[numberPlay].src;
    audio.currentTime = 0;
    if (!isPlay) {
        isPlay = true;
        play.classList.add('pause-button');
        audio.play();
        textAudio.textContent = `${playList[numberPlay].title}`;
        audio.addEventListener('ended', palyNextAudio);
    } else {
        isPlay = false;
        play.classList.remove('pause-button');
        audio.pause();
    }
}
playNext.addEventListener('click', palyNextAudio);
function palyNextAudio () {
    numberPlay = numberPlay === playList.length - 1 ? 0 : ++numberPlay;
    isPlay = false;
    playAudio();
}
playPrev.addEventListener('click', playPrevAudio);
function playPrevAudio () {
    if (numberPlay === 0) {
        numberPlay = playList.length;
    }
    numberPlay = numberPlay - 1;
    isPlay = false;
    playAudio();
}