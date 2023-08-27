
const playbtn = document.getlementById('playbtn');
const prevbtn = document.getElmentById('prev');
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
        image:'music-src/',
        title:'',
        file:'music-src/'
    },
    {
        image:'music-src/',
        title:'',
        file:'music-src/'
    },
    {
        image:'music-src/',
        title:'',
        file:'music-src/'
    }
]
let playing = false;
let repeat = true;
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
    repeatbtn.classList.toggle('repeatactive');
}

function progressbar()
{
    //set time progressor line 
    let time = audio.currentTime;
    let duration = audio.duration;
    let progressvalue = (time / duration) * 100;
    progress.nodeValue = progressvalue;

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




currentplayer();
playbtn.addEventListener('click', audiocontroler);
prevbtn.addEventListener('click', prevaudio);
nextbtn.addEventListener('click', nextaudio);
audio.addEventListener('timeupdate',progressbar);