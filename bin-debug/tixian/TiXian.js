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
var TiXian = (function (_super) {
    __extends(TiXian, _super);
    function TiXian() {
        var _this = _super.call(this) || this;
        _this.skinName = "tixian";
        return _this;
    }
    TiXian.prototype.createChildren = function () {
        this.lab_close.addEventListener("touchTap", this.Close, this);
        this.img_tixian.addEventListener("touchTap", this.TiXian, this);
        this.user = JSON.parse(egret.localStorage.getItem("user"));
        this.initView();
        this.lab_num.text = DataUtils.floot(this.user.hb) + " 元";
    };
    TiXian.prototype.initView = function () {
    };
    TiXian.prototype.TiXian = function () {
        TWUtils.TwCanTouch(this.img_tixian);
        if (this.user.hb < 30) {
            PopoP.getTips("满30元才能提现哦~");
        }
        else {
            PopoP.getTips("提现功能暂未开放");
        }
    };
    TiXian.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return TiXian;
}(eui.Component));
__reflect(TiXian.prototype, "TiXian");
//# sourceMappingURL=TiXian.js.map