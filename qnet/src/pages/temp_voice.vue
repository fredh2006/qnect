

<template>
    <div>
      <h1>Voice Recorder</h1>
      <button @click="startRecording" v-if="!isRecording">Start Recording</button>
      <button @click="stopRecording" v-if="isRecording">Stop Recording</button>
      <button @click="uploadAudio" :disabled="!convertedAudio">Upload Recording</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  // import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
  import { FFmpeg } from '@ffmpeg/ffmpeg';
  import { fetchFile } from '@ffmpeg/util';
  import { getWaveBlob, downloadWav } from "webm-to-wav-converter";
  // import testfile from "../../public/testaudio.wav";
  import * as fs from 'fs';
  
  export default {
    data() {
      return {
        isRecording: false,
        audioBlob: null, // Holds the recorded audio blob
        convertedAudio: null, // Holds the converted audio file
        mediaRecorder: null, // MediaRecorder instance
        audioChunks: [], // Stores audio data chunks
        ffmpeg: null, // FFmpeg instance
        wavRecord: null
      };
    },
    methods: {
      async startRecording() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.mediaRecorder = new MediaRecorder(stream);
  
          // Start recording
          this.mediaRecorder.start();
          this.isRecording = true;
  
          // Collect audio data chunks
          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.audioChunks.push(event.data);
            }
          };
  
          // Stop the stream when recording stops
          this.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
            this.audioBlob = audioBlob;
            this.audioChunks = []; // Clear chunks for next recording
            stream.getTracks().forEach((track) => track.stop());
            console.log("i'm here ");
            this.convertedAudio = getWaveBlob(audioBlob,true);
            // await this.convertToMP3(audioBlob); // Convert the recording to MP3
          };
        } catch (error) {
          console.error('Error accessing microphone:', error);
        }
      },
  
      stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          this.mediaRecorder.stop();
          this.isRecording = false;
        }
      },
  
      async uploadAudio() {
        if (!this.convertedAudio) {
          alert('No recording to upload!');
          return;
        }
  
        // Prepare the audio file for upload
        const formData = new FormData();
  
        const blob3 = await this.convertedAudio;
        console.log(blob3);
        formData.append('title', 'Recorded Audio');
        formData.append('description', 'This is a test recording.');
        formData.append('file', blob3, 'recording.wav');
        formData.append('video_url', '');
        formData.append('start_time', '');
        formData.append('end_time', '');
        formData.append('bulk_upload_id', '');
        formData.append('callback_url', 'https://api.imentiv.ai/docs#/');
        console.log('FormData Contents:');
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
  
        try {
          const response = await axios.post('/api/v1/audios', formData, {
            headers: {
              'accept': 'application/json',
              'X-API-Key': 'P-ORpYF3P2Qs6yC5cRZGHYtDKzCzso-hdBINpV-EWiJiApM7RVs6qh4WtMmS16Ze4Bw',
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Upload successful:', response.data);
          alert('Audio uploaded successfully!');
        } catch (error) {
          console.error('Upload failed:', error);
          alert('Failed to upload audio!');
        }
      },
    },
  };
  </script>