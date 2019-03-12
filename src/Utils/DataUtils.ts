class DataUtils {
    public constructor() {
    }
    public static datePase(text) {
        var d = new Date(text);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }

    //加法
    public static add(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (DataUtils.mul(a, e) + DataUtils.mul(b, e)) / e;
    }
    //减法
    public static sub(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (DataUtils.mul(a, e) - DataUtils.mul(b, e)) / e;
    }
    //乘法
    public static mul(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) { }
        try {
            c += e.split(".")[1].length;
        } catch (f) { }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
    //除法
    public static div(a, b) {
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch (g) { }
        try {
            f = b.toString().split(".")[1].length;
        } catch (g) { }
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), DataUtils.mul(c / d, Math.pow(10, f - e));
    }
    public static floot(num: any): string {
        return DataUtils.div(Math.floor(DataUtils.mul(Number(num), 100)), 100) + "";
    }

    //保留小数点后三位

    public static floot2(num: any): string {
        return DataUtils.div(Math.floor(DataUtils.mul(Number(num), 1000)), 1000) + "";
    }


    //时间格式化
    public static format(fmt, data) { //author: meizz 
        var o = {
            "M+": data.getMonth() + 1, //月份 
            "d+": data.getDate(), //日 
            "h+": data.getHours(), //小时 
            "m+": data.getMinutes(), //分 
            "s+": data.getSeconds(), //秒 
            "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
            "S": data.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    public static SuiJi() {
        var num = (Math.random()) * 300;
        var num2 = (Math.random()) * 100;
        var num3 = (Math.random()) * 100;

        return num + num2;
    }

    //倒计时
    public static DaoJiShi(time: number) {
        var t = new Date().getTime() - Director.getInstance().ShiJianCha;

        var t2 = new Date(time).getTime();
        var daijishi = "";//倒计时
        if (t < t2) {
            var cha = DataUtils.div(t2 - t, 1000);//秒

            if (cha < 60) {
                if (cha < 10) {
                    daijishi = "00:00:0" + Math.floor(cha);
                } else {
                    daijishi = "00:00:" + Math.floor(cha);
                }

            } else if (cha < 3600) {

                var fen = Math.floor(DataUtils.div(cha, 60));
                var s = Math.floor(DataUtils.sub(cha, DataUtils.mul(fen, 60)));

                daijishi = "00:" + (fen < 10 ? "0" + fen : fen) + ":" + (s < 10 ? "0" + s : s);
            } else if (cha >= 3600) {
                var h = Math.floor(DataUtils.div(cha, 3600));
                var fen = Math.floor(DataUtils.div(DataUtils.sub(cha, DataUtils.mul(h, 3600)), 60));
                var s = Math.floor(cha - h * 3600 - fen * 60);

                daijishi = (h < 10 ? "0" + h : h) + ":" + (fen < 10 ? "0" + fen : fen) + ":" + (s < 10 ? "0" + s : s);
            } else if (cha >= 3600 * 24) {
                var hour = cha - DataUtils.mul(Math.floor(DataUtils.div(cha, 3600 * 24)), 3600 * 24);
                daijishi = Math.floor(DataUtils.div(cha, 3600 * 24)) + "天" + Math.floor(DataUtils.div(hour, 3600)) + "个小时";
            }

        } else {
            daijishi = "00:00:00";
        }

        return daijishi;
    }

    public static TimeToStr(cha) {
        var daijishi = "";
        if (cha < 60) {
            daijishi = Math.floor(cha) + "秒";
        } else if (cha < 3600) {
            daijishi = Math.floor(DataUtils.div(cha, 60)) + "分钟";
        } else if (cha < 3600 * 24) {
            var fen = cha - DataUtils.mul(Math.floor(DataUtils.div(cha, 3600)), 3600);
            daijishi = Math.floor(DataUtils.div(cha, 3600)) + "个小时" + Math.floor(DataUtils.div(fen, 60)) + "分";
        } else if (cha >= 3600 * 24) {
            var hour = cha - DataUtils.mul(Math.floor(DataUtils.div(cha, 3600 * 24)), 3600 * 24);
            daijishi = Math.floor(DataUtils.div(cha, 3600 * 24)) + "天" + Math.floor(DataUtils.div(hour, 3600)) + "个小时";
        }
        return daijishi;
    }

    public static getBili(str: any) {

        if (!isNaN(Number(str))) {
            var num = DataUtils.floot(DataUtils.mul(Number(str), 100)) + "%";

            return num;

        } else {
            return "NaN";
        }


    }


}