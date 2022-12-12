#!/usr/bin/env bash

### Set initial time of file
LTIME=`stat -c %Z $1`

while true    
do
   ATIME=`stat -c %Z $1`

   if [[ "$ATIME" != "$LTIME" ]]
   then
       echo "RECOMPILING ..."
       pdflatex $1
       pdflatex $1
       LTIME=$ATIME
   fi
   sleep 5
done
