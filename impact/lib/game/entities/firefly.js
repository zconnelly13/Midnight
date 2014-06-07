ig.module(
    'game.entities.firefly'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityFirefly = ig.Entity.extend({
        size: {x: 20, y:20},
        maxVel: { x: 500, y: 500 },
        collides: ig.Entity.COLLIDES.LITE,

        speed: 200,
        gravityFactor: 0,
        tick: 0,
        caught: false,

        init: function(x, y, settings) {
            this.tick = parseInt(Math.random()*10000);
            this.followOffset = {x:(Math.random()-0.5)*50,y:(Math.random()-0.5)*25};
            this.parent(x,y,settings);
        },
        
        update: function() {
            this.parent();
            this.oscillate();
            if (this.caught) {
                this.followMidnight();
            } else {
                //this.keepDistanceFromMidnight();
            }
        },

        oscillate: function() {
            this.tick += 1;
            this.pos.x += Math.sin(this.tick/32) / 2;
            this.pos.y += Math.cos(this.tick/16);
        },

        keepDistanceFromMidnight: function() {
            var distance = this.getDistanceFromMidnight();
            if (distance < 300 && this.pos.x < 1500) {
                this.accel.x = 175;
            } else {
                if (this.accel.x >= 0) {
                    this.accel.x -= 10;
                } else {
                    this.accel.x = 0;
                }
            }
            if (this.pos.x >= 1500) {
                this.vel.x = 150;
            }
            if (this.pos.x >= 1800) {
                this.vel.x = 0;
            }
        },

        followMidnight: function() {
            var midnight = ig.game.getEntityByName('Midnight');
            if (midnight.currentAnim.flip.x) {
                var idealPositionX = midnight.pos.x + 50 + midnight.size.x;
            } else {
                var idealPositionX = midnight.pos.x - 50;
            }
            var idealPositionY = midnight.pos.y + 50;

            idealPositionX += this.followOffset.x;
            idealPositionY += this.followOffset.y;

            function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }
            this.vel.x = (Math.pow(idealPositionX - this.pos.x,2) / 100)*sign(idealPositionX-this.pos.x);
            this.vel.y = (Math.pow(idealPositionY - this.pos.y,2) / 100)*sign(idealPositionY-this.pos.y);
            /*
            this.vel.x = (idealPositionX - this.pos.x) / 3;
            this.vel.y = (idealPositionY - this.pos.y) / 3;
            */
        },

        getDistanceFromMidnight: function() {
            var midnight = ig.game.getEntityByName('Midnight');
            return this.pos.x - midnight.pos.x;
        }, 

        collideWith: function(other,axis) {
            if (other.name == "Midnight") {
                this.collides = ig.Entity.COLLIDES.NONE,
                this.caught = true;
            }
        },

        draw: function() {
            var x = this.pos.x - this.offset.x - ig.game._rscreen.x + (this.size.x/2);
            var y = this.pos.y - this.offset.y - ig.game._rscreen.y + (this.size.y/2);
            var gradient = ig.system.context.createRadialGradient(x, y, 1, x, y, 20);
            gradient.addColorStop(0,"rgb(249,241,100)");
            gradient.addColorStop(1,'rgba(255,255,255,0)');
            ig.system.context.fillStyle = gradient;
            ig.system.context.fillRect(x-20,y-20,40,40);
        },

    });

});
