import { useState } from 'react';
import { NeverlosePage } from './types';
import NeverloseSidebar from './NeverloseSidebar';
import RagePage from './pages/RagePage';
import { useMotion } from './motion';

export default function NeverloseMenu() {
  const [currentPage, setCurrentPage] = useState(NeverlosePage.Rage);
  const [previousPage, setPreviousPage] = useState(NeverlosePage.Rage);
  const pageMix = useMotion(1, 12);

  const handlePageChange = (page: NeverlosePage) => {
    if (page !== currentPage) {
      setPreviousPage(currentPage);
      setCurrentPage(page);
    }
  };

  const handleToggle = (cardIndex: number, rowIndex: number, value: boolean) => {
    console.log(`Toggle card ${cardIndex}, row ${rowIndex}:`, value);
  };

  const handleSlider = (cardIndex: number, rowIndex: number, value: number) => {
    console.log(`Slider card ${cardIndex}, row ${rowIndex}:`, value);
  };

  const handleOpenSelect = (cardIndex: number, rowIndex: number, isMulti: boolean) => {
    console.log(`Open select card ${cardIndex}, row ${rowIndex}, multi:`, isMulti);
  };

  return (
    <div
      className="relative"
      style={{
        width: 750,
        height: 756,
        margin: '0 auto'
      }}
    >
      {/* Shadow layers - точно как в C++ */}
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

      {/* Container */}
      <div
        className="relative rounded-[14px] overflow-hidden"
        style={{
          width: 748,
          height: 576,
          backgroundColor: 'rgba(13, 15, 22, 0.87)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
        }}
      >
        {/* Sidebar */}
        <NeverloseSidebar
          currentPage={currentPage}
          onPageChange={handlePageChange}
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
          {/* Profile dropdown */}
          <div
            className="absolute rounded-[6px]"
            style={{
              left: 11,
              top: 14,
              width: 166,
              height: 30,
              backgroundColor: 'rgb(17, 19, 27)',
              border: '1px solid rgb(28, 31, 41)',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 12
            }}
          >
            <span style={{ fontSize: 13, color: 'rgb(194, 197, 206)' }}>💾</span>
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
              />
            </svg>
          </div>

          {/* Global dropdown (for Rage/Legit pages) */}
          {(currentPage === NeverlosePage.Rage || currentPage === NeverlosePage.Legit) && (
            <div
              className="absolute rounded-[6px]"
              style={{
                left: 190,
                top: 14,
                width: 85,
                height: 30,
                backgroundColor: 'rgb(17, 19, 27)',
                border: '1px solid rgb(28, 31, 41)',
                display: 'flex',
                alignItems: 'center',
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
                />
              </svg>
            </div>
          )}

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
            height: 520
          }}
        >
          {currentPage === NeverlosePage.Rage && (
            <RagePage
              onToggle={handleToggle}
              onSlider={handleSlider}
              onOpenSelect={handleOpenSelect}
            />
          )}

          {currentPage === NeverlosePage.Legit && (
            <div className="flex items-center justify-center h-full">
              <span style={{ fontSize: 20, color: 'rgb(150, 150, 160)' }}>
                Legit Page (Coming Soon)
              </span>
            </div>
          )}

          {currentPage === NeverlosePage.Players && (
            <div className="flex items-center justify-center h-full">
              <span style={{ fontSize: 20, color: 'rgb(150, 150, 160)' }}>
                Players Page (Coming Soon)
              </span>
            </div>
          )}

          {currentPage === NeverlosePage.World && (
            <div className="flex items-center justify-center h-full">
              <span style={{ fontSize: 20, color: 'rgb(150, 150, 160)' }}>
                World Page (Coming Soon)
              </span>
            </div>
          )}

          {currentPage === NeverlosePage.Inventory && (
            <div className="flex items-center justify-center h-full">
              <span style={{ fontSize: 20, color: 'rgb(150, 150, 160)' }}>
                Inventory Page (Coming Soon)
              </span>
            </div>
          )}

          {currentPage === NeverlosePage.Miscellaneous && (
            <div className="flex items-center justify-center h-full">
              <span style={{ fontSize: 20, color: 'rgb(150, 150, 160)' }}>
                Miscellaneous Page (Coming Soon)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
