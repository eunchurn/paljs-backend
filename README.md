# Paljs CRUD Example

## 참고

<https://www.eunchurn.com/blog/development/2022-07-31-tWIL>

## schema.prisma

`.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/apidb?schema=public&connection_limit=5
```

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  binaryTargets   = ["native"]
  previewFeatures = ["metrics"]
}

/// 사용자
model User {
  id    String @id @default(cuid())
  name  String
  posts Post[]
}

/// 포스트
model Post {
  id       String  @id @default(cuid())
  title    String
  content  String
  author   User?   @relation(fields: [authorId], references: [id])
  authorId String?
}
```
