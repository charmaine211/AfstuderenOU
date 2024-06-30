export const TEST = {
    url: "http://127.0.0.1:5000",
}

export const MODEL_FORMATS = ["pt"];

export const VIDEO_FORMATS = ["avi", 
    "gif", "m4v", "mkv", 
    "mov", "mp4", "mpeg", 
    "mpg", "ts", "wmv", 
    "webm", "asf"];

export const IMAGE_FORMATS = [
    "bmp", "dng", "jpeg", 
    "jpg", "mpo", "png", 
    "tif", "tiff", "webp", 
    "pfm"];


export const AV_FORMATS = IMAGE_FORMATS.concat(VIDEO_FORMATS);