// 참고 : https://github.com/googleapis/google-cloud-node/blob/main/packages/google-cloud-speech/samples/generated/v1/adaptation.get_custom_class.js

// V1 default 모델 기본 사용



// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');
process.env.GOOGLE_APPLICATION_CREDENTIALS = './stt-project-426010-dd21c5882ff7.json';


async function main() {
  
  // Creates a client
  const client = new speech.SpeechClient();
  const filename = './resources/gmgmgm.wav';
  const file = fs.readFileSync(filename);
  const audioBytes = file.toString('base64');

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 48000,
    languageCode: 'ko-KR',
    enableWordConfidence: true,
    enableWordTimeOffsets: true,
    audioChannelCount: 1
  };

  const request= {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);

  const transcription = response.results.map(result =>
    result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`);


  console.log('response.results', response.results);
  console.log('response.results.alternatives', response.results[0].alternatives[0].words);
}


main().catch(console.error);