import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { TRPCError } from '@trpc/server';

export type Actions = 'manage' | 'read' | 'create' | 'update' | 'delete' | 'rsvp' | 'attend';
export type Subjects = 'Event' | 'RSVP' | 'Attendance' | 'Member' | 'Facility' | 'Team' | 'all';

export type AuthContext = {
  role: string;
  orgId: string;
  userId: string;
  teamIds: string[];
  memberProfileId?: string;
};

export const defineAbility = (ctx: AuthContext) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  const { role, orgId, userId, teamIds, memberProfileId } = ctx;

  // Everyone can read events in their org
  can('read', 'Event', { orgId });

  if (role === 'MEMBER') {
    can('rsvp', 'Event', { orgId });
    can('read', 'Member', { orgId, userId });
    can('update', 'Member', { orgId, userId });
  }

  if (role === 'PARENT') {
    can('rsvp', 'Event', { orgId });
    can('update', 'Member', { orgId, parentUserId: userId }); // for child
  }

  if (role === 'COACH') {
    can('create', 'Event', { orgId, teamId: { $in: teamIds } });
    can(['update', 'attend', 'rsvp'], 'Event', { orgId, teamId: { $in: teamIds } });
    can('read', 'Member', { orgId, teamId: { $in: teamIds } });
  }

  if (role === 'ADMIN' || role === 'OWNER') {
    can('manage', 'all', { orgId });
  }

  return build();
};

export const createAuthzHelper = (ability: ReturnType<typeof defineAbility>) => {
  return {
    require: (action: Actions, subject: Subjects, where?: any) => {
      if (!ability.can(action, subject, where)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `Insufficient permissions: cannot ${action} ${subject}`
        });
      }
    }
  };
};
