const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do cliente WhatsApp
const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'cliente-whatsapp' }),
  puppeteer: {
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Substitua pelo caminho correto
    headless: false
  }
});

client.on('qr', (qr) => {
  console.log('QR Code necessário. Escaneie para autenticação.');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('Autenticado com sucesso!');
});

client.on('ready', () => {
  console.log('Cliente WhatsApp pronto para enviar mensagens.');
});

client.on('auth_failure', (msg) => {
  console.error('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
  console.log('Cliente desconectado:', reason);
  console.log('Tentando reconectar...');
  client.initialize();
});

// Inicializar o cliente WhatsApp
client.initialize();

// Configurar o servidor Express para aceitar JSON
app.use(express.json());

// Rota para enviar mensagem
app.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Número de telefone e mensagem são necessários.' });
  }

  try {
    await client.sendMessage(`${phoneNumber}@c.us`, message);
    res.status(200).json({ success: `Mensagem enviada para ${phoneNumber}` });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem.' });
  }
});

// Iniciar o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor de API rodando na porta ${PORT}`);
});
