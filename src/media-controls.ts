import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property} from 'lit/decorators.js'

import bootstrapcss from "bootstrap/dist/css/bootstrap.min.css?inline" ;

@customElement('media-controls')
export class MediaControl extends LitElement{
    static styles = [unsafeCSS(bootstrapcss),
        css`
            .back-next{
                width:40px;
            }

            .start-pause{
                width:54px;
            }

            .start-pause-btn>.material-icons{
                font-size:38px;
            }

            .back-next-btn>.material-icons{
                font-size:24px;
            }

            .start-pause-btn, .back-next-btn{
                background-color: white;
                padding:8px;
                background:none;
                border: none;
                border: 0px;
                border-radius: 50%;
                font-size:1.5rem;
                transition: background 0.6s;
            }
        
            .start-pause-btn:hover, .back-next-btn:hover{
                background-color: #f3f6f9;
                border-radius: 50%;
                background: #f3f6f9 radial-gradient(circle, transparent 1%, #ededed 1%) center/15000%;
            }
    
            .start-pause-btn:active, .back-next-btn:active {
                background-color: #f3f6f9;
                background-size: 100%;
                transition: background 0s;
            }

            .back-next-btn, .back-next-btn:hover{
                width:40px;
                height:40px;
            }

            .start-pause-btn, .start-pause-btn:hover{
                width:54px;
                height:54px;
            }

            .row{
                align-items: center;
                padding-left: 8px;
                padding-bottom: 8px;
                height:62px;
            }
        `]
    
    @property({type:Boolean}) clicked = false;
    @property() song!:string;
    @property() audioElement = new Audio();
    
    updated(changedProperties) {
        if (changedProperties.has('song')) {
            this.audioElement.src = this.song;
        }
        if(this.clicked){
            this.audioElement.play();
        }
        
      }
    render() {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
            <div class="container "> 
                <div class="row">
                    <div class="col col-3 p-0 back-next">
                        <button type="button" class="back-next-btn" @click=${this.back}>
                            <span class="material-icons">skip_previous</span>
                        </button>
                    </div>
 
                    <div class="col col-4 p-0 start-pause">
                        <button @click=${this.play_pause} type="button" class="start-pause-btn">
                            ${!this.clicked ?  
                            html`
                                <span class="material-icons">play_arrow</span>
                            `:
                            html`
                                <span class="material-icons">pause</span>
                            ` 
                            }
                        </button>
                    </div>
 
                    <div class="col col-3 p-0 back-next" @click=${this.next}>
                        <button type="button" class="back-next-btn">
                            <span class="material-icons">skip_next</span>
                        </button>
                    </div>
                </div>
            </div> 
                    
        ` 
    }
 
    next(){
        this.dispatchEvent(new CustomEvent('next-song', {bubbles:true}));
    }

    back(){
        this.dispatchEvent(new CustomEvent('previous-song', {bubbles:true}));
    } 

    play_pause(){
        this.clicked = !this.clicked;
        if(this.clicked){
            this.audioElement.play();
        }else{
            this.audioElement.pause();
        }  

    }
}
