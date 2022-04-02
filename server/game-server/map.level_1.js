//a-team respawn 1
//b-team respawn 2
//empty ground: 10
//brick: 20
//steel: 30
//water: 40
//wood: 50
//ice: 60
const name = 'level_1';

var settings = {
    width: 24,
    height: 24,
    ground: 'empty',
    respawn: {
        a: 0, //index
        b: 1
    }
};
var map = [
    {
        css: ['a-respawn'],
        type: 1, //a-respawn
        parent: 'map',
        size: {
            width: 100,
            height: 10,
            depth: 10
        },
        axis: {
            x: {
                translate: 0
            },
            y: {
                translate: 90
            },
            z: {
                translate: 0
            }
        }
    },
    {
        css: ['b-respawn'],
        type: 2, //b-respawn
        parent: 'map',
        size: {
            width: 100,
            height: 10,
            depth: 10
        },
        axis: {
            x: {
                translate: 0
            },
            y: {
                translate: 290
            },
            z: {
                translate: 0
            }
        }
    },
    {
        css: ['brick-container', 'brown'],
        type: 10,
        parent: 'map',
        size: {
            width: 20,
            height: 60,
            depth: 10
        },
        axis: {
            x: {
                translate: 100
            },
            y: {
                translate: 150
            },
            z: {
                translate: 0
            }
        },
        cellSize: [10, 20, 10],
        skills: {
            destroyed: [],
            death: {
                death: false,
                hp: 100,
                health: 100
            },
            regen: {
                points: 1
            }
        }
    },
    //aaasdasdasdasdasdasdasdasdasdasdasd
    {
        css: ['brick-container', 'brown'],
        type: 10,
        parent: 'map',
        size: {
            width: 20,
            height: 40,
            depth: 10
        },
        axis: {
            x: {
                translate: 120
            },
            y: {
                translate: 150
            },
            z: {
                translate: 0
            }
        },
        skills: {
            destroyed: [],
            death: {
                death: false,
                hp: 100,
                health: 100
            },
            regen: {
                points: 1
            }
        }
    },
    {
        css: ['brick-container', 'brown'],
        type: 10,
        parent: 'map',
        size: {
            width: 20,
            height: 40,
            depth: 10
        },
        axis: {
            x: {
                translate: 160
            },
            y: {
                translate: 150
            },
            z: {
                translate: 0
            }
        },
        skills: {
            destroyed: [],
            death: {
                death: false,
                hp: 100,
                health: 100
            },
            regen: {
                points: 1
            }
        }
    },
    {
        css: ['brick-container', 'brown'],
        type: 10,
        parent: 'map',
        size: {
            width: 20,
            height: 40,
            depth: 10
        },
        axis: {
            x: {
                translate: 200
            },
            y: {
                translate: 150
            },
            z: {
                translate: 0
            }
        },
        skills: {
            destroyed: [],
            death: {
                death: false,
                hp: 100,
                health: 100
            },
            regen: {
                points: 1
            }
        }
    },
]
module.exports = {
    name,
    settings,
    map
}