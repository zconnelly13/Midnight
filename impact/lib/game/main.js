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
	
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {
        ig.input.bind(ig.KEY.LEFT_ARROW,'left')
        ig.input.bind(ig.KEY.RIGHT_ARROW,'right')
        this.loadLevel(LevelHome);
	},
	
	update: function() {
        if (ig.input.state('left')) {
            this.screen.x-=1;
        }
        if (ig.input.state('right')) {
            this.screen.x+=1;
        }
		this.parent();
	},
	
	draw: function() {
		this.parent();
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		//this.font.draw( 'Midnight.', x, y, ig.Font.ALIGN.CENTER );
	},
});

ig.main( '#canvas', MyGame, 60, $(window).width(), $(window).height(), 1 );
//$(window).resize(this.resize.bind());

});
