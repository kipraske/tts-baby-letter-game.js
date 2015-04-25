var say = require('say');
var keypress = require('keypress');

function checkQuit(key){
    if (key && key.ctrl && key.name === 'c') {
	process.stdin.pause();
    }
}

function checkSettingChange(key){

}

function changeSetting(){

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
});
