var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KuaiDi = (function (_super) {
    __extends(KuaiDi, _super);
    function KuaiDi(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "kuaidi";
        return _this;
    }
    KuaiDi.prototype.createChildren = function () {
        this.lab_num.text = "x " + this.data.count;
        this.img.source = Fach.host + this.data.img;
        this.lab_name.text = this.data.name;
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.user = JSON.parse(egret.localStorage.getItem("user"));
        if (this.user.addressed == 1) {
            this.ed_name.text = this.user.name;
            this.ed_pohone.text = this.user.phone;
            var arr = this.user.address.split(":");
            this.ed_sheng.text = arr[0];
            this.ed_shi.text = arr[1];
            this.ed_qu.text = arr[2];
            this.ed_zhen.text = arr[3];
            this.ed_jie.text = arr[4];
        }
    };
    KuaiDi.prototype.Close = function () {
        SoundsMgr.clickCell();
        Director.getInstance().removeScene(this);
    };
    KuaiDi.prototype.Yes = function () {
        var context = this;
        if (this.ed_pohone.text == "" || this.ed_name.text == "") {
            PopoP.getTips("请输入完整信息");
            return;
        }
        var address = this.ed_sheng.text + ":" +
            this.ed_shi.text + ":" +
            this.ed_qu.text + ":" +
            this.ed_zhen.text + ":" +
            this.ed_jie.text;
        var data = {
            address: address,
            name: this.ed_name.text,
            phone: this.ed_pohone.text
        };
        FachUtils.Post("/workshop/sendToHome/" + this.data._id, data, function (res) {
            if (res.status) {
                PopoP.getTips(res.message);
                context.updateAddress();
                context.Close();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    KuaiDi.prototype.updateAddress = function () {
        var address = this.ed_sheng.text + ":" +
            this.ed_shi.text + ":" +
            this.ed_qu.text + ":" +
            this.ed_zhen.text + ":" +
            this.ed_jie.text;
        var data = {
            address: address,
            name: this.ed_name.text,
            phone: this.ed_pohone.text
        };
        var cangku = Director.getInstance().gameLayer.getChildByName("cangku");
        FachUtils.Post("/user/updateUser", data, function (res) {
            if (res.status) {
                //		PopoP.getTips(res.message)
                cangku.init();
            }
            else {
            }
        }, function (res) {
        });
    };
    return KuaiDi;
}(eui.Component));
__reflect(KuaiDi.prototype, "KuaiDi");
//# sourceMappingURL=KuaiDi.js.map