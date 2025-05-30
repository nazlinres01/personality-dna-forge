#!/usr/bin/env python3
"""
Ethical AI Character Enhancement Module
This module uses AI to generate detailed, ethical character descriptions
while ensuring positive representation and avoiding harmful stereotypes.
"""

import json
import sys
import hashlib
import random
from typing import Dict, List, Any

class EthicalCharacterEnhancer:
    """
    Generates ethical, positive character enhancements using AI principles.
    Ensures fair representation across all character types.
    """
    
    def __init__(self):
        # Ethical guidelines for character generation
        self.ethical_guidelines = {
            "diversity": "Ensure diverse representation across all attributes",
            "positivity": "Focus on positive traits and growth potential",
            "balance": "Avoid extreme stereotypes or harmful characterizations",
            "respect": "Maintain respectful language for all personality types"
        }
        
        # Positive trait categories
        self.positive_traits = {
            "leadership": [
                "Natural ability to inspire and guide others toward common goals",
                "Skilled at building consensus and fostering team collaboration",
                "Demonstrates integrity and ethical decision-making in leadership roles"
            ],
            "creativity": [
                "Exceptional ability to think outside conventional boundaries",
                "Brings fresh perspectives to complex challenges",
                "Transforms abstract ideas into tangible, innovative solutions"
            ],
            "empathy": [
                "Deep understanding of others' emotions and perspectives",
                "Creates safe spaces for open communication and trust",
                "Naturally skilled at conflict resolution and mediation"
            ],
            "resilience": [
                "Adapts gracefully to change and overcomes obstacles",
                "Maintains optimism and determination during difficult times",
                "Learns and grows stronger from challenging experiences"
            ],
            "wisdom": [
                "Demonstrates sound judgment and thoughtful decision-making",
                "Shares knowledge generously while remaining humble",
                "Balances logic with intuition in complex situations"
            ]
        }
        
        # Growth-oriented descriptions for personality types
        self.personality_enhancements = {
            "Strategic Visionary": {
                "description": "A forward-thinking individual who excels at long-term planning and sees opportunities where others see obstacles. Their analytical mind is balanced by creative problem-solving abilities.",
                "growth_potential": "Continues to develop innovative strategies while building stronger emotional connections with team members.",
                "ethical_note": "Uses strategic thinking to benefit communities and create positive change."
            },
            "Warrior Champion": {
                "description": "A courageous protector who stands up for others and fights for justice. Their strength is matched by their compassion and desire to help those in need.",
                "growth_potential": "Channels physical and emotional strength into leadership roles that uplift and empower others.",
                "ethical_note": "Uses power responsibly to defend the vulnerable and promote fairness."
            },
            "Creative Genius": {
                "description": "An innovative artist who sees beauty and possibility in everything. Their creative vision inspires others and brings joy to the world through unique expressions.",
                "growth_potential": "Develops techniques to share creative gifts with broader audiences while maintaining artistic integrity.",
                "ethical_note": "Creates art that celebrates diversity and promotes understanding between cultures."
            },
            "Diplomatic Sage": {
                "description": "A wise mediator who brings people together and resolves conflicts through understanding. Their emotional intelligence creates harmony in diverse groups.",
                "growth_potential": "Expands influence to create lasting peace and cooperation in larger communities.",
                "ethical_note": "Promotes inclusive dialogue and ensures all voices are heard and respected."
            },
            "Balanced Explorer": {
                "description": "A curious adventurer who approaches life with wonder and enthusiasm. Their adaptability and open-mindedness make them excellent companions and collaborators.",
                "growth_potential": "Discovers new passions while helping others embrace change and growth.",
                "ethical_note": "Explores the world with respect for different cultures and environments."
            }
        }

    def generate_seed(self, name: str) -> int:
        """Generate a consistent seed from the name for reproducible results."""
        return int(hashlib.sha256(name.lower().encode()).hexdigest()[:8], 16)

    def enhance_character_description(self, character_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Enhance character data with AI-generated ethical descriptions.
        
        Args:
            character_data: Basic character profile data
            
        Returns:
            Enhanced character data with detailed descriptions
        """
        random.seed(self.generate_seed(character_data['name']))
        
        # Get personality type enhancement
        personality_type = character_data.get('personalityType', 'Balanced Explorer')
        enhancement = self.personality_enhancements.get(personality_type, self.personality_enhancements['Balanced Explorer'])
        
        # Generate detailed trait descriptions
        enhanced_strengths = self._enhance_traits(character_data.get('strengths', []), 'positive')
        enhanced_weaknesses = self._enhance_growth_areas(character_data.get('weaknesses', []))
        
        # Create life philosophy based on character
        life_philosophy = self._generate_life_philosophy(character_data)
        
        # Generate ethical career suggestions
        career_paths = self._suggest_ethical_careers(character_data)
        
        # Add AI enhancements to character data
        character_data['ai_enhancements'] = {
            'detailed_description': enhancement['description'],
            'growth_potential': enhancement['growth_potential'],
            'ethical_perspective': enhancement['ethical_note'],
            'life_philosophy': life_philosophy,
            'career_suggestions': career_paths,
            'enhanced_strengths': enhanced_strengths,
            'growth_opportunities': enhanced_weaknesses,
            'ethical_guidelines_applied': list(self.ethical_guidelines.keys())
        }
        
        return character_data

    def _enhance_traits(self, traits: List[Dict], trait_type: str) -> List[Dict]:
        """Enhance trait descriptions with positive, detailed explanations."""
        enhanced = []
        for trait in traits:
            if trait_type == 'positive':
                # Find matching positive trait category
                for category, descriptions in self.positive_traits.items():
                    if any(keyword in trait['name'].lower() for keyword in [category, 'leadership', 'creative', 'strategic']):
                        enhanced_description = random.choice(descriptions)
                        enhanced.append({
                            'name': trait['name'],
                            'original_description': trait['description'],
                            'ai_enhanced_description': enhanced_description,
                            'category': category.title()
                        })
                        break
                else:
                    # Default positive enhancement
                    enhanced.append({
                        'name': trait['name'],
                        'original_description': trait['description'],
                        'ai_enhanced_description': f"Demonstrates exceptional {trait['name'].lower()} that contributes positively to personal and professional relationships.",
                        'category': 'Personal Growth'
                    })
        return enhanced

    def _enhance_growth_areas(self, weaknesses: List[Dict]) -> List[Dict]:
        """Reframe weaknesses as growth opportunities with actionable advice."""
        growth_opportunities = []
        for weakness in weaknesses:
            # Reframe negatively worded traits as growth opportunities
            reframed = self._reframe_as_growth_opportunity(weakness)
            growth_opportunities.append(reframed)
        return growth_opportunities

    def _reframe_as_growth_opportunity(self, weakness: Dict) -> Dict:
        """Reframe a weakness as a positive growth opportunity."""
        reframing_map = {
            'impatience': {
                'growth_area': 'Developing Patience and Mindfulness',
                'opportunity': 'Learning to appreciate different paces can lead to deeper relationships and better outcomes.',
                'action_steps': ['Practice mindfulness meditation', 'Set realistic timelines', 'Celebrate small progress']
            },
            'perfectionism': {
                'growth_area': 'Embracing Progress Over Perfection',
                'opportunity': 'Allowing for imperfection can unlock creativity and reduce stress while maintaining high standards.',
                'action_steps': ['Set "good enough" benchmarks', 'Celebrate iterations', 'Focus on learning from mistakes']
            },
            'overthinking': {
                'growth_area': 'Balancing Analysis with Action',
                'opportunity': 'Learning when to trust instincts can complement analytical skills for better decision-making.',
                'action_steps': ['Set decision deadlines', 'Practice quick decisions on low-stakes issues', 'Trust intuitive insights']
            }
        }
        
        name_lower = weakness['name'].lower()
        for key, reframe in reframing_map.items():
            if key in name_lower:
                return {
                    'original_weakness': weakness['name'],
                    'growth_area': reframe['growth_area'],
                    'opportunity_description': reframe['opportunity'],
                    'action_steps': reframe['action_steps']
                }
        
        # Default reframing for unmapped weaknesses
        return {
            'original_weakness': weakness['name'],
            'growth_area': f"Developing Balance in {weakness['name']}",
            'opportunity_description': f"Understanding and moderating {weakness['name'].lower()} can lead to more effective personal and professional relationships.",
            'action_steps': ['Self-reflection and awareness', 'Seeking feedback from trusted friends', 'Gradual practice and improvement']
        }

    def _generate_life_philosophy(self, character_data: Dict) -> str:
        """Generate an inspirational life philosophy based on character traits."""
        stats = character_data.get('stats', {})
        personality = character_data.get('personalityType', '')
        
        # Determine dominant values based on highest stats
        highest_stat = max(stats.items(), key=lambda x: x[1]) if stats else ('wisdom', 75)
        
        philosophy_templates = {
            'strength': "Believes that true strength comes from lifting others up and standing for justice and fairness in all situations.",
            'intelligence': "Values knowledge as a tool for solving problems and creating opportunities that benefit everyone in the community.",
            'creativity': "Sees the world as a canvas full of possibilities, where every challenge is an opportunity for innovative solutions.",
            'charisma': "Understands that authentic connections and genuine care for others are the foundation of meaningful leadership.",
            'wisdom': "Approaches life with thoughtful consideration, seeking to understand before being understood and to teach through example.",
            'luck': "Believes that preparation meeting opportunity creates positive outcomes, and shares good fortune with others."
        }
        
        base_philosophy = philosophy_templates.get(highest_stat[0], philosophy_templates['wisdom'])
        
        # Add personality-specific enhancement
        if 'Strategic' in personality:
            return f"{base_philosophy} Combines this with long-term thinking to build sustainable positive change."
        elif 'Warrior' in personality:
            return f"{base_philosophy} Channels this energy into protecting and empowering those who need support."
        elif 'Creative' in personality:
            return f"{base_philosophy} Expresses this through artistic endeavors that inspire and unite people."
        elif 'Diplomatic' in personality:
            return f"{base_philosophy} Uses this wisdom to bridge differences and create understanding between diverse groups."
        else:
            return f"{base_philosophy} Maintains balance by staying curious and open to new experiences and perspectives."

    def _suggest_ethical_careers(self, character_data: Dict) -> List[str]:
        """Suggest career paths that align with ethical values and character strengths."""
        stats = character_data.get('stats', {})
        personality = character_data.get('personalityType', '')
        
        # Career suggestions based on top stats and personality
        career_map = {
            'Strategic Visionary': [
                'Social Impact Consultant - Creating strategies for positive change',
                'Sustainable Technology Developer - Building eco-friendly solutions',
                'Educational Program Director - Designing learning experiences',
                'Urban Planning Specialist - Creating livable, inclusive communities'
            ],
            'Warrior Champion': [
                'Human Rights Advocate - Fighting for justice and equality',
                'Emergency Response Coordinator - Protecting communities in crisis',
                'Youth Mentor and Coach - Empowering the next generation',
                'Environmental Conservation Leader - Protecting natural resources'
            ],
            'Creative Genius': [
                'Community Arts Director - Bringing creativity to underserved areas',
                'Therapeutic Arts Practitioner - Healing through creative expression',
                'Cultural Bridge Builder - Connecting diverse communities through art',
                'Educational Content Creator - Making learning engaging and accessible'
            ],
            'Diplomatic Sage': [
                'Conflict Resolution Specialist - Creating peace in challenging situations',
                'International Development Coordinator - Improving global wellbeing',
                'Community Organizer - Building grassroots positive change',
                'Cultural Sensitivity Training Expert - Promoting understanding and inclusion'
            ],
            'Balanced Explorer': [
                'Research Scientist for Social Good - Discovering solutions to global challenges',
                'Cross-Cultural Communication Specialist - Building bridges between communities',
                'Adventure Therapy Guide - Helping others grow through outdoor experiences',
                'Innovation Catalyst - Bringing diverse ideas together for positive impact'
            ]
        }
        
        return career_map.get(personality, career_map['Balanced Explorer'])

def main():
    """Main function to process character data from command line."""
    if len(sys.argv) != 2:
        print("Usage: python ai-enhancer.py '<character_json>'")
        sys.exit(1)
    
    try:
        # Parse input character data
        character_data = json.loads(sys.argv[1])
        
        # Create enhancer and process
        enhancer = EthicalCharacterEnhancer()
        enhanced_data = enhancer.enhance_character_description(character_data)
        
        # Output enhanced data as JSON
        print(json.dumps(enhanced_data, indent=2))
        
    except json.JSONDecodeError:
        print("Error: Invalid JSON input")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()