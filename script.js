console.log('hello')
let songs=[
    {songName:"Ram Ji Ki Nikli Sawari",filePath:"songs/song1.mpeg",coverPath:"covers/cover1.jpg"},
    {songName:"Sweater Weather",filePath:"songs/song2.mpeg",coverPath:"covers/cover2.jpg"},
    {songName:"Replay",filePath:"songs/song3.mpeg",coverPath:"covers/cover3.png"},
    {songName:"Stereo Hearts",filePath:"songs/song4.mpeg",coverPath:"covers/cover4.jpg"},
    {songName:"It ain't me",filePath:"songs/song5.mpeg",coverPath:"covers/cover5.jpg"},
    {songName:"Middle",filePath:"songs/song6.mpeg",coverPath:"covers/cover6.jpg"},
    {songName:"Rewrite the stars",filePath:"songs/song7.mpeg",coverPath:"covers/cover7.jpg"},
    {songName:"Hot bummer girl",filePath:"songs/song8.mpeg",coverPath:"covers/cover8.jpg"},
    {songName:"Stuck with you",filePath:"songs/song9.mpeg",coverPath:"covers/cover9.jpg"},
    {songName:"Industry Baby",filePath:"songs/song10.mpeg",coverPath:"covers/cover10.jpg"},
]
let audioElement=new Audio('songs/song1.mpeg');
let songIndex=0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

songItems.forEach((element,i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    }
    else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/song${songIndex+1}.mpeg`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/song${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/song${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})