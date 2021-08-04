let countChange = function(amount) {
    let firstDenomination = function (kindOfCoins) {
        let values = [1, 5, 10, 25, 50];
        return values[kindOfCoins - 1];
    }
   
    let cc = function(amt, kind) {
        let count = 0;
 
        if (amt == 0) {
            count = 1;
        } else if (amt < 0) {
            count = 0;
        } else if (kind == 0) {
            count = 0;
        } else {
            count = cc(amt, kind-1) + cc((amt - firstDenomination(kind)), kind)
        }
        return count
       
    } // cc
   
    return cc(amount, 5)
 } // countChange
 
 console.log(countChange(83))