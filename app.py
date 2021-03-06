from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
from datetime import datetime
from dotenv import load_dotenv
import os
import pickle
import time

load_dotenv()

# Load the model
model = pickle.load(open('./AB.pkl','rb'))

# Create an instance of Flask
app = Flask(__name__)


# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/USWeather")
# mongo = PyMongo(app, uri="mongodb://localhost:27017/USWeatherAgg")
#mongo = PyMongo(app, uri=f"mongodb+srv://{mongodb_user}:{mongodb_pw}@cluster0.gq7sf.mongodb.net/USWeatherAgg")
mongo = PyMongo(app, uri=f"mongodb+srv://{os.environ.get('mongodb_user')}:{os.environ.get('mongodb_pw')}@cluster0.gq7sf.mongodb.net/USWeatherAgg")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

# Route to render index.html template using data from Mongo
@app.route("/index.html")
def backhome():
    # Return template and data
    return render_template("index.html")

# Route to render index.html template using data from Mongo
@app.route("/Map.html")
def maps():
    # Return template and data
    return render_template("Map.html")

# Route to render mlpage.html template
@app.route("/mlpage.html")
def mlpage():
    # Return template and data
    return render_template("mlpage.html")

# Route to render readme.html template
@app.route("/readme.html")
def readme():
    # Return template and data
    return render_template("readme.html")


@app.route('/predict',methods=['POST'])
def predict():

    
    

    # Get the data from the POST request.
    if request.method == "POST":
        today_year = time.strftime("%Y")
        today_month =time.strftime("%m")
        today_day = time.strftime("%d")
        #data = request.get_json(force=True)
        print(request.form['lat'])
        print(request.form['lon'])
        print(today_year, today_month, today_day)
        lat = (request.form['lat'])
        lon = (request.form['lon'])
        data = (today_year,today_month,today_day,lat,lon)
        print(data)
        print("Data", model.predict([[today_year,today_month,today_day,lat,lon]]))
        # Make prediction using model loaded from disk as per the data.
        prediction = model.predict([[today_year,today_month,today_day,lat,lon]])
        output = round(prediction[0],2)
        
    return render_template("mlpage.html", output=output, exp=data)

       



# Get all unique station ids
# Using techniques from:
# https://www.geeksforgeeks.org/python-mongodb-distinct/
@app.route("/api/v1.0/weatherdata/stations")
def weather_stations():
    db_data = mongo.db.collection.distinct('USAF')
    parsed = [x for x in db_data]
    parsed.sort()
    # print('parsed: ', parsed)
    return jsonify(parsed)

# Get all unique station ids
# Using techniques from:
# https://www.geeksforgeeks.org/python-mongodb-distinct/
@app.route("/api/v1.0/weatherdata/stations2")
def weather_stations2():
    db_data = mongo.db.collection.distinct('USAF')
    db_station_data = mongo.db.collection.distinct('STATION NAME')

    parsed = [x for x in db_data]
    station_parsed = [x for x in db_station_data]

    zipped = zip(station_parsed, parsed)

    # print(zipped)
    # print('parsed: ', parsed)
    return jsonify(dict(tuple(zipped)))

# Get all unique station ids for specified period
@app.route("/api/v1.0/weatherdata/period/stations/<start>/<end>")
def weather_period_stations(start, end):

    # Expects that start and end strings are formatted as YYYY-MM-DD (eg. 2018-01-01)
    start_dt = datetime.strptime(start, '%Y-%m-%d')
    end_dt = datetime.strptime(end, '%Y-%m-%d')

    db_data = mongo.db.collection.distinct('USAF',
                                            {"$and":
                                                [
                                                    {'YEARMODA': {'$gt': start_dt}},
                                                    {'YEARMODA': {'$lt': end_dt}}
                                                ]
                                            })
    parsed = [x for x in db_data]
    parsed.sort()
    # print('parsed: ', parsed)
    return jsonify(parsed)
# print(mycollection.distinct("item.code", {"dept" : "B"}))

@app.route("/api/v1.0/weatherdata/period/<start>/<end>/<station_id>")
def weather_period(start, end, station_id):

    # Expects that start and end strings are formatted as YYYY-MM-DD (eg. 2018-01-01)
    start_dt = datetime.strptime(start, '%Y-%m-%d')
    end_dt = datetime.strptime(end, '%Y-%m-%d')

    db_data = mongo.db.collection.find(
                                    {"$and":
                                        [
                                            {'YEARMODA': {'$gt': start_dt}},
                                            {'YEARMODA': {'$lt': end_dt}},
                                            {'USAF': {'$eq': station_id}}
                                        ]
                                    },
                                    {'_id': False})

    parsed = [x for x in db_data]
    parsed.sort(key=lambda x: x['YEARMODA'], reverse=True)
    # print('parsed: ', parsed)
    return jsonify(parsed)
    
@app.route('/<state>/<year>/data')
def db_data(state, year):

    db_data = mongo.db.collection.find(
                                    {"$and":
                                        [
                                            {'STATE': state},
                                            {'YEAR': float(year)}
                                        ]
                                    }, 
                                    {'_id': False})
    print('this route was pinged')
    parsed = [x for x in db_data]
    # print('parsed: ', parsed)
    return jsonify(parsed)

if __name__ == '__main__':
    app.run(debug=True)
