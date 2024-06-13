// Create a new drum kit
const kick = new Tone.MembraneSynth().toDestination();
const snare = new Tone.NoiseSynth({
  noise: {
    type: "white",
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0,
  },
}).toDestination();
const hihat = new Tone.MetalSynth({
  frequency: 200,
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

// Create a bass synth
const bass = new Tone.Synth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.1,
    decay: 0.3,
    sustain: 0.4,
    release: 0.8,
  },
}).toDestination();

// Create a melody synth
const melody = new Tone.Synth({
  oscillator: {
    type: "sawtooth",
  },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.3,
    release: 0.5,
  },
}).toDestination();

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
  ["kick", "hihat", "snare", "hihat", "kick", "hihat", "snare", "hihat"],
  "upDown"
);

// Create the bassline
const bassline = new Tone.Sequence(
  (time, note) => {
    bass.triggerAttackRelease(note, "16n", time);
  },
  ["C2", "E2", "G2", "B2", "C3", "E3", "G3", "B3"],
  "8n"
);

// Create the melody
const melodyLine = new Tone.Sequence(
  (time, note) => {
    melody.triggerAttackRelease(note, "8n", time);
  },
  ["C4", "D4", "E4", "G4", "A4", "G4", "E4", "D4"],
  "4n"
);

// Transport settings
Tone.Transport.bpm.value = 90;

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
