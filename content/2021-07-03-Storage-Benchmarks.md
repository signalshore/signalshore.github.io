Title: Storage-Benchmark
Date: 2021-07-03
Tags: CS, Tech
<!-- Summary: Started using the Raspberry-Pi4 seriously and ran sone benchmarks testing out a Fan-Case that is locally available in India. -->

I bought myself a 5TB external Hard-drive from Seagate. I am going to use this for my home-server build. The computer will the the Raspberry-Pi which I already own. I think its time to up my seeding game. Before installing it on my server I wanted to run some benchmarks on it.


- [What am I Benchmarking ?](#what-am-i-benchmarking-)
- [Why am I doing this ?](#why-am-i-doing-this-)
- [The setup ?](#the-setup-)
- [Benchmark Results](#benchmark-results)
    - [Laptop 128Gb Usb drive](#laptop-128gb-usb-drive)
    - [Laptop 5TB HDD](#laptop-5tb-hdd)
    - [Raspberry Pi 128GB Usb drive](#raspberry-pi-128gb-usb-drive)
    - [Raspberry pi 5TB hdd](#raspberry-pi-5tb-hdd)


# What am I Benchmarking ?
In this Benchmark I will be comparing the performance of the HDD in various filesystem configurations. The test will be done on my laptop and on the Raspberry Pi.

I will also use a SanDisk 128GB USB  drive and measure its performance just for fun.

# Why am I doing this ?
I like Benchmarks for some reason.
I also think that this is fun. I learnt a LOT about how these devices work while trying to prepare this benchmark.
I think its fun.

and most importantly,
I want to find out if using btrfs + luks on the entire 5TB drive will be worth it, especially since my server will be a raspberry pi. The discussion of my server build is not in scope for this document, I will visit that later.

# The setup ?
There are two drives. One is a 128GB SanDisk USB pen-drive, the other is a Seagate 5TB Backup Plus external 2.5 inch HDD.

Each drive is partitioned into 4 partition of equal size. Then filesystems are built on these partitons.
I want to test two file-systems; btrfs and ext4.
I want to test full disk encryption using Luks along with these file-systems.

I already know that btrfs is going to be slower that ext4, I just want to know by how much.


The following combinations were created

    :::bash
    | part type    | allocation | label     |
    | ------------ | ---------- | --------- |
    | ext4         | 25%        | ext4Only  |
    | luks + ext4  | 25%        | ext4Lks   |
    | btrfs        | 25%        | btrfsOnly |
    | luks + btrfs | 25%        | btrfsLuks |


This is the output from `parted`

    :::bash
    (parted) print
    Model: SanDisk Ultra USB 3.0 (scsi)
    Disk /dev/sda: 123GB
    Sector size (logical/physical): 512B/512B
    Partition Table: msdos
    Disk Flags:

    Number  Start   End     Size    Type     File system  Flags
    1      1049kB  30.8GB  30.8GB  primary  ext4         lba
    2      30.8GB  61.5GB  30.8GB  primary               lba
    3      61.5GB  92.3GB  30.8GB  primary  btrfs        lba
    4      92.3GB  123GB   30.8GB  primary               lba

We build a `btrfs` filesystem(s) in single data-mode. This makes sure that btrfs as a ile-system is not being too smart and just writes data into disks as they arrive.

In the partitions where encryption was set-up we first build a luks encrypted volume and then build the filesystem on top of it.

Then we mount all of the partitions under  `/mnt/`. It looks like this

    :::bash
    ~ ❯❯❯ lsblk /dev/sda
    NAME          MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
    sda             8:0    1 114.6G  0 disk
    ├─sda1          8:1    1  28.7G  0 part  /mnt/ext4Only
    ├─sda2          8:2    1  28.7G  0 part
    │ └─ext4Luks  253:4    0  28.7G  0 crypt /mnt/ext4Luks
    ├─sda3          8:3    1  28.7G  0 part  /mnt/btrfsOnly
    └─sda4          8:4    1  28.7G  0 part
    └─btrfsLuks 253:3    0  28.7G  0 crypt /mnt/btrfsLuks


I am using this tool called `fio` for running the benchmark and I am using `netdata` for reporting the state of the system and for displaying fancy visualizations.

Using fio, you can run multiple tests, but the one i focused on were the sequential read and write tests.

I wrote a script that would perform a write test, followed by a read test on each of the 4 partitions going serially (i.e. ext4Only, ext4Luks, btrfsOnly, btrfsLuks).

In the throughput graph, the writes are in negative.

I also measured the CPU and the temp of the Raspberry-pi.

In total, I had to run the script 4 times on my laptop
- ssd
- hdd
- ssd 4m
- hdd 4m

(we will get to the point of teh 4m at a later moment)

All the data along with the shitty script will be available for public.

/// write about fio things like bs and size etc
# Benchmark Results
Sharing the screenshots of the Netdata dashboard highlighting the disk I/O for tests run on my laptop (the control).
For tests run on the Raspberry-Pi I was also looking at CPU, Temp and Disk I/O. Those charts are also present below.

The results will be summarized in a table at the end.

I ran the tests with block-size as 4K initially, but then discovered that changing it to 4M was giving me better throughput.
The charts below are for the 4M tests.

The data-dump will have all the results for you to look at if you want to.
There is something really interesting wrt the Raspberry Pi when we use a higher block size. A section will be there that talks about it.

## Laptop 128Gb Usb drive
![laptop_ssd_4M](/assets/2021-07-03-Storage-Benchmarks/SSD_USB/Laptop/4M/laptop_ssd_4M.png)
## Laptop 5TB HDD
![hdd_laptop_4M](/assets/2021-07-03-Storage-Benchmarks/5_TB/Laptop/4M/hdd_laptop_4M.png)

## Raspberry Pi 128GB Usb drive
![rpi_ssd_4M](/assets/2021-07-03-Storage-Benchmarks/SSD_USB/RPI/4M/rpi_ssd_4M_io.png)
> Disk I/O

![rpi_ssd_4M](/assets/2021-07-03-Storage-Benchmarks/SSD_USB/RPI/4M/rpi_ssd_4M_cpu.png)
> CPU Utilization and Load Average

![rpi_ssd_4M](/assets/2021-07-03-Storage-Benchmarks/SSD_USB/RPI/4M/rpi_ssd_4M_temp.png)
> Temp
## Raspberry pi 5TB hdd
![](/assets/2021-07-03-Storage-Benchmarks/5_TB/RPI/4M/rpi_hdd_4M_io.png)
> Disk I/O

![](/assets/2021-07-03-Storage-Benchmarks/5_TB/RPI/4M/rpi_hdd_4M_cpu.png)
> CPU Utilization and Load Average

![](/assets/2021-07-03-Storage-Benchmarks/5_TB/RPI/4M/rpi_hdd_4M_temp.png)
> Temp