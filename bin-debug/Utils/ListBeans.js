var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ListBeans = (function () {
    function ListBeans() {
        this.seedMianBan = null;
        this.animalMianBan = null;
        this.zhuanpan = null;
    }
    ListBeans.getInstance = function () {
        if (ListBeans.instance == null) {
            ListBeans.instance = new ListBeans();
        }
        return ListBeans.instance;
    };
    return ListBeans;
}());
ListBeans.instance = null;
__reflect(ListBeans.prototype, "ListBeans");
//# sourceMappingURL=ListBeans.js.map