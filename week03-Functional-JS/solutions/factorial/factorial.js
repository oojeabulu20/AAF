function factorial(num) {

    //invalid input.
    if (num < 0 )
        return -1;

    //return 1 if input is 0.
    if (num == 0)
        return 1;
    else {
        return (num * factorial(num-1));
    }
}

console.log(factorial(3));