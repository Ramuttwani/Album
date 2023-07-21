console.log("Welcome to MySpotify");

//Initialize the Variables
let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Popular", filePath:"songs/1.mp3", coverPath :"covers/1.jpg"},
    {songName: "Reminder", filePath:"songs/2.mp3", coverPath :"covers/2.jpg"},
    {songName: "Loser", filePath:"songs/3.mp3", coverPath :"covers/3.jpg"},
    {songName: "Call Out My Name", filePath:"songs/4.mp3", coverPath :"covers/4.jpg"},
    {songName: "Starboy", filePath:"songs/5.mp3", coverPath :"covers/5.jpg"},
    // {songName: "Starboy", filePath:"songs/6.mp3", coverPath :"covers/6.jpg"},
    // {songName: "WTF", filePath:"songs/7.mp3", coverPath :"covers/7.jpg"},
    // {songName: "Hello", filePath:"songs/8.mp3", coverPath :"covers/8.jpg"},
    // {songName: "Hello", filePath:"songs/9.mp3", coverPath :"covers/9.jpg"},
    // {songName: "Hello1", filePath:"songs/10.mp3", coverPath :"covers/10.jpg"},
]


//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<= 0 ){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})


//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
      //Update seekbar
      progress = parseInt((audioElement.currentTime/ audioElement.duration)*100);
      myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
     makeAllPlays();
     songIndex = parseInt(e.target.id);
     e.target.classList.remove('fa-circle-play');
     e.target.classList.add('fa-circle-pause');
     audioElement.src= `songs/${songIndex+1}.mp3`;
     audioElement.currentTime = 0;
     audioElement.play();
     masterSongName.innerText = songs[songIndex].songName;
     masterPlay.classList.remove('fa-circle-play');
         masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
      if (songIndex>=4){
         songIndex = 0;
         } else{
          songIndex +=1;
          }
          audioElement.src= `songs/${songIndex+1}.mp3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          masterPlay.classList.remove('fa-circle-play');
              masterPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', ()=>{
      if (songIndex<=0){
         songIndex = 4;
         } else{
          songIndex -=1;
          }
          audioElement.src= `songs/${songIndex+1}.mp3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          masterPlay.classList.remove('fa-circle-play');
              masterPlay.classList.add('fa-circle-pause');
})

  

songItems.forEach((element, i)=> {

    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
     
 });


