dank-moveFile [![Build Status](https://secure.travis-ci.org/wankdanker/node-dank-moveFile.png)](http://travis-ci.org/wankdanker/node-dank-moveFile)
-------------

A pure JavaScript moveFile function for node.

This is different from node's native `fs.rename()` function in that 
`moveFile()` first creates a copy of the file at the destination and then 
unlinks the source file if no errors occurred. This allows us to move files
between devices, unlike `fs.rename()`.


install
-------

```bash
npm install dank-movefile
```

api
---

moveFile(from, to, callback);

* _from_ - path to the source file which will be moved
* _to_  - path to the destination to which the source file will be moved
* _callback_ - callback function when the operation is complete. The only
	argument to the callback function is an error object if an error 
	occurred

example
-------

```javascript
var moveFile = require('dank-movefile');

moveFile('/tmp/test.txt','/tmp/test2.txt', function (err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('move success');
	}
});
```

license
-------

### The MIT License (MIT)


Copyright (c) 2012 Daniel L. VerWeire

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
