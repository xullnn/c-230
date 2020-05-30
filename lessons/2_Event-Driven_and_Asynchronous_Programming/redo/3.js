let id;

function startCounting() {
  let i = 1;
  id = setInterval(function() {
    console.log(i);
    i += 1;
  }, 1000)
};

function stopCounting() {
  clearInterval(id);
}

startCounting();
