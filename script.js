
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
//audioElement.play();

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
        // Sync play icon with the current playing song
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        // Sync pause icon with the current playing song
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
});

//Listen to Events//
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);   
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        if (audioElement.src.includes(`${songIndex + 1}.mp3`) && !audioElement.paused) {
            // If the same song is playing, pause it
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            // Otherwise, play the new song
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSelectedSong();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    playSelectedSong();
});

const playSelectedSong = () => {
    makeAllPlays(); // Reset all icons
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    
    // Update Bottom Play Button
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
    // Update Container Play Icon
    let currentSongIcon = document.getElementById(songIndex);
    currentSongIcon.classList.remove('fa-circle-play');
    currentSongIcon.classList.add('fa-circle-pause');
};


// Play the next song automatically when the current one ends
audioElement.addEventListener('ended', () => {
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;  
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
