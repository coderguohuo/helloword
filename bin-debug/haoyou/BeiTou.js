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
var BeiTou = (function (_super) {
    __extends(BeiTou, _super);
    function BeiTou(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "beitou";
        return _this;
    }
    BeiTou.prototype.createChildren = function () {
        if (this.data.news.stealers.length > 1) {
            this.labs.text = "等";
        }
        else {
            this.labs.text = "";
        }
        if (this.data.news.stealers[0].avatar != null && this.data.news.stealers[0].avatar != "") {
            this.img_icon.source = this.data.news.stealers[0].avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
        this.lab_text.text = this.data.news.stealers[0].username;
        this.lab_num.text = DataUtils.floot(this.data.news.hb) + "元";
        this.img_yes.addEventListener("touchTap", this.Yes, this);
        this.img_close.addEventListener("touchTap", this.Close, this);
    };
    BeiTou.prototype.Yes = function () {
        var context = this;
        var data = {
            ids: this.data.news.ttRecordIds
        };
        FachUtils.Post("/plant/steal/read", data, function (res) {
            //	PopoP.getTips(res.message)
            Director.getInstance().removeSceneNoTw(context);
        }, function (res) {
        });
    };
    BeiTou.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return BeiTou;
}(eui.Component));
__reflect(BeiTou.prototype, "BeiTou");
//# sourceMappingURL=BeiTou.js.map