'use strict';

describe('Home Controller', function() {

  beforeEach(module('meanSeed'));

  var HomeCtrl, scope, state;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    state = { current: {} };
    state.go = function(name) {
      state.current.name = name;
    };
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope,
      $state: state
    });
  }));

  it('should show the gulp state when first loaded', function() {
    expect(state.current.name).toEqual('home.gulp');
  });

  it('should define the tabs', function() {
    expect(scope.tabs[0]).toEqual({ state: 'home.gulp', title: 'gulp'});
    expect(scope.tabs[1]).toEqual({ state: 'home.api', title: 'api'});
  });

  it('should indicate when a tab is active', function() {
    expect(scope.isActive({state: 'home.gulp'})).toBeTruthy();
  });

  it('should indicate when a tab is not active', function() {
    expect(scope.isActive({state: 'home.api'})).toBeFalsy();
  });

});
