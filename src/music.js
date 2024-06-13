// Create reverb and delay effects
const reverb = new Tone.Reverb({
  decay: 2,
  preDelay: 0.01,
}).toDestination();

const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

// Create a new drum kit
const kick = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 10,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: "exponential",
  },
}).connect(reverb);

const snare = new Tone.NoiseSynth({
  noise: {
    type: "white",
  },
  envelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 0,
  },
}).connect(reverb);

const hihat = new Tone.MetalSynth({
  frequency: 250,
  envelope: {
    attack: 0.001,
    decay: 0.1,
    release: 0.01,
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5,
}).toDestination();

// Create a bass synth with a clean sound
const bass = new Tone.MonoSynth({
  oscillator: {
    type: "triangle",
  },
  envelope: {
    attack: 0.05,
    decay: 0.2,
    sustain: 0.5,
    release: 0.8,
  },
  filterEnvelope: {
    attack: 0.001,
    decay: 0.3,
    sustain: 0.2,
    baseFrequency: 150,
    octaves: 2.6,
  },
}).connect(delay);

// Create a melody synth
const melody = new Tone.Synth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.3,
    release: 0.5,
  },
}).connect(reverb);

// Create the drum pattern
const drumPattern = new Tone.Pattern(
  (time, note) => {
    if (note === "kick") {
      kick.triggerAttackRelease("C2", "8n", time);
    } else if (note === "snare") {
      snare.triggerAttackRelease("8n", time);
    } else if (note === "hihat") {
      hihat.triggerAttackRelease("16n", time);
    }
  },
  ["kick", "hihat", "kick", "hihat", "snare", "hihat", "kick", "hihat"],
  "upDown"
);

// Create the bassline
const bassline = new Tone.Sequence(
  (time, note) => {
    bass.triggerAttackRelease(note, "8n", time);
  },
  ["C2", "D2", "E2", "G2", "A2", "G2", "E2", "D2"],
  "8n"
);

// Create the melody
const melodyLine = new Tone.Sequence(
  (time, note) => {
    melody.triggerAttackRelease(note, "4n", time);
  },
  ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"],
  "16n"
);

// Transport settings
Tone.Transport.bpm.value = 140; // A faster tempo for a trap-style beat

// Functions to start and stop the beat
function startBeat() {
  Tone.start();
  drumPattern.start(0);
  bassline.start(0);
  melodyLine.start(0);
  Tone.Transport.start();
}

function stopBeat() {
  drumPattern.stop();
  bassline.stop();
  melodyLine.stop();
  Tone.Transport.stop();
}
