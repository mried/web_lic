/* global exports: false, require: false, browser: false, process: false */

const path = require('path');
const downloadPath = path.resolve('chromeDownloads');

exports.config = {
	specs: [
		'./specs/test_LDParse.js',
		'./specs/test_LDRender.js',
		'./specs/test_util.js',
		'./specs/test_store.js',
		'./specs/test_undoStack.js',
		'./specs/test_initial_page.js',
		'./specs/test_import_model.js',
		'./specs/test_tree.js'
	],
	exclude: [],
	maxInstances: 1,
	capabilities: [{
		maxInstances: 1,
		browserName: 'chrome',
		chromeOptions: {
			prefs: {
				'download.default_directory': downloadPath
			}
		}
	}],
	port: '9515',
	path: '/',
	sync: true,
	logLevel: 'error',
	coloredLogs: true,
	deprecationWarnings: false,
	bail: 0,
	screenshotPath: './errorShots/',
	downloadPath: downloadPath,
	baseUrl: 'http://localhost',
	waitforTimeout: 1000000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	services: ['chromedriver'],
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		timeout: process.env.DEBUG ? 1000000 : 10000
	},
	before: function() {
		browser.addCommand('getText2', function(selector) {
			if (typeof selector === 'object' && selector.hasOwnProperty('ELEMENT')) {
				return this.elementIdText(selector.ELEMENT).value;
			}
			return this.getText(selector);
		});
		browser.addCommand('getClass2', function(selector) {
			if (typeof selector === 'object' && selector.hasOwnProperty('ELEMENT')) {
				return this.elementIdAttribute(selector.ELEMENT, 'class').value;
			}
			return this.getAttribute(selector, 'class');
		});
		browser.addCommand('getCss2', function(selector, property) {
			if (typeof selector === 'object' && selector.hasOwnProperty('ELEMENT')) {
				return this.elementIdCssProperty(selector.ELEMENT, property).value;
			}
			return this.getCssProperty(selector, property).value;
		});
	}
};