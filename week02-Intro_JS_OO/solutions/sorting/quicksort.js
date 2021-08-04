let values = [ 10, 7, 3, 9, 1, 7, 4 ]
let vlen = values.length

function quicksort( array ) {

    if ( array.length <= 1 )
        return array ;

    let pivot = array[0]
    let left = [] 
    let right = []

    for ( i=1; i<array.length; i++ ) {
        if ( array[i] < pivot )
            left.push( array[i] ) ;
        else
            right.push( array[i] ) ;
    }

    return quicksort( left ).concat( pivot, quicksort(right) ) ;

}

let sorted = quicksort(values) ;
console.log('Sorted array', sorted) ;
