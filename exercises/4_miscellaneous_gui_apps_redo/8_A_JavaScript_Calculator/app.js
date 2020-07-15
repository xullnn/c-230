var expression = '';

var Calculator = (function() {
  var result,
      currentInput,
      afterEvaluation = false;

  var nextAllows = {
    initial: ['numbers', 'neg_sign'],
    numbers: ['numbers', 'operators', 'equal_sign', 'clear_all', 'clear_entry'],
    operators: ['numbers', 'operators', 'clear_all', 'clear_entry', 'neg_sign'],
    neg_sign: ['numbers', 'clear_all', 'clear_entry'],
  };

  function drawTheCalculator() {
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
    class_list.forEach(class_name => {
      $('.' + class_name).on('click', 'p', eval('handle' + capitalize(class_name)));
    });
  };

  function handleNumbers(event) {
    var currentInput = $(event.currentTarget).text().trim();
    var className = $(event.currentTarget).closest('div').attr('class');
    if (afterEvaluation) expression = ''; // if a number is pressed right after `=` operation
    if (lastEntry().match(/[\dNEG]/)) {
      expression += currentInput;
    } else {
      expression += (' ' + currentInput);
    };
    renderExpression();
    $('#panel *').off();
    turnOnValid(nextAllows[className]);
    afterEvaluation = false;
  };

  function handleNeg_sign(event) {
    var currentInput = $(event.currentTarget).text().trim();
    var className = $(event.currentTarget).closest('div').attr('class');
    if (afterEvaluation) expression = ''; // if NEG is pressed right after `=` operation
    expression += (' ' + currentInput);
    renderExpression()
    $('#panel *').off();
    turnOnValid(nextAllows[className]);
    afterEvaluation = false;
  };

  function handleOperators(event) {
    var currentInput = $(event.currentTarget).text().trim();
    var className = $(event.currentTarget).closest('div').attr('class');
    if (lastEntry().match(/[\+\-\*\/\%]$/)) {
      expression = expression.replace(/[\+\-\*\/\%]$/, currentInput);
    } else {
      expression += (' ' + currentInput);
    };
    renderExpression()
    $('#panel *').off();
    turnOnValid(nextAllows[className]);
    afterEvaluation = false;
  };

  function handleClear_all(event) {
    expression = '';
    result = undefined;
    $('#panel *').off();
    turnOnValid(nextAllows['initial']);
    renderExpression()
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
    renderExpression()
    result = eval(expression);
    expression = String(result);
    renderResult(result)
    afterEvaluation = true;
    console.log(result);
  };

  function renderResult(result) {
    $('#result').text(result);
  };

  function renderExpression() {
    $('#expression').text(expression);
    $('#result').text('');
  };


drawTheCalculator();

return {
  init: function() {
    turnOnValid(nextAllows['initial']);
  },
}
})();

Calculator.init();
