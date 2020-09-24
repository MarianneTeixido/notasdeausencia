import tweepy
import json
import os
import datetime
from secrets import consumer_key, consumer_secret, access_token, access_token_secret

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
api.wait_on_rate_limit = True


while True:
    for query in [
        "(#desaparecidas OR desaparecidas) AND (madre OR Madres OR hija OR esposa OR novia OR pareja)",
        "feminicidio",
        "ayúdanos a encontrar a OR hasta encontrarlas OR la buscamos OR ella desapareció",
        "#MéxicoFeminicida OR #MexicoFeminicida",
        "#MadresEnBusqueda OR #MadresenBúsqueda",
        "#ViolenciadeGénero OR #ViolenciadeGenero",
        "#Niunamenos OR #Niunamas OR #Niunamás OR #NiUnaMás OR #niunamenos OR #niunamas OR #niunamás",
        "#Antigrita AND #cndh OR #CNDH" 
    ]:
        cursor = tweepy.Cursor(api.search,
                               q=query,
                               count=1,
                               tweet_mode='extended')

        try:

            tweets = [tweet for tweet in cursor.items()]
            for tweet in tweets:
                tweet.retweet()

        except tweepy.error.TweepError as error:
            print("tweepy error ", error)
            with open(os.path.join( os.environ.get('PYTHONPATH'), 'logs/twiter_bot.txt'), 'a') as logfile:
                logfile.write('{}: {}\n'.format(datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%s'), error))
        except tweepy.error.RateLimitError as error:
            with open(os.path.join( os.environ.get('PYTHONPATH'), 'logs/twiter_bot.txt'), 'a') as logfile:
                logfile.write('{}: {}\n'.format(datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%s'), error))
            print("tweepy rate limit error ", error)
        else:

            textos = [t._json for t in tweets]

            for tweet in textos:
                tweet_id = tweet['id']
                print(tweet_id)

                if not os.path.exists('tweets/{}.json'):
                    with open('tweets/{}.json'.format(tweet_id), 'w') as archivo:
                        archivo.write(json.dumps(tweet))
                

            print(":)")

