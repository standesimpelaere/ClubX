# Sprint-1 — Kalender & RSVP
Scope: Event CRUD (ADMIN/COACH), lijst/maandweergave, RSVP (Member/Parent/Coach), aanwezigheden (Coach), RBAC v1, E2E voor RSVP & aanwezigheden.

## US-1: Als lid wil ik mijn clubkalender zien
**AC**
1. In “Mijn clubs” kies ik een org en zie ik events in lijstweergave, gesorteerd op starttijd.
2. Filters: team (optioneel), datum van/tot.
3. Empty state toont CTA “Nog geen events”.

## US-2: Als lid wil ik een event detail zien
**AC**
1. Detail toont titel, datum/tijd, locatie, beschrijving, capaciteit (indien ingesteld).
2. Ik zie mijn huidige RSVP status (indien aanwezig).
3. Ik zie deelnemers-aantallen (niet volledige lijst in Sprint-1).

## US-3: Als lid wil ik mijn RSVP beheren
**AC**
1. CTA met opties: Going / Maybe / Not going.
2. Na bevestigen verandert mijn status zichtbaar binnen 1s.
3. Capaciteitsregels: bij volle capaciteit → blokkeren (wachtlijst later).
4. Deadline (event voorbij of locked) → RSVP disabled.

## US-4: Als coach wil ik events voor mijn team beheren
**AC**
1. Coach kan event aanmaken/bewerken voor eigen team.
2. Validaties: endsAt > startsAt; capacity > 0 indien gezet.
3. Alleen coach/admin/owner zien de “Bewerken”-knop.

## US-5: Als coach wil ik aanwezigheden markeren
**AC**
1. Lijst van teamleden met toggles: Present / Late / Absent.
2. Opslaan is idempotent.
3. Toegestaan tijdens of na event (voor Sprint-1: ook vóór toegestaan).

## US-6: RBAC basis werkt
**AC**
1. Member kan géén event CRUD.
2. Parent kan RSVP beheren voor gekoppeld kind.
3. Coach kan enkel team-events bewerken die aan zijn teamId gekoppeld zijn.
4. Admin/Owner kunnen alles binnen org.

## US-7: E2E test (Playwright)
**AC**
1. Login als MEMBER → open event → zet RSVP op Going → herlaad → status persistent.
2. Login als COACH → open team event → markeer 1 aanwezig → herlaad → status persistent.
3. Login als MEMBER → probeer edit route → 403 melding.
