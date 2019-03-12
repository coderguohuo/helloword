var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JiaGong = (function (_super) {
    __extends(JiaGong, _super);
    function JiaGong() {
        var _this = _super.call(this) || this;
        _this.selectItem = null;
        _this.skinName = "jiagong";
        _this.name = "jiagong";
        return _this;
    }
    JiaGong.prototype.createChildren = function () {
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchYes, this);
        this.list.addEventListener(egret.Event.CHANGING, this.Changing, this);
        this.list.addEventListener(egret.Event.CHANGE, this.TouchItem, this);
        this.jishi = new JiShi();
        this.group_jindu.addChildAt(this.jishi, 0);
        //设置默认选中项
        this.initDate();
    };
    JiaGong.prototype.initDate = function () {
        var context = this;
        FachUtils.Get("/workshop/overView", function (res) {
            if (res.status) {
                context.selectDate = res.resource.displayGoods;
                context.init(context.selectDate);
                var data = res.resource.goodsArr;
                context.list.dataProvider = new eui.ArrayCollection(data);
                context.list.itemRenderer = JiaGong_Item;
                context.list.selectedIndex = 0;
            }
        }, function (res) {
        });
    };
    JiaGong.prototype.init = function (data) {
        this.img.source = Fach.host + data.img;
        this.lab_name.text = data.name;
        this.lab_jinghua.text = "x" + DataUtils.floot(data.plt_sessence);
        this.lab_num_daoju.text = "x" + DataUtils.floot(data.needCount);
        this.img.addEventListener(egret.Event.COMPLETE, this.Size.bind(this, this.img, this.group_img), this);
        this.img_daoju.source = Fach.host + data.prop.img;
        this.img_daoju.addEventListener(egret.Event.COMPLETE, this.Size.bind(this, this.img_daoju, this.group_daoju), this);
        this.lab_daoju.text = data.prop.name;
        this.img_daoju.maxWidth = this.group_daoju.width;
        this.img_daoju.maxHeight = this.group_daoju.height;
        this.img.maxWidth = this.group_img.width;
        this.img.maxHeight = this.group_img.height;
        if (this.selectDate.status == 0) {
            this.btn_yes.source = "btn_jiagong1_png";
            this.jishi.setDate(data.time, 0);
            //	this.lab_jiagong.text = "加工需耗时:" + data.time;
            this.lab_note.text = "";
            this.selectDate = data;
        }
        else {
            if (this.selectDate._id == data._id) {
                this.lab_note.text = "";
                if (this.selectDate.status == 1) {
                    this.lab_jiagong.text = "加工中";
                    this.jishi.setDate(data.time * 1000 + data.produceTime, 1, data.produceTime);
                    //	this.group_jindu.addChildAt(new JiShi(data.time * 1000 + data.produceTime), 0);
                    this.btn_yes.source = "";
                }
                else if (this.selectDate.status == 2) {
                    this.jishi.setDate(data.time * 1000 + data.produceTime, 2);
                    this.lab_jiagong.text = "加工完成";
                    this.btn_yes.source = "btn_jiagong3_png";
                }
            }
            else {
                this.jishi.setDate(data.time, 0);
                this.lab_jiagong.text = "加工需耗时:" + data.time;
                this.btn_yes.source = "";
                this.lab_note.text = "请先等待其他商品加工完成";
            }
        }
    };
    JiaGong.prototype.Size = function (img, group) {
        if (img.width > group.width) {
            var scr = group.width / img.width;
            img.height = img.height * scr;
            img.width = img.width * scr;
        }
        if (img.height > group.height) {
            var scr2 = group.height / img.height;
            img.height = img.height * scr2;
            img.width = img.width * scr2;
        }
    };
    JiaGong.prototype.Close = function () {
        SoundsMgr.clickCell();
        Director.getInstance().removeScene(this);
    };
    JiaGong.prototype.TouchItem = function (e) {
        var item = this.list.getChildAt(this.list.selectedIndex);
        this.init(item.data);
    };
    JiaGong.prototype.Changing = function (e) {
        var item = this.list.getChildAt(this.list.selectedIndex);
        if (item.unClock) {
        }
        else {
            e.preventDefault();
            PopoP.getTips("此商品将于" + item.data.u_class + "级解锁");
        }
    };
    JiaGong.prototype.TouchYes = function () {
        if (this.selectDate.status == 0) {
            this.Yes();
        }
        else if (this.selectDate.status == 1) {
        }
        else if (this.selectDate.status == 2) {
            this.TiQu();
        }
    };
    JiaGong.prototype.Yes = function () {
        var context = this;
        FachUtils.Get("/workshop/produce/" + this.selectDate._id, function (res) {
            if (res.status) {
                //PopoP.getTips(res.message);
                context.initDate();
                Director.getInstance().getUser();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    JiaGong.prototype.TiQu = function () {
        var context = this;
        FachUtils.Get("/workshop/harvest", function (res) {
            if (res.status) {
                Director.getInstance().gameLayer.addChild(new LingQu(res.resource));
                context.Close();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    return JiaGong;
}(eui.Component));
__reflect(JiaGong.prototype, "JiaGong");
//# sourceMappingURL=JiaGong.js.map