import json
import os
from collections import Counter

tweets_dir = './tweets'


filters = ['a','durante', 'según', 'ante', 'en', 'sin', 'bajo', 'entre', 'so',
        'cabe', 'hacia', 'sobre', 'con', 'hasta', 'tras', 'contra', 'mediante',
        'versus','de', 'para', 'vía', 'desde', 'por',
        'el','ella','los','las','les','un','una','uno','y',
        'la','que','rt','del','sus','nos','son','sus',
        'me','este','e','le','o','más','al','han','si','pero'
        'si','he','o','mas','mi','su','no','se','es','fue',
        'parte','fueron','lo','esta','están','q',
        'como','pero','este','estas','estos','juarezvero','2019httpstco3ngkotanqg','drippyjb',
        'mil','tres','años','eso',
        'hay','dia','enero','año','solo','ese','algun','perrito','todo','sido','está','dia',
        'algún', 'así', 'así','redoblar','ccsj', 'ser', 'facultaron', 'van',
        'inmediata', 'pregunto', 'dia','día','dos', 'general',
        'httpstcoqmyl2deupz', 'danielarearea', 'tumbaburross', 'parejaspero',
        'blairftcamz','palominolaidi1', 'chusma99', 'httpstcoagyjqil4ua',
        'httpstcomkzrh9ke3u', 'flinpleis', 'pipehenriquezo', 'robertobarquin',
        'diciembreahora', 'rutaelectoralmx', 'desaparecidasque',
        'desaparecidasde', 'salomóndesapareció', 'cap2divorcio', 'marcajeleg',
        'santelicesno', 'dfrg09', 'unaalienada', 'estradapaty', 'carvallo58',
        'chucho', 'per', 'min','dias', 'días','xstethic', 'sayra8a',
        'mimpamariateguinofcoronavirus', 'cierto', 'zonadocs',
        'annafleischer14', 'linardellimaru', 'marijehristova', 'garcía',
        'hacia', 'vos'
        ''
       ]


def read_text(path):
    full_texts = set()
    texts_list = [l for l in os.listdir(path) if
                  os.path.isfile(os.path.join(path, l))]

    for text_file in texts_list:
        with open(os.path.join(path, text_file)) as f:
            text = f.read()
            full_texts.add(text)
    return full_texts

def read_tweets(path):
    full_texts = set()
    texts_list = os.listdir(path)

    for text_file in texts_list:
        with open(os.path.join(path, text_file)) as f:
            text = json.load(f)
            text = text.get('full_text')
            full_texts.add(text)
    return full_texts

def split_words(full_texts, filter_words=[]):
    unique_words = set()
    for full_text in full_texts:
        splitted_words = [word for word in full_text.split(' ') if word!='']
        splitted_words = ["".join(filter(str.isalnum, word)) for word in splitted_words]
        splitted_words = [word for word in splitted_words if word not in filter_words]
        splitted_words = [word for word in splitted_words if not 'http' in word]
        splitted_words = [word for word in splitted_words if not word.isnumeric()]
        splitted_words = [word for word in splitted_words if len(word) > 2]
        
        words = set(splitted_words)
        unique_words.update(words)
    return unique_words

def generate_count(full_texts, unique_words):
    counts = Counter()
    for full_text in full_texts:
        words = full_text.split(' ')
        for word in unique_words:
            if word == '': continue

            counts[word] += words.count(word)
    for word in counts:
        counts[word] += 1

    return counts

def export_to_json(name, counts):
    ordered_counts = counts.most_common()

    with open('analysis_{}.json'.format(name), 'w') as f:
        json.dump(counts, f)
    
    with open('analysis_ordered_{}.json'.format(name), 'w') as f:
        json.dump({'ordered': ordered_counts}, f)


a = read_text('../textos')
b = split_words(a, filters)
c = generate_count(a, b)  
export_to_json('twitter',c)

