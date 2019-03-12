var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QingGenBan = (function (_super) {
    __extends(QingGenBan, _super);
    function QingGenBan(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "qianggenban";
        return _this;
    }
    QingGenBan.prototype.createChildren = function () {
        this.img_close.addEventListener("touchTap", this.Close, this);
        this.img_yes.addEventListener("touchTap", this.Yes, this);
        this.init();
    };
    QingGenBan.prototype.init = function () {
        this.lab_name.text = this.data.master.nickname;
        if (this.data.master.avatar != null && this.data.master.avatar != "") {
            this.img_icon.source = this.data.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
    };
    QingGenBan.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    QingGenBan.prototype.Yes = function () {
        var context = this;
        var data = {
            user_id: this.data._id,
            work_id: this.data.work_id
        };
        FachUtils.Post("/cathSlave/cath", data, function (res) {
            if (res.status) {
                Director.getInstance().pushScene(new DaDou(res, context.data));
            }
            else {
                PopoP.getTips(res.message);
            }
            Director.getInstance().removeScene(context);
        }, function (res) {
        });
    };
    return QingGenBan;
}(eui.Component));
__reflect(QingGenBan.prototype, "QingGenBan");
//# sourceMappingURL=QingGenBan.js.map