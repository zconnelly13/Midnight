ig.module(
    'game.entities.cloud'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityCloud = ig.Entity.extend({
        _wmScalable: true,
        size: {x: 128, y:128},
        maxVel: { x: 500, y: 500 },
        collides: ig.Entity.COLLIDES.NEVER,
        name: "Cloud",

        speed: 100,

        animSheet: new ig.AnimationSheet('media/images/environment/cloud_sprite.png', 128, 128),

        init: function(x, y, settings) {
            this.parent(x,y,settings);
            this.addAnim('default',1,[Math.floor(Math.random()*4)]);
        },

        update: function() {
            this.parent();
        },

    });

});
