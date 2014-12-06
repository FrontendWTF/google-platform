angular.module('google.platform', [
]).provider('GooglePlatform', function (
) {
  var lang = null;

  var provider = {
    lang: function (language) {
      if (language) {
        lang = language;

        return provider;
      } else {
        return lang;
      }
    },
    $get: function (
      $q,
      $window,
      $rootScope
    ) {
      var deferred = $q.defer();
      var reference = 'onGooglePlatformApiLoaded';

      $window[reference] = function () {
        deferred.resolve($window.gapi);
      };

      (function (document, script, scriptElement, firstScript) {
        scriptElement = document.createElement(script);
        scriptElement.src = 'https://apis.google.com/js/client:platform.js' +
          '?onload=' + reference;
        scriptElement.async = true;
        if (lang) scriptElement.lang = lang;
        firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      }(document, 'script'));

      return {
        promise: deferred.promise
      };
    }
  };

  return provider;
});
