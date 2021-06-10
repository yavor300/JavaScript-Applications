export function setupHome(section, navigation) {
    section.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        navigation.goTo('dashboard');
    });

    return showHome;

    function showHome() {
        return section;
    }
}