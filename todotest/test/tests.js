var chai = require('chai'),
  should = chai.should,
  expect = chai.expect,
  Promise = require('bluebird'),
  chaiAsPromised = require('chai-as-promised');
var request = require('superagent-promise')(require('superagent'), Promise);

chai.use(chaiAsPromised);
var url = process.env.URL || 'http://localhost:8000/todos';

describe('Cross Origin Requests', function() {
  var result;

  before(function() {
    result = request('OPTIONS', url)
      .set('Origin', 'http://someplace.com')
      .end();
  });

  it('should return the correct CORS headers', function() {
    return assert(result, 'header').to.contain.all.keys([
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers'
    ]);
  });

  it('should allow all origins', function() {
    return assert(result, 'header.access-control-allow-origin').to.equal('*');
  });

});

describe('Create Todo Item', function() {
  var result;

  before(function() {
    result = post(url, { title: 'Practice Ansible' });
  });

  it('should return a 201 CREATED response', function() {
    return assert(result, 'status').to.equal(201);
  });

  it('should create the item', function() {
    var item = result.then(function(res) {
      return get(res.header['location']);
    });

    return assert(item, 'body.title').that.equals('Practice Ansible');
  });

  after(function() {
    return del(url);
  });

});


const post = (url, data) => request.post(url)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .send(data)
  .end();

const get = (url) => request.get(url)
  .set('Accept', 'application/json')
  .end();

function del(url) {
  return request.del(url).end();
}

const update = (url, method, data) => request(method, url)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .send(data)
  .end();

const assert = (result, prop) => expect(result).to.eventually.have.deep.property(prop);
