var settings = require('./settings');
var say = require('say');
var keypress = require('keypress');
var child_process = require('child_process');
var wordsBuffer = '';
var speakingLock = false;
var speakLetter = '';

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
	if (!settings.canQuit) {
		return false;
	}
	return (key && key.ctrl && key.name === 'c');
}

function appendRandomDictionaryWord(ch, then) {
	var dictCommand = 'grep ^' + ch + ' ' + settings.dictionaryPath;
	dictCommand += ' | sort --random-sort | head -n 1';
	console.log(dictCommand);
	child_process.exec(dictCommand, speakDictionaryResult);
}

function speakDictionaryResult(err, stdout, stderr) {
	if (err){
		console.log(err);
		return;
	}
	if (stderr){
		console.log(stderr);
		return;
	}

	var resultText = speakLetter + ".. " + stdout;
	say.speak(settings.voice, resultText, doneSpeakingCharacter);
}

function checkSpeakableCharacter(ch) {
	if (ch && /[0-9A-Z]/i.test(ch)) {
		return true;
	}
	else {
		return false;
	}
}

function doneSpeakingCharacter(err) {
	if (err){
		console.log(err);
	}

	speakingLock = false;
}

function prepareStateToSpeakCharacter(ch){
	if (speakingLock) {
		return;
	}
	if (!settings.simultaneousLetters) {
		speakingLock = true;
	}

	// It seems that most voices pronouce 'a' like the word a instead of
	// the letter 'A'. We are just tricking it a bit to say the right sounds.
	speakLetter = ch;
	if (ch === 'a' || ch === 'A') {
		speakLetter = 'ae';
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
	if (checkSpeakableCharacter(ch)) {
		prepareStateToSpeakCharacter(ch);
		if (settings.dictionaryMode){
			appendRandomDictionaryWord(ch, speakDictionaryResult);
		}
		else{
			say.speak(settings.voice, speakLetter, doneSpeakingCharacter);
		}
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
