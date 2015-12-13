'use strict';

angular.module('stockApp.version', [
  'stockApp.version.interpolate-filter',
  'stockApp.version.version-directive'
])

.value('version', '0.1');
