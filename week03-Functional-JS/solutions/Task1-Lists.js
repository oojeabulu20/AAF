/* Task 1
Create an array of names. Use the Array types list comprehensions to
Return only those with more than six characters.
Return the length of the longest item in the array.
Return all array items converted to lowercase.
Return all items reversed so that “Fred” becomes “derF”.
*/


let names =["Ben", " Jones", "Riyadh", "Hussein","Sam", "Robertson-Chamberlain", "Francis", "Mendoza", "Louise Macdonald","Zachary Akerman", "Kostas Stavropoulos", "Anna Ivanovic", "Tasleem Khan", "Mounika Sharma", "Dianne Ameter"];


console.log("*** Return only those with more than six characters.");
console.log("--forEach");
names.forEach(element => {
    if (element.length > 6) 
        console.log(element);
    }
);

console.log("--filter");
var greaterThan6 = names.filter(function(it) {
        return it.length > 6;
    }
);
greaterThan6.map(function (it) {
        console.log(it);
    }
);


console.log("*** Return the length of the longest item in the array.");
var longest = names.reduce(function(a, b) { 
    return a.length > b.length ? a : b;
  }
);
console.log("The longest is " + longest.length);
  

console.log("*** Return all array items converted to lowercase.");
names.forEach(element =>{
      console.log(element.toLowerCase());
    }
);


console.log("*** Return all items reversed so that “Fred” becomes “derF”.");
names.forEach(element =>{
    let arr=element.split("");
    arr.reverse();
    element = arr.join("");
    console.log(element)
});
