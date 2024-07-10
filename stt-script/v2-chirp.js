// 참고 : https://github.com/googleapis/google-cloud-node/blob/main/packages/google-cloud-speech/samples/generated/v1/adaptation.get_custom_class.js

// v2
// 인식기를 만들어서 사용


// Imports the Google Cloud client library
const {SpeechClient} = require('@google-cloud/speech').v2;
process.env.GOOGLE_APPLICATION_CREDENTIALS = './stt-project-426010-dd21c5882ff7.json';

async function main() {
  
  // Creates a client
  const client = new SpeechClient({apiEndpoint: 'asia-southeast1-speech.googleapis.com'});
  
  // Run request
  const [operation] = await client.batchRecognize({
    recognizer : "projects/762516939294/locations/asia-southeast1/recognizers/stt-chirp", 
    files: [{uri : "gs://stt-test-0610/audio-files/gm_interview.wav"}],
    recognitionOutputConfig: {
      gcsOutputConfig: {
        uri : "gs://stt-test-0610/output/chirp"
      }
    }
  });
  const [response] = await operation.promise();
}


main().catch(console.error);