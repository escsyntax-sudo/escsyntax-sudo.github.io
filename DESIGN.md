# DESIGN.md

Direction supplied by the owner: "a coder type of vibe website".
Everything below is that instruction turned into concrete design fields. The owner owns it; revise it freely.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2

## Identity

- Subject: kned, a working coder. Node.js, Lua, Python. 62+ projects shipped.
- Character: plainspoken, tool-first, no marketing voice. The site should read like something a person who writes code would actually ship: tight, technical, readable, no decoration that has to be explained.
- Tone of copy: first person, short sentences, specific nouns. No hype adjectives.

## Palette

One accent, two neutrals, nothing else.

Dark (default, because the subject lives in an editor):
- ink background `#0B0C0E`
- raised surface `#111317`
- text `#E7E9EC`
- muted text `#A9B0B9`
- hairline `#262B32`
- accent `#F5A83C` (amber, used for links, focus rings and the one live marker)

Light:
- paper background `#F2EFE8`
- raised surface `#EAE6DD`
- text `#14161A`
- muted text `#565D66`
- hairline `#D5CFC2`
- accent `#8F4E05`

Reason for amber: it is the one warm signal in a cool neutral field, so a single accent reads as a cursor, not as decoration. Reason against neon green or blue: both are the default "hacker" shorthand, and this is a working portfolio, not a terminal costume.

## Typography

- Family: IBM Plex Sans for headline and body. IBM Plex Mono for labels, indices, metadata.
- Reason: Plex was drawn for an engineering company, so its slightly squared letterforms carry the coder character without becoming a novelty. Mono is limited to metadata, so it reads as annotation instead of "terminal aesthetic".
- Scale: H1 fluid `clamp(3.5rem, 12vw, 8.5rem)`, weight 600, tracking `-0.04em`. H2 `clamp(2rem, 5vw, 3rem)`. Body 1.0625rem, line-height 1.6. Mono labels `0.75rem`, tracking `0.08em`, uppercase.

## Layout

- Single content column, max width 1120px, aligned left. Asymmetry comes from the section gutter, not from centering.
- Section gutter: a narrow left column holding the section number in mono (01, 02, 03) plus a hairline rule. This is the identity motif: it mirrors the line-number gutter of an editor and gives every section the same spine.
- Composition varies by section so the page does not feel like a card stack: hero is a two column split (words left, spec sheet right), work is a numbered index table, stack is a large-type list with right-aligned descriptors, contact is one oversized link.

## Motion

- MOTION 2: entry stagger on load, one scroll reveal per section, hover and focus feedback, and a fade when the theme changes.
- Reason: the reveal order mirrors the reading order (name, then claim, then actions, then the spec sheet), so motion directs attention to hierarchy instead of decorating it. Nothing moves continuously except the caret in the wordmark, which is the single coder gesture and stops entirely under `prefers-reduced-motion`.
- Forbidden here: parallax, scroll hijacking, marquees, floating elements, and any animation that repeats without being asked for.

## Signature details

- The mono spec sheet in the hero (name, stack, shipped) instead of a statistics strip.
- The trailing period after the wordmark, in accent.
- Work rows open a short description panel: on a hover device the panel previews as the pointer passes, and a click or tap pins it open. The row is a real button with `aria-expanded`, so keyboard users get the same content.
- Each panel carries its own source link to the public repository, with the licence tag beside it. One link per panel, not a separate list of links, so the row and its source stay together.

## Content rules for this site

- 62+ projects is owner-supplied and may be stated. No other numbers, no testimonials, no client logos, no availability claims.
- Project names, descriptions, repository URLs and licences come from the owner's public GitHub (`github.com/escsyntax-sudo`), read from each README. Do not invent projects, links or claims about them.
- The wordmark is the name set in type. No avatar or logo is invented.
