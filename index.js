var settings = require('./settings');
var say = require('say');
var keypress = require('keypress');
var fs = require('fs');
var cachedFullDictionary = '';
var wordsBuffer = '';
var speakingLock = false;
var speakLetter = '';
var dictonaryWord = '';

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

function selectRandomDictionaryWord(ch) {
	var firstLetterRegex = new RegExp('^' + ch + '.*$', 'igm');
	var letterWords = cachedFullDictionary.match(firstLetterRegex); //letter words is an array of matches
	var randIndex = Math.floor((Math.random() * letterWords.length));
	dictonaryWord = letterWords[randIndex];
}

function speakLetterAndDictonaryWord() {
	var resultText = speakLetter + ".. " + dictonaryWord;
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
	if (err) {
		console.log(err);
	}

	speakingLock = false;
}

function prepareStateToSpeakCharacter(ch) {
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

function loadMainKeypressHandler() {
	keypress(process.stdin);
	process.stdin.setRawMode(true);

	process.stdin.on('keypress', function (ch, key) {
		if (checkQuit(key)) {
			process.exit();
		}
		if (checkSpeakableCharacter(ch)) {
			prepareStateToSpeakCharacter(ch);
			if (settings.dictionaryMode) {
				selectRandomDictionaryWord(ch);
				speakLetterAndDictonaryWord();
			}
			else {
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

	console.log('Now listening for keypresses.');
}

function cacheAllDictionaryWords(next){
	console.log('Loading Dictionary...');
	fs.readFile(settings.dictionaryPath, function (err, data) {
		cachedFullDictionary = data.toString();
		console.log('Dictionary Loaded!');
		next();
	});
}

if (settings.dictionaryMode){
	cacheAllDictionaryWords(loadMainKeypressHandler);
}
else{
	loadMainKeypressHandler();
}
