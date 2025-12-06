import { pgTable, varchar, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  hashedKey: text('hashed_key').notNull(),
  ownerId: uuid('owner_id').references(() => users.id),
  isRevoked: boolean('is_revoked').default(false),
  expiresAt: timestamp('expires_at').defaultNow(), 
  createdAt: timestamp('created_at').defaultNow(),
});
