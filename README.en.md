# Give your agent the power to sell everything you don't use

*Leelo en [español](README.md) — the guides themselves are in Spanish.*

Everyone has stuff collecting dust at home. This skill teaches your AI agent (Claude,
Codex, Cursor, whichever you use) to sell it for you.

I built it selling my own stuff: ~80 items, over a million pesos sold. I measured
each channel's fees listing by listing, and the mistakes I made along the way are
written up, because they're the part that teaches the most.

What it teaches your agent, roughly:

- Building your product inventory in a spreadsheet from photos, with market
  reference prices.
- Navigating Facebook Marketplace: posting listings, editing, renewing, marking
  sold.
- Finding the right subreddit for what you're selling, reading each sub's rules so
  you don't get banned, and putting the post together.
- Posting in Facebook groups without breaking their rules or tripping the spam
  filter.
- Deciding when MercadoLibre is worth it and at what price, with each category's
  real fees.
- Using Correo Argentino (MiCorreo) to generate shipments in batches: it parses what
  each buyer sends you and builds the file the portal accepts.
- And more: which permissions to grant and which not to, writing honest listings,
  what to verify before every post.

You don't need to know anything about AI: the skill is written for your agent to
read, so it can guide *you*.

## Getting started

Paste this to your agent:

> Read https://github.com/agustinkaizer/agent-garage-sale — start with the
> `AGENTS.md` — and guide me step by step to sell the stuff I no longer use. I've
> never used these tools: tell me what to install and what permissions to grant, one
> step at a time.

Your agent reads the skill and walks you through the four phases.

If you use Claude Code, you can keep it installed (see [`skill/`](skill/)) and start
any time with `/agent-garage-sale`.

> **Heads-up:** the guides, the spreadsheet templates and phase 4 (shipping) are in
> Spanish and Argentina-specific in places (Facebook Marketplace, MercadoLibre,
> Correo Argentino). The channel-economics method, the honesty policy and the
> automation gotchas travel anywhere, and your agent can translate the Spanish for
> you on the fly.

## The four phases

| Phase | What happens | Guide |
|---|---|---|
| **1. Setup** | Your agent tells you what to install (browser control, Google Sheets access) and which permissions to grant — and which not to | [`metodo/01-setup.md`](metodo/01-setup.md) |
| **2. Catalog** | You photograph your stuff; the agent builds the inventory in Google Sheets with market reference prices | [`metodo/02-catalogar.md`](metodo/02-catalogar.md) |
| **3. List** | Each item goes to the channel that pays best for its price point; the agent drafts and posts the listings, you approve them | [`metodo/03-publicar.md`](metodo/03-publicar.md) |
| **4. Ship** | You forward each buyer's messages to the agent; it builds the bulk-upload CSV that Correo Argentino's portal accepts | [`metodo/04-envios.md`](metodo/04-envios.md) |

## What I learned with real money

This is what worked for me. Nothing here needs anything you don't already have.

- **Reddit sold the most.** One catalog post in r/Mercadoreddit went viral and
  brought me people ready to buy:
  [the post is still up](https://www.reddit.com/r/Mercadoreddit/comments/1vlsjjz/).
- **Facebook Marketplace sells too** (5 sales this round): 0% fees and free pickup.
- **For clothes and sneakers, the undisputed number one is
  [Extra](https://extra.com.ar/)**, Argentina's second-hand fashion app.
- **MercadoLibre only from ~$100,000 ARS up.** Between the fees and the shipping you
  pay for, on a $50,000 item you'd need a +50% markup just to break even. Measured
  item by item in [`docs/economia-canales.md`](docs/economia-canales.md).
- **Facebook groups sell to niches but risk your account**: few groups, different
  text in each, spaced out, and posts written by hand.
- **The post office charges you for box volume** when it exceeds real weight: boots I
  declared as "30×30×30-ish" were going to cost $15,000 instead of $8,100.
- **Honesty as policy**: without proof I don't say "authentic", defects get declared
  upfront, and no AI-generated photos.

The mistakes are written up with root causes and fixes in
[`docs/errores.md`](docs/errores.md): the listing I almost deleted as a "duplicate"
that wasn't, the junk post that ended up published to a 21,900-member group, the CSV
the portal rejected.

## Ready-to-copy templates

Two Google Sheets templates. Hit "Make a copy" and it's yours, nothing to install:

- **Sale inventory** (phase 2):
  **➜ [Make your copy](https://docs.google.com/spreadsheets/d/1myEUJybKG5mf3KnBohoozAplT0vTH85NYoYs0YCFsBA/copy)**:
  the method's 19 columns with formulas (auto ID, USD price, % savings vs. buying
  new) and dropdowns editable in the `Listas` tab.
- **Correo Argentino bulk shipping** (phase 4):
  **➜ [Make your copy](https://docs.google.com/spreadsheets/d/1JH2lfuyrKisimnl1fenU0CQxVX6iEBXoYEjhTUwqv8o/copy)**:
  per-row validation against the official rules (`✅ OK` / `⚠️` with exactly what's
  missing), semicolon-separated export, dimensional-weight warnings, and a
  **📦 Correo Argentino** menu with **Download CSV** and **🧹 Reset to blank**
  buttons. The Apps Script travels with your copy; read it first in
  [`apps-script/Code.gs`](apps-script/Code.gs) (no external services).

## What's inside

```
AGENTS.md                        ← the entry point for your agent
CLAUDE.md                        ← imports it (Claude Code loads it automatically)
metodo/
  01-setup.md … 04-envios.md     ← the four phases, written for the agent
docs/
  economia-canales.md            ← what each channel actually pays, measured
  calculadora-canal.md           ← "where do I list this?": the math, ready to run
  aprendizajes-plataformas.md    ← automation gotchas for Facebook, ML and Sheets
  aprendizajes-envios.md         ← Correo Argentino format gotchas
  errores.md                     ← the mistakes, with root causes
skill/                           ← the installable version (Claude Code et al.)
apps-script/Code.gs              ← the shipping spreadsheet's buttons
```

## Follow the project

I told the story of this sale in
[this tweet](https://x.com/agustinanfosso/status/2087281874636767248), which also
went viral. A full video tutorial of the method is coming to my YouTube channel; the
link will appear here when it's up.

- YouTube: [@agustinanfosso](https://www.youtube.com/@agustinanfosso)
- X / Twitter: [@agustinanfosso](https://x.com/agustinanfosso)

## Disclaimer

Independent project, unaffiliated with Correo Argentino, Meta, MercadoLibre, Reddit
or Extra. I measured the fees and rates quoted in August 2026 and they will change;
the method for measuring them is documented. I verified the CSV format against the
official files and with real imports; if something changes, send an issue or PR.

## License

MIT — see [LICENSE](LICENSE).
