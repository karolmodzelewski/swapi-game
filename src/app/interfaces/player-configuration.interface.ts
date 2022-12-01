import { Player } from '../enums/player.enum';
import { Resource } from '../enums/resource.enum';
import { Attribute } from '../enums/attribute.enum';
import { GameFormControl } from '../enums/game-form-control.enum';

export interface PlayerConfiguration {
    [GameFormControl.RESOURCE]: Resource;
    [GameFormControl.ATTRIBUTE]: Attribute;
    [GameFormControl.PLAYER]: Player;
}
