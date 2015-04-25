var say = require('say');
var keypress = require('keypress');

keypress(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', function (ch, key) {

    console.log(ch);
    console.log(key);
    console.log('\n');

    if (key && key.ctrl && key.name === 'c') {
	process.stdin.pause();
    }
});
