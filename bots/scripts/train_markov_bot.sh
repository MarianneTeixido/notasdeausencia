#!/bin/bash
cd ..
source env/bin/activate
echo $PYTHONPATH
python3 markov/markov.py
