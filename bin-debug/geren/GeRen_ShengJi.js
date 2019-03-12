var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeRen_ShengJi = (function (_super) {
    __extends(GeRen_ShengJi, _super);
    function GeRen_ShengJi() {
        var _this = _super.call(this) || this;
        _this.skinName = "geren_shengji";
        return _this;
    }
    GeRen_ShengJi.prototype.createChildren = function () {
        this.img_shengji.addEventListener("touchTap", this.ShengJi, this);
        this.lab_close.addEventListener("touchTap", this.Close, this);
        this.addEventListener(GameEvent.getUserInfo, this.init, this);
        this.init();
    };
    GeRen_ShengJi.prototype.init = function () {
        var context = this;
        FachUtils.Get("/user/ability", function (res) {
            if (res.status) {
                context.lab_shengming.text = DataUtils.floot(res.resource.hp);
                context.lab_qizhi.text = DataUtils.floot(res.resource.vitality);
                context.lab_baoji.text = DataUtils.floot(DataUtils.mul(100, res.resource.crit_rate)) + "%";
                context.lab_gold.text = DataUtils.floot(res.resource.upGradeGold);
            }
        }, function (res) {
        });
        this.user = JSON.parse(egret.localStorage.getItem("user"));
        this.lab_lv.text = this.user.class;
        this.lab_jingyan.text = (parseInt(this.user.experience) - (parseInt(this.user.nextExe) - this.user.needExe)) + "/" + (parseInt(this.user.nextExe) - (parseInt(this.user.nextExe) - this.user.needExe));
        this.lab_name.text = this.user.nickname;
        if (this.user.avatar != null && this.user.avatar != "") {
            this.img_icon.source = this.user.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
        //经验条
        var str = DataUtils.sub(this.user.nextExe, this.user.needExe);
        var scale = DataUtils.div((this.user.experience - str), this.user.needExe);
        if (scale <= 0) {
            scale = 0;
        }
        else if (scale >= 1) {
            scale = 1;
        }
        if (this.user.needExe <= 0) {
            scale = 1;
        }
        this.rec_jingyan.width = scale * 400 + 20;
    };
    GeRen_ShengJi.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    GeRen_ShengJi.prototype.ShengJi = function () {
        var context = this;
        FachUtils.Get("/user/upgrade", function (res) {
            if (res.status) {
                Director.getInstance().getUser(true);
                var item = new ShengJi_CG(res.resource);
                context.addChild(item);
                PopoP.getTips(res.message);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    return GeRen_ShengJi;
}(eui.Component));
__reflect(GeRen_ShengJi.prototype, "GeRen_ShengJi");
//# sourceMappingURL=GeRen_ShengJi.js.map