//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare var JMMALL: any;
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface

        RES.setMaxLoadingThread(16); // 设置资源加载线程数
        egret.ImageLoader.crossOrigin = "anonymous"; //允许使用跨域资源

        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);


        RES.loadGroup("loding");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.getUser();
            this.loadingView.textField.text = "信息同步中..."
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            // this.createScene();
        } else if (event.groupName == "loding") {
            if (!egret.Capabilities.isMobile) {
                this.stage.orientation = egret.OrientationMode.AUTO;
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
        }
    }

    private isEnterScene = false;
    private createScene() {
        if (!this.isEnterScene && this.isResourceLoadEnd && this.isThemeLoadEnd) {
            this.isEnterScene = true;
            this.stage.removeChild(this.loadingView);
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */

    protected startCreateScene(): void {
        egret.Ticker.getInstance().register(
            function (fram: number) { dragonBones.WorldClock.clock.advanceTime(fram / 1000) }, this
        )
         RES.loadGroup("game", 99);
        Director.getInstance().initWithMain(this.stage);
       
        Director.getInstance().pushSceneNoTw(new Game( ));
      
    }

    private getUser() {
        var context = this;


        var userid = this.getUrlParam("userid");
        var arr = userid.split("/?token=");


        FachUtils.Get("/user/serverUpto/" + arr[0] + "/" + arr[1] + "", function (res) {
            
            if (res.status) {
                // 储存用户信息
                let pwd = CryptoJS.HmacMD5(arr[0], "paipai").toString();
                let password = CryptoJS.HmacMD5(pwd, pwd).toString();
                let user = {
                    username: arr[0],
                    password: password
                }
                egret.localStorage.setItem("user", JSON.stringify(user));

                // 进入场景 虽然无用户数据 创建过程中获取用户数据
                context.createScene();
                
                // context.Login(arr[0], pwd);
            } else {
                PopoP.getTips("数据对接失败");
            }
        }, function (res) {
            PopoP.getTips(res.message);
        })
    }

    private isgetUser = false;
    private Login(name, pwd) {
        var context = this;
      

        Fach.readToken("/user/login", Fach.getToken("/user/login", name, pwd),
            function (event: egret.Event) {

                var request = <egret.HttpRequest>event.currentTarget;
                console.log(request.response);
                let response = JSON.parse(request.response);
                if (response.statusCode == 101) {
                    var user = JSON.parse(request.response).resource.user;
                    user.password = CryptoJS.HmacMD5(pwd, pwd).toString();
                    egret.localStorage.setItem("user", JSON.stringify(user));
                    // context.isgetUser = true;
                    // context.createScene();
                } else {
                    context.loadingView.textField.text = "信息传输出错,请重新打开"
                    PopoP.getTips(response.message);

                }

            }, function (event: egret.Event) {
                context.loadingView.textField.text = "信息传输出错,请重新打开"
                var request = <egret.HttpRequest>event.currentTarget;
                var res = request.getAllResponseHeaders();

                if (request != null) {
                    let response = JSON.parse(request.response);

                    if (response.statusCode == 401) {
                        PopoP.getTips("账号密码错误");
                    } else if (response.statusCode == 403) {
                        PopoP.getTips("您的账号已被冻结,请联系管理员");
                    } else {
                        PopoP.getTips("联网失败");
                    }
                } else {

                    PopoP.getTips("联网失败");
                }


            });
    }

    private getUrlParam(name) {


        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
       

        if (r != null) return r[2]; return null; //返回参数值
    }
}
