'use strict';

module.exports = {

	app: {
	  pug:    		  'app/templates/*.pug',
	  styles:    		'app/styles/*.{sass,scss}',
	  scripts:      'app/scripts/common.js',
	  scriptsLibs:  'app/scripts/libs.js',
	  fonts:  		  'app/fonts/**/*',
	  img:    		 	['app/img/*', '!app/img/sprite'],
	  sprite:    		'app/img/sprite/*.svg',
	  spriteStyles: 'app/styles/sprite/',
	  spriteFile: 	'../app/img/sprite.svg'
	},

	watch: {
		pug:    		  'app/templates/**/*.pug',
		styles:    		'app/styles/**/*.{sass,scss}',
		scripts:    	'app/scripts/**/*.js',
		scriptsLibs:  'app/scripts/libs.js',
		fonts:  			'app/fonts/**/*',
		img:    			'app/img/*',
		sprite:       'app/img/sprite/*.svg'
	},

	dist: {
		dist:  	  		'dist/',
		styles:   		'dist/css/',
		scripts:  		'dist/scripts/',
		img:   	  		'dist/img/',
		fonts: 	  		'dist/fonts/',
		sprite: 	  	'app/img/sprite/'
	}

};