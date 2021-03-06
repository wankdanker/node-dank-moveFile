var moveFile = require('../')
	, fs = require('fs')
	, tape = require('tape')
	;

//for simple backwards compatability with these tests (migrating from nodeunit)
tape.Test.prototype.done = tape.Test.prototype.end;

var testData = 'Hello world.';
var testFileName = 'test.txt'

function writeFile(name, cb) {
	fs.writeFile(name, testData, 'utf8', cb);
};

function readFile(name, cb) {
	fs.readFile(name, 'utf8', cb);
}

function deleteFile(name, cb) {
	fs.unlink(name, cb);
}

tape('create and move file', function (test) {
	var newFileName = 'test-file-moved.txt';

	writeFile(testFileName, function (err) {
		test.equal(err, null);

		moveFile(testFileName, newFileName, function (err) {
			test.equal(err, null);
			
			readFile(newFileName, function (err, data) {
				test.equal(err, null);
				test.equal(testData, data);
				
				deleteFile(newFileName, function (err) {
					test.done();
				});
			});
		});
	});
});

tape('create and move file to unwritable location', function (test) {
	var newFileName = '/_afkj3kjfs0fnj34kjf__95ds/test.txt';
	
	writeFile(testFileName, function (err) {
		test.equal(err, null);

		moveFile(testFileName, newFileName, function (err) {
			test.deepEqual(err, {"errno":34,"code":"ENOENT","path":"/_afkj3kjfs0fnj34kjf__95ds/test.txt.part"});
			
			deleteFile(testFileName, function (err) {
				test.done();
			});
		});
	});
});

tape('move file that does not exist', function (test) {
	var newFileName = 'test-file-moved.txt';
	
	moveFile('some-file-that-does-not-exist.txt', newFileName, function (err) {
		test.deepEqual(err, {"errno":34,"code":"ENOENT","path":"some-file-that-does-not-exist.txt"});
		
		readFile(newFileName, function (err, data) {
			test.deepEqual(err, {"errno":34,"code":"ENOENT","path":"test-file-moved.txt"});
			
			test.done();
		});
	});
});
