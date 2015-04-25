var say = require('say');
var keypress = require('keypress');

function checkQuit(key){
    return (key && key.ctrl && key.name === 'c');
}

function checkSettingsChange(key){

}

function changeSetting(key){

}

function speakLetter(ch){
    console.log(ch);
}

function checkSpeakWords(key){

}

function speakWords(){

}

keypress(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', function (ch, key) {
    console.log(ch, key);

    if (checkQuit()){
	process.exit();
    }
    if (checkSettingsChange(key)){
	changeSetting(key);
    }
    speakLetter(ch);

    if (checkSpeakWords()){
	speakWords();
    }
});
