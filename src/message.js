module.exports = () => {

    const { Client } = require('whatsapp-web.js');

    const sessionCfg = {
        WABrowserId: '"lx2V9HIQ8WGiJ3RXzGk+Hw=="',
        WASecretBundle: '{"key":"MUkS/kLwd+skhjCn6z6SmrxMRr8oolneE0myTC0b1OE=","encKey":"wIUYmFviSww6tSoangrsRUC1zy8n0jh+blHua5uYGVY=","macKey":"MUkS/kLwd+skhjCn6z6SmrxMRr8oolneE0myTC0b1OE="}',
        WAToken1: '"/4nlRA1JFbc28OxF4dzcKPBEH4tfH8tnneEHc+lz5KtjYE4lxJBu1zHjoB8uYq8Lck9+/2SBKLvfKo5V4vqL4A=="',
        WAToken2: '"1@a8bL9GOx8mBlKKEXRvXdAX46wK0GtL/uK4czQ2/+MaE1plaRKwKgvrCD9Zi4BtefQC4xcp9NpIa5ZA=="'
    };

    const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });

    client.on('authenticated', (session) => {
        // Save the session object however you prefer.
        // Convert it to json, save it to a file, store it in a database...
        console.log('SESSION OBJECT:', session);
    });

    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        console.log('QR RECEIVED', qr);
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', msg => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }
    });

    client.on('message_create', (msg) => {
        // Fired on all message creations, including your own
        if (msg.fromMe) {
            // do stuff here
        }
    });

    client.on('message_revoke_everyone', async (after, before) => {
        // Fired whenever a message is deleted by anyone (including you)
        console.log(after); // message after it was deleted.
        if (before) {
            console.log(before); // message before it was deleted.
        }
    });

    client.on('message_revoke_me', async (msg) => {
        // Fired whenever a message is only deleted in your own view.
        console.log(msg.body); // message before it was deleted.
    });

    client.on('message_ack', (msg, ack) => {
        /*
            == ACK VALUES ==
            ACK_ERROR: -1
            ACK_PENDING: 0
            ACK_SERVER: 1
            ACK_DEVICE: 2
            ACK_READ: 3
            ACK_PLAYED: 4
        */

        if (ack == 3) {
            // The message was read
        }
    });

    client.on('group_join', (notification) => {
        // User has joined or been added to the group.
        console.log('join', notification);
        notification.reply('User joined.');
    });

    client.on('group_leave', (notification) => {
        // User has left or been kicked from the group.
        console.log('leave', notification);
        notification.reply('User left.');
    });

    client.on('group_update', (notification) => {
        // Group picture, subject or description has been updated.
        console.log('update', notification);
    });

    client.on('change_battery', (batteryInfo) => {
        // Battery percentage for attached device has changed
        const { battery, plugged } = batteryInfo;
        console.log(`Battery: ${battery}% - Charging? ${plugged}`);
    });

    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
    });

    client.initialize();

}
