const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-gpu', ],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});

client.on('qr', (qr) => {
    // Gerar QR code no terminal
    qrcode.generate(qr, { small: true });
    console.log('QR Code gerado. Escaneie com o aplicativo WhatsApp.');
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('authenticated', () => {
    console.log('Cliente autenticado!');
});

client.on('auth_failure', msg => {
    console.error('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
});

client.on('message', msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

module.exports = client;
