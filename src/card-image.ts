import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('card-image')
export class SongInfo extends LitElement{
    static styles = 
        css`
            img{
                width:151px;
                height:154px;
                border-radius: 0px 4px 4px 0px;
            }
        `
    @property() image!:string;
    render() {
        return html`
            <img src=${this.image} alt="album">
        `
       
}
}