class GameEvent extends egret.Event {
    public static getUserInfo:string = "getUserInfo";
    public static touchYes:string = "touchYes";
   public static willRemove:string = "willRemove"; 
 public static Removed:string = "Removed";
    public constructor(type:string, bubbles:boolean = false, cancelAble:boolean = false) {
        super(type, bubbles, cancelAble);
    }
}