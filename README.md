# Beit Kultur

Beit Kultur is a Stockholm non-profit cultural association. This site uses the marketing-site
alternative in the individual blog project brief: it includes an articles feed and lets volunteers
add articles.

## Audience and direction

The site is for artists, audiences, volunteers and cultural partners in Stockholm, with a focus on
artists from the global majority and queer artists. It uses Beit Kultur's warm off-white and beige
surfaces, dark text, lime buttons and event imagery. The sample news articles are demonstration
copy and should be reviewed before a public launch.

## What works

- Readers can browse the news list, search titles and summaries, open an article, and return to the
  list.
- Volunteers can sign in, publish an article, and sign out. Only a signed-in volunteer can publish.
- Articles created by volunteers are held temporarily in the running server's memory. They are lost
  when the server restarts, which is within the Pass requirement.
- The site has responsive layouts, an Easy read control, and event-category filters.
- The Events page fetches and displays Stockholm forecast data from SMHI.
- Donation and contact forms are test interfaces. They do not process real payments or send
  messages.

## Run locally

You need Node.js and npm.

```powershell
npm install
Copy-Item .env.example .env
```

Edit `.env` and set a volunteer username, a strong password, and a random session secret with at
least 32 characters. To generate a session secret:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Then start the site:

```powershell
npm run dev
```

The login uses the values in `.env`. Never use example credentials or commit `.env`. The session
cookie is signed, HTTP-only, and expires after eight hours.

To create a production build, run `npm run build`.

## Scope and known limits

This project currently targets the Pass requirements. Posts and comments are not stored in a
database, and there is no AI API feature. PostgreSQL on Neon, database-backed comments and posts,
and an AI API feature are required for Pass with distinction. The project presentation slides also
need to be prepared for final submission.

The temporary article store is for demonstrating the workflow locally. It is not durable and is not
suitable for a multi-instance or serverless deployment. Use a database before relying on published
articles in production.

## Presentation

The site demonstrates a searchable article feed, volunteer authentication, temporary article
creation, the SMHI external API, and responsive layouts. Before presenting, be ready to explain the
code and data flow, and to demonstrate the feature yourself.
