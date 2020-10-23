export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return /*html*/`
        <div class="row shadow-lg my-2"  data-toggle="modal" data-target="#song-${this._id}">
          <div class="col-4 p-2">
            <img src="${this.albumArt}" class="img-fluid" alt=""/>
          </div>
          <div class="col p-2">
            <h6>Title: ${this.title}</h6>
            <h6>Artist: ${this.artist}</h6>
            <h6>Album: ${this.album}</h6>
          </div>
        </div>
        


        <!-- Modal -->
        <div class="modal fade" id="song-${this._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
             
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="app.songsController.audioPause('${this._id}')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body row">
            <div class="col-5 p-2">
            <img src="${this.albumArt}" class="img-fluid" alt=""/>
          </div>
          <div class="col p-2">
          <h5>Title: ${this.title}</h5>
          <h5>Artist: ${this.artist}</h5>
          <h5>Album: ${this.album}</h5>
          </div>
          
              <div class="col p-2">
              ${this.audio}
           </div>
            </div>
            <div class="modal-footer">
            
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="app.songsController.addSong('${this._id}')">Purchase</button>
            </div>
          </div>
        </div>
        </div>
        `;
  }
  get playlistTemplate() {
    return /*html*/`
            <div class="col-3 shadow-lg m-1">
              <button onclick="app.songsController.removeSong('${this._id}')" class="close text-danger">x</button>
              <img class="img-fluid pt-1" src="${this.albumArt}" onclick="app.songsController.playPlaylist('${this._id}')" alt=""/>
              <p>${this.title}</p>
              <p>${this.artist}</p>

            </div>
        `;
  }


  get activeSongTemplate() {
    return /*html*/`
      <div class="row">
        <div class="col-2">
        <img class="img-fluid" src="${this.albumArt}" alt=""/>
        </div>

        <div class="col-4">
        <h5>${this.title}</h5>
        <h6>${this.artist}</h6>
        </div>

        <div class="col-5">
        ${this.audio}
        </div>

      </div>
    `
  }

  get audio() {
    return /*html*/`
    <audio controls id="${this._id}">
      <source src="${this.preview}"  type="">
    </audio>`
  }
}
