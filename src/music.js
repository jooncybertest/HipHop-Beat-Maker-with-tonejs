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

const hihat = new Tone.NoiseSynth({
  noise: {
    type: "white",
  },
  envelope: {
    attack: 0.001,
    decay: 0.05,
    sustain: 0,
    release: 0.05,
  },
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
}).toDestination();

// Create a melody synth with a richer sound
const melody = new Tone.Synth({
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 20,
  },
  envelope: {
    attack: 0.05,
    decay: 0.1,
    sustain: 0.5,
    release: 0.3,
  },
}).toDestination();

// Create the drum pattern
const drumPattern = new Tone.Sequence(
  (time, note) => {
    switch (note) {
      case "kick":
        kick.triggerAttackRelease("C2", "8n", time);
        animateBeat();
        break;
      case "snare":
        snare.triggerAttackRelease("8n", time);
        break;
    }
  },
  ["kick", null, "kick", null, "snare", null, "kick", null],
  "8n"
);

// Create the hi-hat pattern
const hihatPattern = new Tone.Loop((time) => {
  hihat.triggerAttackRelease("16n", time);
}, "16n");

// Create the bassline with more variation
const bassline = new Tone.Sequence(
  (time, note) => {
    bass.triggerAttackRelease(note, "8n", time);
  },
  [
    "C2",
    null,
    "D2",
    null,
    "E2",
    null,
    "G2",
    null,
    "A2",
    null,
    "G2",
    null,
    "E2",
    null,
    "D2",
    null,
  ],
  "8n"
);

// Create a more dynamic and engaging melody
const melodyLine = new Tone.Sequence(
  (time, note) => {
    melody.triggerAttackRelease(note, "8n", time);
  },
  [
    "C4",
    "E4",
    "G4",
    "B4",
    "C5",
    "B4",
    "G4",
    "E4",
    "C4",
    "D4",
    "F4",
    "A4",
    "C5",
    "A4",
    "F4",
    "D4",
  ],
  "16n"
);

// Transport settings
Tone.Transport.bpm.value = 78; // Nonstop is around 78 BPM

// Function to animate the beat circle
function animateBeat() {
  const beatCircle = document.getElementById("beat-circle");
  beatCircle.style.width = "120px";
  beatCircle.style.height = "120px";
  setTimeout(() => {
    beatCircle.style.width = "100px";
    beatCircle.style.height = "100px";
  }, 100);
}

// Functions to start and stop the beat
function startBeat() {
  Tone.start();
  drumPattern.start(0);
  hihatPattern.start(0);
  bassline.start(0);
  melodyLine.start(0);
  Tone.Transport.start();
}

function stopBeat() {
  drumPattern.stop();
  hihatPattern.stop();
  bassline.stop();
  melodyLine.stop();
  Tone.Transport.stop();
}
