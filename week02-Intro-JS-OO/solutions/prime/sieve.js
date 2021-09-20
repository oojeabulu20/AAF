// The Sieve of Eratosthenes
let sieve = function(t) {
    let result = [1, 2];
    let potentials = [...Array(t).keys()].slice(3)
 
    let crossOut = (c, vals) => vals.filter(v => ((v % c) > 0) )
 
    let mp = function(v, co) {
        if(v.length == 0) {
            return null;
        } else {
            result.push(v[0])
            mp( crossOut(co+2, v.slice(1)), co+1 )
        }
    } // mp
 
    mp( potentials, 0 )
    return result
 
 } // sieve
 
 console.log( sieve(100) )