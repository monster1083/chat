"use client"

import { AudioRecorder } from 'react-audio-voice-recorder';
import "./index.css"
import { useEventInfoStore } from "@/store/event";
import { useState } from "react";

export default function VoiceRecord() {
  const {eventInfo, updateEventInfo} = useEventInfoStore();
  const [resultFileName, setResultFileName] = useState("")

  const uploadFile = async (blob: Blob) => {
    // Convert Blob to Buffer
    const buffer = await blob.arrayBuffer();
    const bufferData = Buffer.from(buffer);

    const url = `https://storage.googleapis.com/upload/storage/v1/b/stt-test-0610/o?uploadType=media&name=audio-files/${eventInfo.when}/${eventInfo.eventName}/${new Date().toLocaleTimeString().substring(3).replaceAll(':', "")}.webm`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GC_STORAGE_ACCESSTOKEN}`,
          'Content-Type': 'audio/webm'
        },
        body: bufferData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('data', data.name);
      setResultFileName(data.name)
      updateEventInfo({...eventInfo, fileName : data.name})
      

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  if(!eventInfo) return null;

  return (
    <>
    <div className="flex justify-center mt-10">
      <AudioRecorder
        onRecordingComplete={uploadFile}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
      />
      <br />
    </div>

    {resultFileName && 
    <div className="flex justify-center mt-10">
      <div>Result <span className="text-purple-800">{resultFileName}</span></div>
    </div>}
  </>
  );
}
