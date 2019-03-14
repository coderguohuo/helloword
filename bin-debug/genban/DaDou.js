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
var DaDou = (function (_super) {
    __extends(DaDou, _super);
    function DaDou(data, otherdata) {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.type = 0; //  1 自己是攻击者  2自己是被打着
        _this.isResult = false; //是否已经弹出结果
        _this.data = data;
        _this.otherdata = otherdata;
        _this.skinName = "dadou";
        return _this;
    }
    DaDou.prototype.createChildren = function () {
        //   this.addEventListener("touchTap", this.Touch, this);
        this.img_jump.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Jump, this);
        this.me = new DogDaDouDragon();
        this.me.setDate("哈士奇战斗");
        this.me.PlayAni1();
        this.me.scaleX = 1;
        this.me.x = this.rec0.x;
        this.me.y = this.rec0.y;
        this.me.startx = this.rec0.x;
        var cb = new CallBackFunc().handler(this.CallBack, this, []);
        this.me.setCallBack(cb);
        this.addChild(this.me);
        this.other = new DogDaDouDragon();
        this.other.setDate("哈士奇战斗");
        this.other.scaleX = -1;
        this.other.PlayAni1();
        this.other.x = this.rec1.x;
        this.other.y = this.rec1.y;
        this.other.startx = this.rec1.x;
        //var cb2 = new CallBackFunc().handler(this.CallBack, this, []);
        this.other.setCallBack(cb);
        this.addChild(this.other);
        this.init();
        this.Begin();
    };
    //跳过战斗
    DaDou.prototype.Jump = function () {
        TWUtils.TwNoTouch(this.img_jump);
        this.img_jump.touchEnabled = false;
        if (this.index == this.data.resource.process.length - 1) {
            return;
        }
        this.index = this.data.resource.process.length - 1 - 1;
    };
    DaDou.prototype.init = function () {
        var user = JSON.parse(egret.localStorage.getItem("user"));
        this.user = user;
        this.lab_nameme.text = user.nickname;
        if (user.avatar != null && user.avatar != "") {
            this.img_iconme.source = user.avatar;
        }
        this.data.resource.attackerFighter.hp = Number(DataUtils.floot(this.data.resource.attackerFighter.hp));
        this.data.resource.otherFighter.hp = Number(DataUtils.floot(this.data.resource.otherFighter.hp));
        this.lab_hpme.text = this.data.resource.attackerFighter.hp + "/" + this.data.resource.attackerFighter.hp;
        if (this.otherdata.catchedStatus) {
            //有主人
            this.lab_nameother.text = this.otherdata.master.nickname;
            if (this.otherdata.master.avatar != null) {
                this.img_iconother.source = this.otherdata.master.avatar;
            }
        }
        else {
            this.lab_nameother.text = this.otherdata.nickname;
            if (this.otherdata.avatar != null) {
                this.img_iconother.source = this.otherdata.avatar;
            }
        }
        this.lab_hpother.text = this.data.resource.otherFighter.hp + "/" + this.data.resource.otherFighter.hp;
    };
    DaDou.prototype.Touch = function () {
        this.me.PlayAni3();
    };
    DaDou.prototype.Begin = function () {
        this.huihedata = this.data.resource.process[this.index];
        this.lab_num.text = (this.index + 1) + "";
        if (this.huihedata != null) {
            if (this.huihedata.selfFlag == 1) {
                this.gongji = this.me;
                this.beida = this.other;
                this.type = 1;
                //自己先攻击
            }
            else {
                //对手先攻击
                this.beida = this.me;
                this.gongji = this.other;
                this.type = 2;
            }
            var data = this.data.resource.process[this.index + 1];
            if (data == null) {
                this.me.over = true;
                this.other.over = true;
            }
            this.GongJI();
        }
    };
    DaDou.prototype.CallBack = function (type) {
        //1 被攻击者要倒地
        //3 开始新一轮的攻击
        switch (type) {
            case 3:
                this.index++;
                this.Begin();
                break;
            case 1:
                this.huihedata.sufferer.hp = Number(DataUtils.floot(this.huihedata.sufferer.hp));
                this.huihedata.attacker.hp = Number(DataUtils.floot(this.huihedata.attacker.hp));
                if (this.type == 1) {
                    this.rec_me.width = this.huihedata.attacker.hp / this.data.resource.attackerFighter.hp * 200;
                    this.rec_other.width = this.huihedata.sufferer.hp / this.data.resource.otherFighter.hp * 200;
                    this.lab_hpother.text = this.huihedata.sufferer.hp + "/" + this.data.resource.otherFighter.hp;
                    this.lab_hpme.text = this.huihedata.attacker.hp + "/" + this.data.resource.attackerFighter.hp;
                    if (this.huihedata.sufferer.hp < 0) {
                        this.lab_hpother.text = 0 + "/" + this.data.resource.otherFighter.hp;
                        this.rec_other.width = 0;
                    }
                    if (this.huihedata.attacker.hp < 0) {
                        this.lab_hpme.text = 0 + "/" + this.data.resource.attackerFighter.hp;
                        this.rec_me.width = 0;
                    }
                }
                else {
                    this.rec_other.width = this.huihedata.attacker.hp / this.data.resource.otherFighter.hp * 200;
                    this.rec_me.width = this.huihedata.sufferer.hp / this.data.resource.attackerFighter.hp * 200;
                    this.lab_hpother.text = this.huihedata.attacker.hp + "/" + this.data.resource.otherFighter.hp;
                    this.lab_hpme.text = this.huihedata.sufferer.hp + "/" + this.data.resource.attackerFighter.hp;
                    if (this.huihedata.sufferer.hp < 0) {
                        this.lab_hpme.text = 0 + "/" + this.data.resource.attackerFighter.hp;
                        this.rec_me.width = 0;
                    }
                    if (this.huihedata.attacker.hp < 0) {
                        this.lab_hpother.text = 0 + "/" + this.data.resource.otherFighter.hp;
                        this.rec_other.width = 0;
                    }
                }
                this.SouShang();
                break;
            case 2://打斗结束 ,出结果
                this.img_jump.visible = false;
                if (!this.isResult) {
                    this.isResult = true;
                    var item = new DaDou_Result(this.data);
                    var cb = new CallBackFunc().handler(this.CallBack, this, []);
                    item.CallBack(cb);
                    item.anchorOffsetX = item.width / 2;
                    item.anchorOffsetY = item.height / 2;
                    item.x = item.width / 2;
                    item.y = item.height / 2;
                    item.scaleX = 0.4;
                    item.scaleY = 0.4;
                    egret.Tween.get(item).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 300);
                    this.addChild(item);
                }
                break;
            case 4:
                //关闭此页面
                Director.getInstance().removeSceneNoTw(this);
                break;
        }
    };
    DaDou.prototype.GongJI = function () {
        this.gongji.PlayAni3();
    };
    DaDou.prototype.SouShang = function () {
        this.beida.PlayAni2();
        this.lab_shanghai.text = "- " + DataUtils.floot(this.huihedata.realDamage);
        this.lab_shanghai.y = this.beida.y;
        this.lab_shanghai.x = this.beida.x + 200 * this.beida.scaleX - this.lab_shanghai.width / 2;
        this.lab_shanghai.anchorOffsetX = this.lab_shanghai.width / 2;
        this.lab_shanghai.anchorOffsetY = this.lab_shanghai.height / 2;
        this.lab_shanghai.scaleX = 1,
            this.lab_shanghai.scaleY = 1,
            egret.Tween.get(this.lab_shanghai).to({
                y: this.lab_shanghai.y - 100,
                scaleX: 1.5,
                scaleY: 1.5,
                alpha: 0.4
            }, 1500).to({
                alpha: 0
            });
    };
    DaDou.prototype.start = function () {
    };
    return DaDou;
}(eui.Component));
__reflect(DaDou.prototype, "DaDou");
//# sourceMappingURL=DaDou.js.map