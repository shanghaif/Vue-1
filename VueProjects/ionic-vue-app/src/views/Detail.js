class ItemDetail extends HTMLElement {
    set tech(value) {
        this._tech = value;
        this.dispatchEvent(new CustomEvent('dataChanged', {data:this._tech} ));
    }
    get tech() {
        return this._tech;
    }

    constructor() {
        super();

        // binding methods
        this.dataChanged = this.dataChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `
                    <ion-header translucent>
                        <ion-toolbar>
                            <ion-buttons slot="start">
                                <ion-back-button defaultHref="/"></ion-back-button>
                            </ion-buttons>
                            <ion-title>${this.tech.title || ''}</ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen class="ion-padding">
                        <ion-icon name="logo-${this.tech.icon || ''}" style="color: ${this.tech.color || ''};" size="large"></ion-icon>
                        <p>${this.tech.description || ''}</p>
                    </ion-content>
                    `;
    }

    // 绑定元素与数据
    dataChanged(data) {
        console.log('dataChanged : '+JSON.stringify(data));
    }
}

customElements.define('item-detail', ItemDetail)
