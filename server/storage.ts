import { characterProfiles, type CharacterProfile, type InsertCharacterProfile } from "@shared/schema";

export interface IStorage {
  getCharacterProfile(name: string): Promise<CharacterProfile | undefined>;
  createCharacterProfile(profile: InsertCharacterProfile): Promise<CharacterProfile>;
}

export class MemStorage implements IStorage {
  private profiles: Map<string, CharacterProfile>;
  currentId: number;

  constructor() {
    this.profiles = new Map();
    this.currentId = 1;
  }

  async getCharacterProfile(name: string): Promise<CharacterProfile | undefined> {
    return Array.from(this.profiles.values()).find(
      (profile) => profile.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createCharacterProfile(insertProfile: InsertCharacterProfile): Promise<CharacterProfile> {
    const id = this.currentId++;
    const profile: CharacterProfile = { ...insertProfile, id };
    this.profiles.set(profile.name.toLowerCase(), profile);
    return profile;
  }
}

export const storage = new MemStorage();
