/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 * 
 * 
 */
 titleCreation('Songs', 'songs');

 function timeConvert (seconds){
    let date = new Date(null);
    date.setSeconds(seconds);
    let result = date.toISOString().substr(11, 8);
    return result;
 }

 function playSong(songId) {
    const selectedSong = document.getElementById(songId);
    const classes = []
    classes.push(["selected"])

    const songs = document.getElementsByClassName("song");
    for (let song of songs) {
        song.classList.remove(classes)
    }
    selectedSong.classList.add(classes);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const coverImg = createElement('img', [],["songPhoto"],{src: coverArt});
    const children = [coverImg, "Song Name:"+ title + " ,","Album:"+ album+ " ,","Artist:"+ artist+ " ,","Duration:" +timeConvert(duration)+ " "]
    const classes = ['songElement']
    const attrs = { onclick: `playSong(${id})` }

    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */

 titleCreation('Playlists', 'playlists');

function numberOfSongs(playlistId){
    let totalSongsNum = 0;
    for (let i = 0; i<player.playlists.length; i++){
        if (player.playlists[i].id === playlistId){
            totalSongsNum = player.playlists[i].songs.length;
        }
    }
    return totalSongsNum;
}

function playlistDuration (playlistId){
    let totalPlayTime = 0;
    for (let i = 0; i<player.playlists.length; i++){
        if (playlistId === player.playlists[i].id){
            for (let j = 0;j<player.playlists[i].songs.length; j++){
                for (let k = 0; k<player.songs.length; k++){
                    if (player.playlists[i].songs[j] === player.songs[k].id){
                        totalPlayTime += player.songs[k].duration;
                    }
                }
            }
        }
    }
    return totalPlayTime;
}

function createPlaylistElement({ id, name, songs }) {
    const children = ["Name: " +name+ " ,","Number of songs: "+ numberOfSongs(id)+' ,', "Total play Time: " + timeConvert(playlistDuration(id))]
    const classes = ['playlistClass']
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */


function createElement(tagName, children = [], classes = [], attributes = {}) {
    const elm = document.createElement(tagName);

    for (const child of children){
        elm.append(child);
    }

    for(const cls of classes) {
        elm.classList.add(cls);
      }

    for (const attr in attributes) {
    elm.setAttribute(attr, attributes[attr]);
    }
    return elm
}



// You can write more code below this line

let divSongs = document.getElementById('songs');

function songsDiv(){
    for (let i = 0; i<player.songs.length; i++){
        let y = createSongElement(player.songs[i]);
        divSongs.append(y);
    }
}

songsDiv()

function titleCreation (title, divId){
    let h1 = document.createElement('h1');
    let titleText = document.textContent = title;
    h1.append(titleText);
    let div1 = document.getElementById(divId);
    div1.append(h1);
    div1.classList.add('titleClass');
    return div1
}

let divPlayLists = document.getElementById('playlists');

function PlaylistsDiv (){
    for (let i = 0; i<player.playlists.length; i++){
        let y = createPlaylistElement(player.playlists[i]);
        divPlayLists.append(y);
    }
    return divPlayLists
}

PlaylistsDiv ()

