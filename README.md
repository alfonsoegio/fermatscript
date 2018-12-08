# FermatScript

## Introduction

Fermatscript is a JavaScript app that  provides a readline based
interpreter in order to perform operations on
regiular integer arithmetics, groups Zn, fields Zp and Galois
fields GF(p^n). Expresion parser is based on an extension
of thecalculator example provided
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
> Zp(17)
Switched to Z modulus 17
Zp(17) > searchGenerators
1:	1
2:	4	8	16	15	13	9	1	2
3:	9	10	13	5	15	11	16	14	8	7	4	12	2	6	1	3	*	3
4:	16	13	1	4
5:	8	6	13	14	2	10	16	12	9	11	4	3	15	7	1	5	*	5
6:	2	12	4	7	8	14	16	11	15	5	13	10	9	3	1	6	*	6
7:	15	3	4	11	9	12	16	10	2	14	13	6	8	5	1	7	*	7
8:	13	2	16	9	4	15	1	8
9:	13	15	16	8	4	2	1	9
10:	15	14	4	6	9	5	16	7	2	3	13	11	8	12	1	10	*	10
11:	2	5	4	10	8	3	16	6	15	12	13	7	9	14	1	11	*	11
12:	8	11	13	3	2	7	16	5	9	6	4	14	15	10	1	12	*	12
13:	16	4	1	13
14:	9	7	13	12	15	6	16	3	8	10	4	5	2	11	1	14	*	14
15:	4	9	16	2	13	8	1	15
16:	1	16
Generators found: {3, 5, 6, 7, 10, 11, 12, 14}
Zp(17) > Zp(8)
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
Integer arithmetics
> searchGenerators
Generator search not supported in Integer set
>
```

## TODO

This little application was inspired by [https://github.com/sbisbee/node-galois](node-galois)
that does not compile with recent Node.js V8 engine; maybe a good starting point
in order to implement real Galois arithmetics can be wraping
[http://web.eecs.utk.edu/~plank/plank/papers/CS-07-593/](James S. Plank Fast Galois Field Arithmetic
Library in C/C++) into V8's engine from Node.js v10.14.1.
