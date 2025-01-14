import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection
    await prisma.$connect();
    console.log("Successfully connected to the database");

    // Get all projects
    const projects = await prisma.project.findMany();
    console.log("Projects in the database:");
    console.log(JSON.stringify(projects, null, 2));

    // Get all users (if you have a user table)
    const users = await prisma.user.findMany();
    console.log("Users in the database:");
    console.log(JSON.stringify(users, null, 2));

    // You can add more queries to check other tables
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
