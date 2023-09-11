import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { html } from '@elysiajs/html';

const app = new Elysia();
app.use(swagger()).use(html());

const page = `<html lang="en">
    <head>
        <title>Hello bun-elysia-htmx</title>
        <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
    </head>
    <body>
        <h1>Hello bun / elysia / htmx</h1>
        <form action="/github-profile" method="POST" hx-post="/github-profile">
          <label for="username"><b>search for github user</b></label>
          <br/>
          <br/>
          <input type="text" name="username" hx-target="#username" placeholder="enter a username"/>
        </form>
        <div id="username"></div>
    </body>
</html>`;

// app.get('/', () => ({ vtuber: ['Shirakami OLSI', 'Inugami Korone'] }));
app.get('/', () => page);

app.post(
  '/github-profile',
  ({ body }) => {
    const { username } = body;
    const page = `<html lang="en">
        <head>
            <title>Hello bun-elysia-htmx</title>
            <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
        </head>
        <body>
            <form action="/github-profile" method="POST" hx-post="/github-profile">
              <label for="username"><b>search for github user</b></label>
              <br/>
              <br/>
              <input type="text" name="username" hx-target="#username" placeholder="enter a username"/>
            </form>
            <div id="username">${username}</div>
        </body>
      </html>`;

    return page;
  },
  { body: t.Object({ username: t.String() }) },
);

app.listen(3000);
