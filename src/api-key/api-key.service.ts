import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { db } from '../db/drizzle';
import { apiKeys } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ApiKeyService {
  async createApiKey(ownerId: string, expiresAt?: Date) {
    const rawKey = crypto.randomBytes(32).toString('hex');
    const hashedKey = await bcrypt.hash(rawKey, 10);
    const [record] = await db
      .insert(apiKeys)
      .values({ ownerId, hashedKey, expiresAt })
      .returning();
    return { apiKey: rawKey, record };
  }

  async verifyApiKey(rawKey: string) {
    const keys = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.isRevoked, false));
    for (const key of keys) {
      if (await bcrypt.compare(rawKey, key.hashedKey)) {
        if (key.expiresAt && new Date() > key.expiresAt) return null;
        return key;
      }
    }
    return null;
  }

  async revokeKey(id: string) {
    return db
      .update(apiKeys)
      .set({ isRevoked: true })
      .where(eq(apiKeys.id, id));
  }
}
