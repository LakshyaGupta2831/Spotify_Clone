console.log('Welcome to Spotify');

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('video-img1/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ainsi bas la vida - Mini World (Deluxe) by Indila", filePath: 'video-img1/1.mp3', coverPath: 'video-img1/song-1.jpg'},
    {songName: "Falling - Trevor Daniel ", filePath: 'video-img1/2.mp3', coverPath: 'video-img1/2.jpg'},
    {songName: "Stereo Hearts (feat. Adam Levine) -  Gym Class Heroes", filePath: 'video-img1/3.mp3', coverPath: 'video-img1/3.jpg'},
    {songName: "Into Your Arms -  Witt Lowry (ft. Ava Max)", filePath: 'video-img1/4.mp3', coverPath: 'video-img1/4.jpg'},
    {songName: "Alone, Pt. II - (ft. Alan Walker, Ava Max )", filePath: 'video-img1/5.mp3', coverPath: 'video-img1/5.jpg'},
    {songName: "Danza Kuduro - Don Omar", filePath: 'video-img2/6.mp3', coverPath: 'video-img2/6.jpg'},
    {songName: "Let Me Down Slowly - Alec Benjamin ", filePath: 'video-img2/7.mp3', coverPath: 'video-img2/7.jpg'},
    {songName: "London View Bootleg - Emin Nilsen", filePath: 'video-img2/8.mp3', coverPath: 'video-img2/8.jpg'},
    {songName: "Wellerman (Sea Shanty) -  Nathan Evans", filePath: 'video-img2/9.mp3', coverPath: 'video-img2/9.jpg'},
    {songName: "Hymn for the Weekend - Coldplay", filePath: 'video-img2/10.mp3', coverPath: 'video-img2/10.jpg'}
];

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);   
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach((element) => {
        element.classList.replace('fa-circle-pause', 'fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
        e.target.classList.replace('fa-circle-play', 'fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSelectedSong();
});

const playSelectedSong = () => {
    makeAllPlays();
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    document.getElementById(songIndex).classList.replace('fa-circle-play', 'fa-circle-pause');
};

audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong();
});
