  function splitExpr(expression, operator) {
    const result = [];
    let braces = 0;
    let currentChunk = "";
    
    // цикл на перебор символов в строке expression
    for (let i = 0; i < expression.length; ++i) {
      // берем символ строки expression для текущей итерации цикла
      const currentSymbol = expression[i];
      
      // проверяем полученный символ currentSymbol на наличие открытой или закрытой скобки
      if (currentSymbol == '(') {
        braces++;
      } else if (currentSymbol == ')') {
        braces--;
      }
      
      // проверяем кол-во найденных скобок на 0, и проверяем текущий символ цикла на переданный оператор operator
      if (braces == 0 && operator == currentSymbol) {
        result.push(currentChunk);
        currentChunk = "";
      } else {
        currentChunk = currentChunk + currentSymbol;
      }
    }
    
    if (braces !== 0) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
    
    if (currentChunk != "") {
      result.push(currentChunk);
    }
    return result;
  }
  
  // PARSING FUNCTIONS
  
  function parseSum(expr) {
    const numbersString = splitExpr(expr, '+');
    const numerics = numbersString.map(function (item) { return parseSubtraction(item) });
    
    const result = sum(numerics);
    return result;
  }
  
  function parseSubtraction(expr) {
    const numbersString = splitExpr(expr, '-');
    let numerics = numbersString.map((item) => parseMultiplication(item));
    
    const result = subtraction(numerics);
    return result;
  }
  
  function parseMultiplication(expr) {
    const numbersString = splitExpr(expr, '*');
    let numerics = numbersString.map((item) => parseDivision(item));
    
    const result = multiplication(numerics);
    return result;
  }
  
  function parseDivision(expr) {
    const numbersString = splitExpr(expr, '/');
    const numerics = numbersString.map((item) => {
      // console.log(item[0]);
       if (item[0] == '(') {
        // обрезаем у выражения первую и последнюю скобку
        const tempExpression = item.substr(1, item.length - 2);
        
        // recursive call to the main function
        return parseSum(tempExpression);
      }
      return +item;
    });
    
    
    const result = division(numerics);
    return result;
  }
  
  // CALCULATING FUNCTIONS
  function subtraction(nums){
    return nums.reduce((accumulator, currentValue) => {
      return accumulator - currentValue
    });
  }
  
  function sum(nums){
    return nums.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    });
  }
  function multiplication(nums){
    return nums.reduce((accumulator, currentValue) => {
      return accumulator * currentValue
    });
  }
  function division(nums){
    return nums.reduce((accumulator, currentValue) => {
      if (currentValue === 0) {
        // throw "TypeError: Division by zero.";
        throw new Error("TypeError: Division by zero.");
      }
      return accumulator / currentValue
    });
  }
  
  function expressionCalculator(expression)  {
    let result = 0;
    
    // строка может содержать пробел, надо его уДалить
    // нужно регулярное выражение 
    expression = expression.replace(/\s/g, '');
    
    result = parseSum(expression);
    
    return result;
  }


module.exports = {
  expressionCalculator
};