var Calculator = (function() {
  var result,
      currentInput,
      className,
      afterEvaluation = false,
      expression = '';

  // mapping relationships that indicate after each user input, what is allowed at next input
  // invalid inputs will be blocked so users can't form an invalid math expression
  var nextAllows = {
    initial: ['numbers', 'neg_sign'],
    numbers: ['numbers', 'operators', 'equal_sign', 'clear_all', 'clear_entry'],
    operators: ['numbers', 'operators', 'clear_all', 'clear_entry', 'neg_sign'],
    neg_sign: ['numbers', 'clear_all', 'clear_entry'],
    after_evaluation: ['neg_sign', 'numbers', 'operators', 'equal_sign', 'clear_all', 'clear_entry']
  };

  function drawNumbers() {
    var numbers = [0,1,2,3,4,5,6,7,8,9].map(function(n) { return {value: n}});
    var numberTemplate = Handlebars.compile($('#number_template').html());
    $('#numbers').append(numberTemplate({numbers: numbers}));
  };

  function lastEntry() {
    var entry = expression.split(/\s/).slice().pop();
    return entry ? entry : '';
  };

  function capitalize(str) { return str[0].toUpperCase() + str.slice(1) };

  function turnOnValid(class_list) {
    $('#panel *').off();
    class_list.forEach(class_name => {
      $('.' + class_name).on('click', 'p', eval('handle' + capitalize(class_name)));
    });
  };

  function updateCurrentInputAndClassName(event) {
    className = $(event.currentTarget).closest('div').attr('class');
    currentInput = $(event.currentTarget).text().trim();
  };

  function handleNumbers(event) {
    updateCurrentInputAndClassName(event);
    if (afterEvaluation) expression = ''; // if a number is pressed right after `=` operation
    if (lastEntry().match(/[\dNEG]/)) {
      expression += currentInput;
    } else {
      expression += (' ' + currentInput);
    };
    renderExpression();
    turnOnValid(nextAllows[className]);
    afterEvaluation = false;
  };

  function handleNeg_sign(event) {
    updateCurrentInputAndClassName(event);
    if (afterEvaluation) expression = ''; // if NEG is pressed right after `=` operation
    expression += (' ' + currentInput);
    renderExpression()
    turnOnValid(nextAllows[className]);
    afterEvaluation = false;
  };

  function handleOperators(event) {
    updateCurrentInputAndClassName(event);
    if (lastEntry().match(/[\+\-\*\/\%]$/)) {
      expression = expression.replace(/[\+\-\*\/\%]$/, currentInput);
    } else {
      expression += (' ' + currentInput);
    };
    renderExpression()
    turnOnValid(nextAllows[className]);
    afterEvaluation = false;
  };

  function handleClear_all(event) {
    expression = '';
    result = undefined;
    turnOnValid(nextAllows['initial']);
    renderExpression();
  };

  function handleClear_entry(event) {
    var fragments = expression.split(/\s/)
    fragments.pop();
    expression = fragments.join(' ');
    renderExpression()
    afterEvaluation = false;
  };

  function handleEqual_sign(event) {
    expression = expression.replace(/NEG/g, '-');
    renderExpression();
    turnOnValid(nextAllows['after_evaluation']);
    result = eval(expression);
    expression = String(result);
    renderResult(result);
    afterEvaluation = true;
  };

  function renderResult(result) {
    $('#result').text(result);
  };

  function renderExpression() {
    $('#expression').text(expression);
    $('#result').text('');
  };

return {
  init: function() {
    drawNumbers();
    turnOnValid(nextAllows['initial']);
  },
}
})();

Calculator.init();
