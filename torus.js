const R = require('ramda');

const max_bump = 0.4;
const grid_size = 8;

const indices = R.range(0, grid_size);
let mat = R.map(()=>(R.map(()=>(Math.random()), indices)), indices); 
//console.log(mat);

const genRandIndex = () => Math.floor(Math.random() * grid_size);
const genRndInRange = (min, max) => (Math.random() * (max - min));

const getX = pt => R.nth(0, pt);
const getY = pt => R.nth(1, pt);

const bound = (x) => (x < 0) ? (x + grid_size) : (x % grid_size);
const offsets = (x,y) => R.map(pt=>[bound(getX(pt)), bound(getY(pt))], 
                             [[x-1,y], [x+1,y], [x,y-1], [x,y+1]]);

const dist = R.curry((p1, p2) => Math.abs( mat[getY(p2)][getX(p2)] - mat[getY(p1)][getX(p1)] ));

const smoothLocally = (mat,x,y) => {
    const localDistFxn = dist([x,y]);
    local_offsets = offsets(x,y);
    for (let i=0; i<local_offsets.length; i++){
        let offset = local_offsets[i];
        let diff = localDistFxn(offset);
        if (diff > max_bump) {
            let middle_val = mat[y][x];
            let offset_val = mat[getY(offset)][getX(offset)];
            let smoothed_val = genRndInRange(Math.min(middle_val, offset_val), 
                                             Math.max(middle_val, offset_val));
            mat[getY(offset)][getX(offset)] = smoothed_val; 
        }
    }
    return mat;
};


const shallow_copy = R.map(row => R.slice(0, grid_size, row));
const boolean_all = (arr) => R.reduce(R.and, true, arr);
const checkMatEqual = (m1,m2) => boolean_all(R.map(
                                            (j)=>(boolean_all(R.map((i)=>(m1[j][i] === m2[j][i]), indices))), 
                                            indices
                                           )); 

let iteration_count = 0;
var snapshot_mat = R.map(()=>(R.map(()=>0, indices)), indices); 
while (true) {
    mat = smoothLocally(mat,genRandIndex(),genRandIndex());
    
    if (checkMatEqual(mat, snapshot_mat) && iteration_count % 100 === 99) {
        break;
    } 
    if (iteration_count % 100 === 0) {
        snapshot_mat = shallow_copy(mat);
    }
    iteration_count += 1;
}

R.map(console.log, R.map(row => row.join(' '), mat))
