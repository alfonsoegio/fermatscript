/* description: Parses and executes mathematical expressions. */


/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"("                   return '('
")"                   return ')'
","                   return ','
"PI"                  return 'PI'
"E"                   return 'E'
"Zp"		      return 'Zp'
"Gf"		      return 'Gf'
"reset"		      return 'reset'
"searchGenerators"    return 'searchGenerators'
"multiplicationTable" return 'multiplicationTable'
"divisionTable"       return 'divisionTable'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
	{ /* typeof console !== 'undefined' ? console.log($1) : print($1); */
	  return $1; }
    ;

e
    : e '+' e
	{$$ = yy.context.add($1, $3);}
    | e '-' e
	{$$ = yy.context.subtract($1, $3);}
    | e '*' e
	{$$ = yy.context.multiply($1, $3);}
    | e '/' e
	{$$ = yy.context.divide($1, $3);}
    | e '^' e
	{$$ = yy.context.exp($1, $3);}
    | e '!'
	{{
	  $$ = (function fact (n) { return n==0 ? 1 : yy.context.multiply(fact(n-1), n) })($1);
	}}
    | '-' e %prec UMINUS
	{$$ = -$2;}
    | '(' e ')'
	{$$ = $2;}
    | NUMBER
	{$$ = Number(yytext);}
    | E
	{$$ = Math.E;}
    | PI
	{$$ = Math.PI;}
    | Zp'('NUMBER')'
	{$$ = yy.context.switchToZp($3);}
    | Gf'('NUMBER','NUMBER')'
	{$$ = yy.context.switchToGf($3, $5);}
    | reset
	{$$ = yy.context.reset();}
    | searchGenerators
	{$$ = yy.context.searchGenerators();}
    | multiplicationTable
	{$$ = yy.context.multiplicationTable();}
    | divisionTable
	{$$ = yy.context.divisionTable();}
    ;
