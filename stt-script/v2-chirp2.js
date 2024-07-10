// 참고 : https://github.com/googleapis/google-cloud-node/blob/main/packages/google-cloud-speech/samples/generated/v1/adaptation.get_custom_class.js

// v2
// 인식기를 만들어서 사용

// Imports the Google Cloud client library
const {SpeechClient} = require('@google-cloud/speech').v2;
const {Storage, TransferManager} = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');


process.env.GOOGLE_APPLICATION_CREDENTIALS = './stt-project-426010-dd21c5882ff7.json';

async function main(fileName) {
    // Creates a client
  const client = new SpeechClient({apiEndpoint: 'us-central1-speech.googleapis.com'});
  
  // Run request
  const [operation] = await client.batchRecognize({
    recognizer: "chirp2",
    
    // recognizer : "projects/762516939294/locations/us-central1/recognizers/stt-test", 
    files: [{uri : `gs://stt-test-0610/${fileName}`}],
    recognitionOutputConfig: {
      gcsOutputConfig: {
        uri : "gs://stt-test-0610/output/chirp2",

      }
    },
  });
  const [response] = await operation.promise();
  
  const keys = Object.keys(response.results)
  const targetKey = keys[0];
  const uri = response.results[targetKey].uri;
  
  const resultFileName = uri.replace('gs://stt-test-0610/', "")

  downloadFile(resultFileName).catch(console.error);;
}


async function downloadFile() {
  const storage = new Storage();
  const transferManager = new TransferManager(storage.bucket("stt-test-0610"));
   // Downloads the folder
  const response = await transferManager.downloadManyFiles("output/chirp2");

  // Convert buffers to JSON objects
  const jsonData = response.map(bufferArray => {
    return bufferArray.map(buffer => JSON.parse(buffer.toString()));
  });

  // Define the output directory
  const outputDir = path.join(__dirname, 'output');

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Save each JSON object to a file
  jsonData.forEach((data, index) => {
    const filePath = path.join(outputDir, `output_${index}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  });

  console.log(`Files saved to ${outputDir}`);
}


const args = process.argv.slice(2);
main(args[0]).catch(console.error);