let p;
document.addEventListener('DOMContentLoaded', function() {
  p = document.querySelector('p');

  // console.log(p);
  // console.dir(p);
})


console.log('%c I am some great text', 'font-size: 50px; background: green; text-shadow: 4px 4px 0 blue');

console.warn("OH NO")

console.error('Shit!')

console.info('This is some information')

console.assert(1 === 2, 'That is wrong')

// console.clear();

console.groupCollapsed();
console.log(1)
console.log(2)
console.log(3)
console.groupEnd();

console.count('Wes'); // 1
console.count('Wes'); // 2
console.count('Wes'); // 3

console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
    console.timeEnd('fetching data'); // counting ends here
    console.log(data);
    });
