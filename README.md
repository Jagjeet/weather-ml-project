# Weather ML- Project IV

<p align="center"> 
<img src="https://th.bing.com/th/id/R.a9439206c39f80ebc53970a0dced8687?rik=%2f%2frGKOh9TI2DPQ&pid=ImgRaw&r=0" width="500"/>
</p>

<br></br>
<b>
<p align="center">
Goals:
</p>
</b>

The goal for this project was to build upon our last project, [weatherdata-project](https://github.com/Jagjeet/weatherdata-project), by using the same historical weather data from NOAA to create a machine learning model. This model, when given a date and location, should be capable of predicting the temperature. 

* ETL
* Create Machine Learning Model 
* Deploy a Dashboard using a flask app 
* Add interactivity to the dashboard

<br></br>
<b>
<p align="center">  
Data Used:
</p>
</b>

<p align="center">  
<img src="https://storage.googleapis.com/kaggle-competitions/kaggle/3136/media/kaggle-transparent.svg" alt="NOAA Logo" width="200"/>
</p>

<p align="center">  
<img src="https://www.omao.noaa.gov/sites/default/files/media/NOAA-Logo_large_no%20back.png" alt="NOAA Logo" width="200"/>
</p>

Our data came from a NOAA GSOD dataset that was pulled and put into Kaggle, which can be found here: <a href="https://www.kaggle.com/noaa/noaa-global-surface-summary-of-the-day" target="_top">Kaggle Data</a>. Per the link:
"This dataset is identical to Kaggle's NOAA GSOD dataset using BigQuery. The data for both datasets updates on the same basis (daily) but may not be updated on the same time. Data from this dataset can be downloaded/accessed through this dataset page and Kaggle's API...

<p align="center">  <b>Content</b></p>
The online data files begin with 1929 and are at the time of this writing at the Version 8 software level. Over 9000 stations' data are typically available. The daily elements included in the dataset (as available from each station) are: Mean temperature (.1 Fahrenheit) Mean dew point (.1 Fahrenheit) Mean sea level pressure (.1 mb) Mean station pressure (.1 mb) Mean visibility (.1 miles) Mean wind speed (.1 knots) Maximum sustained wind speed (.1 knots) Maximum wind gust (.1 knots) Maximum temperature (.1 Fahrenheit) Minimum temperature (.1 Fahrenheit) Precipitation amount (.01 inches) Snow depth (.1 inches) Indicator for occurrence of: Fog, Rain or Drizzle, Snow or Ice Pellets, Hail, Thunder, Tornado/Funnel Cloud.
<br></br>
<p align="center"> <b> Acknowledgements</b></p>
Dataset Source: NOAA. This dataset is publicly available for anyone to use under the following terms provided by the Dataset Source — http://www.data.gov/privacy-policy#data_policy — and is provided "AS IS" without any warranty, express or implied, from Google. Google disclaims all liability for any damages, direct or indirect, resulting from the use of the dataset."

## Usage

### Data Setup

* Clone the respository
* Download and copy [weather data from Kaggle](https://www.kaggle.com/noaa/noaa-global-surface-summary-of-the-day)
* Unzip and copy tar files of each year to `Resources` directory
* Create a `Data` directory
* Update `Project4.ipynb` variables and output
  * Setup basedir for where location of your `Resources` and `Data` directories. (eg. `./`)
  * Comment out sections for data output to CSV/Mongo/SQLlite depending on the output required

### Run Development Server

* Run `flask run`
* Open the root webpage in a web browser

### Machine Learning

* Overview
<br></br>
  Our goal was to do some analyses and run some test with machine learning algorithms on a set of data that contained temperature information for every month of the year and in many states.
  Based on these machine learning tests, that would study our data, we wanted to see if we are able to predict the temperature.
  We used Supervised Machine learning. Supervised Machine learning is defined by its use of labeled datasets to train algorithms, to classify data or predict outcomes accurately. As the input data is fed into the model, it adjusts its weights until the model has been fitted appropriately, which occurs as part of the cross-validation process. 
 
We also tried to use different type of regression and prediction models such as:
<br></br>
•	LinearRegression
•	KNeighborsRegressor
•	RandomForestRegressor
•	ExtraTreesRegressor
•	SVR
<br></br>
AdaBoost model worked more accurately with our train and test data and the prediction was more accurate as well. 
<p align="center"> 
<img src=https://user-images.githubusercontent.com/84758824/145517546-ee04baaf-c395-43d1-81cb-5daf648f92e3.PNG width="500"/>
</p>

