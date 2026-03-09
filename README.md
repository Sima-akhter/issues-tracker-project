
1️ What is the difference between var, let, and const?

Ans : var: function-scoped, can be redeclared

let: block-scoped, can reassign

const: block-scoped, cannot reassign

2️ What is the spread operator (...)?

Ans : Expands arrays or objects into individual elements

3️ What is the difference between map(), filter(), and forEach()?

Ans : map(): returns new array after transformation

filter(): returns new array with elements passing condition

forEach(): loops over array, no return

4️ What is an Arrow Function?

Ans: A concise way to write functions in JavaScript.

Works like a regular function but doesn’t use the function keyword.

Example:

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

Advantages: shorter syntax and automatically binds this from the surrounding context.

5️ What are Template Literals?

Ans : Strings written using backticks ` instead of single or double quotes.

Use ${} to embed variables or expressions directly into the string.

Example:

const name = "Sima";
console.log(`Hello ${name}, welcome!`);