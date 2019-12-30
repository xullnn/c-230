Instead of attaching callbacks on `blur` event, I attach event on `keyup` event. I also add another event listener to detect whether all input fields get correct values, if they do, the `submit` button will be enabled, which is initially disabled.

I struggled a bit about the `phone` field, I wanted it to be either empty or a 6+ numbers, at the end I use this regex: `/^(\d{6,20}|.{0})$/`. I also additionally attached a `click` event listener on `phone` field, then as soon as the user clicks the input frame, the hint becomes green, so user knows empty value is also valid.
