from flask import Flask, render_template, request, jsonify, abort
import numpy as np

app = Flask(__name__)

# Define the data science MODEL
def return_random_number(seed_value=None, num_vals=10):
	if seed_value is not None:
		np.random.seed(seed_value)

	r = np.random.randint(0, 10, num_vals)
	return list(r)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process():
	content = request.get_json()

	seed_value = content.get('seed_value')
	array_len = content.get('array_len')

	# Handle case where there is no input or input is NOT an integer
	try:
		seed_value = int(seed_value)
	except:
		seed_value = None

	try:
		array_len = int(array_len)
	except:
		array_len = 10

	return jsonify(random_int=return_random_number(seed_value, array_len),
				   seed_value=seed_value)



if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True, host='0.0.0.0')

