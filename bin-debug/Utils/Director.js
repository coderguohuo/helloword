var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Director = (function () {
    function Director() {
        this.stackLayer = [];
        //��Ϸ��,��ʵ����Main��
        this.gameLayer = null;
        this.rects = [];
        this.ShiJianCha = 0;
    }
    Director.getInstance = function () {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    };
    Director.prototype.initWithMain = function (m) {
        if (this.gameLayer == null) {
            this.gameLayer = egret.MainContext.instance.stage;
        }
    };
    Director.prototype.addListener = function () {
        // var sound = SoundMenager.Shared();
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, function () {
            //	sound.PlayBGM();
            SoundsMgr.value = 1;
            if (SoundsMgr._bgm_channel != null) {
                SoundsMgr._bgm_channel.volume = SoundsMgr.value;
            }
        }, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, function () {
            //sound.StopBGM();
            SoundsMgr.value = 0;
            if (SoundsMgr._bgm_channel != null) {
                SoundsMgr._bgm_channel.volume = SoundsMgr.value;
            }
        }, this);
    };
    Director.prototype.getRect = function () {
        var rect = new eui.Rect();
        rect.x = 0;
        rect.y = 0;
        rect.width = 750;
        rect.height = 1334;
        rect.fillColor = 0x000000;
        rect.alpha = 0.15;
        this.rects.push(rect);
        return rect;
    };
    /**
     * 删除所有
     */
    Director.prototype.repleaceScene = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChildren();
            this.gameLayer.addChild(layer);
            this.stackLayer = [];
            this.rects = [];
            this.stackLayer.push(layer);
        }
    };
    /**
     * 添加场景
     */
    Director.prototype.pushScene = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(this.getRect());
            this.gameLayer.addChild(layer);
            layer.y = -layer.height;
            egret.Tween.get(layer).to({
                y: 0
            }, 300);
            this.stackLayer.push(layer);
        }
    };
    /**
     * 场景从中间由小变大
     */
    Director.prototype.pushSceneScal = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(this.getRect());
            layer.anchorOffsetX = layer.width / 2;
            layer.anchorOffsetY = layer.height / 2;
            layer.x = layer.width / 2;
            layer.y = layer.height / 2;
            layer.scaleX = 0.4;
            layer.scaleY = 0.4;
            egret.Tween.get(layer).to({
                scaleX: 1,
                scaleY: 1
            }, 300);
            this.gameLayer.addChild(layer);
            this.stackLayer.push(layer);
        }
    };
    //横向添加
    Director.prototype.pushSceneHeng = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(this.getRect());
            this.gameLayer.addChild(layer);
            layer.x = -layer.width;
            egret.Tween.get(layer).to({
                x: 0
            }, 300);
            this.stackLayer.push(layer);
        }
    };
    /**
     * 添加场景
     */
    Director.prototype.pushSceneNoTw = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(this.getRect());
            this.gameLayer.addChild(layer);
            this.stackLayer.push(layer);
        }
    };
    /**
     * 删除场景
     */
    Director.prototype.removeScene = function (layer) {
        if (this.gameLayer != null) {
            var index = this.gameLayer.getChildIndex(layer);
            var context = this;
            if (index >= 0) {
                if (layer.parent == this.gameLayer) {
                    egret.Tween.get(layer).to({
                        y: this.gameLayer.height
                    }, 300).call(function () {
                        console.log("this.gameLayer.removeChild(layer)");
                        context.gameLayer.removeChild(layer);
                    });
                    this.removeByElements(this.stackLayer, layer);
                }
            }
            if (this.rects.length > 0 && this.rects[this.rects.length - 1].parent == this.gameLayer) {
                this.gameLayer.removeChild(this.rects[this.rects.length - 1]);
                this.removeByElements(this.rects, this.rects[this.rects.length - 1]);
            }
        }
    };
    Director.prototype.removeSceneHeng = function (layer) {
        if (this.gameLayer != null) {
            var index = this.gameLayer.getChildIndex(layer);
            var context = this;
            if (index >= 0) {
                if (layer.parent == this.gameLayer) {
                    egret.Tween.get(layer).to({
                        x: -this.gameLayer.width
                    }, 300).call(function () {
                        context.gameLayer.removeChild(layer);
                    });
                    this.removeByElements(this.stackLayer, layer);
                }
            }
            if (this.rects.length > 0 && this.rects[this.rects.length - 1].parent == this.gameLayer) {
                this.gameLayer.removeChild(this.rects[this.rects.length - 1]);
                this.removeByElements(this.rects, this.rects[this.rects.length - 1]);
            }
        }
    };
    Director.prototype.removeSceneNoTw = function (layer) {
        if (this.gameLayer != null) {
            var index = this.gameLayer.getChildIndex(layer);
            var context = this;
            if (index >= 0) {
                if (layer.parent == this.gameLayer) {
                    context.gameLayer.removeChild(layer);
                    this.removeByElements(this.stackLayer, layer);
                }
            }
            if (this.rects.length > 0 && this.rects[this.rects.length - 1].parent == this.gameLayer) {
                this.gameLayer.removeChild(this.rects[this.rects.length - 1]);
                this.removeByElements(this.rects, this.rects[this.rects.length - 1]);
            }
        }
    };
    /**
     * 删除最后一个场景
     */
    Director.prototype.popScene = function () {
        if (this.gameLayer != null) {
            var len = this.stackLayer.length;
            if (len > 0) {
                var layer = this.stackLayer[len - 1];
                if (layer.parent == this.gameLayer) {
                    this.gameLayer.removeChild(layer);
                    this.removeByElements(this.stackLayer, layer);
                }
            }
            if (this.rects.length > 0 && this.rects[this.rects.length - 1].parent == this.gameLayer) {
                this.gameLayer.removeChild(this.rects[this.rects.length - 1]);
                this.removeByElements(this.rects, this.rects[this.rects.length - 1]);
            }
        }
    };
    /**
 * 获取最后一个场景
 */
    Director.prototype.getLastScene = function () {
        if (this.gameLayer != null) {
            var len = this.stackLayer.length;
            if (len > 0) {
                var layer = this.stackLayer[len - 1];
                return layer;
            }
        }
    };
    Director.prototype.getLayerByName = function (name) {
        return this.gameLayer.getChildByName(name);
    };
    Director.prototype.removeByElements = function (arr, element) {
        var index = -1;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] == element) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            arr.splice(index, 1);
        }
    };
    Director.prototype.getUser = function (getTuDi) {
        var context = this;
        if (egret.localStorage.getItem("user")) {
            FachUtils.Get("/user/login", function (responce) {
                if (responce.status) {
                    var user = JSON.parse(egret.localStorage.getItem("user"));
                    user = __assign({}, user, responce.resource.user);
                    egret.localStorage.setItem("user", JSON.stringify(user));
                    var currentTime = responce.resource.currentTime;
                    var ct = new Date().getTime();
                    context.ShiJianCha = ct - currentTime;
                    egret.localStorage.setItem("scrollText", responce.resource.cf.scrollText + "");
                    SysTemSet.set = responce.resource.cf;
                    for (var i = 0; i < context.stackLayer.length; i++) {
                        var item = context.stackLayer[i];
                        if (item != null) {
                            item.dispatchEvent(new GameEvent(GameEvent.getUserInfo));
                        }
                    }
                    if (getTuDi) {
                        var tudiDate = responce.resource.lands;
                        var lockDate = responce.resource.landUlcCdts;
                        var game = context.gameLayer.getChildByName("game");
                        game.FillData(tudiDate, lockDate);
                        game.FillAnimal(responce.resource.farms, responce.resource.farmUlcCdts);
                    }
                }
                else {
                    egret.localStorage.clear();
                    var s = context.gameLayer;
                    // s.removeChildren();
                    // s.addChild(new Login());
                    PopoP.getTips("登录出错,请重新登录");
                }
            }, function (responce) {
                egret.localStorage.clear();
                var s = context.gameLayer;
                // s.removeChildren();
                // s.addChild(new Login());
                PopoP.getTips("登录出错,请重新登录");
            });
        }
        else {
            egret.localStorage.clear();
            var s = context.gameLayer;
            // s.removeChildren();
            // s.addChild(new Login());
            PopoP.getTips("登录出错,请重新登录");
        }
    };
    return Director;
}());
Director.instance = null;
__reflect(Director.prototype, "Director");
//# sourceMappingURL=Director.js.map