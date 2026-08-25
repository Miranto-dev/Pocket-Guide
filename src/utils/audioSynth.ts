/**
 * Audio Synthesizer for Malagasy / French pronunciation
 * Uses SpeechSynthesis when available, with Web Audio API phonetic tone fallback
 */

export function speakMalagasy(text: string, phoneticText?: string) {
  if (typeof window === 'undefined') return;

  // Try browser SpeechSynthesis first
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for language learners
      utterance.pitch = 1.05;

      // Look for a suitable voice (French or Italian or generic)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.startsWith('it') || v.lang.startsWith('es'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
      return;
    } catch {
      // fallback to audio synth
    }
  }

  // Web Audio Fallback: pleasant marimba acoustic chime
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Play warm melodic syllables
    const frequencies = [440, 554.37, 659.25, 880];
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      
      gain.gain.setValueAtTime(0.01, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.3, now + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.3);
    });
  } catch (err) {
    console.warn('Audio not supported', err);
  }
}
