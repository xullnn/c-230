Account = (function (){
  const INVALID_PASSWORD_MESSAGE = 'Invalid Password';

  function validPassword(inputPassword, userPassword) {
    return userPassword === inputPassword;
  }

  function returnUserValue(inputPassword, userPassword, userValue) {
    if (validPassword(inputPassword, userPassword)) {
      return userValue;
    } else {
      return INVALID_PASSWORD_MESSAGE;
    }
  }

  function randomLetter() {
    index = Math.floor(Math.random() * 62);
    return 'abcdefghijklmnopqrstuvdxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[index];
  }

  function anonymize(){
    let randomString = '';
    for (let i = 0; i < 16; i += 1) {
      randomString += randomLetter();
    }
    return randomString;
  }

  return {
    init: function(email, password, firstName, lastName){
      let userEmail = email;
      let userPassword = password;
      let userFirstName = firstName;
      let userLastName = lastName;
      this.displayName = anonymize();

      this.reanonymize = function(inputPassword) {
        if (validPassword(inputPassword, userPassword)) {
          this.displayName = anonymize();
          return true;
        } else {
          return INVALID_PASSWORD_MESSAGE;
        }
      }

      this.resetPassword = function(currentPassword, newPassword) {
        if (validPassword(currentPassword, userPassword) && (typeof newPassword === 'string')) {
          userPassword = newPassword;
          return true;
        } else {
          return INVALID_PASSWORD_MESSAGE;
        }
      }

      this.firstName = function(inputPassword) {
        return returnUserValue(inputPassword, userPassword, userFirstName);
      }

      this.lastName = function(inputPassword) {
        return returnUserValue(inputPassword, userPassword, userLastName);
      }

      this.email = function(inputPassword) {
        return returnUserValue(inputPassword, userPassword, userEmail);
      }

      return this;
    }
  }
})();
