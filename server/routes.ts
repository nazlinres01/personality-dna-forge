import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCharacterProfileSchema } from "@shared/schema";
import { z } from "zod";
import { createHash } from "crypto";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

// DNA generation algorithm
function generateDNASequence(name: string): string {
  const hash = createHash('sha256').update(name.toLowerCase()).digest('hex');
  const bases = ['A', 'T', 'C', 'G'];
  let dna = '';
  
  for (let i = 0; i < 75; i++) {
    const index = parseInt(hash.substr(i % hash.length, 2), 16) % 4;
    dna += bases[index];
  }
  
  // Add some structure for visual appeal
  return dna.match(/.{1,25}/g)?.join('<br>') || dna;
}

// Character stats generation
function generateStats(name: string) {
  const hash = createHash('sha256').update(name.toLowerCase()).digest('hex');
  const stats = {
    strength: 50 + (parseInt(hash.substr(0, 2), 16) % 50),
    intelligence: 50 + (parseInt(hash.substr(2, 2), 16) % 50),
    creativity: 50 + (parseInt(hash.substr(4, 2), 16) % 50),
    charisma: 50 + (parseInt(hash.substr(6, 2), 16) % 50),
    wisdom: 50 + (parseInt(hash.substr(8, 2), 16) % 50),
    luck: 50 + (parseInt(hash.substr(10, 2), 16) % 50),
  };
  return stats;
}

// Personality type determination
function getPersonalityType(stats: any) {
  const { strength, intelligence, creativity, charisma, wisdom, luck } = stats;
  
  if (intelligence > 85 && wisdom > 80) {
    return {
      name: "Strategic Visionary",
      description: "Natural leader with analytical thinking and innovative problem-solving abilities",
      icon: "brain"
    };
  } else if (strength > 85 && charisma > 75) {
    return {
      name: "Warrior Champion",
      description: "Powerful combatant with natural leadership and inspiring presence",
      icon: "shield"
    };
  } else if (creativity > 85 && intelligence > 75) {
    return {
      name: "Creative Genius",
      description: "Innovative thinker with exceptional artistic abilities and unique perspectives",
      icon: "palette"
    };
  } else if (charisma > 85 && wisdom > 75) {
    return {
      name: "Diplomatic Sage",
      description: "Wise counselor with exceptional social skills and conflict resolution abilities",
      icon: "handshake"
    };
  } else {
    return {
      name: "Balanced Explorer",
      description: "Well-rounded individual with adaptable skills and curious nature",
      icon: "compass"
    };
  }
}

// Generate strengths and weaknesses
function generateTraits(stats: any, personalityType: any) {
  const allStrengths = [
    { name: "Strategic Planning", description: "Exceptional ability to see the big picture and plan long-term solutions" },
    { name: "Problem Solving", description: "Natural talent for breaking down complex issues into manageable parts" },
    { name: "Leadership Presence", description: "Commands respect and inspires others to follow their vision" },
    { name: "Creative Innovation", description: "Ability to think outside the box and generate unique solutions" },
    { name: "Emotional Intelligence", description: "Deep understanding of human emotions and motivations" },
    { name: "Analytical Thinking", description: "Systematic approach to understanding complex information" },
  ];

  const allWeaknesses = [
    { name: "Impatience", description: "May become frustrated when others don't match their pace or understanding" },
    { name: "Perfectionism", description: "High standards can sometimes delay progress or create unnecessary stress" },
    { name: "Risk Aversion", description: "Preference for calculated moves may limit spontaneous opportunities" },
    { name: "Overthinking", description: "Tendency to analyze situations too deeply, potentially causing delays" },
    { name: "Stubbornness", description: "Strong convictions can sometimes prevent consideration of alternative viewpoints" },
    { name: "Social Anxiety", description: "Discomfort in large social gatherings or public speaking situations" },
  ];

  // Select traits based on stats
  const strengths = allStrengths.slice(0, 3);
  const weaknesses = allWeaknesses.slice(0, 3);

  return { strengths, weaknesses };
}

// Generate special abilities
function generateAbilities(stats: any, name: string) {
  const hash = createHash('sha256').update(name.toLowerCase()).digest('hex');
  
  const allAbilities = [
    { name: "Future Vision", description: "Ability to anticipate trends and see potential outcomes before others", rarity: "RARE", icon: "eye" },
    { name: "Innovation Catalyst", description: "Transforms existing ideas into breakthrough solutions", rarity: "COMMON", icon: "lightbulb" },
    { name: "Team Synthesis", description: "Natural ability to bring out the best in team members", rarity: "LEGENDARY", icon: "users" },
    { name: "Pattern Recognition", description: "Exceptional skill at identifying hidden connections and patterns", rarity: "RARE", icon: "search" },
    { name: "Inspiring Presence", description: "Motivates others through natural charisma and passion", rarity: "COMMON", icon: "star" },
    { name: "Strategic Foresight", description: "Can predict long-term consequences of current decisions", rarity: "LEGENDARY", icon: "telescope" },
  ];

  // Select 3 abilities based on hash
  const selectedAbilities = [];
  for (let i = 0; i < 3; i++) {
    const index = parseInt(hash.substr(i * 2, 2), 16) % allAbilities.length;
    selectedAbilities.push(allAbilities[index]);
  }

  return selectedAbilities;
}

// AI Enhancement function using Python script
async function enhanceCharacterWithAI(characterData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(process.cwd(), 'server', 'ai-enhancer.py');
    const python = spawn('python3', [pythonScript, JSON.stringify(characterData)]);
    
    let output = '';
    let errorOutput = '';
    
    python.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    python.on('close', (code) => {
      if (code === 0) {
        try {
          const enhancedData = JSON.parse(output);
          resolve(enhancedData);
        } catch (parseError) {
          reject(new Error('Failed to parse AI enhancement output'));
        }
      } else {
        reject(new Error(`AI enhancement failed: ${errorOutput}`));
      }
    });
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate character profile
  app.post("/api/generate-profile", async (req, res) => {
    try {
      const { name } = z.object({ name: z.string().min(2).max(50) }).parse(req.body);
      
      // Check if profile already exists
      const existingProfile = await storage.getCharacterProfile(name);
      if (existingProfile) {
        return res.json(existingProfile);
      }

      // Generate new profile
      const dnaSequence = generateDNASequence(name);
      const stats = generateStats(name);
      const personalityType = getPersonalityType(stats);
      const { strengths, weaknesses } = generateTraits(stats, personalityType);
      const abilities = generateAbilities(stats, name);

      const profileData = {
        name,
        dnaSequence,
        personalityType: personalityType.name,
        stats,
        strengths,
        weaknesses,
        abilities,
        aiEnhancements: null,
      };

      const profile = await storage.createCharacterProfile(profileData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Enhanced AI character profile generation
  app.post("/api/generate-enhanced-profile", async (req, res) => {
    try {
      const { name } = z.object({ name: z.string().min(2).max(50) }).parse(req.body);
      
      // Check if profile already exists
      const existingProfile = await storage.getCharacterProfile(name);
      if (existingProfile) {
        // Try to enhance existing profile with AI
        try {
          const enhancedProfile = await enhanceCharacterWithAI(existingProfile);
          return res.json(enhancedProfile);
        } catch (aiError) {
          // Fall back to basic profile if AI enhancement fails
          return res.json(existingProfile);
        }
      }

      // Generate new profile
      const dnaSequence = generateDNASequence(name);
      const stats = generateStats(name);
      const personalityType = getPersonalityType(stats);
      const { strengths, weaknesses } = generateTraits(stats, personalityType);
      const abilities = generateAbilities(stats, name);

      const profileData = {
        name,
        dnaSequence,
        personalityType: personalityType.name,
        stats,
        strengths,
        weaknesses,
        abilities,
        aiEnhancements: null,
      };

      const profile = await storage.createCharacterProfile(profileData);
      
      // Enhance with AI
      try {
        const enhancedProfile = await enhanceCharacterWithAI(profile);
        res.json(enhancedProfile);
      } catch (aiError) {
        // Fall back to basic profile if AI enhancement fails
        res.json(profile);
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
