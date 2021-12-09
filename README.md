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

The goal for this project was to build upon our last project, [weatherdata-project](https://github.com/Jagjeet/weatherdata-project), by using the same historical weather data from NOAA to create a machine learning model. This model, when given a date and location, should be capable of predicting the tempature. 

* ETL
* Create Machine Learning Model 
* Deploy a Dashboard using a flask app 
* Add interactivity to the dashboard


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
