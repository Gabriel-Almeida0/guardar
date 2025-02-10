const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ou use o fetch nativo se estiver no Node 18+
const https = require('https');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Parâmetro "url" é obrigatório.');
  }

  try {
    const decodedUrl = decodeURIComponent(targetUrl);

    // Agente HTTPS customizado para teste (desabilitando a verificação TLS)
    const agent = new https.Agent({
      keepAlive: true,
      rejectUnauthorized: false, // Somente para teste!
    });

    const response = await fetch(decodedUrl, { agent });

    // Define um content-type padrão se não estiver presente
    const contentType = response.headers.get('content-type') || 'application/json';
    res.set('Content-Type', contentType);

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Erro ao acessar a URL de destino:', error);
    res.status(500).send('Erro ao buscar dados.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
