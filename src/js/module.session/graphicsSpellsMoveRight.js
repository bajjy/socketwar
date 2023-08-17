import graphicsPlayersPos from './graphicsPlayersPos';
import addAnimation from './utilAddAnimation';
import s4 from './utilSFour';

// 1000 / ((1000 / 60) / 0.1); //62.5 times = 1sec. 0.1 - ticker speet setup
// const FPS60 = 1000 / 60;
// const TICKER_SPEED = 0.1;
// const SPEED = FPS60 / TICKER_SPEED;

function graphicsSpellsMoveRight(params, player, socket) {
    const { state, config, session, elements, me, messages } = params;

    const MSG_TIMER = 100;
    const SPEED = config.fps / config.speed;
    const POS_MAX = config.battlefieldSize; // 0 - 16 total positions = 17  
    const playerElemName = `playerInfo_${socket}`;
    const targetPosLeft = player.pos - 1 < 0 ? POS_MAX : player.pos - 1;
    const targetPosRight = player.pos + 1 > POS_MAX ? 0 : player.pos + 1;
    const element = elements[playerElemName];
    const isMyself = me.meta.socket === socket;
    const spellList = [
        'moveLeft',
        'moveRight',
        'jumpLeft',
        'jumpRight',
    ];

    player.spells
        .filter(spell => spellList.includes(spell.name))
        .map(spell => {
            const { spellIndex } = spell;
            const animationId = `moveRigh_${spellIndex}`;
            const circle =
                spell.name == 'moveRight' ?
                    elements.battlefield.querySelector(`.circle.circle-${targetPosRight + 1}`).getBoundingClientRect() :
                    elements.battlefield.querySelector(`.circle.circle-${targetPosLeft + 1}`).getBoundingClientRect();

            const css = /*css*/`
            @keyframes ${animationId} {
                100% {
                    top: ${circle.y + 5}px;
                    left: ${circle.x + 5}px;
                }
            }
        `;

            if (spell.finished) {
                document.querySelector('#' + animationId).remove();
                return graphicsPlayersPos(params, player, socket); //set position on finish
            };
            if (spell.breaked && isMyself) {
                return messages.push({
                    spell,
                    by: spell.breaked.by,
                    timer: MSG_TIMER,
                    message: spell.breaked.message,
                    type: 'regular',
                    id: s4()
                });
            };
            if (!document.querySelector('#' + animationId)) {
                addAnimation(css, animationId);

                element.style.animationName = animationId;
                element.style.animationDuration = spell.delivery * SPEED + 'ms';
                element.style.animationTimingFunction = 'ease-in';
                element.style.animationDelay = '0s';
                element.style.animationIterationCount = 1;
                element.style.animationDirection = 'normal';
                element.style.animationFillMode = 'forwards';

            }
        });
};
export default graphicsSpellsMoveRight;