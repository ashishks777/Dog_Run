export class UI{
    constructor(game){
        this.game=game;
        this.fontFamily='Helvetica';
        this.fontSize=40;
    }
    draw(context){
        context.save();
        context.shadowOffsetX=5;
        context.shadowOffsetY=5;
        context.shadowColor='black';
        context.shadowBlur=5;

        context.font=this.fontSize+'px '+this.fontFamily;
        context.textAlign="left";
        context.fillStyle=this.game.fontColor;

        context.fillText('Score: '+this.game.score,30,50);

        //TIMER
        context.font=this.fontSize*0.8+'px ' +this.fontFamily;
        context.fillText("Time: "+(this.game.time*0.001).toFixed(1),30,90);

        //gameover Message
        
         if(this.game.gameOver){
            context.textAlign="center";
            
            context.font=this.fontSize*2+'px '+this.fontFamily;
           
            context.fillText("Your Score: "+this.game.score,this.game.width*0.5,this.game.height*0.5);
            context.font=this.fontSize*0.7+'px ' +this.fontFamily;
            context.fillText("Press Space-Bar to restart",this.game.width*0.5,this.game.height*0.5+40);
          
        }
        context.restore();
    }
}