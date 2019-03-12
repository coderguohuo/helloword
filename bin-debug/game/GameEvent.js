var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelAble) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelAble === void 0) { cancelAble = false; }
        return _super.call(this, type, bubbles, cancelAble) || this;
    }
    return GameEvent;
}(egret.Event));
GameEvent.getUserInfo = "getUserInfo";
GameEvent.touchYes = "touchYes";
GameEvent.willRemove = "willRemove";
GameEvent.Removed = "Removed";
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map