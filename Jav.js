 const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSongElement = document.getElementById('currentSong');
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
const playlist = document.getElementById('playlist');

let currentSongIndex = 0;
let songs = [
    { title: 'Cool Down', url: 'Kolohe Kai - Cool Down (320).mp3' },
    { title: 'Soundtrack by: Greenleech', url: 'SOUNDTRACK - GREENLEECH (reimagined) (320).mp3' },
    { title: 'Rebound', url: 'Silent Sanctuary - Rebound (Lyrics) (320).mp3' },
    { title: 'Heaven Knows', url: 'Orange & Lemons - Heaven Knows (This Angel Has Flown) (Official Music Video) (320).mp3' },
    { title: 'You\'ll Be Safe Here', url: 'You\'ll Be Safe Here - Rivermaya (You\'ll Be Safe Here Rivermaya Lyrics) (320).mp3' },
    { title: 'BINI-Pantropiko', url: 'BINI - Pantropiko(MP3_70K).mp3' },
    { title: 'BINI-Salamin_Salamin', url: 'BINI - Salamin_ Salamin(MP3_70K).mp3' },
    { title: 'BINI-Karera', url: 'BINI - Karera (Lyrics)(MP3_70K).mp3' },
    { title: 'ColdPlay-Viva la Vida', url: 'Viva la Vida (Lyrics) - Coldplay(MP3_70K).mp3' },
    { title: 'The Weeknd-Reminder', url: 'The Weeknd - Reminder (Lyrics)(MP3_70K).mp3' },
    { title: '7/11-Toneejay', url: '7_11 ( Lyrics ) - Toneejay(MP3_70K).mp3' },
    { title: 'Cup of Joe_ Janine Teñoso - Tingin', url: 'Cup of Joe_ Janine Teñoso - Tingin (Lyrics)(MP3_70K).mp3' },
    { title: 'Juan Karlos - Ere', url: 'Juan Karlos - Ere (Lyrics)(MP3_70K).mp3' },
    { title: 'Katy Perry - Last Friday Night', url: 'Katy Perry - Last Friday Night (T.G.I.F) _lirik lagu(MP3_70K).mp3' },
    { title: 'Adie_ Janine Berdin - Mahika', url: 'Adie_ Janine Berdin - Mahika (Lyrics)(MP3_70K).mp3' },
    { title: '14 - Silent Sanctuary', url: '14 - Silent Sanctuary (Lyrics)(MP3_70K).mp3' },
    { title: 'Unti-Unti Up Dharma Down', url: 'Unti-Unti Up Dharma Down udd(MP3_70K).mp3' },
    { title: 'SunKissed Lola - Pasilyo', url: 'SunKissed Lola - Pasilyo (Lyrics)(MP3_70K).mp3' },
    { title: 'Silent Sanctuary - Kundiman', url: 'Silent Sanctuary - Kundiman (Official Audio Clip)(MP3_70K).mp3' },
    { title: 'Palagi - TJ Monterde', url: 'Palagi - TJ Monterde (Lyric Video) _ _dhorynmarimon(MP3_70K).mp3' },
    { title: 'Mayonnaise - Jopay', url: 'Mayonnaise - Jopay (Lyrics)(MP3_70K).mp3' },
    { title: 'Paraluman - Adie', url: 'Paraluman - Adie (Lyrics)(MP3_70K).mp3' },
    { title: 'Maki - Dilaw', url: 'Maki - Dilaw (Lyrics)(MP3_70K).mp3' },
    { title: 'Djo - End of Beginning', url: 'Djo - End of Beginning (Official Lyric Video) (320).mp3' },
    { title: 'Greenleech-Wala namang tayo', url: 'Wala namang tayo (320).mp3' },
];

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

populateSearchResults(); // Ensure search results are populated initially

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
