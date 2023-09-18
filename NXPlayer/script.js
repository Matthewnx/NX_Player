// button identify
const playbtn = document.getElementById('playbtn');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const repeatbtn = document.getElementById('repeat');
const audioimage = document.getElementById('audioimg');
const audiotitle = document.getElementById('title');
const audioauthor = document.getElementById('author');
const progress = document.getElementById('progressor');
const durationtext = document.getElementById("durationaudio");
const volumeinput = document.getElementById("volinput");
const volumeicon = document.querySelectorAll("#volicon");
const volumebutton = document.getElementById("volumebtn");
const volumemodal = document.getElementById("volcontiners");
const progressback = document.getElementById("pbg");
const progressbackvol = document.getElementById("pbgvolume");

// audio core import
const audio = new Audio();

// variable here
let audios = 
[
    {
        image:'music-src/heart.PNG',
        title:'down town glow',
        file:'music-src/downtown.mp3',
        author:'Ghostrifter Official'
    },
    {
        image:'music-src/heart.PNG',
        title:'down town glow',
        file:'music-src/downtown.mp3',
        author:'Ghostrifter Official'
    },
    {
        image:'music-src/heart.PNG',
        title:'down town glow',
        file:'music-src/downtown.mp3',
        author:'Ghostrifter Official'
    }
]
let playing = false;
let repeat = false;
let audioindex = 0;
let volboolean = false;

//set music data
function currentplayer()
{
    let currentaudio = audios[audioindex];
    audio.src = currentaudio.file;
    audioimage.setAttribute('src',currentaudio.image);
    audiotitle.innerText = currentaudio.title;
    audioauthor.innerText = currentaudio.author;
    
}

// play and pasue functional
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
function audiocontroler() 
{
   playing == false ? playaudio(): audiopause(); 
}

//previous and next button functional 
function prevaudio() 
{
    audioindex--;
    if(audioindex < 0)
    {
        audioindex = audios.length - 1;
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
    progressback.style.width = progress.value + "%";
}
function updater() 
{
    progress.oninput = () => 
    {
        let audiotime = (audio.duration / 100) * progress.value;
        audio.currentTime = audiotime;
        progressback.style.width = progress.value + "%";
        audio.volume = 0;
    }
    audio.volume = volumeinput.value / 100;
    progressbar();
}
//for fix unhandled background
progress.oninput = () =>
{
    progressback.style.width = progress.value + "%";
}


// volume functional
volumeinput.oninput = () =>
{
    let volumevalue = volumeinput.value;
    audio.volume = volumevalue / 100;
    progressbackvol.style.width = volumeinput.value +"%";
    
    volumeicon.forEach( icon => {
        if(volumevalue > 80)
        {
            icon.setAttribute('name','volume-high');
        }
        if(volumevalue < 80)
        {
            icon.setAttribute('name','volume-medium');
        }
        if(volumevalue < 50)
        {
            icon.setAttribute('name','volume-low');
        }
        if(volumevalue < 10)
        {
            icon.setAttribute('name','volume-off');
        }
        if(volumevalue == 0)
        {
            icon.setAttribute('name','volume-mute');
        }
    }
    );
}
// fix unhandled background width
progressbackvol.style.width = "100%";

volumebutton.onclick = () =>
{
    if(volboolean == false)
    {
        volumemodal.style.display = "flex";
        volboolean = true;
    }
    else if(volboolean == true)
    {
        volumemodal.style.display = "none";
        volboolean = false;
    }
    console.log("hello")
}

//add current variable
currentplayer();

//event listner
playbtn.addEventListener('click', audiocontroler);
prevbtn.addEventListener('click', prevaudio);
nextbtn.addEventListener('click', nextaudio);
repeatbtn.addEventListener('click', enablerepeat);
audio.addEventListener('timeupdate',updater);
