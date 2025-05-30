import { createHash } from "crypto";

export function generateDNASequence(name: string): string {
  const hash = createHash('sha256').update(name.toLowerCase()).digest('hex');
  const bases = ['A', 'T', 'C', 'G'];
  let dna = '';
  
  for (let i = 0; i < 75; i++) {
    const index = parseInt(hash.substr(i % hash.length, 2), 16) % 4;
    dna += bases[index];
  }
  
  return dna;
}

export function formatDNASequence(sequence: string): string {
  // Split into chunks of 25 and add highlighting
  const chunks = sequence.match(/.{1,25}/g) || [];
  return chunks.map((chunk, index) => {
    // Add some highlighting for visual appeal
    const start = index * 25;
    const highlighted = chunk.replace(/(.{9})(.{7})(.{9})/, (match, p1, p2, p3) => {
      const colors = ['text-blue-400', 'text-purple-400', 'text-green-400'];
      return `${p1}<span class="${colors[index % 3]}">${p2}</span>${p3}`;
    });
    return highlighted;
  }).join('<br>');
}
