export default class huh {
    static replace(tag, data, ...children) {
        let el = document.createElement(tag);
        for(let arg in data) {
            if(typeof data[arg] == "function") {
                el[arg] = data[arg];
            } else {
                el.setAttribute(arg, data[arg]);
            }
        }
        let append = (el, children) => {
            for(let ch of children) {
                if(ch && ch.nodeType) {
                    el.appendChild(ch)
                } else if(typeof ch == "string" || typeof ch == "number") {
                    el.appendChild(document.createTextNode(ch));
                } else if(ch && ch.length) {
                    append(el, ch);
                }
            }
        }
        append(el, children);
        return el;
    }
}