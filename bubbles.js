(() => {
  const layer = document.querySelector(".bubble-layer");
  if (!layer) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  if (reduceMotion?.matches) return;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (values) => values[Math.floor(Math.random() * values.length)];

  const createBubble = () => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.round(rand(14, 110));
    const left = rand(-5, 105);
    const duration = rand(6.0, 15.5);
    const drift = rand(-80, 80);
    const travel = rand(105, 150);
    const opacity = rand(0.22, 0.62);

    bubble.style.setProperty("--size", `${size}px`);
    bubble.style.setProperty("--left", `${left}%`);
    bubble.style.setProperty("--duration", `${duration}s`);
    bubble.style.setProperty("--drift", `${drift}px`);
    bubble.style.setProperty("--travel", `${travel}vh`);
    bubble.style.setProperty("--opacity", opacity.toFixed(2));

    bubble.style.animationDelay = `${rand(0, 0.9)}s, ${pick([0, 0.2, 0.35, 0.5])}s`;

    layer.appendChild(bubble);
    bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
  };

  const scheduleNext = () => {
    const delay = Math.round(rand(90, 360));
    window.setTimeout(() => {
      const burst = Math.random() < 0.22 ? Math.round(rand(2, 6)) : 1;
      for (let i = 0; i < burst; i += 1) createBubble();
      scheduleNext();
    }, delay);
  };

  for (let i = 0; i < 14; i += 1) createBubble();
  scheduleNext();

  reduceMotion?.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    layer.replaceChildren();
  });
})();

