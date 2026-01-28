🎬 MediaCut – Web Video Editor

MediaCut is a browser-based video editing application built using HTML, CSS, and Vanilla JavaScript.
It allows users to upload videos, preview them on a canvas, apply visual effects, and export the final
video directly from the browser.

This project demonstrates canvas rendering, video playback control, timeline handling,
and client-side video export without using any backend.

---

🚀 Features

- Upload video files (supports both 16:9 and 9:16 videos)
- Dynamic canvas preview that auto-adjusts to video aspect ratio
- Play and Pause video controls
- Timeline with scrubber and track layout
- Effects section (Grayscale, Blur, Brightness – extendable)
- Clear editor button
- Export edited video as WebM
- Clean, modern UI inspired by professional video editors

---

🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API
- MediaRecorder API

---

📁 Project Structure

web_vid_editor/
├── index.html
├── style.css
├── script.js
├── export.js
└── README.md

---

▶️ How to Run the Project

1. Clone the repository:
   git clone https://github.com/your-username/web-video-editor.git

2. Open the folder:
   cd web-video-editor

3. Open index.html in a browser
   (Chrome, Edge, or Firefox recommended)

---

📤 Export Information

- Exported videos are downloaded to the browser's Downloads folder
- Output format: WebM
- Export includes:
  - Canvas rendering
  - Applied effects
  - Text overlays (when added)

Note:
Safari has limited support for MediaRecorder, so exporting may not work correctly.

---

⚠️ Current Limitations

- MP4 export not supported (browser limitation)
- Audio mixing is not fully implemented yet
- No backend or cloud storage

---

🌱 Future Improvements

- More video effects and transitions
- Audio track support and mixing
- Animated text presets
- Export progress indicator
- MP4 export using FFmpeg (WASM)
- Cloud save and sharing


---

If you like this project, consider giving it a star on GitHub ⭐
