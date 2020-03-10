Title: Abstractions and APIs AFK
Date: 2020-03-10
Tags: Meta


I've been trying to come up with a generalization for how the world
works. I think that I may have something interesting to offer.

Here is my framework for how I look at the world. This is built with
some inspiration from systems design in computer science.

Note: Feel free to not read this/disregard anything said here.

# Abstractions
The world is made up of layers and layers of abstractions. One layer
of abstraction sits nicely on another layer of abstraction and they
interact only through the interfaces that each layer of abstraction
exposes. We call these interfaces, APIs in CS. This might seem a bit
too computer-science-y but please humor me for a while.

What I mean by abstractions is that there are constructs/systems that
allow us to interact with a much larger/complex system by mapping some
of the complexity of that much larger system to a smaller system. This
mapping reduces a vast amount of complexity because it does not need
to map all the things. It only needs to map the essential features of
the system.


# APIs
These are just interfaces that people use to interact with complex
systems. There can be multiple APIs for a given system and you get to
choose which API you want to use based on how much you want to
specialize yourself with the system. 

For example, your tap is an API for the water system. You electricity
socket is an API to the electricity grid. 

## What purpose do these abstractions serve ?
These abstractions reduce the complexity of a system to manageable
levels. Just think about how complex the world would be if everyone
needed to know everything about a system just to interact with
it. Such a world would be un-liveable. 

Moreover, having abstractions allows us to have specializations as
well i.e. some people will specialize in familiarizing themselves with
the complexity of any particular system. They may do this for a
variety of reasons, which we will not think about here.

This also makes living easier for people since everyone does not
_need_ to specialize in every system. They can surely choose to do so
in multiple system, but its not a requirement.

This also allows for division of labor and concern. 

For Example, you do not need to know the nitty-gritties of the
electricity grid to change a light-bulb. Similarly, since there are
specialists available, you do not need to learn everything about
setting up a 20A electricity connection so that you can charge your
electric-vehicle.

Moreover, when these systems start misbehaving, you can just off-load
the work of debugging to the specialist who concerns with this
system. In most cases we have contracts with a collective of people
whose job is to take care of these systems and their APIs and
maintain them to a reasonable level of quality. Like the water supply
department agrees to supply potable water and the electricity company
agrees to supply electricity at 220V-50Hz. The world works because
these terms are not violated.

## What are the negative effects of these abstractions ?
The negatives come into picture once people start forgetting about the
complexity that lies behind all that abstraction. Once this starts
happening you get into different sort of troubles.

One problem that arises is the rise of fake-specialists. These are
snake-oil peddlers in modern times, these are the holy-men who claim
to solve your problems with magic. It should be noted that these
charlatans are successful only if the users believe in the lie that
they are selling, and users start believing those lies because they do
not have anything else to believe nor do they have sufficient
knowledge of the system to counter these fake-specialists.

The other problem is when people start to disregard the complexity and
the system. They start using water a little too liberally because
water comes from a tap or from a tank. Water does not come from a
river which is being depleted. 



# The Balance ?
I think that the balance lies in the middle. A balance would mean that
a world where abstractions and APIs do exists but at the same time,
people are still encouraged to explore the complexity. 

This is obviously easier said than done.


