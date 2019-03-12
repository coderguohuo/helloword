var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectAnimal_Item = (function (_super) {
    __extends(SelectAnimal_Item, _super);
    function SelectAnimal_Item() {
        var _this = _super.call(this) || this;
        _this.isClock = false;
        _this.skinName = "selectSeed_Item";
        _this.rec_up.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Touch, _this);
        _this.rec_down.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Down, _this);
        return _this;
    }
    SelectAnimal_Item.prototype.Down = function () {
        if (this.isClock) {
            // 锁着状态,弹出种子 解锁页面
            Director.getInstance().pushScene(new Animal_XiangQing(this.data, 1));
        }
        else {
            Director.getInstance().pushScene(new Animal_XiangQing(this.data, 2));
        }
    };
    SelectAnimal_Item.prototype.createChildren = function () {
    };
    SelectAnimal_Item.prototype.dataChanged = function () {
        this.lab_name.text = this.data.name;
        this.lab_shouyi.text = DataUtils.floot(this.data.firHb) + "元";
        this.img.source = Fach.host + this.data.img;
        if (this.data.prop.needProp == -1) {
            this.lab_zhongzhi.text = this.data.plantPrice == 0 ? "免费" : DataUtils.floot(this.data.plantPrice);
        }
        else {
            this.lab_zhongzhi.text = this.data.prop.needCount;
            this.img_seed.source = this.data.prop.img;
        }
        if (this.data.unclockStatus <= 1) {
            this.img_suo.visible = true;
            this.touchEnabled = false;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.img.filters = [this.colorFlilter];
            this.isClock = true;
        }
        else {
            this.isClock = false;
            this.img_suo.visible = false;
            this.img.filters = null;
        }
    };
    SelectAnimal_Item.prototype.Touch = function (e) {
        e.stopPropagation();
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var context = this;
        var data = {
            id: this.data._id
        };
        if (this.isClock) {
            // 锁着状态,弹出种子 解锁页面
            Director.getInstance().pushScene(new Animal_XiangQing(this.data, 1));
            //game.remoSelectSeed();
            return;
        }
        FachUtils.Post("/animal/" + game.animal_selected_pond, data, function (res) {
            if (res.status) {
                game.animal_selected_pond = 0;
                //	game.remoSelectSeed();
                Director.getInstance().getUser(true);
            }
            else if (res.statusCode == 1081) {
                // 无闲置土地 ,弹出种子收益详情
                Director.getInstance().pushScene(new Animal_XiangQing(context.data, 2));
                PopoP.getTips(res.message);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    return SelectAnimal_Item;
}(eui.ItemRenderer));
__reflect(SelectAnimal_Item.prototype, "SelectAnimal_Item");
//# sourceMappingURL=SelectAnimal_Item.js.map