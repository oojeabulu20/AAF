let values = [10, 7, 3, 9, 1, 7, 4] ;
let vlen = values.length ;


function bubblesort() {
	console.log(values) ;
	
	for ( i=0; i<vlen; i++ ) {
		for ( j=0; j < (vlen-i) - 1; j++) {
			if ( values[j] > values[j+1] ) {
				let temp = values[j] ;
				values[j] = values[j+1] ;
				values[j+1] = temp ;
			}
		}
	}

	console.log(values) ;
}

bubblesort() ;
