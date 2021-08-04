let now = new Date( )  
let nstr = now + ""

let parts = nstr.split(' ')
console.log(parts)
console.log(parts[0] +', '+ parts[1] +' '+ parts[2] +' '+ parts[3])

console.log( new Date(now.getYear()+1900, now.getMonth(), now.getDate()+17 ))
// format string will be MYD, YDM etc
function toFmt(dat, f) {
	let parts = dat.split("/")
	let result = []
	for (let x=0; x<5; x+=2) {
		if (f[x] == 'D')
			result.push(parts[0])
		if (f[x] == 'M')
			result.push(parts[1])
		if (f[x] == 'Y')
			result.push(parts[2])
	}
	return result.join(f[1])
}

console.log( toFmt("13/05/2018", "Y-M-D") )