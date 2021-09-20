/*
Implement the dice rolling program from the lecture slides. Write controlling code such that dice may only have 4, 6, 8, 10, 12 or 20 sides. Your code should be able to display the individual dice or the total rolled. The user should be able to choose between these options. Test that you can:
a. Create arbitrary numbers of dice of each type
b. Combinations of dice in a single roll such as 3 six-sided and 2 twenty-sided
*/

function roll(sides) {
    return Math.ceil( Math.random() * sides);
};

function dice(sides) {
    return function() {
        return roll(sides);
    };
};

let d6 = dice(6);
console.log("d6: " + d6());

let d20 = dice(20);
console.log( "sum: " + d20() + dice(10)() );

var validSides = [4, 6, 8, 10, 12, 20];
