const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
	if(num % i === 0) return false;
    return num !== 1 && num !== 0;
};

const searchGenerators = (context) => {
    if(context.n === 0) {
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

const modInverse = (a, m) => {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
	return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
	return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while(b) {
	[a, b] = [b, a % b]
	s.push({a, b})
    }
    if (a !== 1) {
	return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for(let i = s.length - 2; i >= 0; --i) {
	[x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

module.exports = {isPrime, searchGenerators, modInverse};
