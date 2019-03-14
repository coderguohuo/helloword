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
var SelectAnimal = (function (_super) {
    __extends(SelectAnimal, _super);
    function SelectAnimal() {
        var _this = _super.call(this) || this;
        _this.biaoqianName = null;
        _this.skinName = "selectSeed";
        _this.name = "selectanimal";
        return _this;
    }
    SelectAnimal.prototype.createChildren = function () {
        var context = this;
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.addEventListener("touchTap", this.Touch, this);
        if (ListBeans.getInstance().animalMianBan != null) {
            var res = ListBeans.getInstance().animalMianBan;
            var data = res.resource.plants;
            context.list.dataProvider = new eui.ArrayCollection(data);
            context.list.itemRenderer = SelectAnimal_Item;
            context.BiaoQian(res.resource.tags);
        }
        else {
            FachUtils.Get2('/animal/tags', function (res) {
                if (res.status) {
                    ListBeans.getInstance().animalMianBan = res;
                    ListBeans.getInstance().animalMianBan.BiaoQIan = [];
                    var data = res.resource.plants;
                    context.list.dataProvider = new eui.ArrayCollection(data);
                    context.list.itemRenderer = SelectAnimal_Item;
                    context.BiaoQian(res.resource.tags);
                }
            }, function (res) {
            });
        }
    };
    SelectAnimal.prototype.Touch = function (e) {
        switch (e.target) {
            case this.rad_shishi:
            case this.rad_chaofan:
            case this.rad_gaoji:
            case this.rad_tutong:
            case this.rad_xiyou:
            case this.rad_chuanqi:
            case this.rad_qiji:
                console.log(e.target.name);
                this.biaoqianName = e.target.name;
                this.TouchBiaoQian();
                break;
        }
    };
    SelectAnimal.prototype.TouchBiaoQian = function () {
        var context = this;
        context.group.scrollH = 0;
        if (ListBeans.getInstance().animalMianBan.BiaoQIan[Number(this.biaoqianName)] != null) {
            var res = ListBeans.getInstance().animalMianBan.BiaoQIan[Number(this.biaoqianName)];
            var data = res.resource.plants;
            context.list.dataProvider = new eui.ArrayCollection(data);
            context.list.itemRenderer = SelectSeed_Item;
            context.list.dataProviderRefreshed();
        }
        else {
            FachUtils.Get2("/animal/seed/" + this.biaoqianName, function (res) {
                if (res.status) {
                    ListBeans.getInstance().animalMianBan.BiaoQIan[Number(context.biaoqianName)] = res;
                    var data = res.resource.plants;
                    context.list.dataProvider = new eui.ArrayCollection(data);
                    context.list.itemRenderer = SelectSeed_Item;
                    context.list.dataProviderRefreshed();
                }
            }, function (res) {
            });
        }
    };
    SelectAnimal.prototype.HeChengCallback = function () {
        if (this.biaoqianName == null) {
            this.biaoqianName = this.group_biaoqian.getChildAt(0).name;
        }
        var context = this;
        context.group.scrollH = 0;
        FachUtils.Get2("/animal/seed/" + this.biaoqianName, function (res) {
            if (res.status) {
                ListBeans.getInstance().animalMianBan.BiaoQIan[Number(context.biaoqianName)] = res;
                var data = res.resource.plants;
                context.list.dataProvider = new eui.ArrayCollection(data);
                context.list.itemRenderer = SelectSeed_Item;
                context.list.dataProviderRefreshed();
            }
        }, function (res) {
        });
    };
    SelectAnimal.prototype.BiaoQian = function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = this.group_biaoqian.getChildByName(data[i].id);
            item.visible = true;
            this.group_biaoqian.addChildAt(item, i);
        }
        this.group_biaoqian.getChildAt(0).selected = true;
    };
    SelectAnimal.prototype.Close = function () {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        game.remoSelecAnimal();
    };
    return SelectAnimal;
}(eui.Component));
__reflect(SelectAnimal.prototype, "SelectAnimal");
//# sourceMappingURL=SelectAnimal.js.map