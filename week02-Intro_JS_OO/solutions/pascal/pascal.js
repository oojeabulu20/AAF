function pascal(e) {
    let pascal = [[1], [1, 1]]
    let end = e

    function triangulate(prev) {
        let row = [1]

        for (let x=0; x<prev.length-1; x++)
            row.push(prev[x]+prev[x+1])

        row.push(1)
        pascal.push(row)
        end -= 1

        while(end > 2)
            triangulate(row)
    } // triangulate

    triangulate([1, 1])
    return pascal
}

function pprint(row, c) {
    let out = ""
    for(let i=0; i<row.length; i++)
        out = out + row[i] + ' '
    return indent( out.trim(), c )
}

function indent(r, c) {
    let ind = ' '
    let i = 0
    let ret = ''

    while(i<c) {
        ret += ind
        i += 1
    }
    ret += r

    return ret
}

let rows = 7
let triangle = pascal(rows).reverse()
for( let i=rows-1; i>=0; i--)
    console.log( pprint( triangle[i], i ))