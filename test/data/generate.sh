#!/bin/sh -xe

# Get & compile `djenrandom` from https://github.com/dj-on-github/djenrandom

base="../../../djenrandom"

$base/djenrandom -b -k 128 > megabitrand.bin
$base/djenrandom -b -k 128 -m biased --bias=0.4 > biased_megabitrand.bin
$base/djenrandom -b -k 128 -m correlated --correlation=-0.2 > correlated_megrandom.bin
$base/djenrandom -b -k 128 -m sums -l 0.2 -r 0.3 > sums_megrandom.bin
