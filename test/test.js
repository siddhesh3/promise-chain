var assert = require('assert');
var promiseChain = require('../index');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
        console.log(promiseChain);
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});