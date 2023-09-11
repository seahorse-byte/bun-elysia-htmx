import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { html } from '@elysiajs/html';

const app = new Elysia();
app.use(swagger()).use(html());

app.get('/', () => Bun.file('index.html').text());

app.post('/blog', () => `<div> <br/><p>me blog</p></div>`);

app.post(
  '/github-profile',
  async ({ body }) => {
    const { username } = body;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const { avatar_url, html_url, login, name, created_at } = await response.json();

    const page = `
      <div class="flex font-sans">
        <div class="relative my-10 flex- flex-col">
          <img src=${avatar_url} class="w-40 h-40 object-cover rounded-full my-10" loading="lazy" />
          <h3><em><b>Login:</b></em> <a href=${html_url} class="text-xl" >${login}</a></h3>
          <h2><em><b>Name:</b></em> ${name}</h2>
          <p class="text-sm font-bold">Joined on ${new Date(created_at).getFullYear()}</p>
        </div>
      </div>
    `;

    return page;
  },
  { body: t.Object({ username: t.String() }) },
);

app.listen(3000);
