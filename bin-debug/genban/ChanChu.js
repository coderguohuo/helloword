var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChanChu = (function (_super) {
    __extends(ChanChu, _super);
    function ChanChu() {
        var _this = _super.call(this) || this;
        _this.skinName = "chanchu";
        return _this;
    }
    ChanChu.prototype.createChildren = function () {
        this.img_lingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.LingQU, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.rec_jiegu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchJieGu, this);
        this.rec_zhuagenban.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ZhuaGEnBan, this);
    };
    ChanChu.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    ChanChu.prototype.setDate = function (data) {
        var context = this;
        this.data = data;
        console.log(data.props.length);
        if (data.props.length == 0) {
            PopoP.getTips("暂无任何产出");
        }
        else {
        }
        if (this.data.fullFlag) {
            this.img_yiman.visible = true;
        }
        else {
            this.img_yiman.visible = false;
        }
        var arr = [];
        for (var i = 0; i < data.props.length; i++) {
            arr[i] = data.props[i];
        }
        arr.length = 10;
        context.list_beibao.dataProvider = new eui.ArrayCollection(arr);
        context.list_beibao.itemRenderer = ChanChu_Item;
        context.group_beibao.validateNow();
        var str;
        switch (data.work_id) {
            //养蜂场
            case 1000:
                this.img_title.source = "text_yangfeng_png";
                str = "没有人帮您养蜂,产出停滞了";
                break;
            //捕鱼
            case 1001:
                this.img_title.source = "text_buyu_png";
                str = "没有人帮您捕鱼,产出停滞了";
                break;
            //深海打捞
            case 1002:
                str = "没有人帮您打捞,产出停滞了";
                this.img_title.source = "text_dalao_png";
                break;
            //深山挖矿
            case 1003:
                str = "没有人帮您挖矿,产出停滞了";
                this.img_title.source = "text_wakuang_png";
                break;
            //丛林探险
            case 1004:
                str = "没有人帮您丛林探险,产出停滞了";
                this.img_title.source = "text_conglin_png";
                break;
        }
        if (data.slaveStatus == 0) {
            this.group_genban.visible = false;
            this.group_nogenban.visible = true;
            this.lab2.visible = false;
            this.lab_work.text = str;
        }
        else {
            console.log(JSON.stringify(data));
            this.lab_jiegu.text = "解雇跟班";
            this.lab2.visible = true;
            this.group_genban.visible = true;
            this.group_nogenban.visible = false;
            if (data.slave.avatar != null && data.slave.avatar != "") {
                this.img_icon.source = data.slave.avatar;
            }
            else {
                this.img_icon.source = "icon1_png";
            }
            this.lab_name.text = data.slave.nickname;
            switch (data.work_id) {
                //养蜂场
                case 1000:
                    this.lab_note.text = "正在帮您养蜂";
                    this.img_title.source = "text_yangfeng_png";
                    break;
                //捕鱼
                case 1001:
                    this.lab_note.text = "正在帮您捕鱼";
                    this.img_title.source = "text_buyu_png";
                    break;
                //深海打捞
                case 1002:
                    this.lab_note.text = "正在给您深海打捞";
                    this.img_title.source = "text_dalao_png";
                    break;
                //深山挖矿
                case 1003:
                    this.lab_note.text = "正在给您挖矿";
                    this.img_title.source = "text_wakuang_png";
                    break;
                //丛林探险
                case 1004:
                    this.lab_note.text = "正在给您丛林探险";
                    this.img_title.source = "text_conglin_png";
                    break;
            }
            if (data.slaveStatus == 2) {
                this.lab_note.text = "您的跟班已经累瘫了~";
            }
            else if (data.slaveStatus == 3) {
                this.lab_note.text = "您的跟班被" + this.data.other.nickname + "抢走了";
                this.lab_jiegu.text = "查 看";
            }
        }
    };
    ChanChu.prototype.ZhuaGEnBan = function () {
        var genban = new GenBan();
        genban.setDate(this.data);
        Director.getInstance().pushSceneNoTw(genban);
        Director.getInstance().removeScene(this);
    };
    ChanChu.prototype.TouchJieGu = function () {
        if (this.data.slaveStatus == 3) {
            //查看对手信息
            var item = new QiangDao();
            item.setDate(this.data);
            var cb = new CallBackFunc().handler(this.Close, this, []);
            item.setCb(cb);
            Director.getInstance().pushScene(item);
        }
        else {
            this.JieGu1();
        }
    };
    ChanChu.prototype.JieGu1 = function () {
        var cb = new CallBackFunc().handler(this.JieGu, this, []);
        this.addChild(new TiShi("是否确认解除跟班", cb));
    };
    ChanChu.prototype.LingQU = function () {
        var context = this;
        var data = {
            work_id: this.data.work_id
        };
        FachUtils.Post("/cathSlave/harvest", data, function (res) {
            if (res.status) {
                var game = Director.getInstance().gameLayer.getChildByName("game");
                game.RemoveGenBan_ShouYI(context.data.work_id);
                Director.getInstance().getUser();
                var item = new BaHe_LingQu();
                item.setDate(context.data.props);
                Director.getInstance().pushSceneScal(item);
                context.data.props = [];
                //	Director.getInstance().removeScene(context);
                var data = [];
                data.length = 10;
                context.list_beibao.dataProvider = new eui.ArrayCollection(data);
                context.list_beibao.itemRenderer = ChanChu_Item;
                context.group_beibao.validateNow();
            }
            PopoP.getTips(res.message);
        }, function (res) {
        });
    };
    ChanChu.prototype.JieGu = function () {
        var context = this;
        var data = {
            work_id: this.data.work_id
        };
        FachUtils.Post("/cathSlave/freeSlave", data, function (res) {
            if (res.status) {
                context.group_genban.visible = false;
                Director.getInstance().getUser();
                context.group_nogenban.visible = true;
            }
            PopoP.getTips(res.message);
        }, function (res) {
        });
    };
    return ChanChu;
}(eui.Component));
__reflect(ChanChu.prototype, "ChanChu");
//# sourceMappingURL=ChanChu.js.map