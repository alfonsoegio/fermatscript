const fs = require("fs");
const jison = require("jison");
const readline = require('readline');

const alg = require("./lib/algorithms.js");

const bnf = fs.readFileSync("./parser/calculator.jison", "utf8");
const parser = new jison.Parser(bnf);

const R = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: completer,
    path: "./.eulerscriptHistory",
    maxLength: 1234
});
R.setPrompt('> ');
R.prompt();

function completer(line) {
    let completions = `Zp Gf exit
    quit searchGenerators
    multiplicationTable
    divisionTable`.split(' ')
  let hits = completions.filter(function(c) {
    if (c.indexOf(line) == 0) {
      return c;
    }
  });
  return [hits && hits.length ? hits : completions, line];
}

let context = {
    // Initial FermatScript context (integer arithmetic)
    "n": 0,
    "add": (x, y) => x + y,
    "subtract": (x, y) => x - y,
    "multiply": (x, y) => x * y,
    "divide": (x, y) => x / y,
    "exp": (x, y) => alg.exponentiation(x, y, parser.yy.context),
    "modulus": (x) => x,
    "searchGenerators": () => alg.searchGenerators(parser.yy.context),
    "multiplicationTable": () => alg.multiplicationTable(parser.yy.context),
    "divisionTable": () => alg.divisionTable(parser.yy.context),
    "reset": () => {
	// Restore initial context
	parser.yy.context = {
	    "n": 0,
	    "add": (x, y) => x + y,
	    "subtract": (x, y) => x - y,
	    "multiply": (x, y) => x * y,
	    "divide": (x, y) => x / y,
	    "exp": (x, y) => alg.exponentiation(x, y, parser.yy.context),
	    "modulus": (x) => x,
	    "switchToZp": parser.yy.context.switchToZp,
	    "switchToGf": parser.yy.context.switchToGf,
	    "searchGenerators": () => alg.searchGenerators(parser.yy.context),
	    "multiplicationTable": () => alg.multiplicationTable(parser.yy.context),
	    "divisionTable": () => alg.divisionTable(parser.yy.context),
	    "reset": parser.yy.context.reset
	};
	R.setPrompt(`> `);
	return `Integer arithmetic`;
    },
    // Cryptographer's favorite field
    "switchToZp": (p) => {
	if ( alg.isPrime(p) == false ) {
	    console.log(`Warning, ${p} is not a prime number!!!`);
	    R.setPrompt(`Zn(${p}) > `);
	} else {
	    R.setPrompt(`Zp(${p}) > `);
	}
	parser.yy.context = {
	    "n": p,
	    "add": (x, y) => ((x % p) + (y % p)) % p,
	    "subtract": (x, y) => ((x % p) - (y % p)) % p,
	    "multiply": (x, y) => ((x % p) * (y % p)) % p,
	    "divide": (x, y) => ((x % p) * (alg.modInverse(y,p) % p)) % p,
	    "exp": (x, y) => alg.exponentiation(x, y, parser.yy.context),
	    "modulus": (x) => x % p,
	    "switchToZp": parser.yy.context.switchToZp,
	    "switchToGf": parser.yy.context.switchToGf,
	    "searchGenerators": () => alg.searchGenerators(parser.yy.context),
	    "multiplicationTable": () => alg.multiplicationTable(parser.yy.context),
	    "divisionTable": () => alg.divisionTable(parser.yy.context),
	    "reset": parser.yy.context.reset
	};
	return `Switched to Z modulus ${p}`;
    },
    // Cryptographer's other favorite field Gf(p^n)
    "switchToGf": (p, n) => {
	let N = Math.pow(p, n);
	parser.yy.context = {
	    // TODO: replace this rules by proper polynomial operations
	    "n": N,
	    "add": (x, y) => ((x % N) + (y % N)) % N,
	    "subtract": (x, y) => ((x % N) - (y % N)) % N,
	    "multiply": (x, y) => ((x % N) * (y % N)) % N,
	    "divide": (x, y) => ((x % N) * (alg.modInverse(y,N) % N)) % N,
	    "exp": (x, y) => alg.exponentiation(x, y, parser.yy.context),
	    "modulus": (x) => x % N,
	    "switchToZp": parser.yy.context.switchToZp,
	    "switchToGf": parser.yy.context.switchToGf,
	    "searchGenerators": () => alg.searchGenerators(parser.yy.context),
	    "multiplicationTable": () => alg.multiplicationTable(parser.yy.context),
	    "divisionTable": () => alg.divisionTable(parser.yy.context),
	    "reset": parser.yy.context.reset
	};
	if ( alg.isPrime(p) == false ) {
	    console.log(`Warning, ${p} is not a prime number!!!`);
	    R.setPrompt(`Zn(${N}) > `);
	    return `Switched to Z modulus ${N}`;
	} else {
	    R.setPrompt(`Gf(${p}^${n}) > `);
	    return `Switched to Gf modulus ${p}^${n}`;
	}
    }
};

let parseSource = parser.generate();

// Setup the initial context
parser.yy.context = context;

R.on('line', (line) => {
    if (line === "exit" || line === "quit") {
	R.close();
	return;
    } else if (line === "") {
	// Nothing to do
    } else {
	try {
	    console.log(parser.parse(line));
	} catch(e) {
	    console.log(e.name + ": " + e.message);
	}
	R.prompt();
    }
});
