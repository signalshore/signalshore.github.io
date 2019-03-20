Title: Programming Languages Part A
Date: 2019-03-18
Tags: Learning, CS
Status: draft

This is a new series that I am planning to do about every online
course that I take. I will use this to track what I have
learnt. Having something that I can refer to is also super awesome.

# Structure
The entire course is quite long. The way Dan (the instructor) has
structured the course is that he divided the course into 3 parts. 

In Part A we used the programming lanugage SML (Standard Meta
Language) since the primary focus of this part of the course is to
learn about strongly typed, functional programming language with
static type checking (I will talk about these later). In Part B we use
Racket and in Part C we use Ruby.

#### _NOTE: haven't taken parts B and C of the course so im not too clear on that._ ####

# Part A : SML

I will write get to the point and write about each major topic that I learnt. 

## Funcitonal Programming and Pure Functions

This section defined functional programming for me. I have programmed
a little bit in Scheme before (due to SICP) but I never really learned
what Funcitonal Programming really means. As a result I could not
define it when someone asked me what it is. 

Turns out that I never really understood _pure functions_, which is
the core concept around which functional programming revolves. Now,
pure functions are a mathematical concept. Mathematically a function
just takes a value and returns a result. It does _nothing_ else, or
more specifically it changes nothing else. Moreover a function has to
return the same result for the same argument _always_.

Well, how does this translate into programming ?  

In programming terms, a pure function has to have no _side effects_.
Side effects is a term computer people use to confuse non-computer
people. It means that a function should not mutate any mutable
variables/references in the environment. This gets tricky sometimes,
especially if the programming language allows and encourages
mutations.  Object-Oriented languages allow mutaiton and that can lead
to some interesting problems (and security vulnerabilities) in
software.

## Function Environments (statc and dynamic environemtns)

##
