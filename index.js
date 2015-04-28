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

// any non-character letter or backticks will throw an error when it
// goes through festival
function checkSpeakableCharacter(ch) {
    if (ch && /[0-9A-Z]/i.test(ch)) {
	return true;
    }
    else {
	return false;
    }
}

function addCharToWords(ch) {
    if (!settings.wordMode) {
	return;
    }
    wordsBuffer += ch;
}

function checkSpeakWords(key) {
    if (!settings.wordMode) {
	return false;
    }

    return (key && key.name === 'return');
}

process.stdin.on('keypress', function (ch, key) {
    if (checkQuit(key)) {
	process.exit();
    }
    if (checkSettingsChange(key)) {
	changeSetting(key);
    }
    if (checkSpeakableCharacter(ch)) {
	say.speak(settings.voice, ch);
	addCharToWords(ch);
    }
    if (ch === ' ') {
	addCharToWords(ch);
    }
    if (checkSpeakWords(key)) {
	say.speak(settings.voice, wordsBuffer);
	wordsBuffer = '';
    }
});

console.log('Now listening for keypresses...');
