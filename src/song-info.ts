import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('song-info')
export class SongInfo extends LitElement{
    static styles = 
        css`
            p{
                font-family: "Roboto","Helvetica","Arial",sans-serif;
                font-weight: 400;
                margin:0px;
            }

            .song-name{
                font-size: 1.5rem;
                line-height: 1.334;
                letter-spacing: 0em; 
                color: rgba(0, 0, 0, 0.87);
            }

            .singer-name{
                font-weight: 400;
                font-size: 1rem;
                line-height: 1.75;
                letter-spacing: 0.00938em;
                color: rgba(0, 0, 0, 0.6);
            }
            
        `
    @property()name!:string;
    @property()singer!:string;

    render() {
        return html`
            <p class="song-name">${this.name}</p>
            <p class="singer-name">${this.singer}</p>
        `
       
}
}
