var settings = require('./settings');
var say = require('say');
var keypress = require('keypress');

keypress(process.stdin);
process.stdin.setRawMode(true);

if (settings.silentMode){
    say.speak = function(voice, text, callback){
	console.log({
	    voice : voice,
	    text : text
	});
	if (callback) {
	    callback();
	}
    };
}

function checkQuit(key){
    return (key && key.ctrl && key.name === 'c');
}

function checkSettingsChange(key){

}

function changeSetting(key){

}

function speakLetter(ch){
    say.speak(settings.voice, ch);
}

function checkSpeakWords(key){

}

function speakWords(){

}

process.stdin.on('keypress', function (ch, key) {
    console.log(ch, key);

    if (checkQuit(key)){
	process.exit();
    }
    if (checkSettingsChange(key)){
	changeSetting(key);
    }
    speakLetter(ch);
    if (checkSpeakWords(key)){
	speakWords();
    }
});
