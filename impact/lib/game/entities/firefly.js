ig.module(
    'game.entities.firefly'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityFirefly = ig.Entity.extend({
        _wmScalable: true,
        size: {x: 10, y:10},
        maxVel: { x: 500, y: 500 },
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: "Midnight",

        speed: 200,
        gravityFactor: 0,

        init: function(x, y, settings) {
            this.parent(x,y,settings);
        },
        
        update: function() {
            this.parent();
        },

        draw: function() {
            ig.system.context.fillStyle = "yellow";
            ig.system.context.fillRect(this.pos.x + ig.game.screen.x,this.pos.y + ig.game.screen.y,10,10);
        },

    });

});
