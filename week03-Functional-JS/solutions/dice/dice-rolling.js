/*
Implement the dice rolling program from the lecture slides. Write controlling code such that dice may only have 4, 6, 8, 10, 12 or 20 sides. 
Your code should be able to display the individual dice or the total rolled. The user should be able to choose between these options. Test that you can  

1. Create arbitrary numbers of dice of each type 
2. Combinations of dice in a single roll such as 3 six-sided and 2 twenty-sided 

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

function dicex(sides) {
    return function(qty) {
        return roll(sides) * qty;
    }
}

//d3x3 sets the first parameter (sides) to 3
let d3x3 = dicex(3);

//This call sets the second parameter (qty) to 2
console.log(d3x3(2));

var validSides = [4, 6, 8, 10, 12, 20];
