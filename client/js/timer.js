/**
 * Defines a timer
 * var timer = new SimpleTest.Timer();
 */
SimpleTest.Timer = (function( $ ) {
	var timerUpdateInterval = 250;	// timer updates elapsedSeconds once every timerUpdateInterval milliseconds

	function Timer( config ) {
		EventBus.call( this );
		$.extend( true, this, config || {}, {
			lastStartTime   : null,
			elapsedSeconds  : null,
			intervalId	    : null
		});
	}
	
	Timer.prototype = $.extend( Object.create( EventBus.prototype ), {
		constructor : Timer,
		start : function() {
			if( this.state !== 'start' ) {
				var timer = this;
				this.elapsedSeconds	= this.elapsedSeconds || 0;
				this.lastStartTime	= new Date();
				this.intervalId 	= setInterval( function() {
					var oldElapsedSeconds = timer.elapsedSeconds;
					timer.elapsedSeconds  = Math.floor( ( new Date() - timer.lastStartTime ) / 1000 );
				}, timerUpdateInterval );
				this.state = 'start';
			}
			return this;
		},
		stop : function() {
			if( this.state !== 'stop' ) {
				clearInterval( this.intervalId );
				this.intervalId = null;
				this.lastStartTime = null;
				this.state = 'stop';
			}
			return this;
		},
		reset : function() {
			this.stop();
			this.elapsedSeconds = null;
			return this;
		},
		getElapsedSeconds : function() {
			return this.elapsedSeconds;
		}
	});
	
	return Timer;
}( jQuery ));