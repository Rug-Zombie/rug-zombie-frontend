import { EffectId } from 'games/mud/objects/effect/types';
import { EntityCallbacks, ModifyStatsType } from 'games/mud/objects/entity/types';
import { LINE_BREAK_CHAR } from 'games/mud/strings';
import Effect from 'games/mud/objects/effect';

class Moan extends Effect {
    id = EffectId.MOAN;

    name = 'Moan';

    ticksInEffect = 20;

    applyEffect = (callbacks: EntityCallbacks) => {
        this.remainingTicks = this.ticksInEffect + 1;
        callbacks.modifyStats(ModifyStatsType.STRENGTH, 1)
        return `You let out a little moan.${LINE_BREAK_CHAR}You have gained the Moan effect!${LINE_BREAK_CHAR}`;   
    }

    processTick = () => {
        this.remainingTicks--;
        return '';
    }

    expireEffect = (callbacks: EntityCallbacks) => {
        callbacks.modifyStats(ModifyStatsType.STRENGTH, -1)
        return `You have lost the Moan effect!${LINE_BREAK_CHAR}`;
    }
}

export default Moan;