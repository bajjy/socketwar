const client = {
    index: '58fac387',
    ready: true,
    team: 'b',
    player: { index: '58fac387', name: '58fac387' },
    unit: {
        index: '9a4a6748',
        name: 'tank1',
        parent: '58fac387',
        skills: {
            moving: {
                speeed: 0,
                anglee: 0,
                sideee: 0,
                friction: 0.85,//0.75,
                acc: 1,
                up: 0,
                down: 0,
                left: 0,
                right: 0
            },
            fire: {
                fireBox: false,
                fire: 0,
                range: 100,
                speed: 0,
                angle: 0,
                side: 0,
                acc: 4,
                power: 100,
                cd: 0,
                cdDur: 100
            },
            death: {
                death: false,
                hp: 100,
                health: 100,
                cd: 0,
                cdDur: 200
            },
            stun: {},
            sheild: {}
        },
        team: 'b'
    },
    scene: {
        scene: {
            team: 'b',
            disabled: true,
            size: [Object],
            axis: [Object],
            index: 'd2f040db',
            type: 'scene',
            assetSize: [Array],
            parent: '58fac387',
            css: [Array],
            asset: `
                <div class="tank-model" style="
                        position: absolute; 
                        top: 0px; 
                        left: 0px; 
                        width: 100%; 
                        height: 100%;
                        perspective: 3000px;
                        perspective-origin: 0px 0px;">
                    <div data-index="1" style="
                        position: absolute; 
                        top: 0px;
                        left: 0px;
                        bottom: 0;
                        right: 0;
                        width: 100%; 
                        height: 94%; 
                        margin: auto;
                        perspective-origin: 0px 0px;
                        transform: translate3d(0px, 0px, -1em) 
                        rotate3d(1, 0, 0, 0deg) 
                        rotate3d(0, 1, 0, 0deg) 
                        rotate3d(0, 0, 1, 0deg);">
                    </div>
                    <div data-index="2" style="
                        position: absolute; 
                        top: 0px;
                        left: 0px;
                        bottom: 0;
                        right: 0;
                        width: 100%; 
                        height: 94%; 
                        margin: auto;
                        perspective-origin: 0px 0px;
                        transform: translate3d(0em, 0em, 0em) 
                        rotate3d(1, 0, 0, 0deg) 
                        rotate3d(0, 1, 0, 0deg) 
                        rotate3d(0, 0, 1, 0deg);">
                    </div>
                </div>
            `
        }
    }
}