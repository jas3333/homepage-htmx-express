import Article from './../models/article.js';
import { marked } from 'marked';

const preview = async (req, res) => {
    const html = marked(req.body.content);
    res.send(html);
};

const save = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const summary = req.body.summary;
    const category = req.body.category;

    const article = await Article.findOne({ title: title });

    if (article) {
        console.log(article.summary);
        article.content = content;
        article.summary = summary;
        await article.save();
        res.send(`Save`);
    } else {
        const newArticle = {
            title: title,
            summary: summary,
            content: content,
            category: category,
            slug: title.toLowerCase().replace(/\s/g, '-'),
        };

        await Article.create(newArticle);
        console.log('New article created');

        res.send(`Save`);
    }
};

const getArticles = async (req, res) => {
    const articles = await Article.find({});
    let articleTitles = [];

    for (let i = 0; i < articles.length; i++) {
        articleTitles.push(`<option value='${articles[i].title}'>${articles[i].title}</option>`);
    }

    res.send(`
        <select id="articles" hx-post="/editor/load" hx-trigger="change" hx-target="#text-data" name="title">
            <option value=""></option>
            ${articleTitles.join(' ')}
        </select>
        `);
};

const load = async (req, res) => {
    const article = await Article.findOne({ title: req.body.title });

    if (article) {
        res.send(`
            <form id="text-data">
                <select name="category" value="${article.category}">
                    <option value="linux">Linux</option>
                    <option value="gaming">Gaming</option>
                    <option value="programming">Programming</option>
                </select>
                <input type="text" name="title" class="input"  value="${article.title}"/>
                <textarea
                    rows="3"
                    cols="100"
                    name="summary"
                    class="text-editor"
                    placeholder="Article description"
                >${article.summary}</textarea>
                <textarea
                    rows="48"
                    cols="100"
                    class="text-editor"
                    hx-trigger="keyup changed delay:5ms"
                    hx-post="/editor/preview"
                    name="content"
                    hx-target="#preview"
                    id="editor"
                    placeholder="Content"
                >${article.content}</textarea>
            </form>
        `);
    } else {
        res.send(`
            <form id="text-data">
                <select name="category" value="">
                    <option value="linux">Linux</option>
                    <option value="gaming">Gaming</option>
                    <option value="programming">Programming</option>
                </select>
                <input type="text" name="title" class="input" value="" placeholder="Title"/>
                <textarea
                    rows="3"
                    cols="100"
                    name="summary"
                    class="text-editor"
                    placeholder="Article description"
                ></textarea>
                <textarea
                    rows="48"
                    cols="100"
                    class="text-editor"
                    hx-trigger="keyup changed delay:5ms"
                    hx-post="/editor/preview"
                    name="content"
                    hx-target="#preview"
                    id="editor"
                    placeholder="Content"
                ></textarea>
            </form>

            `);
    }
};

export { preview, save, load, getArticles };
