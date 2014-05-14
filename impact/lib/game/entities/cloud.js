ig.module(
    'game.entities.cloud'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityCloud = ig.Entity.extend({
        _wmScalable: true,
        size: {x: 900, y:300},
        maxVel: { x: 500, y: 500 },
        collides: ig.Entity.COLLIDES.NEVER,
        name: "Cloud",

        speed: 100,

        animSheet: new ig.AnimationSheet('media/images/environment/cloud_sprite.png', 900, 300),

        init: function(x, y, settings) {
            this.parent(x,y,settings);
            this.addAnim('default',1,[Math.floor(Math.random()*4)]);
            this.movingFast = (Math.random() > 0.65);
            this.x = this.pos.x;
            this.y = this.pos.y;
        },

        update: function() {
            this.parent();
            this.pos.x = this.x + ig.game.screen.x;
            this.pos.y = this.y + ig.game.screen.y;
            if (this.movingFast) {
                this.x -= 0.65 + Math.random()/16;
            } else {
                this.x -= 0.40 + Math.random()/16;
            }
            if (this.pos.x < -900) {
                ig.game.spawnEntity(EntityCloud,$(window).width()+Math.random()*100,Math.random()*300-150);
                this.kill();
                console.log('dead cloud!');
            }
        },

    });

});
