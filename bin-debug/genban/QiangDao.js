var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QiangDao = (function (_super) {
    __extends(QiangDao, _super);
    function QiangDao() {
        var _this = _super.call(this) || this;
        _this.skinName = "qiangdao";
        return _this;
    }
    QiangDao.prototype.createChildren = function () {
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.QiangHuiLai, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ZhuaGenBan, this);
    };
    QiangDao.prototype.setDate = function (data) {
        this.data = data;
        this.init();
    };
    QiangDao.prototype.setCb = function (cb) {
        this.cb = cb;
    };
    QiangDao.prototype.init = function () {
        if (this.data.other.avatar != null && this.data.other.avatar != "") {
            this.img_icon.source = this.data.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
        this.lab_name.text = this.data.other.nickname;
    };
    QiangDao.prototype.QiangHuiLai = function () {
        this.Yes();
        if (this.cb != null) {
            this.cb.back();
        }
    };
    QiangDao.prototype.Yes = function () {
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
    QiangDao.prototype.ZhuaGenBan = function () {
        Director.getInstance().pushScene(new GenBan());
        Director.getInstance().removeScene(this);
        if (this.cb != null) {
            this.cb.back();
        }
    };
    QiangDao.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return QiangDao;
}(eui.Component));
__reflect(QiangDao.prototype, "QiangDao");
//# sourceMappingURL=QiangDao.js.map