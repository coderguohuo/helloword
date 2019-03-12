class Tips extends egret.DisplayObjectContainer {
    private label: eui.Label;
    private bg: eui.Rect;

    public constructor() {
        super();
        // this.bg = new eui.Image();
        // this.bg.source = RES.getRes("tips_png");
        // this.bg.scale9Grid = new egret.Rectangle(55, 12, 9, 4);

        var bg = new eui.Rect();
        bg.fillColor = 0x333333;
        bg.fillAlpha = 0.6;
        bg.strokeWeight = 2;
        bg.ellipseWidth = 30;
        bg.strokeColor = 0x211e1e;
        this.bg = bg;

        this.addChild(this.bg);
        this.width = 121;
        this.height = 30;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.label = new eui.Label();
        this.addChild(this.label);
        this.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.y =egret.MainContext.instance.stage.stageHeight - 100;
        egret.MainContext.instance.stage.addChildAt(this, 100000);
        this.label.touchEnabled=false;
        this.bg.touchEnabled=false;
    }

    show(str: string) {
        this.label.text = str;
        this.label.anchorOffsetX = this.label.width / 2;
        this.label.anchorOffsetY = this.label.height / 2;
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.bg.width = this.label.width + 50;
        this.bg.height = this.label.height + 35;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        this.bg.x = this.width / 2;
        this.bg.y = this.height / 2;
        var tw = egret.Tween.get(this);
        tw.to({ x:  egret.MainContext.instance.stage.stageWidth / 2, y:egret.MainContext.instance.stage.stageHeight - 200 }, 1500, egret.Ease.backOut)
            .call(this.callback, this);
    }

    private callback() {
        this.parent.removeChild(this);
    }
}