#!/bin/bash

# for testing only
cd ..
source env/bin/activate
cd api
flask run --host=127.0.0.1 --port=5000 &
