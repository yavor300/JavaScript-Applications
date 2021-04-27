function solve() {
    const info = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let id = 'depot';

    async function getNextStop(id) {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${id}`);
        return await response.json();
    }

    async function depart() {
        const nextStop = await getNextStop(id);
        info.textContent = `Next stop ${nextStop.name}`;

        departBtn.disabled = true;
        arriveBtn.removeAttribute('disabled');
    }

    async function arrive() {
        const nextStop = await getNextStop(id);
        info.textContent = `Arriving at ${nextStop.name}`;
        id = nextStop.next;

        arriveBtn.disabled = true;
        departBtn.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();