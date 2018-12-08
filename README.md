# FermatScript

## Introduction

FermatScript is a JavaScript app that  provides a readline based
interpreter in order to perform operations on
regular integer arithmetic, groups Zn, fields Zp and Galois
fields GF(p^n). Expression parser is based on an extension
of the calculator example provided
in [https://github.com/zaach/jison](Jison) (a Node.js module
supporting Yacc-Lex/Bison-Flex style parser generation).

## Installation

Using nodeenv: [https://github.com/ekalinin/nodeenv](https://github.com/ekalinin/nodeenv)

```
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
>
```

## TODO

This little application was inspired by [https://github.com/sbisbee/node-galois](node-galois)
that does not compile with recent Node.js V8 engine; maybe a first step
to achieve real Galois arithmetic could consist on wrapping
[http://web.eecs.utk.edu/~plank/plank/papers/CS-07-593/](James S. Plank Fast Galois Field Arithmetic
Library in C/C++) into V8's engine in Node.js v10.14.1.
