ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.levels.home'
)
.defines(function(){

MyGame = ig.Game.extend({
	
    gravity: 98,
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {
        this.setResizeHandler();
        this.screenX = ig.game.screen.x;
        this.screenY = ig.game.screen.x;
        ig.input.bind(ig.KEY.LEFT_ARROW,'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW,'right');
        ig.input.bind(ig.KEY.UP_ARROW,'up');
        this.loadLevel(LevelHome);
	},
	
	update: function() {
		this.parent();
        this.handleCameraMovement();
	},

    getMidnight: function() {
        return ig.game.getEntityByName("Midnight");
    },

    handleCameraMovement: function() {
        var midnight = this.getMidnight();
        if (midnight.pos.x > $(window).width() / 2) {
            this.screenX = midnight.pos.x - $(window).width() / 2;
        }
        if (midnight.pos.y > $(window).height() - 200 || ig.game.followY) {
            this.screenY = midnight.pos.y - $(window).height() + 200;
        }
        ig.game.screen.x = this.screenX;
        ig.game.screen.y = this.screenY;
    },
	
	draw: function() {
		this.parent();
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		//this.font.draw( 'Midnight.', x, y, ig.Font.ALIGN.CENTER );
	},

    setResizeHandler: function() {
        $(window).resize(function() {
            ig.system.resize($(window).width(), $(window).height());
        });    
    },
});

ig.main( '#canvas', MyGame, 60, $(window).width(), $(window).height(), 1 );

});
