When using keyboard events, we may change thinking granularity. Matching text content in an input field against the regex in `pattern` is actually matching the whole text. In this case we need to handle one character at a time. So we can't directly apply the regex in `pattern` attribute to test single `key`.

For example `pattern="[a-zA-Z]{2,20}"` treats a single alphabetical char as invalid(due to the quantifier), so we can't use this criterion for blocking user input. If we want to prevent typing things other than alphabetical chars we could use `/[^a-z]/i`.

---
