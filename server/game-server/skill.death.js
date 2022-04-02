const removeItemAll = (arr, value) => {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}
const pushItemAll = (arr, value) => {
    if (arr.indexOf(value) > -1) return arr.indexOf(value);
    return arr.push(value) - 1;
}

function death(uni, bo, game) {
    let unit = uni;
    let unitBox = bo.scene;
    let settings = unit.skills.death;
    
    removeItemAll(unitBox.css, 'death');

    if (settings.hp < 1) {

        settings.cd = JSON.parse(JSON.stringify(settings.cdDur));
        settings.hp = JSON.parse(JSON.stringify(settings.health));
        settings.death = true;

    }
    if (settings.death) pushItemAll(unitBox.css, 'death');

    if (settings.death) {
        if (settings.cd == 0) settings.death = false; 
        --settings.cd;
    };
}

module.exports = death;