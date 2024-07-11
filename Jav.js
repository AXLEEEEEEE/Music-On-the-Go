 
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSongElement = document.getElementById('currentSong');
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
const playlist = document.getElementById('playlist');

let currentSongIndex = 0;
let songs = [];

async function fetchSongs() {
    try {
        const response = await fetch('songs.json'); // Ensure the correct path
        songs = await response.json();
        if (songs.length > 0) {
            loadSong(currentSongIndex);
            populateSearchResults();
        } else {
            console.error('No songs found in the JSON file');
        }
    } catch (error) {
        console.error('Failed to fetch songs:', error);
    }
}

function loadSong(index) {
    audioPlayer.src = songs[index].url;
    audioPlayer.load();
    updateCurrentSongDisplay();
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '⏯️';
    }
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

function updateCurrentSongDisplay() {
    const currentSongName = songs[currentSongIndex].title;
    currentSongElement.textContent = `Now Playing: ${currentSongName}`;
    const playlistItems = document.querySelectorAll('.playlist li');
    playlistItems.forEach(item => item.classList.remove('playing'));
    if (playlistItems[currentSongIndex]) {
        playlistItems[currentSongIndex].classList.add('playing');
    }
}

function addToPlaylist(song) {
    songs.push(song);
    const li = document.createElement('li');
    li.textContent = song.title;
    li.classList.add('list-group-item', 'bg-dark', 'text-white');
    li.dataset.index = songs.length - 1;
    li.dataset.url = song.url;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the li click event
        const index = parseInt(li.dataset.index);
        songs.splice(index, 1);
        li.remove();
        updatePlaylist();
        if (index === currentSongIndex) {
            if (songs.length > 0) {
                currentSongIndex = (index % songs.length);
                loadSong(currentSongIndex);
                audioPlayer.play();
            } else {
                audioPlayer.pause();
                audioPlayer.src = '';
                currentSongElement.textContent = 'Now Playing: None';
                playPauseBtn.textContent = '⏯️';
            }
        }
    });

    li.appendChild(removeBtn);
    li.addEventListener('click', () => {
        currentSongIndex = parseInt(li.dataset.index);
        loadSong(currentSongIndex);
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    });
    playlist.appendChild(li);
    if (songs.length === 1) {
        loadSong(0);
    }
}

function updatePlaylist() {
    const playlistItems = document.querySelectorAll('.playlist li');
    playlistItems.forEach((item, index) => {
        item.dataset.index = index;
    });
}

function populateSearchResults() {
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        searchResults.innerHTML = '';
        if (query) {
            const filteredResults = songs.filter(song => song.title.toLowerCase().includes(query));
            filteredResults.forEach(song => {
                const li = document.createElement('li');
                li.textContent = song.title;
                li.classList.add('list-group-item', 'bg-dark', 'text-white');
                li.addEventListener('click', () => {
                    addToPlaylist(song);
                    searchBar.value = '';
                    searchResults.innerHTML = '';
                });
                searchResults.appendChild(li);
            });
        }
    });
}

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

window.addEventListener('load', () => {
    fetchSongs(); // Ensure this is called when the window loads
});

const body = document.body;
let colorInterval;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function changeBackgroundColor() {
    body.style.backgroundColor = getRandomColor();
}

audioPlayer.addEventListener('play', () => {
    colorInterval = setInterval(changeBackgroundColor, 1000);
});

audioPlayer.addEventListener('pause', () => {
    clearInterval(colorInterval);
    body.style.backgroundColor = ''; // Reset to default
});

audioPlayer.addEventListener('ended', () => {
    clearInterval(colorInterval);
    body.style.backgroundColor = ''; // Reset to default
});
