import { Event } from "../../structures/events";

export default new Event("ready", (client) => {
    console.log(`[Ready Event] Logged in as ${client.user.tag}`);
});