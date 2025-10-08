#ler um aqrquivo json
import json

with open('simulado-final.json', 'r', encoding='utf-8') as arquivo:
    dados = json.load(arquivo)
    
print(dados)