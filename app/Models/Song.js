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
        <div class="row shadow bg-transparent my-2 radius bg-dark text-light"  data-toggle="modal" data-target="#song-${this._id}">
          <div class="col-3 p-1">
            <img src="${this.albumArt}" class="img-fluid" alt=""/>
          </div>
          <div class="col-1"></div>
          <div class="col-7 p-1 d-flex">
<div class="my-auto">
<h6>${this.title}</h6>
<h6>${this.artist}</h6>
<h6>${this.album}</h6>
</div>
          </div>
<div class="col-1 p-1 d-flex justify-content-center">
<i class="fa fa-play-circle my-auto fa-2x" aria-hidden="true"></i>
</div>

        </div>
        


        <!-- Modal -->
        <div class="modal fade" id="song-${this._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-dark text-white">

            <div class="modal-body row">
            <div class="col-5 p-2">
            <img src="${this.albumArt}" class="img-fluid" alt=""/>
          </div>
          <div class="col-7 p-2 d-flex">
<div class="my-auto">
<h5>${this.title}</h5>
<h5>${this.artist}</h5>
<h5>${this.album}</h5>
</div>
          </div>
          
              
            </div>
            <div class="modal-footer">
            ${this.audio}
              <button type="button" class="btn bg-transparent text-light border-0" data-dismiss="modal" onclick="app.songsController.audioPause('${this._id}')">
              
              <i class="far fa-times-circle"></i>
              </button>
              <button type="button" class="btn bg-transparent text-light border-0" onclick="app.songsController.addSong('${this._id}')">
            
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        </div>
        `;
  }
  get playlistTemplate() {
    return /*html*/`
    <div class="col-4">
    <div class="shadow bg-transparent radius text-light m-3 p-2 text-center">
    <button onclick="app.songsController.removeSong('${this._id}')" class="close text-light">x</button>
    <img class="img-fluid pt-1" src="${this.albumArt}" onclick="app.songsController.playPlaylist('${this._id}')" alt=""/>
    <p class="mt-2">${this.title}</p>
    <p>${this.artist}</p>
    
    </div>
    </div>
        `;
  }


  get activeSongTemplate() {
    return /*html*/`
      <div class="row bg-dark text-light p-1">
        <div class="col-1">
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
