Title: Container Networking, Namespaces and Tcpdump.
Date: 2020-06-16
Tags: CS, Tech
<!-- Summary:  -->


How do you run tcpdump only on a container ? How does container
networking even work ?

In this we will explore some bits of container networking and figure
out how to run tcpdump in such a way that only the traffic from a
container is captured.

Normally running `tcpdump` on the eth0 interface on a instance is good
enough, but what do you do when your container host is running
multiple containers and you do not need to see all of their traffic ?

As usual this was a debugging scenario on prod. 

# The Problem 
There was a nasty connection timeout issue when I was involved in the
debugging discussion. My initial reaction was to break out tcpdump
and let it capture on the primary `eth0` interface.

As I would soon discover, the volume of data flowing through that
instance was very high and capturing on the interface is not
feasible. If you are capturing upwards of 100MB + files every second,
things get bad really soon. Furthermore, you don't need all the
packets, you only need the packets destined for that specific
container.

Time for some container networking lessons

# Container Networking
Containers use a Linux isolation framework called namespaces in order
to isolate process running on a host. For networking, every container
runs in its own separate networking namespace so that it is isolated
from other processes and connection between these different namespaces
is established by using Virtual Ethernet devices called `veth`.

From the man page of [veth](https://man7.org/linux/man-pages/man4/veth.4.html).

> The veth devices are virtual Ethernet devices.  They can act as
     tunnels between network namespaces to create a bridge to a
     physical network device in another namespace. They are created in
     pairs.

We can think of them as virtual Ethernet cables that are connected to
something on both ends to some network interface. The interfaces are
like virtual Ethernet ports similar to the Ethernet port on your
computer.

So now, we can have to look at the scenario from two different
perspectives, from the host's perspective and from the containers
perspective.


I am running a simple `sh` shell in alpine.


    :::hell
    # docker run -it alpine:latest /bin/sh
    # echo "Hello :-) "
    # Hello :-) 
    # 

Now, I am run `ip link` which will describe the network interfaces.
    
    :::shell
    # ip link
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    17: eth0@if18: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP 
        link/ether 02:42:ac:1e:01:00 brd ff:ff:ff:ff:ff:ff

Here, we that `eth0@if18` has an `@ifXX` in it which makes things very
interesting. This signifies two things. The '@' shows us that this
interface is linked to another interface and the '_ifXX_' tells us
that the interface it is linked to is not in the same network
namespace.

Every interface is supposed to be connected on both ends and every
interface has an interface index. This is the value that we see on the
above output as 1 and 17. This can be found out by reading the value
at `/sys/class/net/<interface>/ifindex`

    :::shell
    # cat /sys/class/net/eth0/ifindex 
    17

We can read the value of the linked interface from `/sys/class/<interface>`

The one it is connected to is called the
peer link and we can look at its index in
`/sys/class/net/<interface>/iflink`

    :::shell
    # cat /sys/class/net/eth0/iflink
    18

But, that is surprising because my container does not have any
interface with _ifindex_=18. That is not a mistake. This shows that
the interface 17 on the container is linked to interface 18 on my
_host_.

This is what `ip link` shows on my host.

    :::shell
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state [[EXTRA DETAILS TRUNCATED]]
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: enp0s31f6: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 [[EXTRA DETAILS TRUNCATED]]
        link/ether e8:6a:64:c1:0d:3f brd ff:ff:ff:ff:ff:ff
    3: wlp6s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 [[EXTRA DETAILS TRUNCATED]]
        link/ether 98:2c:bc:4d:d9:b0 brd ff:ff:ff:ff:ff:ff
    4: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 [[EXTRA DETAILS TRUNCATED]]
        link/ether 02:42:27:9a:cf:32 brd ff:ff:ff:ff:ff:ff
    18: veth01f0f9d@if17: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 [[EXTRA DETAILS TRUNCATED]]
        link/ether f6:7c:d7:20:73:f4 brd ff:ff:ff:ff:ff:ff link-netnsid 0

**NOTE** Notice how interface _18_ is linked to interface _17_ on another namespace. This will be important.


### Why don't we have a iflink for some interfaces.... ?
Interfaces that represent physical devices (eth0, wlan0) are linked to themselves and hence the '@' is not used.

    :::shell
    # cat /sys/class/net/wlp6s0/ifindex
    3
    # cat /sys/class/net/wlp6s0/iflink
    3

## How is this related to tcpdump ?
Well, we have figured out that all traffic from the container is
flowing through the host machine via a linked network interface, so
in order to sniff packets only from that container, we can tell tcpdump
to point to that interface only.

`tcpdump -i <interface> -w output.pcap`

and  Voila!!! Now  we can  sit  and sniff  packet only  from a  docker
container.

Not only does this vastly reduce the size of the capture files, it
also reduces complexity during the analysis phase.



That is it. Thanks for reading and happy sniffing.
