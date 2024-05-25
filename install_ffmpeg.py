import os
import sys
import ctypes
import zipfile
import urllib.request
import subprocess
import platform  # Voeg deze import toe

def is_user_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def run_as_admin():
    if sys.version_info[0] == 3:
        script = f'"{sys.executable}" "{os.path.abspath(__file__)}"'
    else:
        script = '"{}" "{}"'.format(sys.executable, os.path.abspath(__file__))
    
    try:
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, script, None, 1)
    except Exception as e:
        print(f"Failed to elevate privileges: {e}")

def install_ffmpeg():
    if not is_user_admin():
        print("Dit script moet als administrator worden uitgevoerd.")
        run_as_admin()
        sys.exit(0)

    system = platform.system()
    
    if system == 'Windows':
        ffmpeg_url = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
        download_path = "ffmpeg.zip"
        extract_path = "ffmpeg"
        
        # Download ffmpeg zip
        print("Downloading ffmpeg...")
        urllib.request.urlretrieve(ffmpeg_url, download_path)
        
        # Unzip the downloaded file
        print("Extracting ffmpeg...")
        with zipfile.ZipFile(download_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
        
        # Find the bin directory inside the extracted files
        bin_path = None
        for root, dirs, files in os.walk(extract_path):
            if "bin" in dirs:
                bin_path = os.path.abspath(os.path.join(root, "bin"))
                break
        
        if bin_path is None:
            print("Kon de bin-directory niet vinden in de uitgepakte bestanden.")
            return
        
        # Update the PATH environment variable
        print("Updating PATH...")
        subprocess.run(f'setx /M PATH "{bin_path};%PATH%"', shell=True)
        
        print("ffmpeg is geïnstalleerd en aan PATH toegevoegd.")
    else:
        print("Unsupported operating system.")

if __name__ == "__main__":
    install_ffmpeg()
