# FermatScript

## Introduction

FermatScript is a JavaScript application that  provides a readline based
interpreter in order to perform operations on
regular integer arithmetic, groups Zn, fields Zp and Galois
fields GF(p^n). Expression parser is based on an extension
of the calculator example provided
in [jison](https://github.com/zaach/jison "Jison") (a Node.js module
supporting Yacc-Lex/Bison-Flex style parser generation).

## Installation

Using nodeenv: [nodeenv](https://github.com/ekalinin/nodeenv "nodeenv")

```
$ git clone https://github.com/alfonsoegio/fermatscript.git
$ cd fermatscript
$ nodeenv --node 10.14.1 venv
$ source venv/bin/activate
(venv) $ npm install

```

## Usage

```
(venv) $ node main.js
> 2+3*(5+7)^2
434
> Zp(7)
Switched to Z modulus 7
Zp(7) > 4^6
1
Zp(7) > Zp(11)
Switched to Z modulus 11
Zp(11) > searchGenerators
1:	1
2:	4	8	5	10	9	7	3	6	1	2	*	2
3:	9	5	4	1	3
4:	5	9	3	1	4
5:	3	4	9	1	5
6:	3	7	9	10	5	8	4	2	1	6	*	6
7:	5	2	3	10	4	6	9	8	1	7	*	7
8:	9	6	4	10	3	2	5	7	1	8	*	8
9:	4	3	5	1	9
10:	1	10
Generators found: {2, 6, 7, 8}
Zp(11) > Zp(8)
Warning, 8 is not a prime number!!!
Switched to Z modulus 8
Zn(8) > searchGenerators
1:	1
2:	4	0
3:	1	3
4:	0
5:	1	5
6:	4	0
7:	1	7
Generators found: {}
Zn(8) > reset
Integer arithmetic
> searchGenerators
Generator search not supported in Integer set
> Zp(11)
Switched to Z modulus 11
Zp(11) > multiplicationTable

	1	2	3	4	5	6	7	8	9	10
1	1	2	3	4	5	6	7	8	9	10
2	2	4	6	8	10	1	3	5	7	9
3	3	6	9	1	4	7	10	2	5	8
4	4	8	1	5	9	2	6	10	3	7
5	5	10	4	9	3	8	2	7	1	6
6	6	1	7	2	8	3	9	4	10	5
7	7	3	10	6	2	9	5	1	8	4
8	8	5	2	10	7	4	1	9	6	3
9	9	7	5	3	1	10	8	6	4	2
10	10	9	8	7	6	5	4	3	2	1

Zp(11) > divisionTable
	1	2	3	4	5	6	7	8	9	10
1	1	6	4	3	9	2	8	7	5	10
2	2	1	8	6	7	4	5	3	10	9
3	3	7	1	9	5	6	2	10	4	8
4	4	2	5	1	3	8	10	6	9	7
5	5	8	9	4	1	10	7	2	3	6
6	6	3	2	7	10	1	4	9	8	5
7	7	9	6	10	8	3	1	5	2	4
8	8	4	10	2	6	5	9	1	7	3
9	9	10	3	5	4	7	6	8	1	2
10	10	5	7	8	2	9	3	4	6	1
Zp(11) > Zp(10)
Warning, 10 is not a prime number!!!
Switched to Z modulus 10
Zn(10) > multiplicationTable

	1	2	3	4	5	6	7	8	9
1	1	2	3	4	5	6	7	8	9
2	2	4	6	8	0	2	4	6	8
3	3	6	9	2	5	8	1	4	7
4	4	8	2	6	0	4	8	2	6
5	5	0	5	0	5	0	5	0	5
6	6	2	8	4	0	6	2	8	4
7	7	4	1	8	5	2	9	6	3
8	8	6	4	2	0	8	6	4	2
9	9	8	7	6	5	4	3	2	1

Zn(10) > divisionTable
	1	2	3	4	5	6	7	8	9
1	1	NaN	7	NaN	NaN	NaN	3	NaN	9
2	2	NaN	4	NaN	NaN	NaN	6	NaN	8
3	3	NaN	1	NaN	NaN	NaN	9	NaN	7
4	4	NaN	8	NaN	NaN	NaN	2	NaN	6
5	5	NaN	5	NaN	NaN	NaN	5	NaN	5
6	6	NaN	2	NaN	NaN	NaN	8	NaN	4
7	7	NaN	9	NaN	NaN	NaN	1	NaN	3
8	8	NaN	6	NaN	NaN	NaN	4	NaN	2
9	9	NaN	3	NaN	NaN	NaN	7	NaN	1

Zn(10) >
```

## TODO

This little application was inspired by [node-galois](https://github.com/sbisbee/node-galois "node-galois")
that does not compile with recent Node.js V8 engine; maybe a first step
to achieve real Galois arithmetic could consist on wrapping
[James S. Plank Fast Galois Field Library](http://web.eecs.utk.edu/~plank/plank/papers/CS-07-593/ "James S. Plank Fast Galois Field Arithmetic Library in C/C++")
into V8's engine in Node.js v10.14.1.
