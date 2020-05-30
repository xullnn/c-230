// function get(url) { // return a promise obj
//
//   return new Promise(function(resolve, reject) {
//     // do the normal xhr stuff
//     let req = new XMLHttpRequest();
//     req.open('GET', url);
//
//     // when response loaded
//     req.onload = function() { // equal to req.addEventlistener('load', callback)
//       if (req.status == 200) {
//         resolve(req.response);
//       } else { // not error just not successful
//         reject(Error(req.statusText));
//       }
//     };
//
//     // attach another event listener to handle xhr error
//     req.onerror = function() {
//       reject(Error('Network Error'));
//     };
//
//     req.send();
//   });
// };

function fakeGet() {
  let promise = new Promise((success, failure) => {
    return success(JSON.stringify(data));
  })
  return promise;
}

// get('story.json').then(function(response) { // chain the promise with then(), use the promise
//   console.log('Success!', response);
// }, function(error) {
//   console.error('Failed!', error);
// });

// if we want to get a json format response:

// get('story.json').then(JSON.parse(res))
//                  .then(function(jsonRes) { console.log(jsonRes) });
// it can be further simplified as

// fakeGet().then(JSON.parse)
//          .then(console.log);
// if the value we pass to `then()` is not a function
// JavaScript will wrap that value to form an identity function
  // mathly f(x) = x;
  // programly (x) => return x;
function getJSON() {
  return fakeGet().then(JSON.parse).then(console.log);
};

// Loop through our chapter urls
story.chapterUrls.reduce((sequence, chapterUrl) => {
  sequence.then(() => getJSON(chapterUrl))
          .then(renderToPage)
}, Promise.resolve())

//


Promise.all(story.chapterUrls.map(getJSON)).then(renderAllTopage);

//

story.chapterUrls.map(getJSON).reduce((sequence, chapterPromise) => {
  // Use reduce to chain the promises together,
  // adding content to the page for each chapter
  return sequence.then(() => chapterPromise).then(renderToPage);
}, Promise.resolve());
