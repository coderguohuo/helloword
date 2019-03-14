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
var HongBaoZhengDuo = (function (_super) {
    __extends(HongBaoZhengDuo, _super);
    function HongBaoZhengDuo() {
        var _this = _super.call(this) || this;
        _this.skinName = "hongbaozhengduo";
        return _this;
    }
    HongBaoZhengDuo.prototype.createChildren = function () {
        this.img_close.addEventListener("touchTap", this.Close, this);
        this.btn_canjia.addEventListener("touchTap", this.CanJia, this);
    };
    /**
     * 参加成功后修改date数据
     */
    HongBaoZhengDuo.prototype.setBack = function (data, cb) {
        this.data = data;
        this.cb = cb;
        this.lab_content.text = this.data.tugSetting.gameRule;
    };
    HongBaoZhengDuo.prototype.CanJia = function () {
        var context = this;
        FachUtils.Get("/tug/joinTug", function (res) {
            if (res.status) {
                context.data.joinStatus = 1;
                context.cb.back();
                Director.getInstance().removeScene(context);
            }
            PopoP.getTips(res.message);
        }, function (res) {
        });
    };
    HongBaoZhengDuo.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return HongBaoZhengDuo;
}(eui.Component));
__reflect(HongBaoZhengDuo.prototype, "HongBaoZhengDuo");
//# sourceMappingURL=HongBaoZhengDuo.js.map