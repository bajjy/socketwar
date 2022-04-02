
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

var mv = (box, ax, speed, game) => {
    let blockers = ['tank-container', 'brick-container'];
    let collisions = game.collision.intersections(box.index, {
        [ax]: speed
    });
    let corrSpeed = speed;

    // collisions.map(colli => {
    //     if (colli.css.indexOf('tank-container') > -1) corrSpeed = 0
    //     if (colli.css.indexOf('brick') > -1) corrSpeed = 0
    // })

    for (let { css } of collisions) {
        if ( blockers.some(a => css.indexOf(a) > -1 ) && css.indexOf('death') == -1) corrSpeed = 0;
    };
    box.axis[ax].translate += corrSpeed;
};
var ag = (box, ax, speed) => {
    box.axis[ax].angle += speed;
};
var dir = (box, speed, a = 0, game) => {
    var rads = (box.axis.z.angle + a) * Math.PI / 180;

    var vx = Math.cos(rads) * speed;
    var vy = Math.sin(rads) * speed;

    mv(box, 'x', vx, game);
    mv(box, 'y', vy, game);
};
var sides = (s, a, m, b) => {
    m.speeed = s;
    b.axis.z.angle = a;
}
function moving(uni, bo, game) {
    let unit = uni;
    let box = bo.scene;
    let mov = unit.skills.moving;

    pushItemAll(box.css, 'moving');
    pushItemAll(box.css, 'moving-stop');
    
    if (mov.up != 0) sides(-mov.acc, 90, mov, box);
    if (mov.down != 0) sides(-mov.acc, -90, mov, box);
    if (mov.left != 0) sides(-mov.acc, 0, mov, box);
    if (mov.right != 0) sides(-mov.acc, 180, mov, box);

    if (mov.speeed != 0) {
    
        dir(box, mov.speeed, mov.sideee, game);
        mov.speeed *= mov.friction;
        pushItemAll(box.css, 'moving');
        removeItemAll(box.css, 'moving-stop');
        
        if (Math.abs(mov.speeed) <= 1 - mov.friction) {
            mov.speeed = 0;
            mov.sideee = 0;
        };
    };

    if (mov.anglee != 0) {
        ag(box, 'z', mov.anglee);
        mov.anglee *= mov.friction;
        if (Math.abs(mov.anglee) <= 1 - mov.friction) mov.anglee = 0;
    };
    

    mov.up == 0 || --mov.up;
    mov.down == 0 || --mov.down;
    mov.left == 0 || --mov.left;
    mov.right == 0 || --mov.right;

    // mov.up = 0;
    // mov.down = 0;
    // mov.left = 0;
    // mov.right = 0;
}

module.exports = moving;