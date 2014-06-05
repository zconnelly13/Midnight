ig.module(
    'game.entities.moonclock'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityMoonclock = ig.Entity.extend({
        _wmScalable: true,
        size: {x: 382, y:382},
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        name: "MoonClock",

        speed: 100,

        animSheet: new ig.AnimationSheet('media/images/background_images/moonclock_382_382.png', 382, 382),

        init: function(x, y, settings) {
            this.parent(x,y,settings);
            this.addAnim('default',1,[0]);
        },

        update: function() {
            this.parent();
        },

        draw: function() {
            this.animSheet.image.draw($(window).width() - (8*this.size.x/9),0);
        },

    });

});
