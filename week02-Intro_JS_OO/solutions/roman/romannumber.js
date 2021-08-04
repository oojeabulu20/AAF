let conv = function(c) {
    val = "";
 
    switch(c) {
        case 'I':
            val = 1;
            break;
        case "V":
            val = 5;
            break;
        case "X":
            val = 10;
            break;
        case "L":
            val = 50;
            break;
        case "C":
            val = 100;
            break;
        case "D":
            val = 500;
            break;
        case "M":
            val = 1000;
            break;
    }
    return val;
 } // conv
 
 function roman2decimal(rmn) {
    let dec = []
 
    for (let i=0; i<rmn.length; i++) {
        if(i+1 <= rmn.length) {
            if (conv(rmn[i]) < conv(rmn[i+1])) {
                dec.push(conv(rmn[i + 1]) - conv(rmn[i]))
                i += 1
            } else {
                dec.push(conv(rmn[i]))
            }
        }
    }
 
    let result = 0;
    for(let i=0; i<dec.length; i++)
        result += dec[i]
    return result
 }
 
 console.log(roman2decimal("V"))
 console.log(roman2decimal("VIII"))
 console.log(roman2decimal("IV"))
 console.log(roman2decimal("MCMXIV"))
 console.log(roman2decimal("MMXV"))
 console.log(roman2decimal("MDXV"))