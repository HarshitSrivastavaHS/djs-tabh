import {
	Message,
	Client
} from "discord.js"

export interface details {
	message: Message,
	client: Client
}

export async function ping(props: details) {
	props.message.channel.send(`Latency is ${props.client.ws.ping}`)
}
