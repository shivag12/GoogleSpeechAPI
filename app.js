const Speech = require("@google-cloud/speech");
const record = require('node-record-lpcm16');

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./defaultValues/SpeechToText-ff2f29de7f8e.json"

var speech = Speech();

const request = {
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: "16000",
      languageCode: "en-IN"
    },
    interimResults: false // If you want interim results, set this to true
  };

  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data', (data) => process.stdout.write(data.results));

  // Start recording and send the microphone input to the Speech API
  record
    .start({
      sampleRateHertz: "16000",
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: false,
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '10.0'
    })
    .on('error', console.error)
    .pipe(recognizeStream);