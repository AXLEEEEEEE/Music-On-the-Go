 document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSongElement = document.getElementById('currentSong');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    const playlist = document.getElementById('playlist');
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const sidebar = document.getElementById('sidebar');
    const Playlist = document.getElementById('playlist');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const usernameDisplay = document.getElementById('username');
    const profileLink = document.getElementById('profileLink');
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    const profilePassword = document.getElementById('profilePassword');
    const logoutButton = document.getElementById('logoutButton');

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
        { title: 'Paris-The Chainsmokers', url: 'The Chainsmokers - Paris (Lyrics) (320).mp3'},
        { title: 'Rose-The Chainsmokers', url:'The Chainsmokers - Roses (Lyric Video) ft. ROZES(MP3_160K).mp3'},
        { title: 'Closer-The Chainsmokers',url:'The Chainsmokers - Closer (Lyric) ft. Halsey(MP3_160K).mp3'},
        { title: 'Middle-Dj Snake',url:'DJ Snake ft. Bipolar Sunshine - Middle (Official Audio)(MP3_160K).mp3'},
        { title: 'Huwag Muna Tayong Umuwi-BINI',url:'BINI - Huwag Muna Tayong Umuwi (Lyrics)(MP3_160K).mp3'},
        { title: 'Hide Away-Daya',url:'Daya - Hide Away (Lyrics)(MP3_160K).mp3'},
        { title: 'Dont Stop Believin-Journey',url:'Journey - Don_t Stop Believin_ (Lyrics)(MP3_160K).mp3'},
        { title: 'Stargazing-Myles Smith',url:'Myles Smith - Stargazing (Lyrics)(MP3_160K).mp3'},
        { title: 'Maroon 5 - Maps ',url:'Maroon 5 - Maps (Lyric Video)(MP3_160K).mp3'},
        { title: 'Clarity-Zedd',url:'Zedd - Clarity ft. Foxes(MP3_160K).mp3'}, 
        { title: 'This Is What You Came For-Calvin Harris Rihanna ',url:'Calvin Harris_ Rihanna - This Is What You Came For (Official Video) ft. Rihanna(MP3_160K).mp3'},
        { title: 'Cheerleader-OMI',url:'OMI - Cheerleader (Felix Jaehn Remix) (Official Video) [Ultra Records](MP3_160K).mp3'},
        { title: 'More Than You Know',url:'Axwell __ Ingrosso - More Than You Know(MP3_160K).mp3'},
        { title: 'By Your Side-Jonas Blue',url:'Jonas Blue - By Your Side ft. RAYE (Official Video)(MP3_160K).mp3'},
        { title: 'The Chainsmokers - Don_t Let Me Down ',url:'The Chainsmokers - Don_t Let Me Down (Official Video) ft. Daya(MP3_160K).mp3'},
        { title: 'Something Just Like This',url:'The Chainsmokers _ Coldplay - Something Just Like This (Lyric)(MP3_160K).mp3'},
        { title: 'Takeaway',url:'The Chainsmokers_ ILLENIUM - Takeaway (Official Video) ft. Lennon Stella(MP3_160K).mp3'},
        { title: 'This Feeling',url:'The Chainsmokers - This Feeling (Official Video) ft. Kelsea Ballerini(MP3_160K).mp3'},
        { title: 'I Like Me Better',url:'Lauv - I Like Me Better [Official Audio](MP3_160K).mp3'},
        { title: 'Fire Burning-Sean Kingston',url: 'Fire Burning - Sean Kingston (Lyrics)(MP3_160K).mp3'},
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
            playPauseBtn.textContent = '▶️';
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
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach(item => item.classList.remove('playing'));
        if (playlistItems[currentSongIndex]) {
            playlistItems[currentSongIndex].classList.add('playing');
        }
    }

    function addToPlaylist(song) {
        if (!songs.some(s => s.url === song.url)) {
            songs.push(song);
            updatePlaylist();
            if (songs.length === 1) {
                loadSong(0);
            }
        }
    }
    function addToPlaylist(song) {
        songs.push(song);
        const li = document.createElement('li');
        li.textContent = song.title;
        li.classList.add('list-group-item', 'bg-dark', 'text-white', 'playlist-item');
        li.dataset.index = songs.length - 1;
        li.dataset.url = song.url;
    }    
    function updatePlaylist() {
        Playlist.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.classList.add('playlist-item');
            li.dataset.index = index;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '❌';
            removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                songs.splice(index, 1);
                updatePlaylist();
                if (index === currentSongIndex) {
                    if (songs.length > 0) {
                        currentSongIndex = Math.min(index, songs.length - 1);
                        loadSong(currentSongIndex);
                        audioPlayer.play();
                    } else {
                        audioPlayer.pause();
                        audioPlayer.src = '';
                        currentSongElement.textContent = 'Now Playing: None';
                        playPauseBtn.textContent = '▶️';
                    }
                }
            });

            li.appendChild(removeBtn);
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audioPlayer.play();
                playPauseBtn.textContent = '⏸️';
            });
            playlist.appendChild(li);
        });
    }

    function populateSearchResults() {
        let debounceTimeout;
        searchBar.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const query = searchBar.value.toLowerCase();
                searchResults.innerHTML = '';
                if (query) {
                    const filteredResults = songs.filter(song => song.title.toLowerCase().includes(query));
                    filteredResults.forEach(song => {
                        const li = document.createElement('li');
                        li.textContent = song.title;
                        li.classList.add('playlist-item');
                        li.addEventListener('click', () => {
                            currentSongIndex = songs.findIndex(s => s.url === song.url);
                            if (currentSongIndex === -1) {
                                addToPlaylist(song);
                                currentSongIndex = songs.findIndex(s => s.url === song.url);
                            }
                            loadSong(currentSongIndex);
                            audioPlayer.play();
                            playPauseBtn.textContent = '⏸️';
                            searchBar.value = '';
                            searchResults.innerHTML = '';
                        });
                        searchResults.appendChild(li);
                    });
                }
            }, 300);
        });
    }

    function updateProgressBar() {
        if (audioPlayer.duration) {
            progressBar.max = audioPlayer.duration;
            progressBar.value = audioPlayer.currentTime;
            currentTime.textContent = formatTime(audioPlayer.currentTime);
            duration.textContent = formatTime(audioPlayer.duration);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateUsername() {
        const username = localStorage.getItem('username') || 'User';
        usernameDisplay.textContent = username;
        profileUsername.value = username;
    }

    function logout() {
        localStorage.removeItem('username');
        window.location.href = 'signup.html';
    }

    // Sidebar toggle logic
    sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    sidebarCloseBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Initialize player controls
    playPauseBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);

    // Handle profile link click
    profileLink.addEventListener('click', () => {
        $('#profileModal').modal('show');
    });

    // Populate profile modal with data
    $('#profileModal').on('show.bs.modal', () => {
        profileUsername.value = localStorage.getItem('username') || 'User';
        profileEmail.value = localStorage.getItem('email') || 'user@example.com';
        profilePassword.value = '';
    });

    // Handle search bar animation
    searchBar.addEventListener('focus', () => {
        searchBar.classList.add('expanded');
    });

    searchBar.addEventListener('blur', () => {
        setTimeout(() => {
            if (!searchBar.value) {
                searchBar.classList.remove('expanded');
            }
        }, 200);
    });

    // Handle progress bar updates
    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    // Update progress bar when user interacts with it
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });

    // Update progress bar when audio ends
    audioPlayer.addEventListener('ended', playNext);

    // Hide loading screen after page loads 
    window.addEventListener('load', () => {
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });

    // Example username update
    updateUsername();

    // Initialize playlist and search results
    updatePlaylist();
    populateSearchResults();

    // Handle logout button
    logoutButton.addEventListener('click', logout);
});
