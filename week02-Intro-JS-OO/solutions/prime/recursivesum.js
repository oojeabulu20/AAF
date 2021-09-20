//A recursive problem that is not in the lab

//This is a simple funciton to find the sum of integers from 1 to a given value.

let sum = function (t) {
    let summer = function(t, n) {
        //console.log(t + " " + n)
        if (n > t) {
            return 0;
        } else {
            return (n + (summer(t, (n + 1))))
        }
    }
    return summer(t, 1)
 }
 
 console.log("the sum is "+ sum(5))