
const playbtn = document.getElementById('playbtn');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const repeatbtn = document.getElementById('repeat');
const audioimage = document.getElementById('audioimg');
const audiotitle = document.getElementById('title');
const progress = document.getElementById('progressor');
const durationtext = document.getElementById("durationaudio");

const audio = new Audio();


let audios = 
[
    {
        image:'music-src/heart.PNG',
        title:'down town',
        file:'music-src/downtown.mp3'
    },
    {
        image:'music-src/heart.PNG',
        title:'down town',
        file:'music-src/downtown.mp3'
    },
    {
        image:'music-src/heart.PNG',
        title:'down town',
        file:'music-src/downtown.mp3'
    }
]
let playing = false;
let repeat = false;
let audioindex = 0;


function currentplayer()
{
    let currentaudio = audios[audioindex];
    audio.src = currentaudio.file;
    audioimage.setAttribute('src',currentaudio.image);
    audiotitle.innerText = currentaudio.title;
}

function playaudio()
{
    audio.play();
    playing = true;
}
function audiopause() 
{
    audio.pause();
    playing = false;
}
function prevaudio() 
{
    audioindex--;
    if(audioindex < 0)
    {
        audioindex = audios.length - 1 ;
    }
    currentplayer();
    playaudio();
}
function nextaudio() 
{
    audioindex++;
    if(audioindex >= audios.length)
    {
        audioindex = 0;
    }
    currentplayer();
    playaudio();
}
function enablerepeat()
{
    repeat = !repeat;
    console.log(repeat);
    repeatbtn.classList.toggle('repeatactive');
}
function progressbar()
{
    //set time progressor line 
    let time = audio.currentTime;
    let duration = audio.duration;
    let progressvalue = (time / duration) * 100;
    progress.value = progressvalue;

    //calculate duration times
    let hours = Math.floor(time / 60);
    let minutes = Math.floor(time % 60);
    let durationtime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    //set duration times  
    durationtext.innerText = durationtime;

    if(time >= duration && repeat)
    {
        playaudio();
    }
    else if ( time >= duration)
    {
        audiopause();
    }
}
function audiocontroler() 
{
   playing == false ? playaudio(): audiopause(); 
}

progress.onchange = () => 
{
    let audiotime = audio.duration * progress.value / 100;
    audio.currentTime = audiotime;
    progress.value = audiotime;
}





currentplayer();
playbtn.addEventListener('click', audiocontroler);
prevbtn.addEventListener('click', prevaudio);
nextbtn.addEventListener('click', nextaudio);
repeatbtn.addEventListener('click', enablerepeat);
audio.addEventListener('timeupdate',progressbar);
