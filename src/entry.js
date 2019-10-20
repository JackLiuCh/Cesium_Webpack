// import Cesium from 'cesium'
const Cesium = require("cesium/Cesium");
require('cesium/Widgets/widgets.css');
require('./css/app.css');
require('./css/vice.css');

window.viewer = new Cesium.Viewer("app");

class pp{
    constructor(){
        this.a = 1;
    }
    set A(value){
        this.a = value;
    }
    get A(){
        return this.a;
    }
    func1(){
        console.log('func1')
    }
}

function niu(){
    alert('niu')
}

window.p = new pp();
window.pp = pp;
window.niu = niu;

