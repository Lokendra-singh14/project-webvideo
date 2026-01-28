exportBtn.addEventListener("click", () => {
  if (!video.src) {
    alert("Upload a video first");
    return;
  }

  isExporting = true;

  const prevTime = video.currentTime;
  const prevPaused = video.paused;

  video.pause();
  video.currentTime = 0;

  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  const chunks = [];

  recorder.ondataavailable = e => e.data.size && chunks.push(e.data);

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "MediaCut_export.webm";
    a.click();
    URL.revokeObjectURL(url);

    isExporting = false;
    video.pause();
    video.currentTime = prevTime;

    if (!prevPaused) {
      playVideo();
    }
  };

  recorder.start();

  function exportLoop() {
    if (!isExporting) return;
    renderFrame();
    requestAnimationFrame(exportLoop);
  }

  video.play();     
  exportLoop();

  video.onended = () => {
    recorder.stop();
    video.onended = null;
  };
});