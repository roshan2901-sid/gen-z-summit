import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  const startFestivalBeat = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Bass notes progression in key of F# minor (cyberpunk vibe: F# -> A -> E -> D)
      const scale = [185.0, 220.0, 164.81, 146.83, 277.18, 329.63, 370.0];
      let step = 0;

      const playNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = audioCtxRef.current.currentTime;

        // Sub Bass Oscillator
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        const filter = audioCtxRef.current.createBiquadFilter();

        const rootNote = scale[step % 4];
        const arpNote = step % 2 === 0 ? rootNote : rootNote * 1.5;

        osc.type = step % 4 === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(arpNote, now);

        // Low pass filter for warm synth punch
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + Math.sin(step) * 200, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start(now);
        osc.stop(now + 0.36);

        step++;
      };

      // Play 130 BPM eighth note loop
      intervalRef.current = setInterval(playNote, 230);
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio init error:', err);
    }
  };

  const stopFestivalBeat = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopFestivalBeat();
    } else {
      startFestivalBeat();
    }
  };

  useEffect(() => {
    return () => {
      stopFestivalBeat();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute Fest Beat' : 'Play Fest Vibe Beat'}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${
        isPlaying
          ? 'bg-purple-900/60 text-purple-200 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
          : 'bg-zinc-900/80 text-zinc-400 border-zinc-700 hover:border-purple-500 hover:text-zinc-200'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="hidden sm:inline">VIBE ON</span>
          <div className="flex items-end gap-0.5 h-3 ml-0.5">
            <span className="w-1 bg-purple-400 h-2 animate-[pulse_0.4s_infinite]"></span>
            <span className="w-1 bg-fuchsia-400 h-3 animate-[pulse_0.6s_infinite]"></span>
            <span className="w-1 bg-purple-300 h-1.5 animate-[pulse_0.5s_infinite]"></span>
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">FEST BEAT</span>
        </>
      )}
    </button>
  );
}
