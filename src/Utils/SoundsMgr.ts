class SoundsMgr {
    private static bgSoundChannel: egret.SoundChannel = null;

    public static _bgm: egret.Sound;//背景音乐
    public static _bgm_channel: egret.SoundChannel;//保存用来静音用
    public static value = 1;
    public constructor() {

    }

    public static playBg() {
        SoundsMgr._bgm = new egret.Sound();
        SoundsMgr._bgm.addEventListener(egret.Event.COMPLETE, this.Com, this);
        SoundsMgr._bgm.load("resource/assets/sound/bg.mp3");

    }

    public static isfinish = false;
    private static Com() {
        SoundsMgr.isfinish = true;
        Director.getInstance().addListener();
        this.PlayBGM();
    }

    public static playBtn() {
        //   this.playMusic("button_mp3");
    }


    public static PlayBGM() {
        if (this.isfinish) {
            if (SoundsMgr.IsSound()) {
                if (SoundsMgr._bgm_channel == null) {
                    SoundsMgr._bgm_channel = SoundsMgr._bgm.play(0, 0);
                    SoundsMgr._bgm_channel.volume = this.value;
                }
            }
        }
    }
    public static StopBGM() {
        if (SoundsMgr._bgm_channel != null) {
            SoundsMgr._bgm_channel.stop();
            SoundsMgr._bgm_channel = null;
        }
    }

    public static clickCell() {
        // this.playMusic("dianji_mp3");
    }

    public static removeCell(len) {
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
    }

    public static win() {
        //this.playMusic("win_mp3");
    }

    public static lose() {
        // this.playMusic("lose_mp3");
    }

    private static playMusic(v) {
        var sound: egret.Sound = RES.getRes(v.toString());

        if (sound) {
            if (SoundsMgr.IsSound()) {
                this.bgSoundChannel = sound.play(0, 1);
                this.bgSoundChannel.volume = this.value;
            }

        }
    }


    //声效是否播放，保存设置
    public static setIsSound(value) {
        if (value) {
            egret.localStorage.setItem("isSound", "1");
        } else {
            egret.localStorage.setItem("isSound", "0");
        }
    }

    public static IsSound(): boolean {
        var b = egret.localStorage.getItem("isSound");
        if (b == null || b == "") {
            return true;
        } else {
            return b == "1";
        }
    }
}
