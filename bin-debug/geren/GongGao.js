var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GongGao = (function (_super) {
    __extends(GongGao, _super);
    function GongGao() {
        var _this = _super.call(this) || this;
        _this.skinName = "gonggao";
        return _this;
    }
    GongGao.prototype.createChildren = function () {
        this.lab_close.addEventListener("touchTap", this.Close, this);
        var context = this;
        FachUtils.Get("/message/notes/1/1", function (res) {
            if (res.status) {
                if (res.sum == 0) {
                    PopoP.getTips("暂无公告信息");
                    return;
                }
                context.lab_title.text = res.resource[0].title;
                context.lab_content.text = res.resource[0].content;
                context.lab_time.text = DataUtils.format("yyyy-MM-dd hh:mm", new Date(res.resource[0].createTime));
            }
        }, function (res) {
        });
    };
    GongGao.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return GongGao;
}(eui.Component));
__reflect(GongGao.prototype, "GongGao");
//# sourceMappingURL=GongGao.js.map