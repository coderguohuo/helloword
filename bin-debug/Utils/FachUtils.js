var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FachUtils = (function () {
    function FachUtils() {
    }
    FachUtils.Get = function (url, chenggong, shibai) {
        var loading = ResLoading.getInstance();
        egret.MainContext.instance.stage.addChild(loading);
        Fach.readToken(url, Fach.getToken(url, null, null), function (event) {
            if (loading.parent != null) {
                loading.parent.removeChild(loading);
            }
            var request = event.currentTarget;
            console.log(request.response);
            var response = JSON.parse(request.response);
            //联网成功
            chenggong(response);
        }, function (event) {
            if (loading.parent != null) {
                loading.parent.removeChild(loading);
            }
            // var request = <egret.HttpRequest>event.currentTarget;
            // let response = JSON.parse(request.response);
            //联网失败
            var response = {
                "message": "联网失败"
            };
            shibai(response);
        });
    };
    FachUtils.Get2 = function (url, chenggong, shibai) {
        Fach.readToken(url, Fach.getToken(url, null, null), function (event) {
            var request = event.currentTarget;
            console.log(request.response);
            var response = JSON.parse(request.response);
            //联网成功
            chenggong(response);
        }, function (event) {
            // var request = <egret.HttpRequest>event.currentTarget;
            // let response = JSON.parse(request.response);
            //联网失败
            var response = {
                "message": "联网失败"
            };
            shibai(response);
        });
    };
    FachUtils.Post = function (url, data, chenggong, shibai, isTurning) {
        var loading = ResLoading.getInstance();
        if (isTurning) {
            egret.MainContext.instance.stage.addChild(loading);
        }
        Fach.createToken(url, data, Fach.getToken(url, null, null), function (event) {
            if (loading.parent != null) {
                loading.parent.removeChild(loading);
            }
            var request = event.currentTarget;
            console.log(request.response);
            var response = JSON.parse(request.response);
            //联网成功
            chenggong(response);
        }, function (event) {
            if (loading.parent != null) {
                loading.parent.removeChild(loading);
            }
            var response = {
                "message": "联网失败"
            };
            shibai(response);
        });
    };
    FachUtils.Post2 = function (url, data, chenggong, shibai) {
        Fach.createToken(url, data, Fach.getToken(url, null, null), function (event) {
            var request = event.currentTarget;
            var response = JSON.parse(request.response);
            //联网成功
            chenggong(response);
        }, function (event) {
            var response = {
                "message": "联网失败"
            };
            shibai(response);
        });
    };
    FachUtils.PostNoToken = function (url, data, chenggong, shibai) {
        var loading = ResLoading.getInstance();
        egret.MainContext.instance.stage.addChild(loading);
        Fach.createNoToken(url, data, function (event) {
            if (loading.parent != null) {
                loading.parent.removeChild(loading);
            }
            var request = event.currentTarget;
            console.log(request.response);
            var response = JSON.parse(request.response);
            //联网成功
            chenggong(response);
        }, function (event) {
            if (loading.parent != null) {
                loading.parent.removeChild(loading);
            }
            var response = {
                "message": "联网失败"
            };
            shibai(response);
        });
    };
    return FachUtils;
}());
__reflect(FachUtils.prototype, "FachUtils");
//# sourceMappingURL=FachUtils.js.map