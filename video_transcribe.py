import vlc
import speech_recognition as sr
from pydub import AudioSegment
from pydub.silence import split_on_silence
import pyaudio
import wave
import os
import tempfile
import threading
import time

# Algemene variabelen
video_file = r"C:\GazeDetection\Behavior\Behaviour_25052024_Wim_stilstaande_auto\camera1 Poging 1.mp4"
audio_output_dir = r"C:\GazeDetection\Behavior\Behaviour_25052024_Wim_stilstaande_auto\audio"
os.makedirs(audio_output_dir, exist_ok=True)  # Maak de directory aan als deze niet bestaat
audio_file = os.path.join(audio_output_dir, "recorded_audio.wav")

# Functie om audio op te nemen
def record_audio(duration, audio_file):
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 2
    RATE = 44100
    RECORD_SECONDS = duration

    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("* Recording audio")

    frames = []

    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("* Done recording")

    stream.stop_stream()
    stream.close()
    p.terminate()

    wf = wave.open(audio_file, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()

# Functie om audio te transcriberen
def transcribe_audio(audio_file):
    recognizer = sr.Recognizer()
    audio = AudioSegment.from_wav(audio_file)
    audio_chunks = split_audio(audio)
    
    transcript = []
    for i, chunk in enumerate(audio_chunks):
        chunk_filename = os.path.join(tempfile.gettempdir(), f"chunk{i}.wav")
        chunk.export(chunk_filename, format="wav")
        with sr.AudioFile(chunk_filename) as source:
            audio_data = recognizer.record(source)
            try:
                text = recognizer.recognize_google(audio_data, language='nl-NL')
                transcript.append(text)
            except sr.UnknownValueError:
                transcript.append("[Inaudible]")
        
        os.remove(chunk_filename)
    
    return transcript

# Helper functie om audio in stukken te splitsen
def split_audio(audio, chunk_length=30000):
    return [audio[i:i + chunk_length] for i in range(0, len(audio), chunk_length)]

# Sla de transcriptie op in een bestand
def save_transcript(transcript, output_file):
    with open(output_file, 'w') as f:
        for text in transcript:
            f.write(f"{text}\n")

# Functie om video af te spelen
def play_video(video_file):
    print("Starting video playback...")
    player = vlc.MediaPlayer(video_file)
    player.play()

    # Wacht tot de video begint met spelen
    time.sleep(1)

    duration = player.get_length() / 1000  # VLC returns length in milliseconds
    print(f"Video duration: {duration} seconds")

    # Wacht totdat de video is afgelopen
    while player.get_state() != vlc.State.Ended:
        time.sleep(1)

    print("Video playback finished")
    player.stop()
    return duration

# Main script
if __name__ == "__main__":
    # Speel video af en neem tegelijkertijd audio op
    print("Starting main script")
    duration = play_video(video_file)
    print("Recording audio...")
    record_audio_thread = threading.Thread(target=record_audio, args=(duration, audio_file))
    record_audio_thread.start()
    record_audio_thread.join()
    
    print("Transcribing audio...")
    # Transcribe audio
    transcript = transcribe_audio(audio_file)
    
    # Save transcript to file
    output_file = os.path.splitext(video_file)[0] + "_transcript.txt"
    save_transcript(transcript, output_file)
    
    print(f"Transcript saved to {output_file}")
