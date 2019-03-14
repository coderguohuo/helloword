var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Far = (function (_super) {
    __extends(Far, _super);
    function Far() {
        return _super.call(this) || this;
    }
    Far.prototype.getUser = function () {
        console.log(123);
    };
    Far.prototype.initDate = function () {
    };
    return Far;
}(eui.Component));
__reflect(Far.prototype, "Far");
//# sourceMappingURL=Far.js.map