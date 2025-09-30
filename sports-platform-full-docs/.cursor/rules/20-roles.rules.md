# Rollen
OWNER, ADMIN, COACH, PARENT, MEMBER

# Beleidsprincipes
- Server-side CASL abilities per request (user, orgId, role).
- Client: <Can /> gates; geen autorisatie-beslissingen uitsluitend client-side.
- Minderjarigen: PARENT kan kind-profiel/RSVP beheren (ABAC check: relation).

# Minimale policies (samenvatting)
- MEMBER: eigen events zien; eigen RSVP CRUD.
- PARENT: idem + gekoppelde kinderen.
- COACH: Team-events CRUD; aanwezigheden registreren voor eigen team.
- ADMIN: org-breed ledenbeheer, facilities, events, exports.
- OWNER: alles binnen org.
