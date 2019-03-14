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

class LoadingUI extends eui.Component {

    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.Complete, this);
        this.skinName = "resource/skin/aloding.exml";
        //   egret.setTimeout(this.createView, this, 5000);
    }

    private jindu: eui.Image;
    public textField: egret.TextField;
    private shape;
    private Complete() {
   //  SoundMenager.Shared();
        this.createChildren2();
    }
    public createChildren2(): void {
     
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x0000ff);
        this.shape.graphics.drawRect(0, 0,338, 13);
        this.shape.graphics.endFill();
        this.shape.x = this.jindu.x - this.jindu.width;
        this.shape.y = this.jindu.y;
       this.jindu.mask = this.shape;

        this.addChild(this.shape)
        RES.loadGroup("preload");
    }

    public setProgress(current: number, total: number): void {
         this.textField.text = `Loading...${current}/${total}`;
        this.shape.x = this.jindu.x + current / total * this.jindu.width - this.jindu.width;
      

    }
      
}
