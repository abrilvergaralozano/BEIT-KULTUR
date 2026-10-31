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
- Volunteers can use Gemini to draft a short article summary, then review and edit it before
  publishing.
- Posts and comments are stored in Neon PostgreSQL after the database is configured.
- Without a database connection, the site shows sample articles. Publishing and comments are
  disabled with a setup message.
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

Create a free Neon project. In the Neon SQL Editor, run `database/schema.sql` to create the tables
and add the sample articles. Copy the Neon connection string into `DATABASE_URL` in `.env`.

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey) and add it as
`GEMINI_API_KEY` in `.env`. The AI summary helper is available only to signed-in volunteers. Draft
text is sent to Gemini for the request and is not saved to Beit Kultur's database by the helper.
Check Google's current API limits and pricing before use.

Then set a volunteer username, a strong password, and a random session secret with at least 32
characters. To generate a session secret:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Then start the site:

```powershell
npm run dev
```

The login uses the values in `.env`. Never use example credentials or commit `.env`. The session
cookie is signed, HTTP-only, and expires after eight hours. Keep `DATABASE_URL` and `GEMINI_API_KEY`
private too.

To create a production build, run `npm run build`.

## Scope and known limits

The project presentation slides still need to be prepared for final submission.

The database connection uses Neon's serverless driver. Posts and comments are persistent when
`DATABASE_URL` points to the Neon project and the schema has been applied.

## Presentation

The site demonstrates a searchable article feed, volunteer authentication, AI-assisted article
summaries, the SMHI external API, and responsive layouts. Before presenting, be ready to explain the
code and data flow, and to demonstrate the feature yourself.
