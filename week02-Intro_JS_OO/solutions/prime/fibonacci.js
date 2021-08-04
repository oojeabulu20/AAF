//Find a value within the Fibonacci sequence

let fib = function(n) {
   switch (n) {
       case 0: return 0;
       case 1: return 1;
       case 2: return 1;
       default: return ( fib(n - 2) + fib(n - 1) )
   }
}

console.log( fib(6) )