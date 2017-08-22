import huh from './huh';

const TICKER = ["AAA.AA", "BB.BB", "CC.C", "DD", "EE.E", "FFF.F", "G.G", "HHHH", "I.III", "J.JJJ"]

/* SUPPORT CLASSES */
class Dispatcher {
    constructor() {
        this.listeners = {};
    }
    addEventListener(type, callback) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    };

    removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
            return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback){
                stack.splice(i, 1);
                return;
            }
        }
    };


    dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
            return true;
        }
        var stack = this.listeners[event.type];
        event.target = this;
        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
        return !event.defaultPrevented;
    };

}

const et = new Dispatcher();

class Feeder {
    static start() {
        let initial = TICKER.map((val) => {
            var value = (Math.random()*1000|0)/100
            return {name:val, value:value};
        });
        setInterval(() => {
            initial.map((val) => {
                let next = Feeder.getNext(val.value);
                et.dispatchEvent({type:'val', value:{name:val.name, value:next}});
            });
        }, 200);
        return initial;
    }

    static getNext(val) {
        let decision = Math.floor(Math.random()*100);
        if(decision % 3 == 0) {
            return val + .01
        }
        if(decision % 4 == 0) {
            return val - .01
        }
        return val;
    }
}

/* VIEW CLASSES */
class Ticker {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.style="width:80px;float:left;";
        this.lowStyle = "width:80px;float:left;color:#ff0000;fontSize:1.2em;"
        this.highStyle = "width:80px;float:left;color:#0000ff;fontSize:1.2em;"
        this.init();
    }

    init() {
        this.nameComponent = (<div style={this.style}>{this.name}</div>);
        this.valueCompoenent = (<div style={this.style}>{this.value}</div>);
    }

    applyStyle(el, value) {
        let a = value.split(";");
        for(let e of a) {
            let b = e.split(":");
            el.style[b[0]] = b[1];
        }
    }

    updateValue(val) {
        if(this.value != val) {
            if(this.value > val) {
                this.applyStyle(this.valueCompoenent, this.lowStyle);
            } else if(this.value < val) {
                this.applyStyle(this.valueCompoenent, this.highStyle);
            }
            this.value = val;
            this.valueCompoenent.innerText = (val).toFixed(2);
            setTimeout(() => {
                this.valueCompoenent.style.fontSize = '1em';
            }, 100);
        }
    }

    render() {
        return (<div style="background:#eee;width:160px;padding:5px;">
            {this.nameComponent}
            {this.valueCompoenent}
            <br />
        </div>);
    }
}

class TickerList {
    constructor(tickers) {
        this.tickerlist = tickers

        et.addEventListener('val', (e)=> {
            let val = e.value;
            for(let el of this.tickerlist) {
                if(el.name == val.name) {
                    el.updateValue(val.value);
                }
            }
        })
    }
    render() {
        var t = this.tickerlist.map((t, i) => {
            let el = new Ticker(t.name, t.value);
            this.tickerlist[i] = el;
            return el.render()
        });
        return (<div>{t}</div>)
    }
}

class Main {
    constructor(tickers) {
        this.tickers = tickers;
    }
    render() {
        return (<div>
            {new TickerList(this.tickers).render()}
        </div>)
    }
}

const initial = Feeder.start();

/* ADD TO STAGE */
const main = new Main(initial);

document.getElementById('main').appendChild(main.render());