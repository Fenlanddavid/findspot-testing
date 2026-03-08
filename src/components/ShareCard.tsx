import React from 'react';
import { Find, Session, Permission } from '../db';

interface ShareCardProps {
  find?: Find;
  photoUrl?: string;
  permission?: Permission;
  session?: Session;
  type: 'find' | 'session' | 'find-of-the-day';
  findsCount?: number;
  bestFindName?: string;
}

/**
 * High-fidelity logo and text gradient. 
 */
function CardLogoGroup() {
  return (
    <div className="flex items-center gap-5">
        <svg width="60" height="60" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-grad-card-v13" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" />
              <stop offset="50%" stop-color="#14b8a6" />
              <stop offset="100%" stop-color="#0ea5e9" />
            </linearGradient>
          </defs>
          <circle cx="256" cy="256" r="200" stroke="url(#logo-grad-card-v13)" strokeWidth="32" fill="none" />
          <circle cx="256" cy="256" r="120" stroke="url(#logo-grad-card-v13)" strokeWidth="24" fill="none" opacity="0.6" />
          <circle cx="256" cy="256" r="50" fill="url(#logo-grad-card-v13)" />
          <rect x="244" y="20" width="24" height="80" rx="4" fill="url(#logo-grad-card-v13)" opacity="0.4" />
          <rect x="244" y="412" width="24" height="80" rx="4" fill="url(#logo-grad-card-v13)" opacity="0.4" />
          <rect x="20" y="244" width="80" height="24" rx="4" fill="url(#logo-grad-card-v13)" opacity="0.4" />
          <rect x="412" y="244" width="80" height="24" rx="4" fill="url(#logo-grad-card-v13)" opacity="0.4" />
        </svg>
        <div className="flex flex-col">
            <svg width="200" height="36" viewBox="0 0 200 36" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="findspot-text-grad-v10" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10b981" />
                  <stop offset="50%" stop-color="#14b8a6" />
                  <stop offset="100%" stop-color="#0ea5e9" />
                </linearGradient>
              </defs>
              <text 
                x="0" 
                y="30" 
                fill="url(#findspot-text-grad-v10)" 
                style={{ 
                    fontSize: '36px', 
                    fontWeight: 900, 
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '-0.06em'
                }}
              >
                FindSpot
              </text>
            </svg>
        </div>
    </div>
  );
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>((props, ref) => {
  const { find, photoUrl, permission, session, type, findsCount, bestFindName } = props;

  const cardStyle: React.CSSProperties = {
    width: '1080px',
    height: '1080px',
    backgroundColor: '#020617', 
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Inter", "system-ui", sans-serif',
  };

  const serifStyle: React.CSSProperties = {
    fontFamily: 'Georgia, serif',
  };

  const labelStyle = "text-[14px] uppercase font-black tracking-[0.4em] text-emerald-500/60 mb-2";

  if (type === 'find' || type === 'find-of-the-day') {
    if (!find) return null;

    const isCoin = find.coinType || find.coinDenomination || find.objectType.toLowerCase().includes('coin');
    const mainTitle = isCoin && find.coinType ? `${find.coinType} Coin` : find.objectType;
    const subTitle = isCoin ? find.coinDenomination : null;

    return (
      <div ref={ref} style={cardStyle} className="p-0 m-0 border-0">
        <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
        }}></div>

        {/* Header */}
        <div className="p-16 pb-12 flex justify-between items-center z-10">
          <CardLogoGroup />
          <div className="text-right">
             <div className="text-xl font-bold text-emerald-500/50 tracking-wider">facebook.com/FindSpot</div>
          </div>
        </div>

        {/* Main Content - Pushed up with generous bottom padding for Facebook safety */}
        <div className="flex flex-col px-16 pb-32 gap-8 z-10 overflow-hidden">
          
          {/* Centered Specimen focus */}
          <div className="h-[480px] flex-shrink-0 relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] border border-white/10 bg-[#050a18]">
            {photoUrl ? (
                <div 
                    style={{ 
                        backgroundImage: `url(${photoUrl})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }} 
                    className="w-full h-full"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white/5 uppercase tracking-[1em] text-sm font-black">
                    No Specimen Photo
                </div>
            )}
          </div>

          {/* Details Section - Moved UP and well-spaced */}
          <div className="flex flex-col gap-8 overflow-visible">
            <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <div className="flex flex-col gap-2 min-w-0 flex-1 pr-8">
                    <h1 style={serifStyle} className="text-5xl font-black leading-relaxed text-white tracking-tight pb-2">
                        {mainTitle}
                    </h1>
                    {(subTitle || find.ruler) && (
                        <h2 className="text-3xl font-bold text-emerald-400 tracking-tight leading-relaxed pb-2">
                            {subTitle ? `${subTitle}${find.ruler ? ` — ${find.ruler}` : ''}` : find.ruler}
                        </h2>
                    )}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0 pt-4">
                    <div className={labelStyle}>Chronology</div>
                    <div className="text-3xl font-black text-white">{find.dateRange || find.period}</div>
                </div>
            </div>

            {/* Technical Row - High Visibility */}
            <div className="grid grid-cols-3 gap-10">
                <div className="flex flex-col gap-1">
                    <div className={labelStyle}>Detector</div>
                    <div className="text-2xl font-bold text-white/70">{find.detector || '---'}</div>
                </div>

                <div className="flex flex-col gap-1 text-center border-x border-white/5 px-4">
                    <div className={labelStyle}>Signal ID</div>
                    <div className="text-2xl font-bold text-white/70 font-mono tracking-[0.2em]">{find.targetId ?? '--'}</div>
                </div>
                
                <div className="flex flex-col gap-1 text-right">
                    <div className={labelStyle}>Depth</div>
                    <div className="text-2xl font-bold text-white/70">{find.depthCm ? `${find.depthCm}cm` : '--'}</div>
                </div>
            </div>
          </div>
        </div>

        {/* Branding bar at absolute bottom */}
        <div className="absolute bottom-10 left-16 right-16 flex justify-between items-center opacity-10">
            <div className="text-[10px] font-black tracking-[0.6em] uppercase text-white italic">Discovery Record</div>
            <div className="text-[10px] font-black tracking-[0.6em] uppercase text-white">findspot.app</div>
        </div>
      </div>
    );
  }

  if (type === 'session') {
    if (!session) return null;
    const dateStr = new Date(session.date).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div ref={ref} style={cardStyle} className="p-0 m-0 border-0">
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at 0% 100%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)'
            }}></div>

            {/* Header */}
            <div className="p-16 pb-12 flex justify-between items-center z-10">
                <CardLogoGroup />
                <div className="text-right">
                    <div className="text-xl font-bold text-emerald-500/40 tracking-wider">facebook.com/FindSpot</div>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-16 pb-32 justify-center z-10 overflow-hidden">
                <div className="mb-12">
                    <div className={labelStyle}>Location Archive</div>
                    <h1 style={serifStyle} className="text-6xl font-black tracking-tight leading-relaxed text-white mb-4 pb-4">
                        {permission?.name || 'Field Session'}
                    </h1>
                    <div className="text-3xl text-emerald-400 font-serif italic opacity-90 tracking-tight">{dateStr}</div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white/[0.03] p-10 rounded-[2rem] border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Land</div>
                        <div className="text-3xl font-bold text-white/90 tracking-tight truncate">{permission?.landType || 'Mixed'}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">{session.landUse || 'N/A'}</div>
                    </div>
                    
                    <div className="bg-white/[0.03] p-10 rounded-[2rem] border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Ground</div>
                        <div className="text-3xl font-black text-white/90 tracking-tight">{session.isStubble ? 'Stubble' : 'Surface'}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Record</div>
                    </div>

                    <div className="bg-white/[0.03] p-10 rounded-[2rem] border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Items</div>
                        <div className="text-7xl font-black text-emerald-500 tracking-tighter leading-none">{findsCount ?? 0}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Catalogued</div>
                    </div>

                    <div className="bg-white/[0.03] p-10 rounded-[2rem] border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Highlight</div>
                        <div style={serifStyle} className="text-4xl font-bold text-amber-500/80 italic leading-loose pb-2">{bestFindName || 'Exploring...'}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Session Choice</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-16 right-16 flex justify-between items-center opacity-10 pointer-events-none">
                <div className="text-[10px] font-black tracking-[0.6em] uppercase text-white">Professional Field Suite</div>
                <div className="text-[10px] font-black tracking-[0.6em] uppercase text-white">www.findspot.app</div>
            </div>
        </div>
    );
  }

  return null;
});
