ig.module(
    'game.entities.midnight'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityMidnight = ig.Entity.extend({
        _wmScalable: true,
        size: {x: 89, y:122},
        maxVel: { x: 500, y: 500 },
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: "Midnight",

        speed: 200,
        jumpStrength: 128,

        animSheet: new ig.AnimationSheet('media/images/characters/midnight_running_photoshop.png', 89, 128),

        init: function(x, y, settings) {
            this.parent(x,y,settings);
            var animOrder = [];
            for(var i=0;i<60;i++) {
                animOrder.push(i);
            }
            this.addAnim('idle',1,[60]);
            this.addAnim('running',0.035/2,animOrder);
        },

        
        handleMovement: function() {
            if (ig.input.state('left')) {
                this.currentAnim.flip.x = true;
                this.vel.x = -this.speed;
                this.currentAnim = this.anims.running;
            } else if (ig.input.state('right')) {
                this.currentAnim.flip.x = false;
                this.vel.x = this.speed;
                this.currentAnim = this.anims.running;
            } else {
                this.vel.x = 0;
                this.currentAnim = this.anims.idle;
            }
            if (ig.input.pressed('up') && this.standing) {
                this.vel.y = -this.jumpStrength;
            }
        },

        update: function() {
            this.parent();
            this.handleMovement();
            this.leftBoundingBox();
        },

        leftBoundingBox: function() {
            if (this.pos.x < 0) {
                this.pos.x = 0;
            }
        }

    });

});
