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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        _this.isEnterScene = false;
        _this.isgetUser = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        RES.setMaxLoadingThread(16); // 设置资源加载线程数
        egret.ImageLoader.crossOrigin = "anonymous"; //允许使用跨域资源
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loding");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.getUser();
            this.loadingView.textField.text = "信息同步中...";
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            // this.createScene();
        }
        else if (event.groupName == "loding") {
            if (!egret.Capabilities.isMobile) {
                this.stage.orientation = egret.OrientationMode.AUTO;
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
        }
    };
    Main.prototype.createScene = function () {
        if (!this.isEnterScene && this.isResourceLoadEnd && this.isThemeLoadEnd) {
            this.isEnterScene = true;
            this.stage.removeChild(this.loadingView);
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        egret.Ticker.getInstance().register(function (fram) { dragonBones.WorldClock.clock.advanceTime(fram / 1000); }, this);
        RES.loadGroup("game", 99);
        Director.getInstance().initWithMain(this.stage);
        Director.getInstance().pushSceneNoTw(new Game());
    };
    Main.prototype.getUser = function () {
        var context = this;
        var userid = this.getUrlParam("userid");
        var arr = userid.split("/?token=");
        FachUtils.Get("/user/serverUpto/" + arr[0] + "/" + arr[1] + "", function (res) {
            if (res.status) {
                // 储存用户信息
                var pwd = CryptoJS.HmacMD5(arr[0], "paipai").toString();
                var password = CryptoJS.HmacMD5(pwd, pwd).toString();
                var user = {
                    username: arr[0],
                    password: password
                };
                egret.localStorage.setItem("user", JSON.stringify(user));
                // 进入场景 虽然无用户数据 创建过程中获取用户数据
                context.createScene();
                // context.Login(arr[0], pwd);
            }
            else {
                PopoP.getTips("数据对接失败");
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    Main.prototype.Login = function (name, pwd) {
        var context = this;
        Fach.readToken("/user/login", Fach.getToken("/user/login", name, pwd), function (event) {
            var request = event.currentTarget;
            console.log(request.response);
            var response = JSON.parse(request.response);
            if (response.statusCode == 101) {
                var user = JSON.parse(request.response).resource.user;
                user.password = CryptoJS.HmacMD5(pwd, pwd).toString();
                egret.localStorage.setItem("user", JSON.stringify(user));
                // context.isgetUser = true;
                // context.createScene();
            }
            else {
                context.loadingView.textField.text = "信息传输出错,请重新打开";
                PopoP.getTips(response.message);
            }
        }, function (event) {
            context.loadingView.textField.text = "信息传输出错,请重新打开";
            var request = event.currentTarget;
            var res = request.getAllResponseHeaders();
            if (request != null) {
                var response = JSON.parse(request.response);
                if (response.statusCode == 401) {
                    PopoP.getTips("账号密码错误");
                }
                else if (response.statusCode == 403) {
                    PopoP.getTips("您的账号已被冻结,请联系管理员");
                }
                else {
                    PopoP.getTips("联网失败");
                }
            }
            else {
                PopoP.getTips("联网失败");
            }
        });
    };
    Main.prototype.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null)
            return r[2];
        return null; //返回参数值
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map