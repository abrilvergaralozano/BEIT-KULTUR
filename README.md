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
- Admins can review volunteer requests and create a volunteer login after approval.
- Prospective volunteers can send an application with their background, motivation, skills and
  preferred involvement level. Applications are reviewed by an admin before a login is created.
- Volunteers can use Gemini to draft a short article summary, then review and edit it before
  publishing.
- Posts and comments are stored in Neon PostgreSQL after the database is configured.
- Contact messages, including their topic and review status, are stored in Neon.
- Without a database connection, the site shows sample articles. Publishing and comments are
  disabled with a setup message.
- The site has responsive layouts, an Easy read control, and event-category filters.
- The Events page fetches and displays Stockholm forecast data from SMHI.
- Donation forms are test interfaces. They do not process real payments. Contact forms save
  messages to Neon; they do not send email.

## Run locally

You need Node.js and npm.

```powershell
npm install
Copy-Item .env.example .env
```

Create a free Neon project. For a new database, run `database/schema.sql` in the Neon SQL Editor.
For an existing database, run
`database/migrations/20261102_add_admin_and_contact_messages.sql` instead. This adds the user and
contact-message tables without changing existing posts. Copy the Neon connection string into
`DATABASE_URL` in `.env`.

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey) and add it as
`GEMINI_API_KEY` in `.env`. The AI summary helper is available only to signed-in volunteers. Draft
text is sent to Gemini for the request and is not saved to Beit Kultur's database by the helper.
Check Google's current API limits and pricing before use.

Set `ADMIN_USERNAME` and a strong `ADMIN_PASSWORD` in `.env`. The first successful admin login
creates the admin account in Neon, with a bcrypt password hash. You can remove those two settings
after the account has been created. Existing volunteer credentials can still use
`VOLUNTEER_USERNAME` and `VOLUNTEER_PASSWORD`; the first successful login saves that account to
Neon too. New volunteer accounts are created by an admin after approval.

To change an existing admin login, run `npm run admin:reset` in the VS Code terminal. Enter the new
username and password when prompted. The password stays hidden while you type and is saved as a
bcrypt hash in Neon. The command uses the database in the local `.env` file.

Set a random session secret with at least 32 characters. To generate one:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Then start the site:

```powershell
npm run dev
```

Admins and volunteers use the same login page at `/login`. Admins are sent to `/admin`; volunteers
are sent to `/news`. The session cookie is signed, HTTP-only, and expires after eight hours. Never
use example credentials or commit `.env`. Keep all passwords, `DATABASE_URL`, and `GEMINI_API_KEY`
private.

For the deployed site, add `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `SESSION_SECRET` as environment
variables in the Vercel project settings. Keep the existing `DATABASE_URL` and volunteer settings
if you still need them. Use a new random session secret with at least 32 characters. Enable the
variables for Production, then redeploy. Do not copy `.env` into the repository or share these
values in chat.

## Test volunteer approval

1. Apply the database schema or migration above.
2. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `SESSION_SECRET`.
3. Start the site, open `/get-involved`, then choose "Sign up as a volunteer" and send an application.
4. Open `/login` and sign in with the admin details. The first login creates the admin account.
5. Open `/admin`, approve the request, then create a username and password for the volunteer.
6. Sign out and sign in with that new volunteer account. Open `/news` to publish a post.

To create a production build, run `npm run build`.

## Scope and known limits

The first version of the project presentation is in
`presentation/Beit-Kultur-Project-Presentation.pptx`. Review the sample content and placeholders
before final submission.

The database connection uses Neon's serverless driver. Posts and comments are persistent when
`DATABASE_URL` points to the Neon project and the schema has been applied.

## Presentation

The presentation covers the site's purpose, visitor pages, volunteer blog workflow, AI summaries,
SMHI weather API, Neon database, accessibility, and a live demo walkthrough. Before presenting, be
ready to explain the code and data flow, and to demonstrate the features yourself.
