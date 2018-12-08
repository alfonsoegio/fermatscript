const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
	if(num % i === 0) return false;
    return num !== 1 && num !== 0;
};

const searchGenerators = (context) => {
    if (context.n === 0) {
	return "Generator searching not supported in Integer set"
    }
    let n = context.n;
    let dict = {};
    for(let i=1; i<n; i++) {
	dict[i] = [];
	let j = context.multiply(i, i);
	dict[i].push(j);
	while(j != i && j != 0) {
	    j = context.multiply(j, i);
	    dict[i].push(j);
	}
    }
    generators = [];
    for(let k in dict) {
	if(dict[k].length == n-1) {
	    console.log(`${k}:\t${dict[k].join("\t")}\t*\t${k}`);
	    generators.push(k);
	} else {
	    console.log(`${k}:\t${dict[k].join("\t")}`);
	}
    }
    return `Generators found: {${generators.join(", ")}}`;
}

module.exports = {isPrime, searchGenerators};
