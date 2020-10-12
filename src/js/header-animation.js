const header = document.getElementById('header');

const pos = { x: header.offsetLeft, y: header.offsetTop };
const delta = { x: 100, y: 50 };

const duration = 2000; // milliseconds
let animationStart = new Date().valueOf();

const animate = () => {
  const ellapased = new Date().valueOf() - animationStart;
  const completion = ellapased / duration;

  if (completion < 1) {
    const newPos = {
      x: pos.x + delta.x * completion,
      y: pos.y + delta.y * completion,
    };

    header.style.left = newPos.x;
    header.style.top = newPos.y;

    requestAnimationFrame(animate);
  }
};

requestAnimationFrame(animate);
