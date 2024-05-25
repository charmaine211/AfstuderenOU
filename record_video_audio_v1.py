import os
import subprocess
import threading
import ctypes
import sys

# Check if the script is running with administrative privileges
def is_user_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

# Function to restart the script with administrative privileges
def run_as_admin():
    if sys.version_info[0] == 3:
        script = f'"{sys.executable}" "{os.path.abspath(__file__)}"'
    else:
        script = '"{}" "{}"'.format(sys.executable, os.path.abspath(__file__))
    try:
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, script, None, 1)
    except Exception as e:
        print(f"Failed to elevate privileges: {e}")
        sys.exit(1)

# Define the storage path
base_path = "C:/GazeDetection/Behavior/"
recording_name = "Behaviour_25052024_Wim_stilstaande_auto"
os.makedirs(os.path.join(base_path, recording_name), exist_ok=True)

# File paths for the output videos
output_file1 = os.path.join(base_path, recording_name, 'camera1.mp4')
output_file2 = os.path.join(base_path, recording_name, 'camera2.mp4')

# Function to start ffmpeg recording for Camera 1 with audio
def start_ffmpeg_camera1():
    ffmpeg_path = 'C:/Users/Gebruiker/GazeDetection Notebooks/ffmpeg/ffmpeg-7.0-essentials_build/bin/ffmpeg.exe'
    command = [
        ffmpeg_path,
        '-y',
        '-f', 'dshow',
        '-rtbufsize', '1500M',  # Increase buffer size
        '-i', r'video=@device_pnp_\\?\usb#vid_046d&pid_082d&mi_00#6&2b9b467b&1&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global:audio=Microfoon (HD Pro Webcam C920)',  # First camera with audio
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-strict', 'experimental',
        '-b:a', '192k',
        output_file1
    ]
    subprocess.run(command)

# Function to start ffmpeg recording for Camera 2 with audio
def start_ffmpeg_camera2():
    ffmpeg_path = 'C:/Users/Gebruiker/GazeDetection Notebooks/ffmpeg/ffmpeg-7.0-essentials_build/bin/ffmpeg.exe'
    command = [
        ffmpeg_path,
        '-y',
        '-f', 'dshow',
        '-rtbufsize', '1500M',  # Increase buffer size
        '-i', r'video=@device_pnp_\\?\usb#vid_046d&pid_082d&mi_00#6&f8c8b0&1&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global:audio=Microfoon (HD Pro Webcam C920)',  # Second camera with audio
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-strict', 'experimental',
        '-b:a', '192k',
        output_file2
    ]
    subprocess.run(command)

# Main script execution
if __name__ == "__main__":
    if not is_user_admin():
        print("Re-running the script with administrative privileges...")
        run_as_admin()
        sys.exit(0)

    # Start ffmpeg recording for both cameras in separate threads
    ffmpeg_thread1 = threading.Thread(target=start_ffmpeg_camera1)
    ffmpeg_thread2 = threading.Thread(target=start_ffmpeg_camera2)
    
    ffmpeg_thread1.start()
    ffmpeg_thread2.start()

    # Wait for both ffmpeg processes to finish
    ffmpeg_thread1.join()
    ffmpeg_thread2.join()
    print("Recording finished.")
