from flask import Flask, url_for, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/table')
def table():
    return render_template('table.html')

@app.route('/visualizations')
def visualizations():
    return render_template('gender.html')

@app.route('/ageVisualizations')
def ageVisualizations():
    return render_template('age.html')



if __name__ == '__main__':
    app.run()
