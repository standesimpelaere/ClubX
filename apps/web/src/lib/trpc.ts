import { createTRPCReact } from '@trpc/react-query';

// Temporary type fix - will be resolved when API types are fixed
export const trpc = createTRPCReact<any>();