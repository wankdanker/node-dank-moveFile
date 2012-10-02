var moveFile = require('../')
	, fs = require('fs')
	;

var testData = 'Hello world.';
var testFileName = 'test.txt'

function writeFile(name, cb) {
	fs.writeFile(name, testData, 'utf8', function (err) {
		if (err) {
			//I'm throwing here because I just want this whole thing to
			//fail if we can't write to a test file
			throw err;
		}
		
		return cb(null);
	});
};

function readFile(name, cb) {
	fs.readFile(name, 'utf8', cb);
}

function deleteFile(name, cb) {
	fs.unlink(name, cb);
}

exports['create and move file'] = function (test) {
	var newFileName = 'test-file-moved.txt';
	
	writeFile(testFileName, function () {
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
};

exports['create and move file to unwritable location'] = function (test) {
	var newFileName = '/_afkj3kjfs0fnj34kjf__95ds/test.txt';
	
	writeFile(testFileName, function () {
		moveFile(testFileName, newFileName, function (err) {
			test.deepEqual(err, {"errno":34,"code":"ENOENT","path":"/_afkj3kjfs0fnj34kjf__95ds/test.txt.part"});
			
			deleteFile(testFileName, function (err) {
				test.done();
			});
		});
	});
};

exports['move file that does not exist'] = function (test) {
	var newFileName = 'test-file-moved.txt';
	
	moveFile('some-file-that-does-not-exist.txt', newFileName, function (err) {
		test.deepEqual(err, {"errno":34,"code":"ENOENT","path":"some-file-that-does-not-exist.txt"});
		
		readFile(newFileName, function (err, data) {
			test.deepEqual(err, {"errno":34,"code":"ENOENT","path":"test-file-moved.txt"});
			
			test.done();
		});
	});
};