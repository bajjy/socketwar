function s4() {
    var r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return r() + r();
};


class Geometry {
    constructor() {
        this.size = {
            FOV: 1000,
            perspective: 0,
            width: 0,
            height: 0,
            depth: 0,
            scale: 1
        };
        this.axis = {
            x: {
                translate: 0,
                origin: 0,
                scale: 1,
                angle: 0
            },
            y: {
                translate: 0,
                origin: 0,
                scale: 1,
                angle: 0
            },
            z: {
                translate: 1,
                origin: 0,
                scale: 1,
                angle: 0
            }
        };
    };
};
class Camera extends Geometry {
    constructor() {
        super();
        this.type = 'camera';
        this.viewport;
        this.connected;
    }
};
class Scene extends Geometry {
    constructor(clientIndex) {
        super();
        this.index = s4();
        this.type = 'scene';
        this.asset;
        this.assetSize = [0, 0, 0];
        this.parent = clientIndex;
    };
};

class Collision {
    constructor() {
        this.game;
    };
    setGame(gg) {
        this.game = gg;
    }
    intersections(index, corrections, conditions) {
        let sceneA = this.game.scenes[index];
        let collisions = [];
        let corr = {
            x: corrections.x || 0,
            y: corrections.y || 0,
            z: corrections.z || 0
        };
        this.game.logic.currentMap.map.map((cell, index) => {
            let is;
            if (sceneA) is = this.intersect([ sceneA, cell ], corr);
            if (is) collisions.push({
                index: index,
                css: cell.css || [],
                parent: cell.parent
            });
        });

        for (let sceneB in this.game.scenes) {
            let is;
            if (sceneA && this.game.scenes[sceneB]) is = this.intersect([ sceneA, this.game.scenes[sceneB] ], corr);
            if (sceneB == index) is = false;
            if (is) collisions.push({
                index: sceneB,
                css: this.game.scenes[sceneB].css || [],
                parent: this.game.scenes[sceneB].parent
            });
        }
        return collisions
    }
    intersect(input, corr) {
        let isIntersect = false;
        let a = {
            minX: input[0].axis.x.translate + corr.x,
            minY: input[0].axis.y.translate + corr.y,
            minZ: input[0].axis.z.translate + corr.z,
            maxX: input[0].axis.x.translate + corr.x + input[0].size.width,
            maxY: input[0].axis.y.translate + corr.y + input[0].size.height,
            maxZ: input[0].axis.z.translate + corr.z + input[0].size.depth
        };
        let b = {
            minX: input[1].axis.x.translate,
            minY: input[1].axis.y.translate,
            minZ: input[1].axis.z.translate,
            maxX: input[1].axis.x.translate + input[1].size.width,
            maxY: input[1].axis.y.translate + input[1].size.height,
            maxZ: input[1].axis.z.translate + input[1].size.depth
        };
        
        if (a.minX <= b.maxX && a.maxX >= b.minX &&
        a.minY <= b.maxY && a.maxY >= b.minY &&
        a.minZ <= b.maxZ && a.maxZ >= b.minZ) {
            isIntersect = true;
        };
        return isIntersect;
    };
    around(start, radius, parent) {
        var x = start[1];
        var y = start[0];
        var z = start[2];
        var radius = radius;
        var area = [];
        var zone = {
            geometry: new Geometry()
        };

        if (parent) {
            x -= radius / 2 - parent.size.width / 2
            y -= radius / 2 - parent.size.height / 2
        };

        zone.geometry.axis.x.translate = x;
        zone.geometry.axis.y.translate = y;
        zone.geometry.axis.z.translate = z;
        zone.geometry.size.width = radius;
        zone.geometry.size.height = radius;
        zone.geometry.size.depth = radius;
        area.push(zone);
        return area
    };
    zone(target, parent) {
        var x2 = target[1];
        var y2 = target[0];
        var z2 = target[2];
        var zone = {
            geometry: new Geometry()
        };

        zone.geometry.axis.x.translate = x2;
        zone.geometry.axis.y.translate = y2;
        zone.geometry.axis.z.translate = z2;
        zone.geometry.size.width = parent.size.width;
        zone.geometry.size.height = parent.size.height;
        zone.geometry.size.depth = parent.size.depth;
        return zone
    };
};

module.exports = {
    Scene,
    Camera,
    Collision
}
