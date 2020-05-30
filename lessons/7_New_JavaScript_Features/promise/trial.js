// Type along with:
// https://developers.google.com/web/fundamentals/primers/promises

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() { // when request completes
      if(req.status === 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject
        reject(Error(req.statusText));
      }
    }; // onload ends

    req.onerror = function() { // when any error happens
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  }) // promise constructed
}; // This `get` function returns a promise object, if this function call is
   // chained with another `then` call, the new `then` will wait(not execute)
   // until the promise returned by the first `get` call is settled(either
   // resolved or rejected).

// simple case

get('story.json') // returns a promise
.then( // then() takes two callbacks, one for `resolve` one for `reject`
  function(response) {
    console.log('Success' response);
  },
  function(error) {
    console.log('Failed', error);
  }
);

// chaining

var promise = new Promise(function(resolve, reject) {
  resolve(1);
});

promise.then(function(val) {
  console.log(val);
  return val + 2;  // this new value is passed to the next chained then()
}).then(function(newVal) {
  console.log(newVal);
});

// turn response text into JSON format inside promise

get('story.json').then(function(response) {
  return JSON.parse(response);
}).then(function(JSONresponse) {
  console.log('Yey, JSON!', response);
});

// shortcut syntax

get('story.json')
  .then(JSON.parse) // shortcut syntax since JSON.parse only takes one arg
  .then(function(JSONresponse) {
    console.log('Yey, JSON!', response);
  });

// make a helper function to convert response text into json format
// utilize `get(url)`

function getJSON(url) {  // returns a promise, not pure data
  return get(url).then(JSON.parse);
};

// latter `then`s wait for previous `then`s to complete

getJSON('story.json')
  .then(function(story) {
    return getJSON(story.chapterUrls[0]);
  })
  .then(function(chapter1) { // this `then` won't be executed if the first `then` is not finished
    console.log("Got chapter 1!", chapter1);
  })

// get whole `story.json`
  // get first chapter's url
    // fetch chapter 1

var storyPromise; // global level so once get `story.json`, it need not to be load again

function getChapter(i) {
  storyPromise = storyPromise || getJSON('story.json'); // only load for once

  return storyPromise.then(function(story) {
    return getJSON(story.chapterUrls[i]);
  }) // return a nested then, which returns another promise
};

getChapter(0) // remember this returns promise which will pass fetched chapteri to the next then
  .then(function(chapter) {
    console.log(chapter);
    return getChapter(1); // pass to the next then
  })
  .then(function(chapter1) {
    console.log(chapter1);
})

// We only played with success callback(the resolve branch), now reject is coming
// Error handling

get('story.json') // return promise with fetched data being passed to next thenable
  .then(
    function(response) {},
    function(error) {} // this is for failure
  );

// or use catch

get('story.json')
  .then(
    function(response) {};
  )
  .catch(function(error) {}
);

// `catch()` is not special, it's just sugar

get('story.json')
.then(
  function(response) {}
)
.then(
  undefined,  // place holder success callback
  function(error) {}
)

// Javascript execptions and promises
// Rejection can be caused by:
  // - explicitly rejecting
  // - error throwing (implicitly)

var jsonPromise = new Promise(function(resolve, reject) {
  resolve(JSON.parse('This is not JSON'));
  // no `reject` hrere, so a chained `catch()` can catch the error
});

jsonPromise.then(
  function(data) {
    // this never happens
  }
).catch(
  function(error) {
    // it gose here
  }
);

// Errors can also be caused inside a `then()`

// So it's better to write `reject` in Promise constrcutor

// Put it into place

getJSON('story.json')
.then(function(story) {
  return getJSON(story.chapterUrls[0]);
})
.then(function(chapter1) {
  addHtmlPage(chapter1.html);
})
.catch(function() {
  addTextToPage('Failed to show chapter');
})
.then(function() {
  document.querySelector('.spinner').style.display = 'none';
});

// the above is a non-blocking async version of:

try {
  var story = getJSONSync('story.json');
  var chapter1 = getJSONSync(story.chapterUrls[0]);
  addHtmlToPage(chapter1.html);
} catch(e) {
  addTextToPage('Failed to show chapter')
}

document.querySelector('.spinner').style.display = 'none';

// `catch` error only for logging purpose without recovering operation

function getJSON(url) {
  return get(url).then(JSON.parse).catch(function(err) {
    console.log('getJSON failed for ', url, err);
    throw err;
  });
};

// So far we just get the first chapter, now we want them all.

// task in sync version
try {
  var story = getJSONSync('story.json');
  addHtmlToPage(story.heading);

  story.chapterUrls.forEach(function(chapterUrl) {
    var chapter = getJSONSync(chapterUrl);
    addHtmlToPage(chapter.html);
  });

  addTextToPage('All done');
} catch(err) {
  addTextToPage('Argh, broken: ' + err.message);
}

document.querySelector('.spinner').style.display = 'none';

// async version with then()
// make things happen one after another

getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);
}).then(function() {
  addTextToPage('All done');
}).catch(function(err) {
  addTextToPage('Argh, broken: ' + err.message);
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
});

// How to loop through chapter urls and fetch them in order
// A not-working version by using forEach

story.chapterUrls.forEach(function(chapterUrl) {
  // fetch each chapter
  getJSON(chapterUrl).then(function(chapter) {
    // inserting
    addHtmlToPage(chapter.html);
  });
})

// `forEach` isn't async-aware, so chapters would appear in whatever order they
// download

var sequence = Promise.resolve(); // returns a promise alwasy `resolve`s

stroy.chapterUrls.forEach((function(chapterUrl) {
  sequence = sequence.then(function() {
    return getJSON(chapterUrl);
  }).then(function(chapter) {
    addHtmlToPage(chapter.html);
  })
}))

// revise with array.reduce

story.chapterUrls.reduce(function(sequence, chapterUrl) {
  return sequence.then(function() {
    return getJSON(chapterUrl);
  }).then(function(chapter) {
    addHtmlToPage(chapter.html)
  })
}, Promise.resolve());

// Put it together

getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);

  return story.chapterUrls.reduce(function(sequence, chapterUrl) {
    return sequence.then(function() {
      return getJSON(chapterUrl);
    }).then(function(chapter) {
      addHtmlToPage(chapter.html);
    });
  }, Promise.resolove());
}).then(function() {
  addTextToPage('All done');
}).catch(function(err) {
  addTextToPage('Argh, broken: ' + err.message);
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
});

// getJSON pass data to next thenable
// function getJSON(url) {  // returns a promise, not pure data
//   return get(url).then(JSON.parse);
// };

getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);

  // take an array of promises and wait on them all
  return Promise.all(
    // map our array of chapter urls to an array of chapter json promises
    story.chapterUrls.map(getJSON); // get array of thenables
  );
}).then(function(chapters) {
  chapters.forEach(function(chapter) {
    addHtmlToPage(chapter.html);
  });
  addTextToPage('All done');
}).catch(function(err) {
  addTextToPage('Argh, broken: ' + err.message);
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
});

getJSON('story.json')
.then(function(story) {
  addHtmlToPage(story.heading); // add titles

  // Map array of chapter urls to array of chapter json promises.
  // This makes sure they all download in parallel??????
  return story.chapterUrls
    .map(getJSON) // array of `then`s
    .reduce(function(sequence, chapterPromise) {
      // Use reduce to chain the promises together,
      // adding content to the page for each chapter
      return sequence.then(function() {
        return chapterPromise; // a promise passing to chained then
      }).then(function(chapter) { // wait until pre then fulfilled
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve());
})

.then(function() {
  addTextToPage('All done');
}).catch(function(err) {
  // handle error
}).then(function() {
  // hide spinner
})


//

// a handler in then()
// returns another pending promise object, the resolution/rejection of the
// promise returned by then will be subsequent to the resolution/rejection
// of the promise returned by the handler. Also, the resolved value of the
// promise returned by then will be the same as the resolved value of the
// promise returned by the handler.
