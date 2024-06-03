import moviepy.editor as mp
import vlc
import speech_recognition as sr
from pydub import AudioSegment
from pydub import AudioSegment, silence
from pydub import AudioSegment
from pydub.silence import split_on_silence
import subprocess
import threading
import pyaudio
import wave
import os
import tempfile


# Algemene variabelen
video_file = r"C:\GazeDetection\Behavior\Behaviour_25052024_Wim_stilstaande_auto\camera1 Poging 1.mp4"
audio_file = "extracted_audio.wav"
output_dir = os.path.dirname(video_file)
output_file = os.path.join(output_dir, os.path.splitext(os.path.basename(video_file))[0] + "_transcript.txt")

# Stap 1: Extract audio from video
def extract_audio_from_video(video_file, audio_file):
    print("Extracting audio from video...")
    video = mp.VideoFileClip(video_file)
    video.audio.write_audiofile(audio_file)
    print(f"Audio extracted to {audio_file}")

# Stap 2: Transcribe audio to text with timestamps
def transcribe_audio_with_timestamps(audio_file):
    recognizer = sr.Recognizer()
    audio = AudioSegment.from_file(audio_file)
    chunks = silence.split_on_silence(audio, min_silence_len=2000, silence_thresh= - 59)

    transcript = []
    elapsed_time = 0.0  # Track the elapsed time in seconds

    for i, chunk in enumerate(chunks):
        chunk_filename = f"chunk{i}.wav"
        chunk.export(chunk_filename, format="wav")

        start_time = elapsed_time
        elapsed_time += len(chunk) / 1000.0  # Update elapsed time in seconds

        with sr.AudioFile(chunk_filename) as source:
            audio_data = recognizer.record(source)
            try:
                # Gebruik de Nederlandse taalinstelling ('nl-NL')
                text = recognizer.recognize_google(audio_data, language='nl-NL')
                transcript.append((start_time, text))
                print(f"Transcribed chunk {i}: {text}")
            except sr.UnknownValueError:
                transcript.append((start_time, "[Inaudible]"))
                print(f"Chunk {i} is inaudible")
        
        # Zorg ervoor dat het bestand correct wordt vrijgegeven voordat we het verwijderen
        del audio_data
        os.remove(chunk_filename)
    
    return transcript

# Save transcript to a text file
def save_transcript(transcript, output_file):
    print(f"Saving transcript to {output_file}...")
    with open(output_file, 'w') as f:
        for timestamp, text in transcript:
            f.write(f"{timestamp:.2f}s: {text}\n")
    print("Transcript saved successfully")

# Main script
if __name__ == "__main__":
    # Extract audio from the video
    extract_audio_from_video(video_file, audio_file)

    # Transcribe the audio with timestamps
    transcript = transcribe_audio_with_timestamps(audio_file)

    # Save the transcript to a text file
    save_transcript(transcript, output_file)

    print(f"Transcript saved to {output_file}")
