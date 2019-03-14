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
var Game_GenBan = (function (_super) {
    __extends(Game_GenBan, _super);
    function Game_GenBan() {
        var _this = _super.call(this) || this;
        _this.skinName = "game_genban";
        return _this;
    }
    Game_GenBan.prototype.createChildren = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
    };
    Game_GenBan.prototype.Touch = function () {
        //this.rec.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        // var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
        // var e = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
        switch (this.type) {
            case 0:
                var genban = new GenBan();
                genban.setDate(this.data);
                Director.getInstance().pushSceneNoTw(genban);
                break;
            case 1:
                if (this.data.slaveStatus == 3) {
                    var qd = new QiangDao();
                    qd.setDate(this.data);
                    Director.getInstance().pushScene(qd);
                }
                else {
                    var item = new ChanChu();
                    item.setDate(this.data);
                    Director.getInstance().pushScene(item);
                }
                break;
        }
    };
    //有跟班在工作
    Game_GenBan.prototype.setDate = function (data, rec) {
        this.type = 1;
        this.rec = rec;
        this.data = data;
        this.group_ren.visible = true;
        this.lab.text = "";
        this.img.visible = false;
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
                break;
            //捕鱼
            case 1001:
                this.lab_note.text = "正在帮您捕鱼";
                break;
            //深海打捞
            case 1002:
                this.lab_note.text = "正在给您深海打捞";
                break;
            //深山挖矿
            case 1003:
                this.lab_note.text = "正在给您挖矿";
                break;
            //丛林探险
            case 1004:
                this.lab_note.text = "正在给您丛林探险";
                break;
        }
        if (data.slaveStatus == 2) {
            this.lab_note.text = "您的跟班已经累瘫了~";
        }
        else if (data.slaveStatus == 3) {
            this.lab_note.text = "您的跟班被" + this.data.other.nickname + "抢走了";
        }
    };
    //没有跟班
    Game_GenBan.prototype.setDate2 = function (data, rec) {
        this.data = data;
        this.type = 0;
        this.rec = rec;
        this.group_ren.visible = false;
        this.img.visible = true;
        this.lab.text = "";
        switch (data.work_id) {
            //养蜂场
            case 1000:
                this.lab.text = "抓个跟班帮您养蜂";
                break;
            //捕鱼
            case 1001:
                this.lab.text = "抓个跟班帮您捕鱼";
                break;
            //深海打捞
            case 1002:
                this.lab.text = "抓个跟班给您深海打捞";
                break;
            //深山挖矿
            case 1003:
                this.lab.text = "抓个跟班给您挖矿";
                break;
            //丛林探险
            case 1004:
                this.lab.text = "抓个跟班给您丛林探险";
                break;
        }
    };
    return Game_GenBan;
}(eui.Component));
__reflect(Game_GenBan.prototype, "Game_GenBan");
//# sourceMappingURL=Game_GenBan.js.map