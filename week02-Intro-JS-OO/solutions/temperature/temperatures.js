function fahrenheit2celsius(t) { return (t-32)*(5/9) }
let kelvin2celsius = (t) => t-273.15
let celsius2reaumur = (t) => t*(4/5)

let temp = 100
console.log( celsius2reaumur( kelvin2celsius(temp) ))