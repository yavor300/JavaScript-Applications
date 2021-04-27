function attachEvents() {
    const submitBtn = document.querySelector('#submit');
    submitBtn.addEventListener('click', getForecast);
}
attachEvents();

async function getForecast() {
    const weatherSymbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degree': '&#176',
    };

    const selectedLocation = await getSelectedLocation();

    const [currentConditions, threeDayForecast] = await Promise.all(
        [
            getCurrentConditions(selectedLocation.code),
            getThreeDayForecast(selectedLocation.code)
        ]
    );

    createCurrentConditionsDOM();
    createThreeDayForecast();

    async function getThreeDayForecast(code) {
        const response = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
        return await response.json();
    }

    async function getSelectedLocation() {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const response = await fetch(url);
        const data = await response.json();

        let selectedLocation;

        data.forEach(location => {
            if (location.name.toUpperCase() === document.querySelector('#location').value.toUpperCase()) {
                selectedLocation = location;
            }
        });

        return selectedLocation;
    }

    async function getCurrentConditions(code) {
        const response = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
        return await response.json();
    }

    function createThreeDayForecast() {
        const divForecastInfo = createElement('div', '');
        divForecastInfo.classList.add('forecast-info');
        appendElements(document.querySelector('#upcoming'), divForecastInfo);

        threeDayForecast.forecast.forEach(day => {
            //cond//low//high
            const spanUpcoming = createElement('span');
            spanUpcoming.classList.add('upcoming');
            const spanSymbol = createElement('span');
            spanSymbol.innerHTML = weatherSymbols[day.condition];
            spanSymbol.classList.add('symbol');
            const spanTemps = createElement('span', `${day.low}°/${day.high}°`);
            spanTemps.classList.add('forecast-data')
            const spanCondition = createElement('span', `${day.condition}`);
            spanCondition.classList.add('forecast-data');
            appendElements(spanUpcoming, spanSymbol, spanTemps, spanCondition);
            appendElements(divForecastInfo, spanUpcoming);
        });
    }

    function createCurrentConditionsDOM() {
        const divForecasts = createElement('div', '');
        divForecasts.classList.add('forecasts');
        const spanSymbol = createElement('span', '');
        spanSymbol.innerHTML = weatherSymbols[currentConditions.forecast.condition];
        spanSymbol.classList.add('condition', 'symbol');
        appendElements(divForecasts, spanSymbol);
        document.querySelector('#current').appendChild(divForecasts);

        const spanCondition = createElement('span');
        spanCondition.classList.add('condition');

        const spanLocationName = createElement('span', currentConditions.name);
        spanLocationName.classList.add('forecast-data');
        const spanLocationTemps = createElement('span', `${currentConditions.forecast.low}°/${currentConditions.forecast.high}°`);
        spanLocationTemps.classList.add('forecast-data')
        const spanLocationWeatherType = createElement('span', `${currentConditions.forecast.condition}`);
        spanLocationWeatherType.classList.add('forecast-data')

        appendElements(spanCondition, spanLocationName, spanLocationTemps, spanLocationWeatherType);

        appendElements(divForecasts, spanCondition);

        document.querySelector('#forecast').style.display = 'block';
    }

    function createElement(type, content) {
        const result = document.createElement(type);
        result.textContent = content;
        return result;
    }

    function appendElements(parent, ...children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
        return parent;
    }
}



