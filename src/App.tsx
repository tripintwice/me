import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import NeverloseSidebar from './neverlose/NeverloseSidebar';
import Socials from './components/Socials';
import MusicPlayer from './components/MusicPlayer';
import { Track } from './types';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Track 1",
    artist: "YouTube",
    url: "wK-hQ4Bk4H4",
    cover: "https://img.youtube.com/vi/wK-hQ4Bk4H4/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Track 2",
    artist: "YouTube",
    url: "Qrm_nGN1ufA",
    cover: "https://img.youtube.com/vi/Qrm_nGN1ufA/maxresdefault.jpg"
  },
  {
    id: 3,
    title: "Track 3",
    artist: "YouTube",
    url: "3vk9mjXP8ug",
    cover: "https://img.youtube.com/vi/3vk9mjXP8ug/maxresdefault.jpg"
  }
];

type Tab = 'socials' | 'music';

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState<'neverlose' | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('socials');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [displayVolume, setDisplayVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isYouTubeReady, setIsYouTubeReady] = useState(false);
  
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const volumeAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => setIsYouTubeReady(true);
    } else {
      setIsYouTubeReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isYouTubeReady || playerRef.current) return;

    playerRef.current = new window.YT.Player('bg-player', {
      videoId: TRACKS[0].url,
      playerVars: { autoplay: 0, controls: 0, loop: 1 },
      events: {
        onReady: (e: any) => {
          setDuration(e.target.getDuration());
          e.target.setVolume(volume);
        },
        onStateChange: (e: any) => {
          if (e.data === 1) {
            setDuration(e.target.getDuration());
            startProgress();
          } else if (e.data === 2) {
            stopProgress();
          } else if (e.data === 0) {
            handleNext();
          }
        }
      }
    });
  }, [isYouTubeReady]);

  useEffect(() => {
    if (selectedMenu && playerRef.current?.playVideo) {
      setTimeout(() => {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }, 300);
    }
  }, [selectedMenu]);

  const startProgress = () => {
    if (progressIntervalRef.current) return;
    progressIntervalRef.current = window.setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setProgress(playerRef.current.getCurrentTime());
      }
    }, 100);
  };

  const stopProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!playerRef.current?.loadVideoById) return;
    playerRef.current.loadVideoById(TRACKS[currentTrackIndex].url);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => playerRef.current?.playVideo(), 200);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.playVideo?.() : playerRef.current.pauseVideo?.();
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume;
    if (volumeAnimationRef.current) {
      cancelAnimationFrame(volumeAnimationRef.current);
    }

    const animate = () => {
      setDisplayVolume(prev => {
        const diff = targetVolume - prev;
        if (Math.abs(diff) < 0.5) return targetVolume;
        return prev + diff * 0.15;
      });
      volumeAnimationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (volumeAnimationRef.current) {
        cancelAnimationFrame(volumeAnimationRef.current);
      }
    };
  }, [volume, isMuted]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };
  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };
  const handleSeek = (time: number) => {
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(time, true);
      setProgress(time);
    }
  };
  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-sans overflow-hidden bg-black text-white">
      {/* YouTube Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 bg-black">
        <div 
          id="bg-player"
          className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
      </div>

      {!selectedMenu ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-500">
          <div className="flex gap-6">
            {/* Neverlose Button */}
            <button
              onClick={() => setSelectedMenu('neverlose')}
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer min-w-[200px]"
              style={{
                backgroundColor: 'rgba(8, 27, 48, 0.4)',
                borderColor: 'rgba(94, 185, 255, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(94, 185, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(8, 27, 48, 0.7)';
                e.currentTarget.style.borderColor = 'rgb(94, 185, 255)';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(94, 185, 255, 0.4), 0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(94, 185, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(8, 27, 48, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(94, 185, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(94, 185, 255, 0.1)';
              }}
            >
              <div 
                className="text-5xl font-bold mb-3"
                style={{ 
                  color: 'rgb(94, 185, 255)',
                  textShadow: '0 0 20px rgba(94, 185, 255, 0.5)'
                }}
              >
                NL
              </div>
              <span className="text-white text-xl font-semibold">Neverlose</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Volume Widget */}
          <div className="absolute top-6 left-1/2 z-20 flex items-center gap-2" style={{ transform: 'translateX(-50%)', animation: 'slideDown 0.6s ease-out' }}>
            <button 
              onClick={toggleMute}
              className="w-12 h-12 backdrop-blur-xl border rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer active:scale-95"
              style={{
                backgroundColor: 'rgba(11, 12, 16, 0.9)',
                borderColor: 'rgb(28, 30, 38)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.2)'
              }}
            >
              {isMuted ? 
                <VolumeX size={20} className="text-red-500" /> : 
                <Volume2 size={20} style={{ color: 'rgb(75, 126, 255)' }} />
              }
            </button>
            <div 
              className="backdrop-blur-xl border rounded-full px-6 py-3 shadow-lg flex items-center gap-3 transition-all duration-200"
              style={{
                backgroundColor: 'rgba(11, 12, 16, 0.9)',
                borderColor: 'rgb(28, 30, 38)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.2)'
              }}
            >
              <input
                type="range"
                min={0}
                max={100}
                value={displayVolume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-40 h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, rgb(75, 126, 255) ${displayVolume}%, rgb(28, 30, 38) ${displayVolume}%)`,
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
                  background: rgb(247, 248, 252);
                  cursor: pointer;
                  box-shadow: 0 0 0 2px rgba(75, 126, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
                  transition: all 0.15s ease;
                }
                input[type="range"]::-webkit-slider-thumb:hover {
                  width: 14px;
                  height: 14px;
                  box-shadow: 0 0 0 3px rgba(75, 126, 255, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3);
                }
              `}</style>
              <span className="text-white text-sm font-semibold min-w-[36px]">{Math.round(displayVolume)}%</span>
            </div>
          </div>

          {/* Main Neverlose Container */}
          {selectedMenu === 'neverlose' && (
          <div 
            className="relative z-10"
            style={{
              width: 750,
              height: 576,
              animation: 'fadeIn 0.5s ease-out both'
            }}
          >
            {/* Shadow layers */}
            <div
              className="absolute"
              style={{
                left: -4,
                top: -2,
                width: 756,
                height: 585,
                background: 'rgba(0, 0, 0, 0.65)',
                filter: 'blur(18px)',
                borderRadius: 18,
                zIndex: -2
              }}
            />
            <div
              className="absolute"
              style={{
                left: -2,
                top: -1,
                width: 752,
                height: 580,
                background: 'rgba(0, 0, 0, 0.3)',
                filter: 'blur(12px)',
                borderRadius: 16,
                zIndex: -1
              }}
            />

            <div
              className="relative rounded-[14px] overflow-hidden"
              style={{
                width: 748,
                height: 576,
                backgroundColor: 'rgba(13, 15, 22, 0.87)',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              {/* Neverlose Sidebar */}
              <NeverloseSidebar
                currentPage={activeTab}
                onPageChange={(page: any) => setActiveTab(page as Tab)}
              />

              {/* Toolbar */}
              <div
                className="absolute rounded-tr-[14px]"
                style={{
                  left: 158,
                  top: 0,
                  width: 590,
                  height: 56,
                  backgroundColor: 'rgba(11, 13, 20, 0.88)',
                  borderBottom: '1px solid rgb(27, 30, 39)'
                }}
              >
                {/* Top highlight line */}
                <div
                  className="absolute rounded-tr-[14px]"
                  style={{
                    left: 0,
                    top: 0,
                    width: 590,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.02) 20%, rgba(255, 255, 255, 0.02) 80%, rgba(255, 255, 255, 0) 100%)'
                  }}
                />
                {/* Profile dropdown */}
                <div
                  className="absolute rounded-[6px] cursor-pointer transition-colors duration-150"
                  style={{
                    left: 11,
                    top: 14,
                    width: 166,
                    height: 30,
                    backgroundColor: 'rgb(17, 19, 27)',
                    border: '1px solid rgb(28, 31, 41)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(25, 28, 38)';
                    e.currentTarget.style.borderColor = 'rgb(75, 126, 255)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(75, 126, 255, 0.15), 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(17, 19, 27)';
                    e.currentTarget.style.borderColor = 'rgb(28, 31, 41)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      paddingLeft: 12
                    }}
                  >
                    <span style={{ fontSize: 13 }}>💾</span>
                    <span style={{ fontSize: 14, color: 'rgb(184, 187, 197)', marginLeft: 8 }}>
                      Nonprime 7.2
                    </span>
                    <svg
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      style={{ position: 'absolute', right: 10 }}
                    >
                      <path
                        d="M 2 2 L 5 5 L 2 8"
                        stroke="rgb(130, 135, 146)"
                        strokeWidth="1.3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Global/Config dropdown */}
                <div
                  className="absolute rounded-[6px] cursor-pointer transition-colors duration-150"
                  style={{
                    left: 190,
                    top: 14,
                    width: 85,
                    height: 30,
                    backgroundColor: 'rgb(17, 19, 27)',
                    border: '1px solid rgb(28, 31, 41)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(25, 28, 38)';
                    e.currentTarget.style.borderColor = 'rgb(75, 126, 255)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(75, 126, 255, 0.15), 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(17, 19, 27)';
                    e.currentTarget.style.borderColor = 'rgb(28, 31, 41)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      paddingLeft: 13
                    }}
                  >
                    <span style={{ fontSize: 14, color: 'rgb(184, 187, 197)' }}>
                      Global
                    </span>
                    <svg
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      style={{ position: 'absolute', right: 8 }}
                    >
                      <path
                        d="M 2 2 L 5 5 L 2 8"
                        stroke="rgb(130, 135, 146)"
                        strokeWidth="1.3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Search icon */}
                <div style={{ position: 'absolute', right: 20, top: 23 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <circle
                      cx="6"
                      cy="6"
                      r="5"
                      stroke="rgb(180, 184, 194)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <line
                      x1="9"
                      y1="9"
                      x2="13"
                      y2="13"
                      stroke="rgb(180, 184, 194)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Content area */}
              <div
                className="absolute"
                style={{
                  left: 158,
                  top: 56,
                  width: 590,
                  height: 520,
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={{
                    opacity: activeTab === 'socials' ? 1 : 0,
                    transform: activeTab === 'socials' ? 'translateX(0)' : 'translateX(-10px)',
                    zIndex: activeTab === 'socials' ? 10 : 0,
                    pointerEvents: activeTab === 'socials' ? 'auto' : 'none'
                  }}
                >
                  <Socials />
                </div>
                <div 
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={{
                    opacity: activeTab === 'music' ? 1 : 0,
                    transform: activeTab === 'music' ? 'translateX(0)' : 'translateX(-10px)',
                    zIndex: activeTab === 'music' ? 10 : 0,
                    pointerEvents: activeTab === 'music' ? 'auto' : 'none'
                  }}
                >
                  <MusicPlayer 
                    tracks={TRACKS}
                    currentTrackIndex={currentTrackIndex}
                    isPlaying={isPlaying}
                    progress={progress}
                    duration={duration}
                    onPlayPause={handlePlayPause}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSeek={handleSeek}
                    onSelectTrack={handleSelectTrack}
                  />
                </div>
              </div>
            </div>
          </div>
          )}
        </>
      )}
    </div>
  );
}
