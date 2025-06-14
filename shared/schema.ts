import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const characterProfiles = pgTable("character_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dnaSequence: text("dna_sequence").notNull(),
  personalityType: text("personality_type").notNull(),
  stats: jsonb("stats").notNull(),
  strengths: jsonb("strengths").notNull(),
  weaknesses: jsonb("weaknesses").notNull(),
  abilities: jsonb("abilities").notNull(),
  aiEnhancements: jsonb("ai_enhancements"),
});

export const insertCharacterProfileSchema = createInsertSchema(characterProfiles).omit({
  id: true,
});

export type InsertCharacterProfile = z.infer<typeof insertCharacterProfileSchema>;
export type CharacterProfile = typeof characterProfiles.$inferSelect;

// Type definitions for the character data
export interface CharacterStats {
  strength: number;
  intelligence: number;
  creativity: number;
  charisma: number;
  wisdom: number;
  luck: number;
}

export interface CharacterTrait {
  name: string;
  description: string;
}

export interface CharacterAbility {
  name: string;
  description: string;
  rarity: 'COMMON' | 'RARE' | 'LEGENDARY';
  icon: string;
}

export interface PersonalityType {
  name: string;
  description: string;
  icon: string;
}

export interface AIEnhancements {
  detailed_description: string;
  growth_potential: string;
  ethical_perspective: string;
  life_philosophy: string;
  career_suggestions: string[];
  enhanced_strengths: Array<{
    name: string;
    original_description: string;
    ai_enhanced_description: string;
    category: string;
  }>;
  growth_opportunities: Array<{
    original_weakness: string;
    growth_area: string;
    opportunity_description: string;
    action_steps: string[];
  }>;
  ethical_guidelines_applied: string[];
}
