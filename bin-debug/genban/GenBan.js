var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenBan = (function (_super) {
    __extends(GenBan, _super);
    function GenBan() {
        var _this = _super.call(this) || this;
        _this.skinName = "genban";
        _this.name = "genban";
        return _this;
    }
    GenBan.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.lab_huan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HuanYiPi, this);
        this.init();
    };
    //建筑的id
    GenBan.prototype.setDate = function (data) {
        this.data = data;
        this._id = this.data.work_id;
    };
    GenBan.prototype.HuanYiPi = function () {
        this.init();
    };
    GenBan.prototype.init = function () {
        var context = this;
        var data = {
            count: 9
        };
        FachUtils.Post("/cathSlave/randusers", data, function (res) {
            if (res.status) {
                context.list.dataProvider = new eui.ArrayCollection(res.resource);
                context.list.itemRenderer = GenBan_Item;
                context.group.validateNow();
            }
        }, function (res) {
        });
    };
    GenBan.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return GenBan;
}(eui.Component));
__reflect(GenBan.prototype, "GenBan");
//# sourceMappingURL=GenBan.js.map