let values = [ 10, 7, 3, 9, 1, 7, 4 ] ;

let vlen = values.length ;

function insertionsort() {
	console.log(values) ;

	let i = 0 ;

	while ( i < vlen) {
		let j = i ;
		while ( j>0 && (values[j-1] > values[j]) ) {
			let temp = values[j-1]
			values[j-1] = values[j]
			values[j] = temp
			j = j - 1
		}
		i = i + 1
	}

	console.log(values) ;
}

insertionsort() ;
