function makeZeroNum(num, chars = 3) {// 10, 3 ==> "010"
    num = JSON.stringify(num);
    let arr = [];

    for(let i = 0; i < chars - num.length; i++) {
        arr.push("0");
    }

    for(let i = 0; i < num.length; i++) {
        arr.push(num[i]);
    }

    return arr.join("");
}

function repeatVerse(speed = 1) {// تكرار كل آية
    if(((repeatVerseCurrent <= repeatVerseNum && currentVerse == startIn) || (repeatVerseCurrent < repeatVerseNum && currentVerse > startIn)) && currentVerse <= endIn) {// تكرار الآية لم ينتهي
        source.src = `https://a.equran.me/${readerName}/${makeZeroNum(surahNum)}${makeZeroNum(currentVerse)}.mp3`; audio.load();
        audio.playbackRate = speed;
        audio.play();
        
        repeatVerseCurrent++;
    } else if(currentVerse < endIn) {// تكرار الآية انتهى وفي الآية < الأخيرة
        currentVerse++;
        repeatVerseCurrent = 1;

        source.src = `https://a.equran.me/${readerName}/${makeZeroNum(surahNum)}${makeZeroNum(currentVerse)}.mp3`; audio.load();
        audio.playbackRate = speed;
        audio.play();
    } else {// تكرار الآية انتهى وفي الآية == الأخيرة
        isReadEnd = 1;
    }
}

function read() {// تكرار مجموعة الآيات
    // تكرار الآية
    if(currentVerse <= endIn) {
        repeatVerse();
    }
    
    // تكرار مجموعة الآيات
    if(isReadEnd == 1 && repeatAllCurrent < repeatAllNum) {
        currentVerse = startIn;
        repeatVerseCurrent = 1;
        repeatAllCurrent++;
        isReadEnd = 0;

        read();
    }

    // إخفاء زر الإيقاف والتشغيل
    if(isReadEnd == 1) {
        playBtn.style.display = "none";
        stopBtn.style.display = "none";
    }
}

let audio = document.querySelector("audio");
let source = audio.querySelector("source");

let readerNameInput = document.querySelector(".reader-name");
let surahNumInput = document.querySelector(".surah-num");
let startFromInput = document.querySelector(".start-from");
let endToInput = document.querySelector(".end-to");
let repeatAllNumInput = document.querySelector(".repeat-num");
let repeatVerseNumInput = document.querySelector(".repeat-verse-num");
let startBtn = document.querySelector(".start-button");
let playBtn = document.querySelector(".play-button");
let stopBtn = document.querySelector(".stop-button");


let readerName = "Ahmed-Alajamy";
let startIn = 1;
let endIn = 6;
let currentVerse = 1; // i
let repeatAllCurrent = 1; // i
let repeatVerseCurrent = 1; // i

let repeatAllNum = 1;
let repeatVerseNum = 1;
let isReadEnd = -1;


startBtn.onclick = () => {
    readerName = readerNameInput.value;
    surahNum = parseInt(surahNumInput.value);
    startIn = parseInt(startFromInput.value);
    currentVerse = startIn;
    endIn = parseInt(endToInput.value);
    repeatVerseNum = parseInt(repeatVerseNumInput.value);
    repeatAllNum = parseInt(repeatAllNumInput.value);
    
    currentVerse = startIn;
    repeatVerseCurrent = 1;
    repeatAllCurrent = 1;

    playBtn.style.display = "none";
    stopBtn.style.display = "block";

    isReadEnd = 0;
    read();
}

audio.onended = () => {read();}

playBtn.onclick = () => {
    playBtn.style.display = "none";
    stopBtn.style.display = "block";
    audio.play();
}

stopBtn.onclick = () => {
    playBtn.style.display = "block";
    stopBtn.style.display = "none";
    audio.pause();
}
