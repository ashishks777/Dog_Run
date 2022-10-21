

export default class InputHandler{
    
    constructor(game){
        this.keys=[];
        this.game=game;
        this.touchY = '';
        this.touchX = '';
        this.touchThreshold = 30;
        window.addEventListener("keydown",e=>{
          
            if((e.key==="ArrowDown" ||e.key==="ArrowUp" ||e.key==="ArrowLeft" ||e.key==="ArrowRight" ||e.key==="Enter") && this.keys.indexOf(e.key)===-1){
               this.keys.push(e.key);
                
            }else if(e.key===" " && this.game.gameOver ){
                
               
                this.game.restart();

            }
        });
        window.addEventListener("keyup",e=>{
           
            if(e.key==="ArrowDown" ||e.key==="ArrowUp" ||e.key==="ArrowLeft" ||e.key==="ArrowRight" ||e.key==="Enter") {
               this.keys.splice(this.keys.indexOf(e.key),1);
              
            }
        });



        window.addEventListener("touchstart", e => {

            this.touchY = e.changedTouches[0].pageY;
            this.touchX= e.changedTouches[0].pageX;

        });
        
        window.addEventListener("touchmove", e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX= e.changedTouches[0].pageY - this.touchX;
            if (swipeDistanceY < -this.touchThreshold && this.keys.indexOf("ArrowUp") === -1) {
                this.keys.push("ArrowUp");
            }
            
            else if (swipeDistanceY > this.touchThreshold && this.keys.indexOf("ArrowDown") === -1) {
                this.keys.push("ArrowDown");
                
            }
            if (swipeDistanceX < -this.touchThreshold && this.keys.indexOf("ArrowLeft") === -1) {
                this.keys.push("ArrowLeft");
            }
            
            else if (swipeDistanceX > this.touchThreshold && this.keys.indexOf("ArrowRight") === -1) {
                this.keys.push("ArrowRight");
                
            }
           
        });
        window.addEventListener("touchend", e => {
            
            this.keys.splice(this.keys.indexOf("ArrowUp"), 1);
            this.keys.splice(this.keys.indexOf("ArrowDown"), 1);
            this.keys.splice(this.keys.indexOf("ArrowLeft"), 1);
            this.keys.splice(this.keys.indexOf("ArrowRight"), 1);
        });

    }
}
