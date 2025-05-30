import { characterProfiles, type CharacterProfile, type InsertCharacterProfile } from "@shared/schema";
import { db } from "./db";
import { eq, ilike } from "drizzle-orm";

export interface IStorage {
  getCharacterProfile(name: string): Promise<CharacterProfile | undefined>;
  createCharacterProfile(profile: InsertCharacterProfile): Promise<CharacterProfile>;
}

export class DatabaseStorage implements IStorage {
  async getCharacterProfile(name: string): Promise<CharacterProfile | undefined> {
    const [profile] = await db
      .select()
      .from(characterProfiles)
      .where(ilike(characterProfiles.name, name))
      .limit(1);
    return profile || undefined;
  }

  async createCharacterProfile(insertProfile: InsertCharacterProfile): Promise<CharacterProfile> {
    const [profile] = await db
      .insert(characterProfiles)
      .values(insertProfile)
      .returning();
    return profile;
  }
}

export const storage = new DatabaseStorage();
