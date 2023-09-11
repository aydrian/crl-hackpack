import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const testHackathonId = "061c4a4d-2ec5-446f-a7f7-b68564bd3617";
  const htnHackathonId = "e15fe12a-2f4d-42ac-91a9-1435e92d2be4";
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await Promise.all([
    prisma.hackathon.create({
      data: {
        endDate: nextWeek,
        id: testHackathonId,
        name: "Test Hackathon",
        referralId: "hackathon_test2003",
        slug: "test-2023",
        startDate: today,
        utmSource: "test2003",
        website: "https://mlh.io/"
      }
    }),
    prisma.hackathon.create({
      data: {
        endDate: new Date("2023-09-17"),
        id: htnHackathonId,
        name: "Hack the North",
        referralId: "hackathon_hackthenorth2023",
        slug: "htn-2023",
        startDate: new Date("2023-09-15"),
        utmSource: "hackthenorth2023",
        website: "https://hackthenorth.com/"
      }
    })
  ]);

  const aydrianId = "2130f7cb-06f0-451e-ba6d-42dc804f26f6";
  const bilalId = "4057040c-7603-47a6-85e7-9076578663d7";
  const lesleyId = "cac55508-4fa5-4294-a941-3434b2508439";

  await Promise.all([
    prisma.staff.create({
      data: {
        askAbout: "CockroachDB, Web Applications, React, JavaScript/TypeScript",
        email: "aydrian@cockroachlabs.com",
        firstName: "Aydrian",
        github: "https://github.com/aydrian",
        id: aydrianId,
        image:
          "https://pbs.twimg.com/profile_images/1637838912243617793/XmhcZyZy_400x400.jpg",
        instagram: "https://www.instagram.com/itsaydrian/",
        lastName: "Howard",
        linkedin: "https://www.linkedin.com/in/aydrian/",
        location: "New York, NY",
        title: "Developer Advocate",
        twitter: "https://twitter.com/itsaydrian",
        website: "https://itsaydrian.com"
      }
    }),
    prisma.staff.create({
      data: {
        askAbout:
          "CockroachDB, Python, SQL, Storage, AWS, EC2, S3, Being an Intern, Toronto, Life at CockroachDB",
        email: "bilal@cockroachlabs.com",
        firstName: "Bilal",
        id: bilalId,
        image:
          "https://pbs.twimg.com/profile_images/1491974903985278978/b82RDhVg_400x400.jpg",
        instagram: "https://www.instagram.com/isitbilal/",
        lastName: "Akhtar",
        linkedin: "https://www.linkedin.com/in/bilalakhtar0/",
        location: "Toronto, ON",
        title: "Member of Technical Staff",
        website: "http://itsbilal.com/"
      }
    }),
    prisma.staff.create({
      data: {
        askAbout:
          "Careers, Life at Cockroach Labs, DEI at Cockroach Labs, Interview Tips & Tricks",
        email: "lesley@cockroachlabs.com",
        firstName: "Lesley",
        id: lesleyId,
        image:
          "https://pbs.twimg.com/profile_images/981627137605165056/McK1RG9N_400x400.jpg",
        lastName: "Chow",
        linkedin: "https://www.linkedin.com/in/lesleychow/",
        title: "Senior Recruiter"
      }
    })
  ]);

  const workshopDate = new Date();
  workshopDate.setHours(20, 30, 0, 0);

  await Promise.all([
    prisma.hackathonStaff.createMany({
      data: [
        {
          hackathonId: htnHackathonId,
          roles: ["judge", "mentor"],
          staffId: aydrianId
        },
        {
          alumYear: "2019",
          hackathonId: htnHackathonId,
          roles: ["mentor"],
          staffId: bilalId
        },
        {
          hackathonId: htnHackathonId,
          roles: ["recruiter"],
          staffId: lesleyId
        },
        {
          hackathonId: testHackathonId,
          roles: ["judge", "mentor"],
          staffId: aydrianId
        },
        {
          hackathonId: testHackathonId,
          roles: ["recruiter"],
          staffId: lesleyId
        }
      ]
    }),
    prisma.challenge.create({
      data: {
        description: "Use CockrochDB Serverless",
        hackathonId: htnHackathonId,
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
        hackathonId: htnHackathonId,
        id: "c5419c8c-7791-4900-89c9-dec6261b0293",
        location: "Workshop Room B",
        title: "FAbRiC Stack",
        url: "https://github.com/aydrian/fabric-stack-workshop"
      }
    }),
    prisma.challenge.create({
      data: {
        description: "Use CockrochDB Serverless",
        hackathonId: testHackathonId,
        id: "91d1e31d-ba80-4f50-9a83-19df8a1dcd3b",
        prize:
          "Roach Trophy and $100 in Amazon Gift Cards for each team member (up to 4).",
        title: "Best Use of CockroachDB Serverless"
      }
    }),
    prisma.workshop.create({
      data: {
        date: workshopDate,
        description: "Learn SQL with a Python and React Full-stack Application",
        hackathonId: testHackathonId,
        id: "84a60b41-0652-40ba-93fd-129ddd2b636e",
        location: "Workshop Room B",
        title: "FAbRiC Stack",
        url: "https://github.com/aydrian/fabric-stack-workshop"
      }
    })
  ]);

  console.log("🌱 Seeding complete");
}

seed();
