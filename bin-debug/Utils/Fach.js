var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 请求工具类
 */
var Fach = (function () {
    function Fach() {
    }
    /**
     * 获取加密否的TOKEN
     */
    Fach.getToken = function (url, username, password) {
        if (!password && !egret.localStorage.getItem("user")) {
            return null;
        }
        var pass = "";
        if (password) {
            pass = CryptoJS.AES.encrypt(url + ":" + Fach.uuid().toString(), CryptoJS.HmacMD5(password, password).toString()).toString();
            return "bearer " + username + ":" + pass;
        }
        else {
            if (egret.localStorage.getItem("user") == null) {
                return "";
            }
            var user = JSON.parse(egret.localStorage.getItem("user"));
            if (user.password == null) {
                return "";
            }
            pass = CryptoJS.AES.encrypt(url + ":" + Fach.uuid().toString(), user.password).toString();
            return "bearer " + user.username + ":" + pass;
        }
    };
    /**
     * 获取数据
     */
    Fach.readToken = function (url, token, success, error) {
        var request = new egret.HttpRequest();
        //设置返回信息为字符串
        request.responseType = egret.HttpResponseType.TEXT;
        //设置请求头
        request.setRequestHeader("Authorization", token);
        request.open(this.host + url, egret.HttpMethod.GET);
        request.send();
        //加载失败
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        //加载进度
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        //加载完成
        request.addEventListener(egret.Event.COMPLETE, success, this);
    };
    /**
     * 增加数据
     */
    Fach.createToken = function (url, data, token, success, error) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Authorization", token);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.open(this.host + url, egret.HttpMethod.POST);
        request.send(JSON.stringify(data));
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.addEventListener(egret.Event.COMPLETE, success, this);
    };
    Fach.onGetComplete = function (event) {
        var request = event.currentTarget;
        egret.log("get data : ", JSON.parse(request.response).message);
        return JSON.parse(request.response).message;
    };
    Fach.onGetIOError = function (event) {
        var request = event.currentTarget;
        //	console.log(request);
        egret.log("get error : " + event);
    };
    Fach.onGetProgress = function (event) {
        egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    Fach.createNoToken = function (url, data, success, error) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.open(this.host + url, egret.HttpMethod.POST);
        request.send(JSON.stringify(data));
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.addEventListener(egret.Event.COMPLETE, success, this);
    };
    Fach.createNoToken2 = function (url, data, success, error) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.open(url, egret.HttpMethod.POST);
        request.send(JSON.stringify(data));
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.addEventListener(egret.Event.COMPLETE, success, this);
    };
    Fach.readNoToken = function (url, success, error) {
        var request = new egret.HttpRequest();
        //设置返回信息为字符串
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Authorization", "token");
        request.open(url, egret.HttpMethod.GET);
        request.send();
        //加载失败
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        //加载进度
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        //加载完成
        request.addEventListener(egret.Event.COMPLETE, success, this);
    };
    Fach.uuid = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    //   public static host = "http://192.168.1.146:6100";
    //  public static host = "http://47.92.88.214:6100"; // 测试
    Fach.host = "http://api.hbnc.jimiws.com"; // 正式
    // public static host = "http://t.api.hbnc.jimiws.com"
    Fach.path = "http://qr.liantu.com/api.php?text=http:///?user=";
    Fach.min1 = 300;
    Fach.max1 = 800;
    Fach.min2 = 1000;
    Fach.max2 = 3000;
    Fach.min3 = 2000;
    Fach.max3 = 5000;
    return Fach;
}());
__reflect(Fach.prototype, "Fach");
//# sourceMappingURL=Fach.js.map