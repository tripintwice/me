import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '../types';

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onSelectTrack: (index: number) => void;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function MusicPlayer({
  tracks,
  currentTrackIndex,
  isPlaying,
  progress,
  duration,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onSelectTrack
}: MusicPlayerProps) {
  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="flex-1 flex flex-col p-6 h-full" style={{ color: 'rgb(137, 149, 161)' }}>
      {/* Current Track Info */}
      <div 
        className="flex items-center gap-4 mb-6 p-4 rounded-xl border transition-all duration-200"
        style={{
          backgroundColor: 'rgba(17, 19, 27, 0.88)',
          borderColor: 'rgb(28, 30, 38)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        <img 
          src={currentTrack.cover} 
          alt={currentTrack.title} 
          className="w-20 h-20 rounded-lg object-cover shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-white text-xl font-bold">{currentTrack.title}</h2>
          <p className="text-sm mt-1">{currentTrack.artist}</p>
        </div>
        <Volume2 size={24} style={{ color: 'rgb(75, 126, 255)' }} />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-6 mb-4">
          <button 
            onClick={onPrev}
            className="hover:text-white hover:scale-110 active:scale-95 transition-all duration-150 p-2"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          
          <button 
            onClick={onPlayPause}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-150"
            style={{
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.1)'
            }}
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
            onClick={onNext}
            className="hover:text-white hover:scale-110 active:scale-95 transition-all duration-150 p-2"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3 text-xs font-medium">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${(progress / (duration || 1)) * 100}%, rgb(28, 30, 38) ${(progress / (duration || 1)) * 100}%)`,
              WebkitAppearance: 'none'
            }}
          />
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              transition: all 0.15s ease;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              width: 14px;
              height: 14px;
              box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2), 0 2px 6px rgba(0, 0, 0, 0.4);
            }
          `}</style>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-y-auto pr-2 pl-1 space-y-2 custom-scrollbar">
        <h3 className="text-white font-semibold mb-3 px-2">Playlist</h3>
        {tracks.map((track, idx) => (
          <div 
            key={track.id}
            onClick={() => onSelectTrack(idx)}
            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-150"
            style={{
              backgroundColor: idx === currentTrackIndex ? 'rgba(75, 126, 255, 0.15)' : 'transparent',
              border: idx === currentTrackIndex ? '1px solid rgba(75, 126, 255, 0.3)' : '1px solid transparent',
              transform: idx === currentTrackIndex ? 'scale(1.01)' : 'scale(1)',
              boxShadow: idx === currentTrackIndex ? '0 0 12px rgba(75, 126, 255, 0.2)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (idx !== currentTrackIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(17, 19, 27, 0.6)';
                e.currentTarget.style.transform = 'translateX(2px) scale(1.005)';
              }
            }}
            onMouseLeave={(e) => {
              if (idx !== currentTrackIndex) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateX(0) scale(1)';
              }
            }}
          >
            <div className="w-6 text-center text-sm">
              {idx === currentTrackIndex && isPlaying ? (
                <div className="flex items-end justify-center gap-1 h-4">
                  <span 
                    className="w-1 animate-[bounce_1s_infinite] h-full"
                    style={{ backgroundColor: 'rgb(75, 126, 255)' }}
                  ></span>
                  <span 
                    className="w-1 animate-[bounce_1s_infinite_0.2s] h-3/4"
                    style={{ backgroundColor: 'rgb(75, 126, 255)' }}
                  ></span>
                  <span 
                    className="w-1 animate-[bounce_1s_infinite_0.4s] h-full"
                    style={{ backgroundColor: 'rgb(75, 126, 255)' }}
                  ></span>
                </div>
              ) : (
                idx + 1
              )}
            </div>
            <img 
              src={track.cover} 
              alt="cover" 
              className="w-10 h-10 rounded transition-transform duration-150"
              style={{ 
                transform: idx === currentTrackIndex ? 'scale(1)' : 'scale(1)'
              }}
            />
            <div className="flex-1">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: idx === currentTrackIndex ? 'rgb(75, 126, 255)' : 'white'
                }}
              >
                {track.title}
              </p>
              <p className="text-xs" style={{ color: 'rgb(96, 107, 125)' }}>{track.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
