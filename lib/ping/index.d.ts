import { Message, Client } from "discord.js";
export interface details {
    message: Message;
    client: Client;
}
export declare function ping(props: details): Promise<void>;
