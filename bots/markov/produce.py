import json 
import random
from math import ceil
from os import environ
from os.path import join

def produce(nlen=500):
    with open( join( environ.get('PYTHONPATH'),'markov/metrics.json')) as metfile:
        metrics = json.loads(json.load(metfile))
    while True:
        try:
            words = list(metrics.keys())
            
            ref = random.choice(words)
            #ref = "hola" 
            text = ref+" "

            for k in range(ceil( nlen/len(ref.split(" ")) )):
                words = list(metrics[ref].items())

                sortfunc = lambda x: x[1]
                words.sort(key = sortfunc, reverse=True)

                if len(words)>3:
                    best = words[random.randint(1,3)]
                else:
                    best = words[0]

                tries = 0
                while (best[0] in text):
                    best = random.choice(words)
                    tries += 1
                    if tries>10:
                        tries = 0
                        break

                #print("best", best)
                text += best[0]+" "
                ref = best[0].split(' ')[-1]
        except KeyError:
            continue
        else:
            break
    
    return " ".join(text.split(" ")[:nlen])

if __name__ == '__main__':
    text = produce()
    print(text)
