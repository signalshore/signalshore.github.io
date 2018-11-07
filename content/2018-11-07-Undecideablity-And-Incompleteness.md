Title: Undecidability and Incompleteness 
Date: 2018-11-07
Tags: CS


In the [previous post](https://signalshore.github.io/blog/Turing-Machine-and-Halting-Problem.html)
we looked at a Turing Machine and the Halting problem.  A Halting
problems is type of decision problem for a Turing Machine.

Recall that a Turing Machine has three final states:

- Accept -> The machine accepts the string
- Reject -> The machine rejects the string
- Loop indefinitely -> The machine neither accepts nor rejects the string; its still processing it


Now it is quite evident that in the Accept and Reject states the
Turing Machine can tell you something definite about the string that
it is processing. Thus, when a Turing Machine reaches one of these
states we say that the Turing Machine has _decided_ the language
(recall that all TM problems are represented in the form of Languages). 

On the other hand we have situations where the Turing Machine fails to
decide a language. In fact we have a whole class of such
languages. These languages are called undecidable languages.

The Halting Problem that we looked at in the last essay is one such problem.

## Undecidability and Undecidable Problems

Undecidability is one of those concepts in Theoretical Computer
Science that fascinates me in ways I can not even begin explain. 

There are certain types of decision-problems for which there is no
algorithm that can reliably give a yes-no answer.

The implications of this are quite interesting. 

This means that you can not have a program that tells you whether a
program will produce an output or not (and consequently keep running
for-ever). Like how our compilers still can not tell us when we will hit
an infinite-loop. The only way to find out is to actually run the
program. This is serious research topic in computer science; designing
accurate static analyzers.

## Hilbert's problems
In 1900 mathematician David Hilbert published a list of 23
problems. In 1928 he returned to the second question out of these 23
asking three fundamental questions about mathematics.

- Is mathematics complete ?
- Is mathematics consistent ?
- Is mathematics decidable ?

The main reason for these questions was to establish a set of
_fundamental_ axioms about mathematics using which you could prove any
theorem in mathematics. Now, the idea was that even if all of such
axioms were not known we could find them out.

Three years later in 1931 Kurt Godel published solutions to the first
two questions, these are known as Godel's incompleteness theorems.

The Wikipedia page
for
[Godel's incompleteness theorem](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems) states
that

The first incompleteness theorem:
> no consistent system
of axioms whose theorems can be listed by an effective procedure
(i.e., an algorithm) is capable of proving all truths about the
arithmetic of the natural numbers. For any such formal system, there
will always be statements about the natural numbers that are true, but
that are unprovable within the system.

The second incompleteness theorem:
> the system in question cannot demonstrate its own consistency.

<br>

All this is fine; but what does it actually mean for mathematics and computer science ?

For mathematics it means that mathematics is not complete. Hence there
is a very good possibility that certain problems exist in mathematics
which can never be proven. (For
example. the
[Riemann hypothesis](https://en.wikipedia.org/wiki/Riemann_hypothesis)
etc)

For Computer Science this means that there are certain programs that
are non-computable.  Yes, this basically puts a limit on the type of
programs that you can write.

## Entscheidungsproblem (or the Decision problem)
This problem is referred to as
the
[Decision problem](https://en.wikipedia.org/wiki/Entscheidungsproblem)
posed by David Hilbert. This problem asks for an algorithm that takes
in a logical statement statement and then says either "yes" or "no" as
to whether the statement is true or not. For the sake of simplicity
we can assume that the algorithm is aware of all the axioms (or rules)
that is needed to say "yes" or "no".

The solution of this problem was given by both Alan Turing and Alonzo
Church in 1936. Alonzo Church created a method of defining functions
called the Lambda Calculus while Alan Turing created a model of
computation called the Turing Machine.

The final result was the no such algorithm can exist. 

What does this mean for mathematics and computer science ?

For mathematics it means that not only are there certain problems that
can not be solved (or proved) but there is no way for us to know
whether a problem is solvable or not without actually trying to
solve the problem.

For
example
[Fermat's Last theorem](https://en.wikipedia.org/wiki/Fermat%27s_Last_Theorem) was
assumed to unsolvable and it remained unsolved for about 358 years
until Andrew Wiles solved it.

Similarly we have other challenging problems such as the Riemann
Hypothesis etc.

For computer science it means that we can not have some program that
tells you whether your program will work or not. Lets break this in a
lil bit more.


### Thinking exercise for CS people.
Sit down.

Write a program that will take any other program and tell you if that
other program will stop or not.


### Disclaimer
I am not expert in any of this by any stretch of the
imagination. I'm just starting out and there is a of chance that I do
not understand this fully. Maybe 20 years later I will look at these
and laugh at myself. Maybe my understanding of these is completely
wrong or misguided. 

But, right now I love reading about these and that i good enough for
me and honestly the the presented above are good enough. 

I would rather be wrong about these right now than not study waiting
for the correct time or the correct opportunity or the correct
resource to study from. I've made that error before and I do not want
to make it again. 
