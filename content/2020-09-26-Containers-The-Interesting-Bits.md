Title: Containers; The Interesting Bits
Date: 2020-09-26
Tags: CS
Status: draft

# What is Container ?
Docker Hub says that a container is [_A standardized unit of software_](https://www.docker.com/resources/what-container). 
We will ignore that to a large extent.

For our understanding, we will think of a container as a _fancy_
process (yes, a process in linux*).

The fancy-ness of the process comes from the fact that this process is
running in a very isolated environment (from the process' perspective)
and restricted environment, even though this process is running a big
computer. This is because the process is living inside a _sandboxed
environment_ and has a very limited view of the outside world.

This is essentially a container. As we read on, we will learn about
how the _sandbox_ is implemented and how we can poke around the edges
of it.

## Container vs Virutal Machines ##

We learnt that a container is a fancy process; a Virtual Machine on
the other hand is an entire _virtual_ Operating System. It is not
difficult to see the differences from here. In a VM you set up an
entirely new OS. In a contianer you limit the execution envrionment of
the process. Essentially, a VM is a OS level isolation, while a
contianer is a process level isolation mechanism.

In fact, contianers rely on a lot of Linux Kernel features. These
features are so important for a container that when Docker runs on
Windows and MacOS, it sets up a way to run the linux kernel on top of
Windows or MacOs

## Docker Basics ##
If you are a complete beginner then I suggest to start playing with
the course at [Docker-Curriculum](https://docker-curriculum.com/).

As a refresher we will look at the common docker commands:

- docker build  -> build an image from a recipe 
- docker run    -> run an image
- docker stop   -> stop a running contianer
- docker kill   -> kill a running container
- docker ps     -> List running containers

# Namespaces and cgroups

Container is OS level virutalisation framework that uses namespaces
(provided by te linux kernel) to isolate system resources into
namespaces such that each process thinks that they have access to the
entire system. Its like a snadbox.

It also uses cgroups which is a linux kernel feature that is used to
limit and monitor the usage of certain critical system resouces like
CPU and memory.

So, with these tools, we can isolate process into a sandbox of their
own AND limit them with the amount of CPU/Memory they can use.

There is another interesting technology that is used. That is the
overlayfs2. This is the filesystem that powers docker.

Things are not that simple. There are other things like seccomp (which
is a mechanism that is used to limit the system calls that a process
can use.) 

(also capabilities)

In this post one we will only look at cgroups and namespaces.

# cgroups
Control Groups or cgroups are a kernel feature that lets us allocate
system resource to processes in a very granular way. Using cgroups you
can also do granular resource level accounting for tasks.

You can find the cgroups data-structure at `/sys/fs/cgroups` The
different directories represent the different subsystem (or
controller) which are used to control various resources. 

Cgroups is heirarchical in nature. Which means the child cgroup,
inherits the properties of the parent cgroup. Each directory in one of
these subsystems is a cgroup. There are multiple files is each of
these directories. This is how the kernel exposes the control
variables and accouting information. We will look at 3 of them in
_slight_ detail.

### Operations with cgroups ###

In order to create a new cgroup, we can just create a directory under
the desired controller (we can also use the `cgcreate` command). Once
you create a directory under any of the cgroups, relevant files for
that cgroup will automatically be created under that directory.

After a process is added to a cgroup, all child processess will be
created in that cgroup itself.created in that cgroup itself.

Quick refrence for operations (non exhaustive):

- `lscgroup` - to view all the cgroups present
- `systemd-cgls` - to view all cgroups
- `cat /proc/cgroups` - to show global stats
- `cat /proc/pid/cgroups` - to show the cgroups for a single process
- `cgdelete -g subsystem:groupname` - This will delete the control group.
- `<cgdir>/tasks` - This file contains the pids of all the processes in that cgroup
- `cgexec -g <subsystem>:<groupname> <process>` - This will run that process (and all child processess) in that cgroup.

## Cgroup demo - memory subsystem
In this demo we will look at the `memory` subsystem and do a small
exercise to solidify our understanding of how this works.

This is how the cgroup we created under the memory subsystem called `demom` looks just after creation.

![cg_mem](/assets/images/2020-09-26/cg_mem.png)

Quick Ref for the cg :

- `memory.failcnt` : shows how many times the tasks running in the group have reached the max limit
- `memory.limit_in_bytes` : controls the limit in bytes
- `memory.swappiness` : control the _eagerness_ with which swapping occurs
- `memory.usage_in_bytes` : shows accounting of the memory used by all the tasks in the cgroup
- `memory.tasks` : contains all the pids for all the tasks in this cgroup
- `memory.stat` : shows all memory related stats for this cgroup

### Steps ###
- create a new control group under the `sys/fs/cgroup/memory` directory
- start a bash shell and get its pid by `echo $$`
- check the cgroups of the shell using `cat /proc/$$/cgroup`
- put a shell in the cgroup that we created by adding the pid to `tasks` OR using `sudo cgexec -g memory:demo1 bash`
- Now, check the cgroups of the shell using `cat /proc/$$/cgroup` again. it should be different.
- set limit by `echo <value> > memory.limit_in_bytes`
> if this is smaller than `memory.usage_in_bytes` then we will get `resource busy` error
- set `echo 0 > memory.swappiness` (otherwise things will be sent to swap and OOM wont happen) (do not know why this happens) 
- now run something big in here (docker pull works..) and it should be killed.
- delete the cg using cgdelete

This is how `dmesg` looks when an OOM-kill occurs
![oom1](/assets/images/2020-09-26/oom1.png)
![oom2](/assets/images/2020-09-26/oom2.png)


#### [Detailed Memory Reference](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory) ####

## Cgroup demo - PID subsystem
We now do a demo with the pid subsystem to get a better understanding. 
This is very helpful as it will protect you case of a fork-bomb.

- create a new control group under the `sys/fs/cgroup/pid` directory
- put a shell in there by adding the pid to `tasks` OR using `sudo cgexec -g memory:demo bash`
- check `pids.max`. This should be set to `max` by default. This controls the number of tasks this cgroup can run (by limiting the no of pids)
- set limit by `echo 2 > pids.max` [default is `max`]
- Now run `$(cat tasks 1>&2)` (this creates 3 tasks)
- It should fail with `Resource Temporarily unavailable`

The whole demo looks like this. 

![pid1](/assets/images/2020-09-26/pid1.png)



##### Note: This is for cgroup v1. There is also cgroup2 which I havent looked at yet! #####


# Namespaces
Namespaces allow users to isolate the execution environment for a
process.  Currently there are 8 namespaces available (which means you
can isolate 8 different resources from your process):

- mount (`mnt`)
- process id (`pid`)
- network (`net`)
- IPC (`ipc`)
- time
- utc
- cgroup (`cgroup`)
- User(`user`)

## Pid and Network namspace.

- We can create namespces using the `unshare` command
- `unshare --fork --pid --net --mount-proc bash` - This command will run a bash shell in a different network and pid namespace.
    - This means, no internet (unless we manually enable it) and bash is running as `pid 1` (how cool is that ?)
    
To fix this we need to add a veth device to the new namespace and stuff.



# References
- [Life of a Container - Indradhanush Gupta](https://www.youtube.com/watch?v=mGWWTP1Jeso)
- [Alice Goldfuss - The Container Operators manual](https://www.youtube.com/watch?v=q1BnNRId0R4)
- [Julia Evans - What is even a container](https://jvns.ca/blog/2016/10/10/what-even-is-a-container/) 
- [PWL NYC - Bryan Cantril - Solaris Jails & Zones](https://www.youtube.com/watch?v=hgN8pCMLI2U)
- [Set Up container namespaces manually, ref 1](https://dev.to/polarbit/how-docker-container-networking-works-mimic-it-using-linux-network-namespaces-9mj)
- [Container Networking, ref 2](https://blog.scottlowe.org/2013/09/04/introducing-linux-network-namespaces/)
- [veth man page](https://man7.org/linux/man-pages/man4/veth.4.html)
- [LiveOverfllow video on Docker](https://www.youtube.com/watch?v=-YnMr1lj4Z8)
- [what are containers made from](https://www.youtube.com/watch?v=sK5i-N34im8)
- [Gitbook - Linux Insides - Control Groups](https://0xax.gitbooks.io/linux-insides/content/Cgroups/linux-cgroups-1.html)
- [Detailed Memory CGroup Reference](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/resource_management_guide/sec-memory)
- [Capabilities man page](https://man7.org/linux/man-pages/man7/capabilities.7.html)
