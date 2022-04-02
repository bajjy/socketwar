const { Scene } = require('./class.scenecast.js');
const { set } = require('animejs');
const vstank = require('./conf.vstank.js');

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
const fxBlastWall = (box) => {
    return { 
        css: ['map-blast'],
        fxLifetime: 15,
        width: 32,
        height: 32,
        depth: 1,
        x: box.axis.x.translate - 32 / 2,
        y: box.axis.y.translate - 32 / 2,
        z: box.axis.z.translate
    }
};
const mapAlteration = (cell, settings) => {
    if (cell.skills && cell.skills.death) {
        cell.skills.death.hp -= settings.power;
    }
};

var mv = (box, ax, speed, game, settings) => {
    let damage;
    let corrSpeed = speed;
    let blockers = ['tank-container', 'brick-container', 'fire-container'];
    let collisions = game.collision.intersections(box.index, {
        [ax]: speed
    });
    
    for (let { css, parent, index } of collisions) {
        let blocked;
        if ( blockers.some(a => css.indexOf(a) > -1 ) ) blocked = true;
        if (blocked && css.indexOf('death') == -1 && parent != box.parent) damage = { index: index, parent: parent, css: css };
    };

    if (damage) {
        let colli = damage;
        corrSpeed = 0;
        if (colli.parent == 'map') {
            //TODO put into destroyed prop
            //settings.power;
            //settings.areaOfEffectEnv;
            //settings.areaOfEffect;
            //box.scene.size.width;
            //box.scene.size.height;
            //box.scene.size.depth;
            //box.scene.axis.x.translate;
            //box.scene.axis.y.translate;
            //box.scene.axis.z.translate;
            mapAlteration(game.logic.currentMap.map[colli.index], settings);
            game.fx.addFx(fxBlastWall(box));
            return delete game.scenes[box.index];
        };
        if (colli.css.indexOf('fire-container') > -1) {
            delete game.scenes[colli.index];
            return delete game.scenes[box.index];
        };
        game.clients[colli.parent].unit.skills.death.hp -= settings.power;
        return delete game.scenes[box.index];
    }
    box.axis[ax].translate += corrSpeed;
};
var ag = (box, ax, speed) => {
    box.axis[ax].angle += speed;
};
var direction = (settings, game) => {
    var fireBox = settings.fireBox.scene;
    var rads = (fireBox.axis.z.angle) * Math.PI / 180;

    var vx = Math.cos(rads) * settings.speed;
    var vy = Math.sin(rads) * settings.speed;

    mv(fireBox, 'x', vx, game, settings);
    mv(fireBox, 'y', vy, game, settings);
};

var createBox = (game, clientIndex) => {
    let scene = new Scene(clientIndex);
    
    game.scenes[scene.index] = scene;

    game.scenes[scene.index]['parent'] = clientIndex;

    return {
        scene
    }
}
function fire(uni, bo, game) {
    let unit = uni;
    let unitBox = bo.scene;
    let instances = unit.skills.fire.instances;

    pushItemAll(unitBox.css, 'fire');
    pushItemAll(unitBox.css, 'fire-stop');
    //console.log(uni.index)
    instances.forEach((settings, index, object) => {
        const fireBox = settings.fireBox;
        //console.log(settings.speed)
        if (settings.speed != 0) {
            //if (settings.fire != 0) settings.speed = -settings.acc;
            direction(settings, game);
        };

        if (settings.range > 0) settings.range -= settings.acc;
        
        if (settings.fireBox && settings.range <= 0) {
            delete game.scenes[fireBox.scene.index]
            object.splice(index, 1);
        };
    });


    if (unit.skills.fire.cd == 0 && unit.skills.fire.fire != 0) {
        //if (settings.fireBox) delete game.scenes[fireBox.scene.index];
        const parameters = JSON.parse(JSON.stringify(unit.skills.fire.state));
        const settings = parameters;
        const fireBox = createBox(game, unit.parent);

        fireBox.scene.size.width = 10;
        fireBox.scene.size.height = 7;
        fireBox.scene.size.depth = 7;
        fireBox.scene.axis.x.translate = unitBox.axis.x.translate + unitBox.size.width / 2 - fireBox.scene.size.width / 2;
        fireBox.scene.axis.y.translate = unitBox.axis.y.translate + unitBox.size.height / 2 - fireBox.scene.size.height / 2;
        fireBox.scene.axis.z.translate = unitBox.axis.z.translate;
        fireBox.scene.axis.z.angle = JSON.parse(JSON.stringify( unitBox.axis.z.angle ));

        fireBox.scene.css = ['fire-container']
        fireBox.scene.asset = JSON.parse(JSON.stringify(vstank.assets.fire.html))
        fireBox.scene.assetSize = JSON.parse(JSON.stringify(vstank.assets.fire.assetSize))
        settings.fireBox = fireBox;
        settings.range = JSON.parse(JSON.stringify(settings.rangeReserve));
        settings.speed = -settings.acc;
        
        unit.skills.fire.cd = JSON.parse(JSON.stringify(unit.skills.fire.cdDur));
        instances.push(settings);
    }
    
    
    if (unit.skills.fire.cd > 0) --unit.skills.fire.cd;
    unit.skills.fire.fire = 0;
}





// function fire(uni, bo, game) {
//     let unit = uni;
//     let unitBox = bo.scene;
//     let settings = unit.skills.fire;
//     let fireBox = settings.fireBox;
    
//     pushItemAll(unitBox.css, 'fire');
//     pushItemAll(unitBox.css, 'fire-stop');
    
//     if (settings.fire != 0) settings.speed = -settings.acc;
//     if (settings.cd == 0 && settings.fire != 0) {
//         if (settings.fireBox) delete game.scenes[fireBox.scene.index];
//         fireBox = createBox(game, unit.parent);

//         fireBox.scene.size.width = 10;
//         fireBox.scene.size.height = 7;
//         fireBox.scene.size.depth = 7;
//         fireBox.scene.axis.x.translate = unitBox.axis.x.translate + unitBox.size.width / 2 - fireBox.scene.size.width / 2;
//         fireBox.scene.axis.y.translate = unitBox.axis.y.translate + unitBox.size.height / 2 - fireBox.scene.size.height / 2;
//         fireBox.scene.axis.z.translate = unitBox.axis.z.translate;
//         fireBox.scene.axis.z.angle = JSON.parse(JSON.stringify( unitBox.axis.z.angle ));

//         fireBox.scene.css = ['fire-container']
//         fireBox.scene.asset = JSON.parse(JSON.stringify(vstank.assets.fire.html))
//         fireBox.scene.assetSize = JSON.parse(JSON.stringify(vstank.assets.fire.assetSize))
//         settings.fireBox = fireBox;
//         settings.cd = JSON.parse(JSON.stringify(settings.cdDur));
//         settings.range = JSON.parse(JSON.stringify(settings.rangeReserve));
//     }
//     if (settings.speed != 0) {
//         direction(settings, game);
//     };
//     if (settings.cd > 0) --settings.cd;
//     if (settings.range > 0) settings.range -= settings.acc;
//     settings.fire = 0;
    
//     if (settings.fireBox && settings.range <= 0) delete game.scenes[fireBox.scene.index];
// }

module.exports = fire;