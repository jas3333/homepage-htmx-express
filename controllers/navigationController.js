import Article from './../models/article.js';
import { marked } from 'marked';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const home = async (req, res) => {
    const indexPath = path.join(__dirname, '../public/index.html');
    res.sendFile(indexPath);
};

const editor = async (req, res) => {
    const editorPath = path.join(__dirname, '../public/templates/editor.html');
    res.sendFile(editorPath);
};

const getArticles = async (req, res) => {
    const articles = await Article.find({});
    let content = [];

    for (let i = 0; i < articles.length; i++) {
        content.push(`
            <div class="article">
                <h3>
                    <a href=${articles[i].slug} hx-get="/articles/${articles[i].slug}" hx-target="#content" hx-push-url="true" >${articles[i].title}</a>
                </h3>
                <p>
                    ${articles[i].summary}
                </p>
            </div>
        `);
    }

    res.send(content.join(' '));
};

const getArticleCategory = async (req, res) => {
    const articles = await Article.find({ category: req.params.name });
    const isHxRquest = req.headers['hx-request'] === 'true';
    let content = [];

    for (let i = 0; i < articles.length; i++) {
        content.push(`
            <div class="article">
                <h3>
                    <a href=${articles[i].slug} hx-get="/articles/${articles[i].slug}" hx-target="#content" hx-push-url="true" >${articles[i].title}</a>
                </h3>
                <p>
                    ${articles[i].summary}
                </p>
            </div>
        `);
    }

    if (isHxRquest) {
        res.send(content.join(' '));
    } else {
        res.send(`
            <!doctype html>
            <html lang="en">
                <head>
                    <title>Homepage</title>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
                    <link href="../css/style.css" rel="stylesheet" />
                </head>
                <body>
                    <div class="root" id="root"></div>
                    <div class="content" id="content" hx-history-elt>
                        ${content.join(' ')}
                    </div>
                    <script src="../js/menu.js"></script>
                </body>
            </html>
            `);
    }
};

const getArticle = async (req, res) => {
    const slugParam = req.params.slug;
    const isHxRquest = req.headers['hx-request'] === 'true';
    const article = await Article.find({ slug: slugParam });

    if (article && isHxRquest) {
        res.send(`
            <h1>${article[0].title}</h1>
            ${marked(article[0].content)}
            `);
    } else {
        res.send(`
            <!doctype html>
            <html lang="en">
                <head>
                    <title>Homepage</title>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
                    <link href="../css/style.css" rel="stylesheet" />
                </head>
                <body>
                    <div class="root" id="root"></div>
                    <div class="content" id="content" hx-history-elt>
                        <h1>${article[0].title}</h1>
                        ${marked(article[0].content)}
                    </div>
                    <script src="../js/menu.js"></script>
                </body>
            </html>
            `);
    }
};

export { home, editor, getArticles, getArticle, getArticleCategory };
