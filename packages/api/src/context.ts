import { PrismaClient } from '@sports-platform/db';
import { defineAbility, createAuthzHelper, AuthContext } from './authz/ability';

export interface Context {
  db: PrismaClient;
  authz: ReturnType<typeof createAuthzHelper>;
  user: {
    id: string;
    role: string;
    orgId: string;
    teamIds: string[];
    memberProfileId: string;
  };
}

export const createContext = (req?: any): Context => {
  const db = new PrismaClient();

  // Mock user for development - in production this would come from auth
  // For now, we'll use a simple approach with query params or headers
  const userId = req?.query?.userId || req?.headers?.['x-user-id'] || 'user-1';
  
  const mockUsers = {
    'user-1': {
      id: 'user-1',
      role: 'MEMBER',
      orgId: 'org-1',
      teamIds: ['team-1'],
      memberProfileId: 'member-1'
    },
    'user-2': {
      id: 'user-2',
      role: 'COACH',
      orgId: 'org-1',
      teamIds: ['team-1'],
      memberProfileId: 'member-2'
    },
    'user-3': {
      id: 'user-3',
      role: 'ADMIN',
      orgId: 'org-1',
      teamIds: [],
      memberProfileId: 'member-3'
    },
    'user-4': {
      id: 'user-4',
      role: 'PARENT',
      orgId: 'org-1',
      teamIds: [],
      memberProfileId: 'member-4'
    }
  };

  const mockUser = mockUsers[userId as keyof typeof mockUsers] || mockUsers['user-1'];

  const authContext: AuthContext = {
    role: mockUser.role,
    orgId: mockUser.orgId,
    userId: mockUser.id,
    teamIds: mockUser.teamIds,
    memberProfileId: mockUser.memberProfileId
  };

  const ability = defineAbility(authContext);
  const authz = createAuthzHelper(ability);

  return {
    db,
    authz,
    user: mockUser
  };
};
