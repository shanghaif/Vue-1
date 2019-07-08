import './Detail'

class ListComponent extends HTMLElement {
    constructor() {
        super();
      
        // 添加shadowDom
        let shadowRoot = this.attachShadow({mode: 'open'});
        let styles = `
            h3 {font-weight: normal;}
            .num-input {text-align: center;}
        `;

        let techs = [
            {
                'title': 'Angular',
                'icon': 'angular',
                'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
                'color': '#E63135'
            },
            {
                'title': 'CSS3',
                'icon': 'css3',
                'description': 'The latest version of cascading stylesheets - the styling language of the web!',
                'color': '#0CA9EA'
            },
            {
                'title': 'HTML5',
                'icon': 'html5',
                'description': 'The latest version of the web\'s markup language.',
                'color': '#F46529'
            },
            {
                'title': 'JavaScript',
                'icon': 'javascript',
                'description': 'One of the most popular programming languages on the Web!',
                'color': '#FFD439'
            },
            {
                'title': 'Sass',
                'icon': 'sass',
                'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
                'color': '#CE6296'
            },
            {
                'title': 'NodeJS',
                'icon': 'nodejs',
                'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
                'color': '#78BD43'
            },
            {
                'title': 'Python',
                'icon': 'python',
                'description': 'A clear and powerful object-oriented programming language!',
                'color': '#3575AC'
            },
            {
                'title': 'Markdown',
                'icon': 'markdown',
                'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
                'color': '#412159'
            },
            {
                'title': 'Tux',
                'icon': 'tux',
                'description': 'The official mascot of the Linux kernel!',
                'color': '#000'
            },
        ];

        shadowRoot.innerHTML = `
            <style>${styles}</style>
            <ion-header translucent>
                <ion-toolbar>
                    <ion-buttons>
                        <ion-back-button defaultHref="/"></ion-back-button>
                    </ion-buttons>
                    <ion-title>Nav</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content fullscreen>
                <ion-list>
                ${techs.map(tech => `
                    <ion-item button">
                        <ion-icon slot="start" name="logo-${tech.icon}" style="color: ${tech.color};"></ion-icon>
                        <ion-label>
                        <h3>${tech.title}</h3>
                        </ion-label>
                    </ion-item>
                `).join('\n')}
                </ion-list>
            </ion-content>
        `;
        
        function showDetail(index){
            const nav = document.querySelector('ion-nav');
            const tech = techs[index];

            /*
            // 在`createElement`的时候构造函数就已经调用，所以构造函数里获取构造完后传的参数是读不到的
            // 必须在组件内部把参数调用移动到初始化以后，即放在`connectedCallback`中调用
            const item_detail = document.createElement('item-detail');
            item_detail.tech = tech;
            //item_detail.dataset.tech = JSON.stringify(tech);
            nav.push(item_detail);
            */

           const item_detail = document.createElement('item-detail');
           // 监听组件的自定义分发事件
           item_detail.addEventListener('dataChanged', v => console.log(v));

           item_detail.tech = tech;
           nav.push(item_detail);


        }
        
        // 绑定事件(不使用闭包语法事件会立即执行...?)
        let items = this.shadowRoot.querySelectorAll('ion-item');
        (function(){
            var index = 0;
            while(items[index]) {
                const button = items[index];
                button.addEventListener('click', function(index) {
                    return function() {
                        showDetail(index);
                    }
                }(index))
                index ++;
            }
        })()
    }
}
   
// 注册 <list-component></list-component> 组件
customElements.define('list-component', ListComponent)


/*
// 组件示例 
const template = document.createElement('template');
template.innerHTML = `<style> button, p { display: inline-block; } </style>
                    <button aria-label="decrement">-</button>
                    <p>0</p>
                    <button aria-label="increment">+</button>`;    
class XCounter extends HTMLElement {    
    set value(value) {
        this._value = value;
        this.valueElement.innerText = this._value; // trigger our custom event 'valueChange'
        this.dispatchEvent(new CustomEvent('valueChange', { detail: this._value }));
    }
    get value() {
        return this._value;
    }
        
    constructor() {
        super();

        this._value = 0;
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
        this.valueElement = this.root.querySelector('p');
        this.incrementButton = this.root.querySelectorAll('button')[1];
        this.decrementButton = this.root.querySelectorAll('button')[0];
        this.incrementButton.addEventListener('click', (e) => this.value++);
        this.decrementButton.addEventListener('click', (e) => this.value--);
    }
}    

// 注册组件
customElements.define('x-counter', XCounter);

// 使用组件
import 'counter.js';
const counter = document.querySelector('x-counter');
counter.value = 10;
counter.addEventListener('valueChange', v => console.log(v));

*/