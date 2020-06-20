import Animations from './animations';

export default class Animation {

    constructor(ctx, animationId = null) {
        this.hasStarted = false;
        this.hasFinished = false;
        this.isRunning = false;
        this.animationObject = Animations[animationId];
        this.ctx = ctx;
        this.lastTimeCheck = 0;
        this.duration = this.animationObject.duration;  
        
    }
    
    startAnimation() {
        this.hasStarted = true;
        this.isRunning = true;
        this.lastTimeCheck = Date.now();
        this.draw();
    }
    
    resumeAnimation() {
        var now = Date.now();
        if(now - this.lastTimeCheck > this.duration){
            this.stopAnimation()
        }
        else{
            this.step();
            this.draw();
        }
    }
    
    stopAnimation() {
        this.hasFinished = true;
        this.isRunning = false;
    }
    
    step() {
        this.animationObject.scripts.forEach(script => {
            var currentEntity = this.animationObject.entities[script.entity];
            var change = this.duration / script.value;
            currentEntity[script.property] += change;
        });
    }

    draw() {
        this.ctx.save();
        this.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
        this.animationObject.entities.forEach(entity => {
            this.ctx.fillStyle = entity.color;
            this.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        });
        this.ctx.restore();
    }
}