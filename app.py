from flask import Flask, render_template, request
import pandas as pd
import json

app = Flask(__name__)

# 加载字典数据
dict_data = pd.read_csv('templates/字典數據.csv', encoding='utf-8')

# 加载异体字数据
with open('templates/異體字數據.json', encoding='utf-8') as f:
    variant_chars = json.load(f)

# 首页
@app.route('/')
def index():
    return render_template('index.html')

# 查询字的释义和异体字的释义
@app.route('/search', methods=['POST'])
def search():
    char = request.form.get('char')
    definition = dict_data[dict_data['字'] == char]['釋義'].iloc[0]
    variants = variant_chars.get(char, [])
    return render_template('search.html', char=char, definition=definition, variants=variants)

if __name__ == '__main__':
    app.run(debug=True)
