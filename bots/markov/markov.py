from os import listdir, environ
from os.path import isfile, join
from collections import defaultdict, Counter
from get_metrics import get_metrics
from export_json import export_json

raw_dir = join(environ.get("PYTHONPATH"), "../textos/")
raw_filelist = listdir(raw_dir)
raw_filelist = [filename for filename in raw_filelist if isfile(join(raw_dir, filename))]

def markov():

    metrics = defaultdict(Counter)
    for filename in raw_filelist:
        metrics = get_metrics(join(raw_dir,filename))
        
    export_json(metrics)

if __name__ == "__main__":
    markov()
