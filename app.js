const searchSong = () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`

    //load data without Async Await
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data)
        )
}

const displaySongs = (songs) => {
    const songContainer = document.getElementById("song-container")
    songContainer.innerHTML ="";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
        
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>


            </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
        
        
        `;
        songContainer.appendChild(songDiv);
        


    });
}

const getLyric = (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    document.getElementById("single-lyric").innerText = "";
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyric(data.lyrics))
}

const displayLyric = (lyrics) =>{
    const lyricDiv = document.getElementById("single-lyric");
    lyricDiv.innerText = lyrics;
}