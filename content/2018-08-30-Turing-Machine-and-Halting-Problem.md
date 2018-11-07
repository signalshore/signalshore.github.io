Title: Turing Machine and Halting Problem 
Date: 2018-08-30
Tags: CS

In a [previous
post](https://signalshore.github.io/blog/Lambda-Calculus-Part-2.html)
I talked briefly about Alan Turing's model of computation, called the
Turing Machine.

Today we will look into this in more detail and discuss an interesting
problem called the Halting problem.

## Context
Alan Turing was interested in what it meant to *compute* something. 
To fully grasp the severity of this problem we need to step back in time. 

This is the 1930s that we are talking about, there were no *proper*
computers yet. Computers and the whole computer science field was not
yet born. So in this context a computer was something (or someone)
that could perform arithmetic operations. Humans who did this were
called [human computers](https://en.wikipedia.org/wiki/Human_computer)
There were
mechanical
[calculators](https://en.wikipedia.org/wiki/Mechanical_calculator)
that existed back then but again, they all required a human operator.

So ultimately it was the operator who was responsible for making
decisions about what to do with the numbers. There was not automated
reasoning that any machine could follow.

What Alan Turing was interested in; was to understand the meaning of
what it means for a task to be computable. This is one of the core
areas in Philosophy of Computer Science. However to answer this
question he needed a a formal definition of computation itself (which
did not exist at that time). 

> **NOTE :** *As a mental exercise before doing anything else just sit back and
think about this yourself. We use computers daily but at its very
core, what does computation mean ?*

So in order to have a formal definition of computation we needed a
model for computation. This is what Alan Turing came up with and this
is what we now call the Turing Machine.

## The Idea
Picture a typewriter.  The Turing Machine is heavily inspired by this
system (typewriter + operator). In the book "Alan Turing: The Enigma"
the writer Andrew Hodges tells us that Alan was fascinated by
typewriters. We can see this inspiring his work.

What does a typewriter have ? A typewriter has a paper for printing, a
system that outputs characters on said paper, a mechanism for input
that tells the typewriter what to print.  Additionally the typewriter
system also has the user whose job is to tell the typewrite what to do
and it keeps track of what the typewriter has already done.


Now, the Turing Machine is a hypothetical machine (or more precisely a
mathematical model); it does not exist in real life. It is a state
machine which means that the machine has a finite number of states in
which it can be. It can read information/instructions from a tape and
based on that it moves from one state to another. The number of states
is finite. It can also write data on the tape.

A Turing Machine has 4 main parts:

- The tape
- The head
- The state
- The transition table

The **tape** is the memory of the machine. The tape is divided into
blocks of the same width and only one symbol is present in one
block. The machine can read symbols from this tape and can write
symbols to this tape. At a given time there is only one symbol in the
machine. This symbol is referred to as the *scanned* symbol. The
machine can be supplied with an infinitely long tape.

The **head** is a contraption that can read symbols from the tape and can
write symbols to the tape as well. The head can also move the tape to
the left or right but by only one block at a time.

The **state** of the Turing Machine. This state is a intriguing
concept. This *state* is used to replace the *state of mind* of the
typewriter operator (or any person performing any computation for that
matter). At any time the Turing Machine can be one of many finite
states.

The **transition table** is a set of finite rules that given the current
state the machine is currently and the scanned symbol tells the Turing
Machine to write a symbol into the tape, then move the tape left or
right and finally to assume a new state (or stay in the same one).

Now the Turing Machine is a model of computation, thus it must be
able to do some computation; right? So how does it do that. 

## Problems for a Turing Machine.
Problems in Automata Theory are generally of the form that involves
some "computer" determining if some string belongs to a set of strings
or not, based on some rules. This set of strings is called that follow
a general rule for membership is called a Language and the "computer"
involved is called an automaton which is nothing but a model of
computation. We choose to represent various computational problems as
languages because we already have established a terminology for
dealing with languages.

To perform some computation in a Turing Machine we write a program
for the machine. This program is basically a set of transition rules.

Given any string as input the Turing Machine can do one of three
things. It can stop and **accept** the string or it can **reject** the
string or it can **loop** indefinitely over the input.

When the TM is in either the accept or the reject state after
processing a string then we say that the TM has halted (as in stopped
running on the output). On the other hand if the TM does not halt and
instead keeps on looping indefinitely then it means that the TM will
never stop working or never halt. When a TM has halted it indicates
that the TM has decided the string (either accept or reject) on the
other hand when it does not halt then the string (or rather the
problem) is said to be undecidable.

All this can get quite intense, so here is an intuitive definition of
computation by a Turing
Machine. The
[Church-Turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) showed
that a Turing Machine algorithm captures **all** algorithms. This
means that if for a given problem we can design a Turing Machine
algorithms then that problem is actually solvable. As we will soon
see that there are certain problems that are so complex that there
exists no algorithm that can solve them. In-fact while describing
Turing Machine algorithms we do not need to go into the implementation
level details of how the head and the tapes move; instead we can just
use English prose to describe an algorithm. The only requirement is
that an algorithm to stop in a finite number of steps (this is quite
literally the definition of an algorithm).

## Universal Turing Machine
A Turing Machine is generally programmed to perform only a single type
of computation. However there is a class of Turing Machines called the
Universal Turing Machine which can perform any sort of computation. In
fact this property of this Turing Machine is what makes a Turing
Machine such a powerful model for computation. 

The Universal Turing Machine can simulate any arbitrary Turing machine
on any arbitrary string. It does this by reading the description of
the Turing machine and the string input from its own tape and then
processing them.

This makes the Turing Machine capable of answering questions about the
behavior of other Turing machines. This model of computation is a
very accurate model of modern computers where computers have access to
a random access memory. This is the same as the tape in a Turing
Machine.

Thus the problems these Turing Machines can tackle are generally of
the form where we test the behavior of some arbitrary Turing machine
on some arbitrary input.

## The Halting Problem

The Halting Problem is a decision problem of determining whether any
arbitrary Turing Machine will halt on an arbitrary string input or
not. 

In other words lets say that we have a Language $H_{Lang}$ which is
made up of all string encoding of the form $<B,w>$ where $B$ is a
Turing Machine and $w$ is a string and $B$ halts on $w$. We need to
show that $H_{Lang}$ is undecidable. Which means that there isn't a
single imaginable Turing Machine that can decide $H_{Lang}$.

> Which means that no one can ever design a Turing Machine that will
be able to take an arbitrary string $w$ and an arbitrary Turing
machine $B$ and tell whether $B$ will halt on $w$ or not. 

Now, this might seem like a fairly un-important detail but this has
some far-reaching implications as we will soon see. But before that we
will prove the above statement. This is a fun proof that illustrates
how to think about these problems in general.

### Proof 
Let us assume that such a machine does exist and let us call it
$H_{TM}$.

Construction of $H_{TM}$:

- **Input :** String $<B,w>$, where $B$ is a TM and $w$ is a string.
- **Run :** Simulates $w$ on $B$.
- **Accepts :** $w$ if $B$ halts on $w$
- **Rejects :** $w$ if $B$ does not halt on $w$.

*This* is the decider that we have to prove can not exist.

Now, since $H_{TM}$ already exists we can use this machine to
construct another Turing Machine $D_{TM_H}$ which has $H_{TM}$ as a
subroutine (hence the sub-subscript notation).


Construction of $D_{TM_H}$:

- **Input :** String $<M>$, where $M$ is a Turing machine
- **Runs :** Simulates $<M, <M>>$ on $H_{TM}$
- **Accepts :** $<M>$ if $H_{TM}$ rejects $<M, <M>>$, i.e. if $M$ rejects $<M>$
- **Rejects :** $<M>$ if $H_{TM}$ accepts $<M, <M>>$, i.e. if $M$ accepts $<M>$


> **Now, what happens if we run $D_{TM_H}$ on $<D_{TM_H}>$ ?**

By the above Accept and Reject conditions, 

- If $D_{TM_H}$ **accepts** $<D_{TM_H}>$, then it means that $H_{TM}$
  rejected $<D_{TM_H}, <D_{TM_H} >>$ which means that $D_{TM_H}$
  **rejects** $<D_{TM_H}>$
- If $D_{TM_H}$ **rejects** $<D_{TM_H}>$, then it means that $H_{TM}$
  accepted $<D_{TM_H}, <D_{TM_H} >>$ which means that $D_{TM_H}$
  **accepted** $<D_{TM_H}>$
  
This is a contradiction because it implies that $D_{TM_H}$ accepts
itself if it rejects itself.

Hence our initial assumption about the existence of $H_{TM}$ must be
wrong. Hence $H_{TM}$ can not exist.

###### There is another proof for this that uses the Cantor's diagonalisation argument ######

### Conclusion

This means that

> There does not exist a single algorithm that can us if another
algorithm will halt or not

Static analyzers try and do solve some of these limitations but yes,
they are not 100% accurate, because they are mathematically guaranteed
to not be 100% accurate.


This post is part of a series of posts that I have planned. In the
next one we will talk about Godels Incompletelness Theorems and
Hilberts Problems.
