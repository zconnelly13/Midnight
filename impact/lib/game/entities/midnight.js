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
            this.addAnim('default',0.035/2,animOrder);
        },

        handleCameraMovement: function() {
            if (this.pos.x > ig.system.width / 2) {
                ig.game.screen.x = this.pos.x - ig.system.width / 2;
            }
            if (this.pos.y < ig.system.height / 2 || ig.game.followY) {
                ig.game.screen.y = this.pos.y - ig.system.height / 2;
            }
        },

        handleMovement: function() {
            if (ig.input.state('left')) {
                this.currentAnim.flip.x = true;
                this.vel.x = -this.speed;
            } else if (ig.input.state('right')) {
                this.currentAnim.flip.x = false;
                this.vel.x = this.speed;
            } else {
                this.vel.x = 0;
            }
            if (ig.input.pressed('up') && this.standing) {
                this.vel.y = -this.jumpStrength;
            }
        },

        update: function() {
            this.handleMovement();
            this.parent();
            this.handleCameraMovement();
        },

    });

});
