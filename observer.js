
var Observer = function() {
    this.observations = [];
    this.subscribers  = {};
};
 
var Observation = function(name, func) {
    this.name = name;
    this.func = func;
};
 
Observer.prototype = {
    addEventListener : function(name, cb, capture){
        if (!this.subscribers[name]) {
            this.subscribers[name] = [];}
        this.subscribers[name].push(new Observation(name, cb));
    },
    
    dispatchEvent : function(name, data, scope=this||window) {
        var cbs = this.subscribers[name]||[];
            cbs.forEach(cb => cb.func.call(scope, data));  
    },
    
    removeEventListener : function(name, cb){
        var subs = this.subscribers[name]||[];
            subs.remove(i => i.name === name && i.func === cb);
    }
};
window.Observer=Observer;
