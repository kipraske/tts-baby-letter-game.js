module.exports = {

    // If set to true, the application can be closed with ctrl+c.
    // Otherwise the application cannot be quit from inside the
    // program (which is nice if your user is a baby)
    canQuit: true,

    // Which voice you want to use. null will be the default festival voice
    voice: null,

    // If set to true, we will keep a history of letters typed which will
    // all be read when you hit enter
    wordMode: true,

	// Allow more than one festival instance to be speaking at a time. If set
	// to false letters will not be spoken outloud while another letter
	// is being spoken. The sentence from word mode can be said regardless
	// of this setting.
	simultaneousLetters: true,

    // If set to true, we will output to the console rather than speaking
    // Useful for debugging when you don't have festival working
    silentMode: false
};

