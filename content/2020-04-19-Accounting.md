Title: Personal Accounting
Date: 2020-04-19
Tags: Meta
Summary: A description of my accounting system at 2020.



I used to hate accounting when I had the subject in my Undergrad. It
seemed extremely complicated for no apparent reason. 

Over the years I have started to appreciate the need for accounting and
I have a small system for maintaining my personal accounts as well.


# Beginning

It started back in 2015 when I moved to Bangalore and was living alone
for the first time. The amount of money needed to just survive was
very surprising to me (not because things were too expensive; but
because I wasn't used to paying for everything I wanted).

To keep track of where my money went, I used to maintain a simple
spreadsheet that had all my transactions in it. Since I was not
earning any money, this was a good enough system. I used this simple
process until I started my internship. This complicated things
because now, I was being paid and I needed to account for the inflow
of cash as well. With little difficulty I managed to integrate this
into the spreadsheet as well. Then it became too complicated and I
gave up. I did not do any accounting till about September 2018.

# The need for proper accounting
I started working about 2 months prior and I was being paid a decent
wage. On top of it I also had proper expenses, rent, taxes, internet
bills etc etc. I realized that the simple spreadsheet would be too
complicated and a proper accounting software (like Tally) would be too
much for my needs. I knew that in order to track everything properly I
needed to use the [Double-Entry](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) accounting system.

The Double-Entry Accounting system is a concept that says that every
transaction has two parties that are involved. One party gives money
and the other party receives money. This is something that was not
taught properly in college and was the main reason I hated the
accounts classes. 

I needed something that would be simple for my needs and something
that would be able to handle double-entry accounting system.

# Enter ledger-cli
This is a [plaintext accounting](https://plaintextaccounting.org/) software. What this means is that
[ledger-cli](https://www.ledger-cli.org/) uses plaintext files to do proper accounting. 

I *love* text files. Simple text files with no magic sauce on the file
itself, and you can have whatever sauce you want on the application
level. This gives you the flexibility of being able to play with the
plaintext file with other text processing tools available on Linux
(grep/sed/awk) etc.

With ledger-cli you do not have to learn a bunch of things just to
use it.

Each transaction in ledger looks like this

    2019/04/19 Bought some icecream
        AccountA:SubAccountA1  3000
        AccountB:SubAccountB1  -3000

That's about it. It basically says that for buying some coffee you paid
3000 (in any unit of currency) from SubAccountB1 to SubAccountA1.
The `Account:SubAccountA1` is used to illustrate that you can have nested accounts.

Ledger also does amazing reporting.
For example: This is how much I've spent on travelling over the two years (This exclude everyday transport using busses and autos)

    $ ledger -f personal.ledger balance Expenses:travel
            78331.94  Expenses:Travel
              543.51    Cab
                4137    Cancel
               55661    Flight
               10855    Package
                 690    Rent
             6445.43    Trains
    ----------------
            78331.94

For example: This shows how much I've spent on House Rent and etc etc stuff. (I only have an audible subscription that I share)
     
    $ ledger -f personal.ledger balance Expenses:Utilities
              162243  Expenses:Utilities
               11833    Electricity Bill
              142900    House Rent
                3744    Internet
                3666    Phone Recharge
                 100    Subscriptions
    ----------------
              162243

            
Its just fun. You also use sed/awk to generate reports/graphs of your own.
            
# For the Future
I see more complexity coming my way as I start investing properly. I
only stick to mutual funds as of now, but tracking them has been a
pain. I am recording all the `buy`s in my system, but I don't record
the `sell`s properly.

I also need to record Reimburseable expenses better and salaries better. 

Apart from that, this system looks robust as of now.

# Why do this at all?
We struggled with money a lot while growing up, not because we had
less, but because we didn't measure how we spent it. Moreover, I like
data, I like reports and I like text files. I want to keep track of my
money.

What doesn't get measured; doesn't get fixed. :-)

That's it for today.

