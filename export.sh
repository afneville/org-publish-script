#!/usr/bin/env bash

rm -rf ./out
mkdir -p out/ out/html out/latex
mkdir -p out/html/res
mkdir -p out/html/blog/res

emacs -q --script publish.el
