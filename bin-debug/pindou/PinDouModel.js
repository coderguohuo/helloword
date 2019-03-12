var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var pindou;
(function (pindou) {
    var PinDouModel = (function () {
        function PinDouModel() {
            this.data = {};
            this.pindou = 0;
            this.isSign = false;
            this.loadConfig();
            // this.initData();
        }
        PinDouModel.prototype.loadConfig = function () {
            var urlLoader = new egret.URLLoader();
            var urlReq = new egret.URLRequest("resource/config/GetPinDouConfig.json");
            urlLoader.load(urlReq);
            urlLoader.addEventListener(egret.Event.COMPLETE, this.onConfigComplete, this);
        };
        PinDouModel.prototype.onConfigComplete = function (event) {
            var jsonStr = event.target.data;
            this.config = JSON.parse(jsonStr);
            this.initData();
        };
        PinDouModel.prototype.initData = function () {
            for (var id in this.config) {
                var cfg = this.config[id];
                var obj = {
                    useTimes: 0,
                    canGetAward: false,
                };
                this.data[id] = obj;
            }
            this.pindou = Math.floor(Math.random() * 1000);
        };
        PinDouModel.prototype.getPinDouList = function () {
            var listData = [];
            for (var id in this.config) {
                var cfg = this.config[id];
                var obj = this.data[id];
                var itemData = {
                    id: Number(id),
                    icon: cfg.icon,
                    name: cfg.name,
                    pinDouNum: cfg.getPinDouNum,
                    des: cfg.des,
                    btnName: cfg.btnName,
                    canGetAward: obj.canGetAward,
                    isFinish: false,
                    order: 1 // 去做
                };
                if (obj.canGetAward) {
                    itemData.btnName = "领取拼豆";
                    itemData.order = 0; // 可领取
                }
                if (cfg.dayTimes) {
                    if (obj.useTimes >= cfg.dayTimes) {
                        itemData.isFinish = true;
                        itemData.btnName = "已完成";
                        itemData.order = 2; // 已完成
                    }
                }
                listData.push(itemData);
            }
            listData.sort(function (a, b) {
                if (a.order != b.order) {
                    return a.order - b.order;
                }
                else {
                    return a.id - b.id;
                }
            });
            return listData;
        };
        return PinDouModel;
    }());
    pindou.PinDouModel = PinDouModel;
    __reflect(PinDouModel.prototype, "pindou.PinDouModel");
    pindou.pinDouModel = new pindou.PinDouModel();
})(pindou || (pindou = {}));
//# sourceMappingURL=PinDouModel.js.map