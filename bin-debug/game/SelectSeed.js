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
var SelectSeed = (function (_super) {
    __extends(SelectSeed, _super);
    function SelectSeed() {
        var _this = _super.call(this) || this;
        _this.DragedSize = 60;
        _this.dragedSeedData = null;
        _this.biaoqianName = null;
        _this.skinName = "selectSeed";
        _this.name = "selectseed";
        return _this;
    }
    SelectSeed.prototype.setSeedBeClicked = function (data) {
        this.dragedSeedData = data;
        this.list.scrollEnabled = false;
        this.scrSeed.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    SelectSeed.prototype.onTouchMove = function (e) {
        if (!this.dragedSeedData)
            return;
        console.log("stage-> moving now ! Mouse: [X:" + e.stageX + ",Y:" + e.stageY + "]");
        if (this.imgDragSeed == null) {
            var imgDragSeed = new eui.Image(Fach.host + this.dragedSeedData.img);
            imgDragSeed.width = imgDragSeed.height = this.DragedSize;
            this.addChild(imgDragSeed);
            this.imgDragSeed = imgDragSeed;
        }
        var p = this.globalToLocal(e.stageX, e.stageY);
        this.imgDragSeed.x = p.x - this.DragedSize / 2;
        this.imgDragSeed.y = p.y - this.DragedSize / 2;
        var game = Director.getInstance().gameLayer.getChildByName("game");
        game.tryToPlant(e.stageX, e.stageY, this.dragedSeedData);
    };
    SelectSeed.prototype.onTouchEnd = function (e) {
        console.log("stage-> moving over ! Mouse: [X:" + e.stageX + ",Y:" + e.stageY + "]");
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        if (this.imgDragSeed) {
            this.removeChild(this.imgDragSeed);
            this.imgDragSeed = null;
        }
        this.dragedSeedData = null;
        this.scrSeed.scrollPolicyH = eui.ScrollPolicy.AUTO;
    };
    SelectSeed.prototype.createChildren = function () {
        var context = this;
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.addEventListener("touchTap", this.Touch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        if (ListBeans.getInstance().seedMianBan != null) {
            var res = ListBeans.getInstance().seedMianBan;
            var data = res.resource.plants;
            context.list.dataProvider = new eui.ArrayCollection(data);
            context.list.itemRenderer = SelectSeed_Item;
            context.BiaoQian(res.resource.tags);
        }
        else {
            FachUtils.Get2('/plant/tags', function (res) {
                if (res.status) {
                    ListBeans.getInstance().seedMianBan = res;
                    ListBeans.getInstance().seedMianBan.biaoqianName = [];
                    var data = res.resource.plants;
                    context.list.dataProvider = new eui.ArrayCollection(data);
                    context.list.itemRenderer = SelectSeed_Item;
                    context.BiaoQian(res.resource.tags);
                }
            }, function (res) {
            });
        }
    };
    SelectSeed.prototype.Touch = function (e) {
        switch (e.target) {
            case this.rad_shishi:
            case this.rad_chaofan:
            case this.rad_gaoji:
            case this.rad_tutong:
            case this.rad_xiyou:
            case this.rad_chuanqi:
            case this.rad_qiji:
                this.biaoqianName = e.target.name;
                this.TouchBiaoQian();
                break;
        }
    };
    SelectSeed.prototype.TouchBiaoQian = function () {
        var context = this;
        context.group.scrollH = 0;
        if (ListBeans.getInstance().seedMianBan.biaoqianName[Number(this.biaoqianName)] != null) {
            var res = ListBeans.getInstance().seedMianBan.biaoqianName[Number(this.biaoqianName)];
            var data = res.resource.plants;
            context.list.dataProvider = new eui.ArrayCollection(data);
            context.list.itemRenderer = SelectSeed_Item;
            context.list.dataProviderRefreshed();
        }
        else {
            FachUtils.Get2("/plant/seed/" + this.biaoqianName, function (res) {
                if (res.status) {
                    ListBeans.getInstance().seedMianBan.biaoqianName[Number(context.biaoqianName)] = res;
                    var data = res.resource.plants;
                    context.list.dataProvider = new eui.ArrayCollection(data);
                    context.list.itemRenderer = SelectSeed_Item;
                    context.list.dataProviderRefreshed();
                }
            }, function (res) {
            });
        }
    };
    SelectSeed.prototype.HeChengCallBack = function () {
        var context = this;
        context.group.scrollH = 0;
        if (this.biaoqianName == null) {
            this.biaoqianName = this.group_biaoqian.getChildAt(0).name;
        }
        FachUtils.Get2("/plant/seed/" + this.biaoqianName, function (res) {
            if (res.status) {
                ListBeans.getInstance().seedMianBan.biaoqianName[Number(context.biaoqianName)] = res;
                var data = res.resource.plants;
                context.list.dataProvider = new eui.ArrayCollection(data);
                context.list.itemRenderer = SelectSeed_Item;
                context.list.dataProviderRefreshed();
            }
        }, function (res) {
        });
    };
    SelectSeed.prototype.BiaoQian = function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = this.group_biaoqian.getChildByName(data[i].id);
            item.visible = true;
            this.group_biaoqian.addChildAt(item, i);
        }
        this.group_biaoqian.getChildAt(0).selected = true;
    };
    SelectSeed.prototype.Close = function () {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        game.remoSelectSeed();
    };
    return SelectSeed;
}(eui.Component));
__reflect(SelectSeed.prototype, "SelectSeed");
//# sourceMappingURL=SelectSeed.js.map