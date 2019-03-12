/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 帧动画示例。
 *      触摸舞台会重新播放。
 *      播放过程中如果有帧事件，会触发egret.MovieClipEvent
 *      .FRAME_LABEL事件。
 *      在播放结束一次后会触发egret.Event.LOOP_COMPLETE
 *      事件。全部播放完全后，会触发egret.Event.COMPLETE事件
 *      。
 */

class DogAnimation extends egret.DisplayObjectContainer {

        private _mcTexture = RES.getRes("run_png");
        private _mcData = RES.getRes("run_json");
        private loop = 1;
        
        constructor() {
            super();
            this.name = "dog";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
       this.station();
       
    }
        
  

    //狗狗吃饱的动作
    private station():void{
         
      
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        let role= new egret.MovieClip(mcDataFactory.generateMovieClipData("run")); 
      
        role.play(-1);
        role.x = 50;
        role.y = -0;
        role.scaleX=1
        role.scaleY = 1;
       
        this.parent.addChild(role);
    }

    
}
