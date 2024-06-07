const express = require('express');
const client = require('./index.js');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});

app.use(limiter);

app.post('/send-message', (req, res) => {
    console.log(req.body);
    const { sender, recipient, message } = req.body;
    console.log(`Recebido remetente: ${sender}, destinatário: ${recipient}, mensagem: ${message}`);

    client.sendMessage(`${recipient}@c.us`, message).then(response => {
        console.log('Mensagem enviada:', response);
        res.status(200).json({
            status: 'success',
            response: response
        });
    }).catch(err => {
        console.error('Erro ao enviar mensagem:', err);
        res.status(500).json({
            status: 'error',
            error: err
        });
    });
});

module.exports = app;
