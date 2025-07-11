// server.js

// 1. Importando os módulos necessários
const express = require("express"); // Framework para criar o servidor
const path = require("path"); // Módulo para lidar com caminhos de arquivos

// 2. Inicializando a aplicação Express
const app = express();
const PORT = 3000;

// 3. Configurando Middlewares
// Middleware para servir arquivos estáticos da pasta 'public'
// Isso permite que o navegador acesse arquivos como CSS, imagens e o JSON diretamente.
app.use(express.static(path.join(__dirname, "public")));

// Middleware para interpretar dados de formulário enviados via POST (formato urlencoded)
// `extended: true` permite objetos aninhados.
app.use(express.urlencoded({ extended: true }));

// 4. Definindo as Rotas da Aplicação
// Rota Raiz: GET /
// Serve a página principal (index.html)
app.get("/", (req, res) => {
  // res.sendFile() envia um arquivo como resposta.
  // path.join() cria um caminho absoluto para o arquivo, garantindo que funcione em qualquer sistema operacional.
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Rota de Sugestão: GET /sugestao
// Recebe os dados do formulário da página inicial via query string.
app.get("/sugestao", (req, res) => {
  // req.query contém os parâmetros da URL (?nome=...&ingredientes=...)
  const nomeLanche = req.query.nome;
  const ingredientes = req.query.ingredientes;

  //página de agradecimento dinâmica em HTML
  res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <title>Obrigado!</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <main>
                <h1>Obrigado pela sua sugestão!</h1>
                <div class="agradecimento">
                    <p>Recebemos sua sugestão para o lanche:</p>
                    <p><strong>Nome:</strong> ${nomeLanche}</p>
                    <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                </div>
                <a href="/">Voltar para o Cardápio</a>
            </main>
        </body>
        </html>
    `);
});

// Rota de Contato (Exibição do Formulário): GET /contato
// Serve a página de contato (contato.html)
app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

// Rota de Contato (Recebimento dos Dados): POST /contato
// Recebe os dados do formulário de contato via método POST.
app.post("/contato", (req, res) => {
  // Fiz o middleware `express.urlencoded` e os dados do formulário estão em `req.body`.
  const { nome, email, assunto, mensagem } = req.body;

  // Gera uma página de confirmação dinâmica com os dados recebidos.
  res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <main>
                <h1>Mensagem Recebida com Sucesso!</h1>
                <div class="agradecimento">
                    <p>Olá, <strong>${nome}</strong>!</p>
                    <p>Agradecemos seu contato. Recebemos sua mensagem sobre "${assunto}".</p>
                    <p>Responderemos em breve no e-mail: <strong>${email}</strong>.</p>
                </div>
                <a href="/">Voltar para a Página Inicial</a>
            </main>
        </body>
        </html>
    `);
});

// Rota da API: GET /api/lanches
// Retorna o conteúdo do arquivo lanches.json
app.get("/api/lanches", (req, res) => {
  // res.sendFile envia o arquivo JSON para o cliente.
  // O navegador interpretará o arquivo como JSON e o exibirá formatado.
  res.sendFile(path.join(__dirname, "public", "data", "lanches.json"));
});

// 5. Middleware para Tratamento de Erro 404
// Este middleware será executado se nenhuma das rotas acima corresponder à requisição.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// 6. Iniciando o Servidor
// A aplicação "escuta" por requisições na porta definida.
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
