var settings = require('./settings');
var say = require('say');
var keypress = require('keypress');
var wordsBuffer = '';

keypress(process.stdin);
process.stdin.setRawMode(true);

if (settings.silentMode) {
    say.speak = function (voice, text, callback) {
	console.log({
	    voice: voice,
	    text: text
	});
	if (callback) {
	    callback();
	}
    };
}

function checkQuit(key) {
    return (key && key.ctrl && key.name === 'c');
}

function checkSettingsChange(key) {

}

function changeSetting(key) {

}

function addCharToWords(ch) {

}

function checkSpeakWords(key) {
    return (key.name === 'return');
}

process.stdin.on('keypress', function (ch, key) {
    if (checkQuit(key)) {
	process.exit();
    }
    if (checkSettingsChange(key)) {
	changeSetting(key);
    }
    say.speak(settings.voice, ch);
    wordsBuffer += ch;
    if (checkSpeakWords(key)) {
	say.speak(settings.voice, wordsBuffer);
	wordsBuffer = '';
    }
});
