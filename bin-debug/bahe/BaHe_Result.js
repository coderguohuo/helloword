var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaHe_Result = (function (_super) {
    __extends(BaHe_Result, _super);
    function BaHe_Result() {
        var _this = _super.call(this) || this;
        _this.jiangpindata = [];
        _this.skinName = "bahe_result";
        return _this;
    }
    BaHe_Result.prototype.createChildren = function () {
        this.rec_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
    };
    BaHe_Result.prototype.setDate = function (data) {
        this.data = data;
        switch (data.tuggingRecords.winner) {
            case 0:
                this.img_lab.source = "pingju_png";
                this.img_title.source = "title_yellow_png";
                this.img_bg.source = "dadou_shibai1_png";
                this.lab_title.textColor = 0xffffff;
                //平局奖红包
                this.jiangpindata[0] = {
                    name: "红包",
                    count: data.tuggingRecords.hb,
                    img: "hongbao2_png",
                    bendi: 1
                };
                break;
            case 1:
                this.img_lab.source = "dadou_shibai_png";
                this.img_title.source = "title_blue_png";
                this.img_bg.source = "dadou_shibai1_png";
                this.lab_title.textColor = 0xffffff;
                this.jiangpindata = data.tuggingRecords.props;
                break;
            case 2:
                this.img_lab.source = "dadouchenggong_png";
                this.img_title.source = "title_red_png";
                this.img_bg.source = "dadou_shibai2_png";
                this.lab_title.textColor = 0xFFE485;
                this.jiangpindata[0] = {
                    name: "红包",
                    count: data.tuggingRecords.hb,
                    img: "hongbao2_png",
                    bendi: 1
                };
                break;
        }
    };
    BaHe_Result.prototype.Yes = function () {
        var context = this;
        FachUtils.Get("/tug/harvest/" + this.data.tuggingRecords._id, function (res) {
            if (res.status) {
                var item = new BaHe_LingQu();
                item.setDate(context.jiangpindata);
                Director.getInstance().pushSceneScal(item);
                Director.getInstance().removeSceneNoTw(context);
            }
        }, function (res) {
        });
    };
    return BaHe_Result;
}(eui.Component));
__reflect(BaHe_Result.prototype, "BaHe_Result");
//# sourceMappingURL=BaHe_Result.js.map