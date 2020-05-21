from collections import defaultdict, Counter
#from normalize import normalize
normalize = lambda x: x

def get_metrics(filepath, metrics=defaultdict(Counter), stride=3, normfunc=normalize):

    with open(filepath,"r") as text:
        words = text.read()

        words = words.replace("\n"," ")
        words = words.split(" ")

        if normfunc is not None:
            words = normfunc(words)

        words = [word for word in words if word != ""]
        
        for n in range(0,len(words)-stride):
            word = words[n]
            ref = [words[n+k] for k in range(1, stride+1)]
            ref = " ".join(ref)
            metrics[word][ref] += 1
            
        return metrics


