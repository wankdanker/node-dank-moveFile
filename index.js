var fs = require('fs');

if (process.argv[1] === __filename) {
	moveFile(process.argv[2], process.argv[3], function () {
		console.log(arguments);
	});
}

module.exports = moveFile;

function moveFile (from, to, callback) {
	var source, destination, calledBack = false, errors = [], tmpTo;
	
	if (!(from && to)) {
		return callback(Error('Source and destination arguments are required to moveFile.'));
	}
	
	callback = callback || function () {};
	tmpTo = to + '.part';
	
	source = fs.createReadStream(from);
	destination = fs.createWriteStream(tmpTo);
	
	source.on('end', function () {
		source.destroy();
		destination.destroySoon();
	});
	
	source.on('close', maybeCallback);
	source.on('error', handleError);
	
	destination.on('close', maybeCallback);
	destination.on('error', handleError);
	
	source.pipe(destination);
	
	function handleError(err) {
		if (err) {
			errors.push(err);
			
			source.destroy();
			destination.destroy();
		}
	}
	
	function maybeCallback() {
		if (calledBack) {
			return;
		}
		
		//check to see if any errors have occurred
		if (errors.length) {
			calledBack = true;
			
			fs.unlink(tmpTo, function (err) {
				callback(errors[0]);
			});
		}
		//no errors have occurred so...
		//check to see if the streams are no longer readable/writable
		//indicating that everything is done
		else if (!source.readable && !destination.writable) {
			calledBack = true;
			
			//rename the temp file to the real file
			fs.rename(tmpTo, to, function (err){
				if (err) {
					return callback(err);
				}
				
				//delete the original file.
				fs.unlink(from, callback);
			});
		}
	}
}