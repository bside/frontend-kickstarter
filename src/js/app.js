/* jshint bitwise:true, browser:true, eqeqeq:true, forin:true, globalstrict:true, indent:4, jquery:true,
   loopfunc:true, maxerr:3, noarg:true, node:true, noempty:true, onevar: true, quotmark:single,
   strict:true, undef:true, white:false */
/* global require, webroot, fullwebroot */

/*!
 * Kickstart Frontend
 * Alvaro Gonzalez <alvaro@code.cl>
 */

//<![CDATA[
'use strict';

/**
 * Aplicación
 */
require.config(
{
	baseUrl		: 'js',
	paths		: {
		jquery			: 'vendor/jquery.min',
		bootstrap		: 'vendor/bootstrap.min',
		modulo			: 'modulo.min'
	},
	shim		: {
		bootstrap		: { deps: ['jquery'] }
	}
});

require(['jquery', 'bootstrap'], function($, $bs)
{
	$.extend(
	{
		/**
		 * Entrega la URL relativa del sitio
		 *
		 * @param		string			ruta			Ruta de la aplicacion a devolver
		 * @param		bool			full			Devuelve la ruta completa de la app o la ruta relativa
		 * @return		string							URL de la aplicacion
		 */
		webroot: function(ruta, full)
		{
			full	= typeof full !== 'undefined' ? true : false;
			return (full ? fullwebroot : webroot) + ruta;
		},

		/**
		 * Aplicación / Plugins
		 */
		app:
		{
			test: function()
			{
				require(['modulo'], function(modulo)
				{
					console.log(modulo.test);
				});
			},

			init: function()
			{
				$.app.test();
			}
		}
	});


	/**
	 * jQuery
	 */
	$(document).ready(function()
	{
		/**
		 * Inicializa las opciones y plugins
		 */
		$.app.init();
	});
});
