```js
function Question(fieldset) {
  this.fieldset = fieldset;
  this.msgElement = fieldset.querySelector('p.message');
  this.labels = [...fieldset.querySelectorAll('label')];
}

function renderQuestions() {
  questions.forEach(question => {
    $('form').prepend(questionTemplate(question))
  })
};

Question.prototype.checkState = function() {
  let id = this.fieldset.id,
      checkedInput = this.field.querySelector('input:checked');

  if (checkedInput === null) return 'unchecked';

  let checkedValue = checkedInput.value,

  if (checkedValue === this.getAnswer()) return 'correct';
  return 'incorrect';
};

Question.prototype.renderMsg = function() {
  let state = this.checkState(),
      text;

  if (state === 'unchecked') text = 'Unchecked: ';
  if (state === 'incorrect') text = 'Incorrect: ';
  if (state === 'correct') {
    text = 'Correct: ';
    this.msgElement.classList.add('correct_message')
  }

  this.msgElement.textContent = text + 'the correct answer is ' + this.getAnswer();
  this.msgElement.style.display = 'block';
};


Question.prototype.getAnswer() = function() {
  return answerKey[String(this.fieldset.id)];
};

Question.prototype.resetFieldset = function() {
  this.msgElement.style.display = "none"
  this.msgElement.classList.remove("correct_message")
  this.labels.forEach(label => label.style.color = 'black');
};

```
