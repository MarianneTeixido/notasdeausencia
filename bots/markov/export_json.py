import json
from os import environ
from os.path import join

def export_json(metrics, filename=join(environ.get("PYTHONPATH"), "markov/metrics.json")):
    
    json_metrics = json.dumps(metrics, ensure_ascii=False)
    
    with open(filename,"w", encoding="utf8") as json_file:
        json.dump(json_metrics, json_file, ensure_ascii=False)
    
    """
    with open("metrics.js","w", encoding="utf8") as js_file:
        js_file.write("const metrics = ")
        js_file.write(str(json_metrics))
    """
    
    return json_metrics
