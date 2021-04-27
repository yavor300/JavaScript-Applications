async function getInfo() {
    const stopId = document.querySelector('#stopId').value;

    try {
        await getStopData(stopId);
    } catch (err) {
        document.querySelector('#stopName').textContent = 'Error';
    }
}

async function getStopData(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${id}`);
    const data = await response.json();

    document.querySelector('#stopName').textContent = data.name;
    for (let [key, value] of Object.entries(data.buses)) {
        appendElements(document.querySelector('#buses'),
            createElement('li', `Bus ${key} arrives in ${value} minutes`));
    }
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