import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const hackathonId = "e15fe12a-2f4d-42ac-91a9-1435e92d2be4";
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await prisma.hackathon.create({
    data: {
      endDate: nextWeek,
      id: hackathonId,
      name: "Hack the North",
      referralId: "hackathon_hackthenorth2023",
      slug: "htn-2023",
      startDate: today,
      utmSource: "hackthenorth2023",
      website: "https://hackthenorth.com/"
    }
  });

  const aydrianId = "2130f7cb-06f0-451e-ba6d-42dc804f26f6";
  const bilalId = "4057040c-7603-47a6-85e7-9076578663d7";
  const lesleyId = "cac55508-4fa5-4294-a941-3434b2508439";

  await Promise.all([
    prisma.staff.create({
      data: {
        askAbout: "CockroachDB, Web Applications, React, JavaScript/TypeScript",
        email: "aydrian@cockroachlabs.com",
        firstName: "Aydrian",
        id: aydrianId,
        image:
          "https://pbs.twimg.com/profile_images/1637838912243617793/XmhcZyZy_400x400.jpg",
        lastName: "Howard",
        location: "New York, NY",
        title: "Developer Advocate"
      }
    }),
    prisma.staff.create({
      data: {
        askAbout: "CockroachDB, Go",
        email: "bilal@cockroachlabs.com",
        firstName: "Bilal",
        id: bilalId,
        image:
          "https://pbs.twimg.com/profile_images/1491974903985278978/b82RDhVg_400x400.jpg",
        lastName: "Akhtar",
        location: "Toronto, ON",
        title: "Member of Technical Staff"
      }
    }),
    prisma.staff.create({
      data: {
        askAbout: "Internships, Life at Cockroach Labs",
        email: "lesley@cockroachlabs.com",
        firstName: "Lesley",
        id: lesleyId,
        image:
          "https://pbs.twimg.com/profile_images/981627137605165056/McK1RG9N_400x400.jpg",
        lastName: "Chow",
        location: "Las Vegas, NV",
        title: "Senior Recruiter"
      }
    })
  ]);

  const workshopDate = new Date();
  workshopDate.setHours(20, 30, 0, 0);

  await Promise.all([
    prisma.hackathonStaff.createMany({
      data: [
        { hackathonId, roles: ["judge", "mentor"], staffId: aydrianId },
        { alumYear: "2019", hackathonId, roles: ["mentor"], staffId: bilalId },
        { hackathonId, roles: ["recruiter"], staffId: lesleyId }
      ]
    }),
    prisma.challenge.create({
      data: {
        description: "Use CockrochDB Serverless",
        hackathonId,
        id: "0089da39-41b0-431f-8d65-1f46e99831a6",
        prize:
          "Roach Trophy and $100 in Amazon Gift Cards for each team member (up to 4).",
        title: "Best Use of CockroachDB Serverless"
      }
    }),
    prisma.workshop.create({
      data: {
        date: workshopDate,
        description: "Learn SQL with a Python and React Full-stack Application",
        hackathonId,
        id: "c5419c8c-7791-4900-89c9-dec6261b0293",
        location: "Workshop Room B",
        title: "FAbRiC Stack",
        url: "https://github.com/aydrian/fabric-stack-workshop"
      }
    })
  ]);

  console.log("🌱 Seeding complete");
}

seed();