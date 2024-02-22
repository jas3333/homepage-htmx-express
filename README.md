This is just a playground to mess around with HTMX. It's using Express, and MongoDB on the backend.
It is an absolute mess and there is a lot of litter scattered about. I was able to create a basic
editor to preview notes/articles/blogs or whatever you want to call them. Then have them displayed
without using a templating engine.

#### To install and use:

```bash
# Clone it,
git clone https://github.com/jas3333/homepage-htmx-express

cd homepage-htmx-express

# Install everything
npm intall
```

#### Setup a .env

```bash
# create a mongodb connection string
MONGODB=mongodbconnectionstring
# JWT_SECRET for auth on the editor
JWT_SECRET=yourjwtsecret
username=a
password=a
```

#### Run:

```bash
npm start
```
