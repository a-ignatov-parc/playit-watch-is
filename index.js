var url = require('url');
var request = require('request');

var xml2js = require('xml2js');
var jsdom = require('jsdom').jsdom();
var $ = require('jquery')(jsdom.parentWindow);

var parser = new xml2js.Parser();

module.exports = function(resource, params) {
	var deferred = $.Deferred();
	var urlObject = url.parse(resource);
	var videoId = urlObject.pathname.replace(/^\/?/g, '').split('/')[0];

	request('http://watch.is/api/watch/' + videoId, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			parser.parseString(body, function(error, result) {
				if (!error) {
					if (result.error) {
						deferred.reject(result.error);
					} else {
						console.log(result);
					}
				}
			});
		}
	});

	return deferred;
};
