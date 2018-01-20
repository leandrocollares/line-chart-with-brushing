# Line chart with brushing

This interactive visualization comprises a focus chart and a small context chart. By selecting the x-domain range in the context chart, users can control the amount of data shown in the focus chart. 

Implemented with D3.js version 4.x, the visualization was adapted from Mike Bostock's [Brush & Zoom block](https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172).

## Getting started

* Clone or download the repository. 

* Run a local web server<sup>1</sup> so that the external data file can be loaded.

* Interact with the line chart in your web browser.

<sup>1</sup> If Python is installed on the computer, execute one of the following to run a web server locally on port 8000: 

* ```python -m SimpleHTTPServer 8000 ``` for Python 2.x
* ```python -m http.server 8000 ``` for Python 3.x

## Data source

Government of Canada - [Historical Climate Data](http://climate.weather.gc.ca/historical_data/search_historic_data_stations_e.html?searchType=stnName&timeframe=1&txtStationName=VICTORIA+INTL+A&searchMethod=contains&optLimit=yearRange&StartYear=1840&EndYear=2017&Year=2017&Month=12&Day=21&selRowPerPage=25)
