# RBAC Matrix
Rollen: OWNER, ADMIN, COACH, PARENT, MEMBER

| Resource/Actie             | MEMBER | PARENT (voor kind) | COACH (eigen team) | ADMIN (org) | OWNER |
|---                         |---     |---                 |---                  |---          |---    |
| Event: List/Read (org)     | ✅ eigen/team | ✅ kind/team      | ✅ team/all*         | ✅ all       | ✅     |
| Event: Create/Update       | ❌     | ❌                 | ✅ team-events       | ✅ all       | ✅     |
| RSVP: Create/Update (self) | ✅     | ✅ voor kind       | ✅ voor teamleden†   | ✅ all       | ✅     |
| Attendance: Mark           | ❌     | ❌                 | ✅ teamleden         | ✅ all       | ✅     |
| Member profile: Read       | ✅ eigen| ✅ kind            | ✅ teamleden basic   | ✅ all       | ✅     |
| Member profile: Edit       | ✅ eigen| ✅ kind            | ❌                  | ✅           | ✅     |
| Facility: CRUD             | ❌     | ❌                 | ❌                  | ✅           | ✅     |
| Team: CRUD                 | ❌     | ❌                 | ✅ eigen team meta   | ✅ all       | ✅     |

\* COACH mag alle events lezen die relevant zijn voor eigen team(s).  
\† COACH mag RSVP/attendance beheren tijdens events waarvoor hij/zij verantwoordelijk is.

## CASL voorbeeld (schets)
```ts
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
export type Actions = 'manage'|'read'|'create'|'update'|'delete'|'rsvp'|'attend';
export type Subjects = 'Event'|'RSVP'|'Attendance'|'Member'|'Facility'|'Team'|'all';

export const defineAbility = (ctx: { role:string; orgId:string; userId:string; teamIds:string[] }) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  const { role, orgId, userId, teamIds } = ctx;

  can('read', 'Event', { orgId });
  if (role === 'MEMBER') {
    can('rsvp', 'Event', { orgId });
    can('read', 'Member', { orgId, userId });
    can('update', 'Member', { orgId, userId });
  }
  if (role === 'PARENT') {
    can('rsvp', 'Event', { orgId });
    can('update', 'Member', { orgId, parentUserId: userId }); // kind
  }
  if (role === 'COACH') {
    can('create', 'Event', { orgId, teamId: { $in: teamIds } });
    can(['update','attend','rsvp'], 'Event', { orgId, teamId: { $in: teamIds } });
    can('read', 'Member', { orgId, teamId: { $in: teamIds } });
  }
  if (role === 'ADMIN' || role === 'OWNER') {
    can('manage', 'all', { orgId });
  }
  return build();
};
```
