module.exports = function countdown(tick) {
  let count = 10;

  let timer = setInterval(() => {
    tick(count--);
    if (count === 0) {
      clearInterval(timer);
    }
    console.log("count", count);
  }, 1000);
};
