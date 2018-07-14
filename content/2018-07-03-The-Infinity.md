Title: The Infinity - How maths can blow your mind!! 
Date: 2018-07-03
Tags: Misc, Math


I am writing this post because I am fascinated by the idea of infinity
and I think it is something that we do not talk enough about.

Moreover off late I am reading about Theoretical Computer Science and
I find encountering this concept again and again. I am just beginning
to understand the connection between Computer Science and
Mathematics.(note that I used Computer *Science* as not Computer
*Engineering*)

To be honest infinity is a very weird and un-intuitive concept to get
your head around and I don't think I understand it fully at this point
and I don't I ever will. However, here goes nothing.

Let's begin.


## What is Infinity ?

Infinity is a concept that describes the of never-ending-ness of
something. If I were to say that something is infinite it means that
that *something* is never ending. It is never-ending no matter what we
take away from it or add to it. 

This concept can be illustrated in the famous hotel called the [Hilbert's Hotel](https://en.wikipedia.org/wiki/Hilbert's_paradox_of_the_Grand_Hotel).

This hotel has an interesting property - it has an infinite number of
rooms which are all occupied.  

So if they are all occupied then how do they accommodate new customers
?

In Hilbert's hotel, whenever a new customer comes into the hotel
management shifts all the other customers to the next room and the new
customer is allotted the first room.

Thus this hotel can accommodate an infinite number of people.

## Infinities in Mathematics

There are a whole lot of things to talk about infinity, however
neither am I qualified enough nor do we want a post of infinite
length. So we will focus on two infinite sets in mathematics.

The set of whole numbers in Mathematics. This set is a set of all
positive integers beginning from 0 and this is an infinite set. This
is the famous set $\mathbb{N}$ and the set of all Real numbers. This
set consists of any number that can be represented on a number
line. This is the famous set $\mathbb{R}$.

## Are all infinities equal ?

That is a loaded question!! It sounds simple doesn't it?  If infinity
means that something is never ending then all infinities must be
equal; right ?

**WRONG !!** Turns out there are different kinds of
infinities. Countable Infinities and Un-countable infinities.

Let's unpack this argument from the beginning and in the end we will
compare the two sets we talked about before ($\mathbb{N}$ and
$\mathbb{R}$)

Two sets P and Q are said to be equal sets if they have the same
number of elements (or they sets have the same cardinality). Now the
question arises that if two sets are infinite then how do we compare
if they have the same number of elements or not.

This is the brilliance of it all. To establish the equality between $P$
and $Q$ we do not need to and we can not count the number of elements in
each set and show that they are equal, we just need to show that *if*
counting the number of elements were possible then the sets would be
equal. We do this by showing
a
[one-to-one correspondence (Bijection)](https://en.wikipedia.org/wiki/Bijection) between
the elements of the two sets. This, is a fancy way to say that we have
to show that we can pair every element of the first set with an
element of the second set.


Comparing the two sets ($\mathbb{N}$ and $\mathbb{R}$) will make this
idea more clear.  Set $\mathbb{N}$ is the set of Natural numbers and
set $\mathbb{R}$ is the set of Real numbers. For this experiment we
will only consider the numbers between 0 and 1 from the set
$\mathbb{R}$. Thus this small interval will include numbers like 
$0.01, 0.0001, 0.00235421, ...)$. Now, let us select such numbers from
this interval in ascending order and pair them up with each element
from the set $\mathbb{N}$. 

Soon, we will run out of numbers from $\mathbb{N}$. This happens
because no matter how you choose, you **can not** choose numbers in
ascending order (or any order for that matter) from set $\mathbb{R}$.
Say you choose $0.01$ and the next number you choose is *0.02*,
however there are still numbers like $0.001$ and $0.000001$ and so on.
In fact, there are infinitely many numbers between any two numbers from
the set $\mathbb{R}$. 

You can image this as having numbers on a number line and you can just
*zoom* into the line indefinitely and all you would do is just
increase the granularity of the numbers. The numbers would **never** end.

Thus the set $\mathbb{N}$ is a countably-infinite set while the set
$\mathbb{R}$ is uncountably-infinite.

## Another WILD idea ...
Take the set of all Natural numbers. This set contains all numbers
from 1 to infinity.  Take another set containing all the even numbers
from $2$ to infinity.

So now we have two different sets. What is the size of each of these sets ? 

Basic intuition suggests that the set of all natural numbers will be
twice as large as the set of all even numbers. But, that is not the
case. Both the sets are of infinite length. In fact both of these sets
have exactly the same number of elements.

This suggests some weird arithmetic. 
If you add infinity with a number; you get back infinity.
If you remove infinity from a number; you get back infinity.
If you divide infinity by a number; you get back infinity.
If you multiply infinity by a number; you get back infinity.

##### *Crazy isn't it ?? :-P* #####

## Stretch your brains a bit more

If the last section didn't rattle your brains enough, then let us look
at something more bizarre.

This is a thought experiment. Let us imagine a circle with radius
$r$. Thus the circumference of this circle is $2 \pi r$. Thus the
circumference of a circle is not rational. It is however a Real
Number.

Now, if you start from point $A$ on the circumference of this circle
and you take $\pi$ steps every time then you will never reach the same
point $A$ ever again. 

This happens because of the irrationality of the circumference. You
can imagine the circumference of the circle as two points marked on
the Real number line at $0$ and at $2 \pi r$. As we have seen
previously there can be infinitely many numbers between any two
numbers on the real number line. Now if we were to remove the original
point $A$ the circle would remain as it is and the "gap" in its
position will be replaced by some other point since we have an
infinite supply of points. 

There is also an incredible paradox called
the
[Banach-Tarski Paradox](https://en.wikipedia.org/wiki/Banach%E2%80%93Tarski_paradox).

The non-mathematical version of this paradox can be paraphrased that
*there are certain methods in which a sphere can be decomposed (broken
down or taken apart) into a finite number of subsets such that these
subsets can be recombined to form two exact copies of the original
sphere*


If this were true is the physical world then it would mean that we
could take an orange and turn that into two oranges. However, the
physical world is different from the mathematical one in a way that
the physical world is bound by the laws of physics, while the
mathematical world is not. Hence the fun sphere in the mathematical
world does not follow
the
[**law of conservation of mass**](https://en.wikipedia.org/wiki/Conservation_of_mass) while
the poor sphere in the physical world needs to follow it. This is why
we can not create infinite oranges and we can not have a circle form
which you can remove a point and the size of the circle will still
remain the same.

Bummer right!! :-P (I KNOW!!!)

## Conclusion
I first read about the Banach-Tarski paradox in a video and I was blown
away by it. The idea was so revolting, but at the same time it made so
much sense. 


If this blog post scratched *that* part of your brain that says
"wait-a-minute-but-how" then please go ahead and read about infinity! 

It's amazing. 

And finally a huge thanks to Vasauce for [this video](https://www.youtube.com/watch?v=s86-Z-CbaHA).

This post was primarily inspired by that video!! :-)
