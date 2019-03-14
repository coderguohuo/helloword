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
var BaHe_LingQu = (function (_super) {
    __extends(BaHe_LingQu, _super);
    function BaHe_LingQu() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "zhuanpan_result";
        return _this;
    }
    BaHe_LingQu.prototype.createChildren = function () {
        //	this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
    };
    BaHe_LingQu.prototype.Touch = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    BaHe_LingQu.prototype.setDate = function (data) {
        this.data = data;
        console.log("~~~~~~~~~~~~~~~~~~");
        console.log(JSON.stringify(data));
        this.index = 0;
        this.BeginFily();
    };
    BaHe_LingQu.prototype.BeginFily = function () {
        this.twFly(this.data[this.index]);
    };
    BaHe_LingQu.prototype.twFly = function (data) {
        if (data.bendi == 1) {
            this.img.source = data.img;
        }
        else {
            this.img.source = Fach.host + data.img;
        }
        this.lab_name.text = data.name;
        this.lab_num.text = "x" + data.count;
        this.group.scaleX = 0.3;
        this.group.scaleY = 0.3;
        this.group.x = 750 / 2;
        this.group.y = 1334 / 2;
        egret.Tween.get(this.group).to({
            scaleY: 1,
            scaleX: 1
        }, 200).to({}, 1000).to({
            scaleY: 0.3,
            scaleX: 0.3,
            x: this.img_beibao.x,
            y: this.img_beibao.y
        }, 500).call(function () {
            if (this.index == (this.data.length - 1)) {
                //完成
                this.Touch();
            }
            else {
                this.index++;
                this.twFly(this.data[this.index]);
            }
        }, this);
    };
    return BaHe_LingQu;
}(eui.Component));
__reflect(BaHe_LingQu.prototype, "BaHe_LingQu");
//# sourceMappingURL=BaHe_LingQu.js.map