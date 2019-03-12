var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundsMgr = (function () {
    function SoundsMgr() {
    }
    SoundsMgr.playBg = function () {
        SoundsMgr._bgm = new egret.Sound();
        SoundsMgr._bgm.addEventListener(egret.Event.COMPLETE, this.Com, this);
        SoundsMgr._bgm.load("resource/assets/sound/bg.mp3");
    };
    SoundsMgr.Com = function () {
        SoundsMgr.isfinish = true;
        Director.getInstance().addListener();
        this.PlayBGM();
    };
    SoundsMgr.playBtn = function () {
        //   this.playMusic("button_mp3");
    };
    SoundsMgr.PlayBGM = function () {
        if (this.isfinish) {
            if (SoundsMgr.IsSound()) {
                if (SoundsMgr._bgm_channel == null) {
                    SoundsMgr._bgm_channel = SoundsMgr._bgm.play(0, 0);
                    SoundsMgr._bgm_channel.volume = this.value;
                }
            }
        }
    };
    SoundsMgr.StopBGM = function () {
        if (SoundsMgr._bgm_channel != null) {
            SoundsMgr._bgm_channel.stop();
            SoundsMgr._bgm_channel = null;
        }
    };
    SoundsMgr.clickCell = function () {
        // this.playMusic("dianji_mp3");
    };
    SoundsMgr.removeCell = function (len) {
        // 有声音顺序
        var soundArr = [
            "efx_combine_1_mp3",
            "efx_combine_2_mp3",
            "efx_combine_3_mp3",
            "efx_combine_4_mp3",
            "efx_combine_5_mp3",
            "efx_combine_6_mp3",
            "efx_combine_7_mp3"
        ];
        if (len >= 6) {
            len = 6;
        }
        //   this.playMusic(soundArr[len]);
    };
    SoundsMgr.win = function () {
        //this.playMusic("win_mp3");
    };
    SoundsMgr.lose = function () {
        // this.playMusic("lose_mp3");
    };
    SoundsMgr.playMusic = function (v) {
        var sound = RES.getRes(v.toString());
        if (sound) {
            if (SoundsMgr.IsSound()) {
                this.bgSoundChannel = sound.play(0, 1);
                this.bgSoundChannel.volume = this.value;
            }
        }
    };
    //声效是否播放，保存设置
    SoundsMgr.setIsSound = function (value) {
        if (value) {
            egret.localStorage.setItem("isSound", "1");
        }
        else {
            egret.localStorage.setItem("isSound", "0");
        }
    };
    SoundsMgr.IsSound = function () {
        var b = egret.localStorage.getItem("isSound");
        if (b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    };
    return SoundsMgr;
}());
SoundsMgr.bgSoundChannel = null;
SoundsMgr.value = 1;
SoundsMgr.isfinish = false;
__reflect(SoundsMgr.prototype, "SoundsMgr");
//# sourceMappingURL=SoundsMgr.js.map