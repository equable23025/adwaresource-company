import "dotenv/config";
import { prisma } from "../src/lib/db";
import { hashPassword } from "../src/lib/password";
import { ROLES } from "../src/lib/roles";

const SEED_USERS = [
  {
    email: "admin@adwaresource.co.th",
    name: "Super Admin",
    password: "admin1234",
    role: ROLES.SUPER_ADMIN,
  },
  {
    email: "maker1@company.com",
    name: "Maker 1",
    password: "admin1234",
    role: ROLES.MAKER,
  },
  {
    email: "maker2@company.com",
    name: "Maker 2",
    password: "admin1234",
    role: ROLES.MAKER,
  },
  {
    email: "checker@company.com",
    name: "Checker",
    password: "admin1234",
    role: ROLES.CHECKER,
  },
  {
    email: "approver@company.com",
    name: "Approver",
    password: "admin1234",
    role: ROLES.APPROVER,
  },
] as const;

async function main() {
  for (const user of SEED_USERS) {
    const existing = await prisma.adminUser.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      console.log(`skip  ${user.email} (already exists)`);
      continue;
    }

    await prisma.adminUser.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword(user.password),
        role: user.role,
      },
    });

    console.log(`seed  ${user.email} → ${user.role}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
