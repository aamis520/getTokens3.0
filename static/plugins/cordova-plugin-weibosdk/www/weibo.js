cordova.define("cordova-plugin-weibosdk.WeiboSDK", function(require, exports, module) {
var cordova = require('cordova');
module.exports = {
	checkClientInstalled:function(successCallback, errorCallback){
		cordova.exec(successCallback, errorCallback, "WeiboSDK", "checkClientInstalled", []);
	},
	ssoLogin:function(successCallback, errorCallback){
		cordova.exec(successCallback, errorCallback, "WeiboSDK", "ssoLogin", []);
	},
	logout:function(successCallback, errorCallback){
		cordova.exec(successCallback, errorCallback, "WeiboSDK", "logout", []);
	},
	shareToWeibo:function(successCallback, errorCallback, args){
		if(args == undefined){
			args = {};
		}
		cordova.exec(successCallback, errorCallback, "WeiboSDK", "shareToWeibo", [args]);
	},
	shareImageToWeibo:function(successCallback, errorCallback, args){
		if(args == undefined){
			args = {};
		}
		cordova.exec(successCallback, errorCallback, "WeiboSDK", "shareImageToWeibo", [args]);
	},
	shareTextToWeibo:function(successCallback, errorCallback, args){
		if(args == undefined){
			args = {};
		}
		cordova.exec(successCallback, errorCallback, "WeiboSDK", "shareTextToWeibo", [args]);
	}
};

});
