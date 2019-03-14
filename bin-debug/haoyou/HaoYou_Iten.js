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
var HaoYou_Iten = (function (_super) {
    __extends(HaoYou_Iten, _super);
    function HaoYou_Iten() {
        var _this = _super.call(this) || this;
        _this.skinName = "haoyou_item";
        _this.timer = new DateTimer(1000);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.Timer, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.Removed, _this);
        _this.img_hongbao.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.TouQuHongBao, _this);
        _this.img_yong.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.TouchYongJin, _this);
        return _this;
    }
    HaoYou_Iten.prototype.TouchYongJin = function (e) {
        var point = this.img_yong.localToGlobal(this.img_yong.x, this.img_yong.y);
        PopoP.getTips("佣金功能暂未开放");
    };
    HaoYou_Iten.prototype.dataChanged = function () {
        if (this.data.avatar != null && this.data.avatar != "") {
            this.img.source = this.data.avatar;
        }
        else {
            this.img.source = "icon1_png";
        }
        this.lab_name.text = this.data.nickname;
        this.lab_userid.text = this.data.userid;
        if (this.data.commisonCanSteal) {
            this.img_yong.visible = true;
            this.img_yong.parent.setChildIndex(this.img_yong, 1);
        }
        else {
            this.img_yong.visible = false;
            this.img_yong.parent.setChildIndex(this.img_yong, 0);
        }
        if (this.data.nextHavest == 1) {
            if (this.data.nextHavestTime <= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
                this.lab_note.text = "";
                this.lab_jishi.text = "";
                this.img_hongbao.visible = true;
            }
            else {
                if (this.data.commisonCanSteal) {
                }
                else {
                    this.lab_jishi.text = DataUtils.DaoJiShi(this.data.nextHavestTime);
                    this.img_hongbao.visible = false;
                    this.timer.start();
                }
            }
        }
        else {
            this.timer.stop();
            this.lab_note.text = "";
            this.lab_jishi.text = "";
            this.img_hongbao.visible = false;
        }
    };
    HaoYou_Iten.prototype.Timer = function () {
        this.lab_jishi.text = DataUtils.DaoJiShi(this.data.nextHavestTime);
        if (this.data.nextHavestTime <= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
            this.timer.stop();
            this.lab_note.text = "";
            this.lab_jishi.text = "";
            this.img_hongbao.visible = true;
        }
    };
    HaoYou_Iten.prototype.TouQuHongBao = function (e) {
        var context = this;
        var data = {};
        FachUtils.Post("/plant/plt/steal/" + this.data._id, data, function (res) {
            if (res.status) {
                var sum = DataUtils.add(DataUtils.add(DataUtils.add(res.resource.ess, res.resource.experience), res.resource.gold), res.resource.hb);
                if (sum == 0) {
                    PopoP.getTips("偷取失败,此用户已被偷光光了");
                    context.img_hongbao.visible = false;
                    return;
                }
                var item = new GameTitle(1, e, context.img_hongbao, res.resource, context.data);
                Director.getInstance().gameLayer.addChild(item);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    HaoYou_Iten.prototype.Removed = function () {
        this.timer.stop();
    };
    return HaoYou_Iten;
}(eui.ItemRenderer));
__reflect(HaoYou_Iten.prototype, "HaoYou_Iten");
//# sourceMappingURL=HaoYou_Iten.js.map