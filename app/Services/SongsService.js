import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {

  constructor() {
    this.getMySongs()
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(res.results);

      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let res = await sandBoxApi.get()
    //TODO What are you going to do with this result
    let results = res.data.data.map(rawData => new Song(rawData));
    ProxyState.playlist = results
    // console.log(ProxyState.songs);
    console.log(res);

  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    let song = ProxyState.songs.find(s => s._id == id)
    let res = await sandBoxApi.post("", song)
    this.getMySongs()
  }
  playPlaylist(id) {
    let song = ProxyState.playlist.find(p => id == p._id)

    ProxyState.activeSong = song
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    // if (ProxyState.activeSong._id == id) {
    //   ProxyState.activeSong = null
    // }
    let res = await sandBoxApi.delete(id)
    this.getMySongs()
    //TODO Send the id to be deleted from the server then update the store
  }
}

const songsService = new SongsService();
export default songsService;
