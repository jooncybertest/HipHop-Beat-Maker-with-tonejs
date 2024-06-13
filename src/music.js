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
    type: "sine",
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
}).toDestination();

// Create a minimal melody synth
const melody = new Tone.Synth({
  oscillator: {
    type: "triangle",
  },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.3,
    release: 0.5,
  },
}).toDestination();

// Create the drum pattern
const drumPattern = new Tone.Sequence(
  (time, note) => {
    switch (note) {
      case "kick":
        kick.triggerAttackRelease("C2", "8n", time);
        break;
      case "snare":
        snare.triggerAttackRelease("8n", time);
        break;
      case "hihat":
        hihat.triggerAttackRelease("16n", time);
        break;
    }
  },
  ["kick", "hihat", "kick", "hihat", "snare", "hihat", "kick", "hihat"],
  "up"
);

// Create the bassline
const bassline = new Tone.Sequence(
  (time, note) => {
    bass.triggerAttackRelease(note, "8n", time);
  },
  ["C2", "C2", "G2", "G2", "A2", "A2", "F2", "F2"],
  "4n"
);

// Create the melody (minimal and atmospheric)
const melodyLine = new Tone.Sequence(
  (time, note) => {
    melody.triggerAttackRelease(note, "4n", time);
  },
  ["G4", "A4", "G4", "A4"],
  "8n"
);

// Transport settings
Tone.Transport.bpm.value = 78; // Nonstop is around 78 BPM

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
