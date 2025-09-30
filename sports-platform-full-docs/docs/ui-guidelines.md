# UI Guidelines (v1)
## Typografie & spacing
- Semibold titels, duidelijke hiërarchie (h1–h4).
- Spacing scale: 8/12/16/24/32; consistente paddings.
- Max 75–90 characters per paragraaf.

## Forms
- React Hook Form + zodResolver.
- Inline validatie; submit disabled tijdens pending; success toast + reset.
- Date/time pickers met duidelijke timezone hint.

## Kalender
- Lijstweergave (default): sorteer op starttijd; filter op team en datum-range.
- Maandweergave: kleine dots/indicators; klik → detail drawer.
- Empty state met CTA "Maak je eerste event" (coach/admin) of "Volg een team" (member).

## Event detail
- Head: titel, datum/tijd, locatie (later maplink), capaciteit.
- Body: beschrijving, benodigdheden, avatar group (max 10, +N).
- Footer: RSVP CTA (Going/Maybe/Not going) + statuslabel; disabled bij deadline of vol.

## Tabel-lijsten
- Sticky header, sorteerbare kolommen, responsive stacks op mobiel.
- >100 rijen: server-side paginate of virtueel scrollen.

## Toegankelijkheid
- Alle interacties focus-states; ARIA labels; role="dialog" met escape sluiting.
- Toetsenbord navigatie; tabvolgorde logisch.
