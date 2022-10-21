class Particles{
    constructor(game){
        this.markedForDeletion=false;
        this.game=game;

    }

    update(){
        this.x-=this.speedX+this.game.speed;
        this.y-=this.speedY;
        this.size*=0.95;
        if(this.size<0.5) this.markedForDeletion=true;
    }

}

export class  Dust extends Particles{
    constructor(game,x,y){
        super(game);
        this.size=Math.random()*10+10;
        this.x=x;
        this.y=y;
        this.speedX=Math.random();
        this.speedY=Math.random();
        this.color='rgba(77,77,77,0.2)';
    }

    draw(context){
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI*2);
        context.fillStyle=this.color;
        context.fill();
    }
}



export class  Fire extends Particles{
    constructor(game,x,y){
        super(game);
        this.size=Math.random()*100+100;
        this.x=x;
        this.y=y;
        this.speedX=1;
        this.speedY=Math.random()*1.5;
        this.image=document.getElementById("fire");
       this.angle=0;
       this.va=Math.random()*0.2-0.1;
    }

    update(){

        super.update();
        this.angle+=this.va;
        this.x+=Math.sin(this.angle*5);
        this.y-=this.speedY;

    }
    draw(context){
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle);
        context.drawImage(this.image,-this.size*0.5,-this.size*0.5,this.size,this.size);
        context.restore();
    }
}