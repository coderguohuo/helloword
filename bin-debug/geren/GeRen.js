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
var GeRen = (function (_super) {
    __extends(GeRen, _super);
    function GeRen() {
        var _this = _super.call(this) || this;
        _this.skinName = "geren";
        return _this;
    }
    GeRen.prototype.createChildren = function () {
        this.addListener();
        this.init();
    };
    GeRen.prototype.addListener = function () {
        this.rec_close.addEventListener("touchTap", this.Close, this);
        this.group_guanjia.addEventListener("touchTap", this.GuanJia, this);
        this.group_gonggao.addEventListener("touchTap", this.GongGao, this);
        this.group_yaoqing.addEventListener("touchTap", this.YaoQing, this);
        this.rec_sehngji.addEventListener("touchTap", this.ShengJi, this);
        this.img_add_zuanshi.addEventListener("touchTap", this.ZuanShi, this);
    };
    GeRen.prototype.GuanJia = function () {
        //	PopoP.getTips("您的管家正在从火星赶来");
        if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
            Director.getInstance().pushScene(new GuanJia2());
        }
        else {
            Director.getInstance().pushScene(new GuanJia_XiangQing());
        }
    };
    GeRen.prototype.ZuanShi = function () {
        Director.getInstance().pushScene(new ChongZhi());
    };
    GeRen.prototype.GongGao = function () {
        //PopoP.getTips("暂未开放");
        Director.getInstance().pushSceneNoTw(new GongGao());
    };
    GeRen.prototype.YaoQing = function () {
        PopoP.getTips("暂未开放");
    };
    GeRen.prototype.ShengJi = function () {
        Director.getInstance().pushSceneNoTw(new GeRen_ShengJi());
        this.Close();
    };
    GeRen.prototype.init = function () {
        var user = JSON.parse(egret.localStorage.getItem("user"));
        this.user = user;
        this.lab_name.text = user.nickname;
        this.lab_id.text = user.userid;
        this.lab_zuanshi.text = DataUtils.floot(user.dimond);
        this.lab_lv.text = this.user.class;
        if (this.user.avatar != null && this.user.avatar != "") {
            this.img_icon.source = this.user.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
        //经验条
        var str = DataUtils.sub(this.user.nextExe, this.user.needExe);
        var scale = DataUtils.div((this.user.experience - str), this.user.needExe);
        if (this.user.experience >= this.user.nextExe) {
            this.img_needUp.visible = true;
        }
        else {
            this.img_needUp.visible = false;
        }
        if (this.user.needExe == -1) {
            this.img_needUp.visible = false;
        }
        if (scale <= 0) {
            scale = 0;
        }
        else if (scale >= 1) {
            scale = 1;
        }
        if (this.user.needExe <= 0) {
            scale = 1;
        }
        this.rec_jingyan.width = scale * 300;
        this.group_zhuren.height = 0;
        this.group_zhuren.visible = false;
    };
    GeRen.prototype.Close = function () {
        Director.getInstance().removeSceneHeng(this);
    };
    return GeRen;
}(eui.Component));
__reflect(GeRen.prototype, "GeRen");
//# sourceMappingURL=GeRen.js.map