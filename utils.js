module.exports = function(app) {

    const path = require('path');
    const Speech = require('@google-cloud/speech');

    app.get('/speechtotext', function (req, res) {
      asyncRecognize("./audio/mon_discours.awb")
    });


    function asyncRecognize(filename) {
        // [START speech_async_recognize]
        // Imports the Google Cloud client library
        const Speech = require('@google-cloud/speech');
        const fs = require('fs');
      
        // Instantiates a client
        const speech = Speech();
      
        // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
        // const filename = '/path/to/audio.raw';
      
        // The encoding of the audio file, e.g. 'LINEAR16'
        // const encoding = 'LINEAR16';
      
        // The sample rate of the audio file in hertz, e.g. 16000
        // const sampleRateHertz = 16000;
      
        // The BCP-47 language code to use, e.g. 'en-US'
        // const languageCode = 'en-US';
      
        const config = {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'fr-FR'
        };
        const audio = {
          content: fs.readFileSync(filename).toString('base64')
        };
      
        const request = {
          config: config,
          audio: audio
        };
      
        // Detects speech in the audio file. This creates a recognition job that you
        // can wait for now, or get its result later.
        speech.longRunningRecognize(request)
          .then((data) => {
            const response = data[0];
            const operation = response;
            // Get a Promise representation of the final result of the job
            return operation.promise();
          })
          .then((data) => {
            const response = data[0];
            const transcription = response.results.map(result =>
                result.alternatives[0].transcript).join('\n');
            console.log(`Transcription: ${transcription}`);
          })
          .catch((err) => {
            console.error('ERROR:', err);
          });
        // [END speech_async_recognize]
      }
};