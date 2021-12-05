# weather-ml-project

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
