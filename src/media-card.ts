import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import bootstrapcss from "bootstrap/dist/css/bootstrap.min.css?inline" ;

import './song-info'
import './media-controls'
import './card-image'

@customElement('media-card')
export class MediaCard extends LitElement{
    static styles = [unsafeCSS(bootstrapcss),
        css`
            .container{
                width:360px;
                height:154px;
                border-radius: 4px;
                box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
            }

            song-info{
                padding: 16px;
            }

            media-control{
                padding:0px;
            }
            
        `]

    @property()songs=[];
    @state() i = 0;
 
    connectedCallback() { 
        super.connectedCallback();
        this.fetchSongs().then((songs) => {
            this.songs = songs;
        });
    } 

    render() {
        let current = this.songs[this.i];

        return html`
            <div class="container">
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <song-info
                             name=${current.name}
                             singer=${current.singer}>
                            </song-info>

                            <media-controls 
                             @next-song=${() => this._next()} 
                             @previous-song=${() => this._previous()}
                             song = ${current.song}
                             >
                            </media-controls>
                        </div>
                    </div>
                    <div class="col-5 p-0">
                        <card-image 
                         image="${current.image}">
                        </card-image> 
                    </div>
                </div> 
            </div> 
             
        `; 
    }     
    
    _next(){
        if(this.i == this.songs.length - 1){
            this.i = 0;
        }else{
            this.i= this.i + 1;
        } 
    }

    _previous(){
        if(this.i == 0){
            this.i = this.songs.length - 1;
        }else{
            this.i = this.i - 1;
        }
    }

    fetchSongs() {
        return fetch("./src/songs.json")
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error fetching JSON:", error);
          });
        }
}

