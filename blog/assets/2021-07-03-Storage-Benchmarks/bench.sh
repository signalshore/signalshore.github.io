#!/usr/bin/env bash

# pass the name of the test as an arg

DEST="ext4Only ext4Luks btrfsOnly btrfsLuks"
MODE="write read"
SIZE=2G

echo Start: $(date)
echo "================================="
echo "$1"
echo "Beginning Test"
echo "Mode: $MODE"
echo "Size: $SIZE"
echo "================================="

for i in $DEST; do
    rm /mnt/$i/test.file
    for m in $MODE; do
        echo $(date) " :=> " $i-$m | tee -a $i-$1.report
        echo "========================================" | tee -a $i-$1.report
        fio --bs=4M --rw=$m --direct=1 --ioengine=libaio  --size=$SIZE --name=$i --iodepth=64 --filename=/mnt/$i/test.file  >> $i-$1.report
        echo "" | tee -a $i-$1.report
        echo "Sleeping for 10s"
        sleep 10
    done
    echo "================================="
    echo "         New File-System         "
    echo "================================="
    echo "Sleeeping for 20s"
    sleep 20s
done

echo End: $(date)
echo "================================="
echo "           Ending Test           "
echo "================================="