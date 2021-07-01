import { MessageResolvable, UserResolvable } from "discord.js";
export interface data {
    message: MessageResolvable;
    player1: UserResolvable;
    player2: UserResolvable;
}
export declare function tictactoe(props: data): Promise<void>;
