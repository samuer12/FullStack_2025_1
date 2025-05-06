const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Configuração do MongoDB
const uri = "mongodb+srv://samuel:VMyKBYfDOX83gfiH@cluster0.alyiq6d.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Conectar ao MongoDB
let db, postsCollection;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db('blogDB');
        postsCollection = db.collection('posts');
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    }
}

connectToMongoDB();

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
    res.redirect('/blog');  // Alterado para redirecionar direto para o blog
});

app.get('/projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'projects.html'));
});

app.get('/blog', async (req, res) => {
    try {
        const posts = await postsCollection.find().sort({ createdAt: -1 }).toArray();
        res.render('blog', { posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar o blog');
    }
});

app.get('/cadastrar_post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrar_post.html'));
});

app.post('/cadastrar_post', async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const newPost = {
            title,
            summary,
            content,
            createdAt: new Date()
        };
        
        await postsCollection.insertOne(newPost);
        res.redirect('/blog');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar o post');
    }
});

// Iniciar servidor
app.listen(80, () => {
    console.log('Servidor rodando na porta 80');
});

// Fechar conexão ao encerrar o aplicativo
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});