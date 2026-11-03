# Beit Kultur website – wireframe spec

This file describes every page of the wireframe. Copilot: follow this file when building pages.
Build one page at a time. Text in [BRACKETS] is a placeholder: keep it as it is.

Language: English for now (not decided yet).

---

## 1. Design rules (use on every page)

### Colours
| Name | Hex | Use |
|---|---|---|
| Background | `#FAF8F2` | Page background (off-white, not pure white) |
| Text | `#1A1A1A` | All text (dark, not pure black) |
| Muted text | `#555555` | Dates, small info |
| Lime | `#E8FF5A` | Main buttons (Donate) and category tags. Text on lime is `#1A1A1A` |
| Box | `#EFEBE0` | Light boxes and sections |
| Card | `#FFFFFF` | Cards, with border `1px solid #CFCABD` |
| Input border | `#6B675E` | 2px border on all inputs |
| Footer | `#1A1A1A` background, `#FAF8F2` text |

### Text
- Use **TeX Gyre Adventor** for body text, headings, logo and buttons. Use the regular, bold, italic and bold-italic font files in `static/fonts/`.
- Body text: **18px**, line-height **1.6**.
- Headings: bold (800–900). Page title 56px desktop, 44px phone.
- **All text is left-aligned.** Use normal word spacing and natural wrapping throughout the site.
- No italics or underlines for emphasis. Use bold. (Exception: the logo.)
- Short paragraphs, one idea each.

### Logo
Two lines: `BEIT` (weight 900) and `KULTUR` (weight 900, italic). Links to Home.

### Layout
- Max content width 1120px, centred, padding 24px (16px on phone).
- On small screens, everything is one column.
- Use square corners on all boxes, buttons, inputs, cards, and images.

### Buttons
- Buttons use an off-white `#FAF8F2` background, dark `#1A1A1A` text, and a second off-white shade for the rounded arrow tile.
- Donate buttons use the same off-white background with a lime `#E8FF5A` arrow tile.
- Use a rounded outline and a separate rounded arrow tile at the right. Keep the existing button label.
- Every button and link is **at least 44px tall** to tap.

---

## 2. Accessibility rules (every page)

- `<html lang="en">`.
- **Skip link** as the first thing on the page: "Skip to main content", hidden until it gets keyboard focus, links to `#main`.
- `<main id="main">` on every page.
- **Visible focus**: `outline: 3px solid #1A1A1A; outline-offset: 3px` on `:focus-visible` for links, buttons, inputs, textareas and summary.
- Every input has a visible `<label>` above it. Required fields say "(required)" in the label.
- Error messages: icon + words, never colour only. Use `role="alert"`.
- Every image has a real `alt` text (see image list below).
- Filter and search results are announced with `aria-live="polite"`, for example "Showing 3 events".
- Toggle buttons use `aria-pressed`. The phone menu button uses `aria-expanded`.
- Decorative background videos are muted, hidden from assistive technology, and respect `prefers-reduced-motion`. Other videos show controls and captions.
- Login: allow paste and password managers (`autocomplete="username"` and `autocomplete="current-password"`), and a "Show" button for the password.
- Respect `prefers-reduced-motion`.

---

## 3. Shared parts

### Header (every page)
Left to right: logo · menu · "Easy read" button · lime "Donate" button.
Menu links: **About, Projects, Events, News, Get involved, Membership**.

"Easy read" button: makes text bigger and adds more spacing (this is the theme switcher for task 4). Uses `aria-pressed`.

**Phone:** logo · Donate button · "Menu" button. Tapping "Menu" opens the links in a list below (button text changes to "Close"). The Easy read button is inside the open menu.

### Footer (every page)
Dark background. Logo, the same menu links, Donate button.
Bottom row: "Beit Kultur · non-profit cultural association · Stockholm" and links: Privacy, Contact us (→ /about#contact), Volunteer login.

---

## 4. Pages

### Home — `/`
1. Big logo (BEIT / KULTUR), tagline "A non-profit community that makes culture". Buttons: **Donate** (main) and **Get involved** (second).
2. Full-page background video: `static/videos/home-background.mp4`, with `home-background-poster.jpg` as its poster. It autoplays muted and loops behind the page content, with a light overlay for readability.
3. **Who we are**:
   - We create culture from the grassroots, embracing intersectionality and opening spaces for artists from the global majority.
   - We believe in art as a powerful channel that breaks down borders, brings people together and creates dialogue, while building community.
   - **This is what Beit Kultur is.**
   - Link: "Read more about us" → /about
4. **Next events**: 3 cards (image, date · category, title, "Read more" → event page). Link "See all events" → /events.
   - Sundays at Beit: Softronic live set · Music · `sundays-live-set.jpg`
   - [Beit Kultur Food Festival] · Festival · `food-festival.jpg`
   - [New Voices Art Exhibition] · Exhibition · `art-exhibition.jpg`
5. **Latest news**: 3 newest posts (date, title, link). Link "All news" → /news.

### About — `/about`
1. Title "About Beit Kultur".
   - Full-viewport background video: `static/videos/about-background.mp4`, with `static/images/about-background-poster.jpg` as its poster. Keep it muted and behind all content; respect `prefers-reduced-motion`.
2. **Our mission**: Beit Kultur is a non-profit cultural association. We give artists from the global majority (BIPOC: Black, Indigenous and People of Color) a platform to show their work in music, poetry and film.
   **Our aim**: Mainstream art spaces mostly cater to white artists. We want to change the lack of representation for artists from the global majority. We are a grassroots movement, and everyone at Beit Kultur is a volunteer.
3. **Our values** (3 cards with image):
   - Community — We bring people of all ages together through culture. (`drawing-street-dance.jpg`)
   - Collaboration — We connect artists, cultural associations and galleries to make projects together. (`drawing-hanging-art.jpg`)
   - Inclusion — We make space for artists who are often left out of mainstream art spaces. (`drawing-gallery.jpg`)
4. **Questions** (use `<details>` / `<summary>`):
   - Who can show their work at Beit Kultur? → Artists from the global majority (BIPOC), in music, poetry, film and other art forms.
   - Who runs Beit Kultur? → Volunteers. We are a grassroots movement.
   - How can I help? → You can volunteer, become a member or donate. See Get involved.
   - Can my association or gallery work with you? → Yes. We want to work with other cultural associations. Send us a message below.
5. **Contact us** (`id="contact"`) — the ONLY contact form on the site:
   - Name (required), Email (required), "What is it about?" select (I want to volunteer / I am an artist / I want to become a member / My association or gallery / Something else), Message (required), button "Send message".
   - If the page opens with `?topic=member`, pre-select "I want to become a member".
   - Next to it: Email beitkultur@gmail.com, Instagram @beitkultur. No address is displayed.

(Staff and partners sections: hidden until there is real content.)

### Projects — `/projects`
Title "Our projects". Intro: Projects that give artists from the global majority space to show their work in music, poetry and film.
Project cards (image, year · art form, title, description), 3 per row desktop, 1 on phone. Store projects in `src/lib/data/projects.js` as a list of objects.
- Sundays at Beit · [YEAR] · Music, live sets · `sundays-at-beit.jpg` · "Sundays at Beit presents live sets by artists, like the Softronic live set. [MORE ABOUT THE SERIES]"
- Beit Kultur goes digital · [YEAR] · Digital · no image yet · "Our first website. Before this, Beit Kultur had no digital platform. Now artists, members, volunteers and donors can find us online."
- 4 × [PROJECT NAME] placeholders.
End: "Want to support a project? Get involved" (link).

### Events — `/events`
1. Title "Events". Intro: Music, poetry, film, festivals and exhibitions by artists from the global majority.
   - Full-page background video: `static/videos/events-background.mp4`, with `static/images/events-background-poster.jpg` as its poster. Keep it muted and looping behind the content, use a light overlay for readability, respect `prefers-reduced-motion`, and keep the header and footer opaque.
2. **Weather box** (task 5, SMHI API): "Weather today in Stockholm", [TEMP] °C, "Forecast from SMHI". Stockholm ≈ latitude 59.33, longitude 18.07.
3. **Filter buttons** (task 4): All, Music, Poetry, Film, Festivals, Exhibitions. Use `aria-pressed`. Under them: "Showing X events" with `aria-live="polite"`. If none: "No events of this type right now."
4. **Event list**: date block ([DD] [MON]), image, category tag, title, "[TIME] · [PLACE] · [PRICE]", "Read more" → event page.
   - Sundays at Beit: Softronic live set · Music · `sundays-live-set.jpg`
   - [EVENT NAME] · Poetry · `poetry-reading.jpg`
   - [EVENT NAME] · Film · `drawing-calendar.jpg`
   - [Beit Kultur Food Festival] · Festivals · `food-festival.jpg`
   - [EVENT NAME] · Festivals · `street-festival.jpg`
   - [New Voices Art Exhibition] · Exhibitions · `art-exhibition.jpg`

### One event — `/events/[slug]`
"← Back to all events". Image, category, title. Details list: Date, Time, Place ([ADDRESS], Stockholm), Price.
**About the event**: [ABOUT THE EVENT AND THE ARTIST].
**Access information** box: Entrance [STEP-FREE OR STAIRS], Toilets [ACCESSIBLE TOILET YES / NO], Sound and light [LOUD MUSIC, FLASHING LIGHTS?], Quiet space [YES / NO]. "Questions about access? Contact us".

### News — `/news` (task 1)
1. Title "News". "News from Beit Kultur. Members also get it by email. Become a member" (link → /members).
2. Logged out: "Volunteer? Log in to add a post" (→ /login). Logged in: "+ Add post" button (→ /news/new).
3. **Search** (`role="search"`): label "Search news", button "Search". "Showing X posts" with `aria-live`.
4. Post list: image, date · author, title (link to the post), short summary.

### One post — `/news/[id]` (task 1 + PD)
"← Back to all news" at top and bottom. Date · author, title.
**Summary box** with tag "Summary · made with AI" (PD: AI API).
Image, post text.
**Comments** (PD: saved in Neon): list of comments (name · date, text). Form: Your name, Comment, button "Post comment".

### Add a post — `/news/new` (task 2 + 6, logged in only)
Dark bar at top: "Logged in as [USERNAME]" · "Log out".
Form: Title, Text, Image link (optional).
**Summary** box: button "Generate summary with AI", result box, note "Check the summary before you publish. You can edit it."
Buttons: "Publish post", "Cancel".

### Volunteer login — `/login` (task 6)
Centred card: "Volunteer login", "Only volunteers can add news posts."
Username, Password (with "Show" button), note "You can paste your password or use a password manager."
Error example: icon + "The username or password is wrong. Please try again."
Button "Log in". Link "Back to the home page".

### Get involved — `/get-involved`
Title + "Beit Kultur is run by volunteers. There are four ways you can take part." Image `drawing-hanging-art.jpg`.
4 numbered cards, NO forms:
1. Volunteer — Give your time to help make events and projects happen. [WHAT VOLUNTEERS DO] → "Contact us to volunteer" (/about?topic=volunteer#contact)
2. Show your work — Are you an artist from the global majority? We want to give your music, poetry or film a stage. → "Contact us as an artist"
3. Become a member — Support us every month or year. Members get our newsletter. → "See membership" (/members)
4. Donate — Give once. We show you where the money goes. → "Donate" (lime, /donate)

### Membership — `/members`
Title "Membership". "Members support artists from the global majority. All members get our newsletter."
3 cards: One time ([PRICE] kr), Monthly ([PRICE] kr a month), Yearly ([PRICE] kr a year). Each: [WHAT IS INCLUDED], button "Join" → /about?topic=member#contact.
"Already a member and want to renew? Contact us."


### Donate — `/donate` (test mode)
1. Title "Donate". "Your gift helps artists from the global majority show their work. Why we exist" (→ /about).
2. Video placeholder [VIDEO ABOUT BEIT KULTUR]. Note: "The video does not play by itself. It has captions and a text version."
3. **Give a gift** form:
   - Box: "Test mode: no real money is taken."
   - Step 1: Choose an amount — buttons 100 / 200 / 300 / 400 kr (`aria-pressed`), or "Or type another amount in kr".
   - Step 2: Your email (optional, for a thank-you).
   - Step 3: lime button "Give [AMOUNT] kr".
   - "We only save the amount and the date. Privacy" (link).
   - Saves **amount + date** to Neon. This is how donations are counted.
4. **Where the money goes**: 3 boxes "[XX] %" + "[PURPOSE]".

### Privacy — `/privacy`
Title "Privacy", "Last updated: [DATE]".
**What we collect**: Visits (Vercel Web Analytics, no cookies) · Test donations (amount and date, email only if added) · Contact form (name, email, message) · Comments (name and comment) · Volunteer login (username and a protected password).
Sections: Why we collect it · How long we keep it · Your rights · "Questions about your data? Email beitkultur@gmail.com or use the contact form."

---

## 5. Images (in `static/images/`)

| File | Alt text |
|---|---|
| `event-crowd.jpg` | A crowd at a Beit Kultur event in a bright room with textiles hanging from the ceiling |
| `sundays-at-beit.jpg` | A DJ performing at Sundays at Beit beneath a colorful sign that names Softronic |
| `drawing-stage.jpg` | Drawing of people dancing in front of a stage with string lights |
| `drawing-food-festival.jpg` | Drawing of people sharing food at long tables at an outdoor festival |
| `drawing-street-dance.jpg` | Drawing of people dancing together in the street |
| `drawing-hanging-art.jpg` | Drawing of a group of people hanging artworks together in a room |
| `drawing-gallery.jpg` | Drawing of visitors looking at artworks in a gallery |
| `drawing-calendar.jpg` | Drawing of a phone showing an event calendar |

In code, write the path as `/images/event-crowd.jpg` (not `/static/images/...`).

---

## 6. Assignment map

| Task | Where |
|---|---|
| 1. Post list + open + back | /news → /news/[id] |
| 2. Add a post | /news/new |
| 3. Readable, works on small screens | All pages (one column on phone) |
| 4. Filter / search / theme | Events filter, News search, Easy read button |
| 5. External API | SMHI weather on /events |
| 6. Login / logout, login before adding posts | /login, /news/new |
| PD: comments in Neon | /news/[id] |
| PD: AI API | Summary on /news/new and /news/[id] |
| PD: SQL database | Posts, comments, test donations in Neon |
| Visitor count | Vercel Web Analytics |
