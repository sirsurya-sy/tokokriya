(() => {
  const loadingKey = "tk:loading:completed:v1";
  let shouldShow = false;

  try {
    shouldShow = sessionStorage.getItem(loadingKey) !== "1";
  } catch {
    return;
  }

  if (!shouldShow) return;

  const root = document.documentElement;
  const body = document.body;
  root.dataset.sessionLoading = "1";
  body.classList.add("is-session-loading");

  const overlay = document.createElement("div");
  overlay.id = "site-loading";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.innerHTML = `
    <div class="site-loading-content">
      <div class="site-loading-brand">Toko<span>Kriya</span></div>
      <div class="site-loading-track" aria-hidden="true">
        <div class="site-loading-progress"></div>
      </div>
      <div class="site-loading-percent">0%</div>
    </div>`;
  body.prepend(overlay);

  const progressBar = overlay.querySelector(".site-loading-progress");
  const percentLabel = overlay.querySelector(".site-loading-percent");
  const duration = 1800;
  const start = performance.now();

  function updateProgress(now) {
    const linearProgress = Math.min((now - start) / duration, 1);
    const easedProgress = 1 - (1 - linearProgress) ** 2;
    const percent = Math.round(easedProgress * 100);
    progressBar.style.width = `${percent}%`;
    percentLabel.textContent = `${percent}%`;

    if (linearProgress < 1) {
      requestAnimationFrame(updateProgress);
      return;
    }

    try {
      sessionStorage.setItem(loadingKey, "1");
    } catch {}

    overlay.classList.add("is-fading");
    window.setTimeout(() => {
      overlay.remove();
      body.classList.remove("is-session-loading");
      delete root.dataset.sessionLoading;
    }, 440);
  }

  requestAnimationFrame(updateProgress);
})();
