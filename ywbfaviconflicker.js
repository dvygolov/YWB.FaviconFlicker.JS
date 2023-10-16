document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.createElement("canvas");
  canvas.width = 64; // You can adjust the size
  canvas.height = 64;

  const ctx = canvas.getContext("2d");
  let flickerInterval;

  function drawOriginalFavicon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a red circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 2; // little padding from the edges

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();

    // Draw the number '1' in the middle
    ctx.font = "bold 36px Arial"; // adjust font size and type if needed
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1", centerX, centerY);
  }

  function drawBlankFavicon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function setFavicon() {
    const link = document.querySelector('link[rel="shortcut icon"]');
    if (!link) {
      const newLink = document.createElement("link");
      newLink.type = "image/x-icon";
      newLink.rel = "shortcut icon";
      document.getElementsByTagName("head")[0].appendChild(newLink);
      return newLink;
    }
    return link;
  }

  function startFlickering() {
    let visible = true;
    flickerInterval = setInterval(function() {
      if (visible) {
        drawBlankFavicon();
      } else {
        drawOriginalFavicon();
      }
      setFavicon().href = canvas.toDataURL("image/x-icon");
      visible = !visible;
    }, 1000);
  }

  function stopFlickering() {
    clearInterval(flickerInterval);
    drawOriginalFavicon();
    setFavicon().href = canvas.toDataURL("image/x-icon");
  }

  // Initially, draw the original favicon
  drawOriginalFavicon();
  setFavicon().href = canvas.toDataURL("image/x-icon");

  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      startFlickering();
    } else {
      stopFlickering();
    }
  });
});
