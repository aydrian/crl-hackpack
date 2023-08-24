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
      slug: "hackthenorth2023",
      startDate: today,
      website: "https://hackthenorth.com/"
    }
  });

  const aydrianId = "2130f7cb-06f0-451e-ba6d-42dc804f26f6";
  const bilalId = "4057040c-7603-47a6-85e7-9076578663d7";
  const lesleyId = "cac55508-4fa5-4294-a941-3434b2508439";

  Promise.all([
    prisma.staff.create({
      data: {
        askAbout: "CockroachDB, Web Applications, React, JavaScript/TypeScript",
        email: "aydrian@cockroachlabs.com",
        firstName: "Aydrian",
        id: aydrianId,
        image: "",
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
        image: "",
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
        image: "",
        lastName: "Chow",
        location: "Las Vegas, NV",
        title: "Senior Recruiter"
      }
    })
  ]);

  Promise.all([
    prisma.hackathonStaff.createMany({
      data: [
        { hackathonId, roles: ["judge", "mentor"], staffId: aydrianId },
        { hackathonId, roles: ["mentor"], staffId: bilalId },
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
        date: new Date(),
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
