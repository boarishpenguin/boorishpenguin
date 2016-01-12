var expect = require('chai').expect;
var request = require('request');
var apikeys = require ('../config/apikeys.js')
var googleAuth = require('../auth/googleAuth.js');
// if apikeys undefined consult googleOAuth section in boorishpenguin wiki

describe('apikeys', function() {
  it('should have a string for clientID', function() {
    expect(apikeys.googleOauth.clientID).to.be.a('string');
  })
  it('should have a string for clientSecret', function (){
    expect(apikeys.googleOauth.clientSecret).to.be.a('string');
  })
})
