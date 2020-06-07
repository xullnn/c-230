function debounce(callback, delay) {
  let timeoutID;

  return function() {
    if (timeoutID) {
      timeoutID = setTimeout(callback, delay)
    } else {
      callback.apply(null, arguments);
    }

  }
}

// function debounce(func, wait = 20, immediate = true) {
//   var timeout;
//   return function() {
//     var context = this,
//       args = arguments;
//     var later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }


// document.addEventListener('DOMContentLoaded', function() {
//   let sliderImages = document.querySelectorAll('.slide-in');
//
//   function checkSlide() {
//     sliderImages.forEach(sliderImage => {
//       // half way through the image
//       let isHalfShown = (window.scrollY + window.innerHeight) >
//                         (sliderImage.offsetTop + sliderImage.height / 2);
//
//       // bottom of the image
//       let imageBottom = sliderImage.offsetTop + sliderImage.height;
//       let isNotScrolledPast = window.scrollY < imageBottom;
//
//       // if more than half is over the scroll view and
//       // it hasn't scrolled out of view
//       if (isHalfShown && isNotScrolledPast) {
//         sliderImage.classList.add('active');
//       } else {
//         sliderImage.classList.remove('active')
//       }
//     })
//   }
//
//   window.addEventListener('scroll', debounce(checkSlide, 20));
// })

//

document.addEventListener('DOMContentLoaded', function() {
  let sliderImages = document.querySelectorAll('.slide-in');

  function checkSlide() {
    sliderImages.forEach(sliderImage => {
      // half way through the image
      let halfImageHeight = sliderImage.offsetTop + sliderImage.height / 2,
          bottomImageHeight = sliderImage.offsetTop + sliderImage.height,
          bottomOfView = window.scrollY + window.innerHeight;

      // if more than half is over the scroll view and
      // it hasn't scrolled out of view
      if (halfImageHeight > bottomOfView || bottomImageHeight < window.scrollY) {
        sliderImage.classList.remove('active');
      } else {
        sliderImage.classList.add('active')
      }
    })
  }

  window.addEventListener('scroll', debounce(checkSlide, 20));
})
