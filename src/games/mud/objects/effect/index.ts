import { EffectId } from 'games/mud/objects/effect/types';

abstract class Effect {
    id = EffectId.NONE;

    name = '';

    ticksInEffect = 0;

    remainingTicks = 0;

    processTick: any;

    applyEffect: any;

    expireEffect: any;
}

export default Effect;