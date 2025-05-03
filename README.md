# TODO List Project with NextJS.

## RestAPIs

A REST API (Representational State Transfer Application Programming Interface) is an architectural style for designing
web services that use standard HTTP methods to perform operations on resources. It's a way for different software
systems to communicate and exchange data over a network, typically the internet.

HTTP methods (GET, POST, PUT, PATCH, and DELETE) are used to perform operations on resources. These methods correspond
to CRUD operations (Create, Retrieve, Update, and Delete). GET is for retrieving data, POST is for creating new
resources, PUT and PATCH are for updating, and DELETE is for removing resources. Other methods like OPTIONS and HEAD are
less frequently used.

    GET: Retrieves data from a server. 
    POST: Sends data to the server to create a new resource.
    PUT: Updates or replaces an existing resource with the provided data. 
    PATCH: Partially updates an existing resource. 
    DELETE: Removes a resource from the server.

These methods, along with the URI (Uniform Resource Identifier) that specifies the resource, form the core of REST API
requests.

## REST APIs with NextJS

Next.js is used to build full-stack applications with ease, and its API Routes feature is key to creating your backend.
Nestled within the pages/api directory, these files transform into serverless API endpoints.

By defining asynchronous handler functions within these files, you can:

- Receive HTTP requests: Access request details like method (GET, POST, etc.), headers, and body.
- Process data: Interact with databases, external APIs, or perform any server-side logic.
- Send responses: Return data in JSON format with appropriate HTTP status codes.

### Major components

To implement REST APIs with SQLite3 and Prisma.

- **SQLite3** : SQLite3 is a self-contained, serverless, zero-configuration, transactional SQL database engine. It's
  lightweight and stores the entire database in a single disk file. This makes it an excellent choice for development
  and testing, Small to medium-sized applications, Mobile and embedded devices, Local data storage.

- **Prisma** : Prisma is a next-generation ORM (Object-Relational Mapper) for Node.js and TypeScript. It aims to
  make database interactions intuitive, type-safe, and developer-friendly. Prisma offers several key components:
    - Prisma Schema: A declarative way to define your database schema.
    - Prisma Client: An auto-generated, type-safe database client tailored to your schema, providing excellent
      autocompletion and reducing runtime errors.
    - Prisma Migrate: A tool for managing database schema migrations in a safe and reliable way.
    - Prisma Studio: A GUI tool for visually inspecting and manipulating your database data.

  Prisma supports various databases, including PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB. It
  significantly improves the developer experience by abstracting away the complexities of raw SQL and providing a
  structured and type-safe way to interact with your database.

### Installing Packages

For database, we are using sqlite3 and prisma. Commands to install these dependencies are:

    -   npm install sqlite3
    -   npm install prisma --save-dev

Initialize prisma and set datasource as sqlite3

    -   npx prisma init --datasource-provider sqlite

### Configuring Tables from Table Design

Define the schema (Table Design) of the database in the prisma/schema.prisma file

    generator client {
    provider = "prisma-client-js"
    }
    
    datasource db {
    provider = "sqlite"
    url      = "file:./dev.db"
    }
    
    model User {
    id    Int    @id @default(autoincrement())
    name  String
    email String @unique
    }

Push the schema to database.

    npx prisma db push
    npx prisma generate

### Creation of APIs

The APIs are created in the folder src/pages/api. All the routes for the apis are created in this folder.

Use the folder to group and manage routes for different routes. For example, for the CRUD operations with users with the
fields (name and email), we create two files index.js which handles GET and POST Request and [id].js file that manages
the GET, PUT and DELETE operations for a specific user.

Code for index.js file

    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();
    
    export default async function handler(req, res) {
        const { method } = req;
    
        switch (method) {
            case 'GET':
                try {
                    const users = await prisma.user.findMany();
                    res.status(200).json(users);
                } catch (err) {
                    res.status(500).json({ error: 'Failed to fetch users' });
                }
                break;
    
            case 'POST':
                try {
                    const { name, email } = req.body;
                    const newUser = await prisma.user.create({
                        data: { name, email },
                    });
                    res.status(201).json(newUser);
                } catch (err) {
                    res.status(500).json({ error: 'Failed to create user' });
                }
                break;
    
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    }

Code for [id].js file

    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();
    
    export default async function handler(req, res) {
    const { id } = req.query;
    const { method } = req;
    
        switch (method) {
            case 'GET':
                try {
                    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
                    user ? res.status(200).json(user) : res.status(404).json({ error: 'User not found' });
                } catch (err) {
                    res.status(500).json({ error: 'Failed to fetch user' });
                }
                break;
    
            case 'PUT':
                try {
                    const { name, email } = req.body;
                    const updatedUser = await prisma.user.update({
                        where: { id: Number(id) },
                        data: { name, email },
                    });
                    res.status(200).json(updatedUser);
                } catch (err) {
                    res.status(500).json({ error: 'Failed to update user' });
                }
                break;
    
            case 'DELETE':
                try {
                    await prisma.user.delete({ where: { id: Number(id) } });
                    res.status(204).end();
                } catch (err) {
                    res.status(500).json({ error: 'Failed to delete user' });
                }
                break;
    
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    }

Inorder to run the code use the command

    npm run dev
  
