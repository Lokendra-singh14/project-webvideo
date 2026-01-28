const videoInput = document.getElementById("videoInput");
const video = document.getElementById("videoElement");
const canvas = document.getElementById("videoCanvas");
const ctx = canvas.getContext("2d");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const timeDisplay = document.getElementById("currentTime");
const scrubber = document.getElementById("scrubber");


const editorState = {
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    lastFrameTime: 0
};


videoInput.addEventListener("change", handleVideoUpload);

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    video.load();

    video.addEventListener("loadedmetadata", () => {
        editorState.duration = video.duration;
        const aspectRatio = video.videoWidth / video.videoHeight;

        if (aspectRatio > 1) {
            
            canvas.width = 960;
            canvas.height = Math.floor(960 / aspectRatio);
        } else {
            
            canvas.height = 540;
            canvas.width = Math.floor(540 * aspectRatio);
        }
        scrubber.max = Math.floor(video.duration);
        renderFrame(); 
    }, { once: true });
}


playBtn.addEventListener("click", playVideo);
pauseBtn.addEventListener("click", pauseVideo);

function playVideo() {
    if (!video.src) return;

    video.play();
    editorState.isPlaying = true;
    requestAnimationFrame(renderLoop);
}

function pauseVideo() {
    video.pause();
    editorState.isPlaying = false;
}


function renderLoop(timestamp) {
    if (!editorState.isPlaying) return;

    // Throttle rendering to video frame updates
    if (timestamp - editorState.lastFrameTime > 16) {
        renderFrame();
        editorState.lastFrameTime = timestamp;
    }

    requestAnimationFrame(renderLoop);
}


function renderFrame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasAspect = canvas.width / canvas.height;
    const videoAspect = video.videoWidth / video.videoHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (videoAspect > canvasAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / videoAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * videoAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    ctx.filter = getCanvasFilter(activeEffect);
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    ctx.filter = "none";
    // Update state
    editorState.currentTime = video.currentTime;

    textLayers.forEach(t => {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(t.text, t.x, t.y);
    });

    // Update UI
    updateTimeDisplay();
    updateScrubber();
}


scrubber.addEventListener("input", () => {
    video.currentTime = scrubber.value;
    renderFrame();
});


function updateTimeDisplay() {
    const minutes = Math.floor(editorState.currentTime / 60);
    const seconds = Math.floor(editorState.currentTime % 60);

    timeDisplay.textContent =
        `${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}


function updateScrubber() {
    scrubber.value = Math.floor(editorState.currentTime);
}


window.addEventListener("beforeunload", () => {
    if (video.src) {
        URL.revokeObjectURL(video.src);
    }
});


const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", clearEditor);

function clearEditor() {

  video.pause();
  isPlaying = false;

  
  if (video.src) {
    URL.revokeObjectURL(video.src);
  }
  video.removeAttribute("src");
  video.load();


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  canvas.width = 960;
  canvas.height = 540;

  
  scrubber.value = 0;
  scrubber.max = 0;
  timeDisplay.textContent = "00:00";
}

const effectsBtn = document.getElementById("tool-text");
const effectsModal = document.getElementById("effectsModal");

let activeEffect = "none";


effectsBtn.addEventListener("click", () => {
  effectsModal.style.display = "flex";
});

effectsModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("closeModal") || e.target === effectsModal) {
    effectsModal.style.display = "none";
  }
});


document.querySelectorAll(".effect-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".effect-card")
      .forEach(c => c.classList.remove("active"));

    card.classList.add("active");
    activeEffect = card.dataset.effect;
  });
});


function getCanvasFilter(effect) {
  switch (effect) {
    case "grayscale":
      return "grayscale(100%)";
    case "blur":
      return "blur(4px)";
    case "sepia":
      return "sepia(80%)";
    case "contrast":
      return "contrast(1.5)";
    default:
      return "none";
  }
}

const textBtn = document.getElementById("tool-audio");
const textModal = document.getElementById("textModal");
const addTextBtn = document.getElementById("addText");
const textInput = document.getElementById("textValue");

let textLayers = [];


textBtn.addEventListener("click", () => {
  textModal.style.display = "flex";
});

textModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("closeModal") || e.target === textModal) {
    textModal.style.display = "none";
  }
});


addTextBtn.onclick = () => {
  const value = textInput.value.trim();
  if (!value) return;

  textLayers.push({
    text: value,
    x: 100,
    y: 100
  });

  textInput.value = "";
};


