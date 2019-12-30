What are needed for each input field?

- First Name
- Last Name
- Email
- Password
- Phone

```html
  <div class="input_field">
    <label for="{{name}}">{{label}}</label>
    <input type="{{type}}" name="{{name}}" placeholder="{{label}}">
    <p class="rule_explanations">{{rule_description}}</p>
  </div>
```

Array for generating template:

[
  {name: 'first_name', type: 'text',label: 'First Name', val_regex: /^[a-z]{2,20}$/i, rule_description: 'Required, must be longer than 2 chars'},

  {name: 'last_name', type: 'text',label: 'Last Name', val_regex: /^[a-z]{2,20}$/i, rule_description: 'Required, must be longer than 2 chars'},

  {name: 'email', type: 'email',label: 'Email', val_regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, rule_description: 'Required, must be a valid email address'},

  {name: 'password', type: 'password',label: 'Password', val_regex: /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])\d+.*$/, rule_description: 'Required, any string of at least 6 characters that contains at least one lowercase and one uppercase and one number'},

  {name: 'phone', type: 'tel',label: 'Phone(optional)', val_regex: /^\d{6,20}$/, rule_description: 'Optional, but must be a valid phone number.'},
]

- initially disable submit button

- Bind 'blur' event to all inputs area
  - get the name of that area `name`
  - find the rule in data, test the input
    - if matched: blue border, make description green
    - if unmatched: red border, make description red

When to reenable submit button?



References:

- password regex: https://stackoverflow.com/questions/10557441/regex-to-allow-atleast-one-special-character-one-uppercase-one-lowercasein-an

- email regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
