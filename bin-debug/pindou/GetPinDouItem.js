var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pindou;
(function (pindou) {
    var GetPinDouItem = (function (_super) {
        __extends(GetPinDouItem, _super);
        function GetPinDouItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GetPinDouItemSkin";
            return _this;
        }
        GetPinDouItem.prototype.createChildren = function () {
            this["grpDo"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoClick, this);
        };
        GetPinDouItem.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            this["imgIcon"].source = this.data.icon;
            this["labName"].text = this.data.name;
            this["labDouNum"].text = this.data.pinDouNum;
            this["labDes"].text = this.data.des;
            if (this.data.isFinish) {
                this["rectBg"].fillColor = 0xF5F5F5;
            }
            else {
                this["rectBg"].fillColor = 0x83CD33;
            }
            this["btnName"].text = this.data.btnName;
        };
        GetPinDouItem.prototype.onDoClick = function () {
            var id = this.data.id;
            if (this.data.isFinish) {
                new Tips().show("已经完成");
                return;
            }
            var addNum = null;
            if (this.data.canGetAward) {
                var getNum = this.data.pinDouNum;
                pindou.pinDouModel.pindou += getNum;
                pindou.pinDouModel.data[id].canGetAward = false;
                addNum = getNum;
            }
            else {
                pindou.pinDouModel.data[id].useTimes++;
                pindou.pinDouModel.data[id].canGetAward = true;
                new Tips().show("可以领奖咯");
            }
            var pinDouLayer = Director.getInstance().getLayerByName("GetPinDouLayer");
            pinDouLayer.updateView(addNum);
        };
        return GetPinDouItem;
    }(eui.ItemRenderer));
    pindou.GetPinDouItem = GetPinDouItem;
    __reflect(GetPinDouItem.prototype, "pindou.GetPinDouItem");
})(pindou || (pindou = {}));
//# sourceMappingURL=GetPinDouItem.js.map