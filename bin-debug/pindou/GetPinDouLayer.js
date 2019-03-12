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
    var GetPinDouLayer = (function (_super) {
        __extends(GetPinDouLayer, _super);
        function GetPinDouLayer() {
            var _this = _super.call(this) || this;
            _this.selectTabIndex = 0;
            _this.skinName = "GetPinDouLayerSkin"; // 83CD33 F5F5F5     333333
            _this.name = "GetPinDouLayer";
            return _this;
        }
        GetPinDouLayer.prototype.createChildren = function () {
            this.labClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.imgSign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignClick, this);
            // this.listGet.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemClick, this);
            var self = this;
            var _loop_1 = function (i) {
                var grpBtn = this_1["grpTab" + i];
                grpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    self.onTabClick(i);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 3; ++i) {
                _loop_1(i);
            }
            this.updateView();
        };
        GetPinDouLayer.prototype.updateView = function (addNum) {
            this.labPinDouNum.text = "" + pindou.pinDouModel.pindou;
            var x = this.labPinDouNum.x + this.labPinDouNum.width;
            this.labPinDou.x = x + 10;
            if (pindou.pinDouModel.isSign) {
                this.labSign.text = "已签到";
                this.imgSign.source = "img_map_gray_png";
            }
            else {
                this.labSign.text = "签到 >";
                this.imgSign.source = "img_map_show_png";
            }
            this.updateTabs();
            this.switchTab(this.selectTabIndex);
            if (addNum) {
                this.playPinDouAddAction(addNum);
            }
        };
        GetPinDouLayer.prototype.updateTabs = function () {
            for (var i = 0; i < 3; ++i) {
                var labTab = this["labTab" + i];
                var imgTab = this["imgTab" + i];
                if (i == this.selectTabIndex) {
                    labTab.textColor = 0x333333;
                    imgTab.visible = true;
                }
                else {
                    labTab.textColor = 0x666666;
                    imgTab.visible = false;
                }
            }
            this.switchTab(this.selectTabIndex);
        };
        GetPinDouLayer.prototype.playPinDouAddAction = function (addNum) {
            if (addNum == null)
                addNum = 1;
            var flyLab = new eui.Label("+" + addNum);
            flyLab.textColor = 0x83CD33;
            flyLab.x = this.labPinDou.x + this.labPinDou.width + 5;
            var sy = this.labPinDou.y - 5;
            flyLab.y = sy;
            flyLab.size = 28;
            this.labPinDou.parent.addChild(flyLab);
            egret.Tween.get(flyLab).to({
                y: sy - 30,
                alpha: 0
            }, 1000).call(function () {
                flyLab.parent.removeChild(flyLab);
            });
            pindou.pinDouModel.pindou += addNum;
            this.labPinDouNum.text = "" + pindou.pinDouModel.pindou;
        };
        GetPinDouLayer.prototype.onSignClick = function () {
            if (pindou.pinDouModel.isSign) {
                new Tips().show("已签到");
                return;
            }
            pindou.pinDouModel.isSign = true;
            this.labSign.text = "已签到";
            this.imgSign.source = "img_map_gray_png";
            new Tips().show("签到成功");
            this.playPinDouAddAction();
        };
        GetPinDouLayer.prototype.onTabClick = function (index, force) {
            if (!force && index == this.selectTabIndex)
                return;
            var preLab = this['labTab' + this.selectTabIndex];
            var preImg = this['imgTab' + this.selectTabIndex];
            preLab.textColor = 0x666666;
            preImg.visible = false;
            var labTab = this['labTab' + index];
            var imgTab = this["imgTab" + index];
            labTab.textColor = 0x333333;
            imgTab.visible = true;
            this.selectTabIndex = index;
            this.switchTab(index);
        };
        GetPinDouLayer.prototype.switchTab = function (index) {
            if (index != 0) {
                new Tips().show("敬请期待");
                this.listGet.visible = false;
            }
            this.listGet.visible = true;
            this.listGet.dataProvider = new eui.ArrayCollection(pindou.pinDouModel.getPinDouList());
            this.listGet.itemRenderer = pindou.GetPinDouItem;
            this.listGet.validateNow();
        };
        GetPinDouLayer.prototype.close = function () {
            Director.getInstance().removeSceneNoTw(this);
        };
        return GetPinDouLayer;
    }(eui.Component));
    pindou.GetPinDouLayer = GetPinDouLayer;
    __reflect(GetPinDouLayer.prototype, "pindou.GetPinDouLayer");
})(pindou || (pindou = {}));
//# sourceMappingURL=GetPinDouLayer.js.map