# Simple NodeJS letter game

A simple letter game that I am going to put on the raspberry pi for my baby to bang on a keyboard and hear the letters that she hits.

## Installation

The main dependencies are [nodejs](https://nodejs.org/) and [festival](http://www.cstr.ed.ac.uk/projects/festival/). The node module dependencies are defined in the `package.json` file so can be installed by using `npm install` at the root of the application.

## Configuration

There are a few settings you can set in settings.js. Each setting is described inside the settings.js itself. Note that festival is highly configurable as well. If you want something better than the default robot-like voice you may have to install some additional packages for festival. I created these settings so we can adjust it based on the user. I have a 10 month old and a 5 year old, so the baby will just want to hear something happen when you bang on the keys, and the 5 year old will want to make words and sentences. Here are the settings that I am using then:

### Baby
```javascript
{
    canQuit: false,
    voice: "voice_us1_mbrola",
    wordMode: false,
	dictionaryMode: true,
	dictionaryPath: '/usr/share/dict/words',
	simultaneousLetters: false,
    silentMode: false
}
```

### 5 Year Old
```javascript
{
    canQuit: true,
    voice: "voice_us1_mbrola",
    wordMode: true,
	dictionaryMode: false,
	dictionaryPath: '/usr/share/dict/words',
	simultaneousLetters: true,
    silentMode: false
}
```