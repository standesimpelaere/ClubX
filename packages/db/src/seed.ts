import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create organization
  const org = await prisma.org.create({
    data: {
      name: 'FC Example',
      slug: 'fc-example',
      city: 'Amsterdam'
    }
  });

  // Create users
  const owner = await prisma.user.create({
    data: {
      email: 'owner@example.com',
      name: 'John Owner'
    }
  });

  const coach = await prisma.user.create({
    data: {
      email: 'coach@example.com',
      name: 'Jane Coach'
    }
  });

  const parent = await prisma.user.create({
    data: {
      email: 'parent@example.com',
      name: 'Bob Parent'
    }
  });

  const member1 = await prisma.user.create({
    data: {
      email: 'member1@example.com',
      name: 'Alice Member'
    }
  });

  const member2 = await prisma.user.create({
    data: {
      email: 'member2@example.com',
      name: 'Charlie Member'
    }
  });

  const member3 = await prisma.user.create({
    data: {
      email: 'member3@example.com',
      name: 'David Member'
    }
  });

  const child = await prisma.user.create({
    data: {
      email: 'child@example.com',
      name: 'Diana Child'
    }
  });

  // Create team
  const team = await prisma.team.create({
    data: {
      orgId: org.id,
      name: 'Senior Team'
    }
  });

  // Create facility
  const facility = await prisma.facility.create({
    data: {
      orgId: org.id,
      name: 'Main Field',
      type: 'Football Field',
      location: 'Sports Complex',
      capacity: 22
    }
  });

  // Create member profiles
  const ownerProfile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: owner.id,
      role: 'OWNER',
      displayName: 'John Owner'
    }
  });

  const coachProfile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: coach.id,
      role: 'COACH',
      displayName: 'Jane Coach',
      teamId: team.id
    }
  });

  const parentProfile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: parent.id,
      role: 'PARENT',
      displayName: 'Bob Parent'
    }
  });

  const member1Profile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: member1.id,
      role: 'MEMBER',
      displayName: 'Alice Member',
      teamId: team.id
    }
  });

  const member2Profile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: member2.id,
      role: 'MEMBER',
      displayName: 'Charlie Member',
      teamId: team.id
    }
  });

  const member3Profile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: member3.id,
      role: 'MEMBER',
      displayName: 'David Member',
      teamId: team.id
    }
  });

  const childProfile = await prisma.memberProfile.create({
    data: {
      orgId: org.id,
      userId: child.id,
      role: 'MEMBER',
      displayName: 'Diana Child',
      teamId: team.id,
      parentUserId: parent.id
    }
  });

  // Create events (2 team events, 1 org-wide)
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const event1 = await prisma.event.create({
    data: {
      orgId: org.id,
      teamId: team.id,
      title: 'Training Session',
      description: 'Regular team training focusing on ball control and passing',
      location: 'Main Field',
      startsAt: tomorrow,
      endsAt: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000),
      capacity: 20,
      createdById: coach.id
    }
  });

  const event2 = await prisma.event.create({
    data: {
      orgId: org.id,
      teamId: team.id,
      title: 'Match vs Rivals',
      description: 'Important league match against our biggest rivals',
      location: 'Stadium',
      startsAt: nextWeek,
      endsAt: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000),
      capacity: 15,
      createdById: coach.id
    }
  });

  const event3 = await prisma.event.create({
    data: {
      orgId: org.id,
      title: 'Club Meeting',
      description: 'Monthly club meeting for all members to discuss upcoming events and club business',
      location: 'Club House',
      startsAt: nextMonth,
      endsAt: new Date(nextMonth.getTime() + 60 * 60 * 1000),
      createdById: owner.id
    }
  });

  // Create RSVPs
  await prisma.rSVP.createMany({
    data: [
      {
        orgId: org.id,
        eventId: event1.id,
        memberProfileId: member1Profile.id,
        status: 'GOING',
        note: 'Looking forward to it!'
      },
      {
        orgId: org.id,
        eventId: event1.id,
        memberProfileId: member2Profile.id,
        status: 'MAYBE',
        note: 'Might be late'
      },
      {
        orgId: org.id,
        eventId: event1.id,
        memberProfileId: member3Profile.id,
        status: 'GOING'
      },
      {
        orgId: org.id,
        eventId: event2.id,
        memberProfileId: member1Profile.id,
        status: 'GOING'
      },
      {
        orgId: org.id,
        eventId: event2.id,
        memberProfileId: childProfile.id,
        status: 'GOING'
      },
      {
        orgId: org.id,
        eventId: event3.id,
        memberProfileId: ownerProfile.id,
        status: 'GOING'
      },
      {
        orgId: org.id,
        eventId: event3.id,
        memberProfileId: coachProfile.id,
        status: 'GOING'
      }
    ]
  });

  // Create some attendance records
  await prisma.attendance.createMany({
    data: [
      {
        orgId: org.id,
        eventId: event1.id,
        memberProfileId: member1Profile.id,
        status: 'PRESENT'
      },
      {
        orgId: org.id,
        eventId: event1.id,
        memberProfileId: member2Profile.id,
        status: 'LATE'
      },
      {
        orgId: org.id,
        eventId: event1.id,
        memberProfileId: member3Profile.id,
        status: 'PRESENT'
      }
    ]
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created org: ${org.name} (${org.slug})`);
  console.log(`Created team: ${team.name}`);
  console.log(`Created facility: ${facility.name}`);
  console.log(`Created 7 users with different roles`);
  console.log(`Created 3 events (2 team, 1 org-wide)`);
  console.log(`Created 7 RSVPs`);
  console.log(`Created 3 attendance records`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
