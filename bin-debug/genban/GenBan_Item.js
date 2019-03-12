var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenBan_Item = (function (_super) {
    __extends(GenBan_Item, _super);
    function GenBan_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "genban_item";
        return _this;
    }
    GenBan_Item.prototype.createChildren = function () {
        this.rec_yes.addEventListener("touchTap", this.Touch, this);
        this.genban = Director.getInstance().gameLayer.getChildByName("genban");
    };
    GenBan_Item.prototype.dataChanged = function () {
        this.lab_name.text = this.data.nickname;
        if (this.data.avatar != null && this.data.avatar != "") {
            this.img_icon.source = this.data.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
        if (this.data.catchedStatus) {
        }
        else {
            this.img_youzhuren.visible = false;
            this.rec_yes.fillColor = 0x2FC332;
        }
    };
    GenBan_Item.prototype.Touch = function () {
        if (this.data.catchedStatus) {
            //有主人
            if (this.data.master.username) {
                this.user = JSON.parse(egret.localStorage.getItem("user"));
                if (this.user.username == this.data.master.username) {
                    PopoP.getTips("他已经是您的跟班了,请换一个人抓捕");
                    return;
                }
            }
            Director.getInstance().pushSceneNoTw(new QingGenBan(this.data));
            return;
        }
        var context = this;
        var data = {
            user_id: this.data._id,
            work_id: this.genban._id
        };
        FachUtils.Post("/cathSlave/cath", data, function (res) {
            if (res.status) {
                Director.getInstance().popScene();
                Director.getInstance().pushScene(new DaDou(res, context.data));
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    return GenBan_Item;
}(eui.ItemRenderer));
__reflect(GenBan_Item.prototype, "GenBan_Item");
//# sourceMappingURL=GenBan_Item.js.map