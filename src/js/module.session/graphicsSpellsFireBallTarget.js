import graphicsFireBallTargetPos from './graphicsFireBallTargetPos';
import addAnimation from './utilAddAnimation';
import s4 from './utilSFour';

// 1000 / ((1000 / 60) / 0.1); //62.5 times = 1sec. 0.1 - ticker speet setup
// const FPS60 = 1000 / 60;
// const TICKER_SPEED = 0.1;
// const SPEED = FPS60 / TICKER_SPEED;

function graphicsSpellsFireBallTarget(params, player, socket) {
    const { state, config, session, elements, me, messages } = params;

    const MSG_TIMER = 100;
    const SPEED = config.fps / config.speed;

    player.spells
        .filter(spell => spell.name == 'fireBallTarget' && typeof spell.target === 'number')
        .map(spell => {
            const { spellIndex, target } = spell;
            const animationId = `fireBallTarget_${spellIndex}`;
            const circle = elements.battlefield.querySelector(`.circle.circle-${target + 1}`).getBoundingClientRect();

            const css = /*css*/`
                @keyframes ${animationId} {
                    100% {
                        top: ${circle.y + 15}px;
                        left: ${circle.x + 15}px;
                    }
                };
            `;
            const element = graphicsFireBallTargetPos(params, player, spellIndex);
            
            if (spell.finished) {
                document.querySelector('#' + animationId).remove();
                return graphicsFireBallTargetPos(params, player, spellIndex, true);
            };
            if (spell.breaked) {
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
                element.style.animationTimingFunction = 'linear';
                element.style.animationDelay = '0s';
                element.style.animationIterationCount = 1;
                element.style.animationDirection = 'normal';
                element.style.animationFillMode = 'forwards';

            }
        });
};
export default graphicsSpellsFireBallTarget;