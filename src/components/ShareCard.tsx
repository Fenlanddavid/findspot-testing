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
 * Exactly matching the app's logo and typography style using SVG for guaranteed 
 * gradient rendering in html2canvas (no solid bars).
 */
function CardLogoGroup({ subtitle }: { subtitle: string }) {
  return (
    <div className="flex items-center gap-4">
        {/* App Logo SVG */}
        <svg width="50" height="50" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-grad-card-v4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" />
              <stop offset="50%" stop-color="#14b8a6" />
              <stop offset="100%" stop-color="#0ea5e9" />
            </linearGradient>
          </defs>
          <circle cx="256" cy="256" r="200" stroke="url(#logo-grad-card-v4)" strokeWidth="32" fill="none" />
          <circle cx="256" cy="256" r="120" stroke="url(#logo-grad-card-v4)" strokeWidth="24" fill="none" opacity="0.6" />
          <circle cx="256" cy="256" r="50" fill="url(#logo-grad-card-v4)" />
          <rect x="244" y="20" width="24" height="80" rx="4" fill="url(#logo-grad-card-v4)" opacity="0.4" />
          <rect x="244" y="412" width="24" height="80" rx="4" fill="url(#logo-grad-card-v4)" opacity="0.4" />
          <rect x="20" y="244" width="80" height="24" rx="4" fill="url(#logo-grad-card-v4)" opacity="0.4" />
          <rect x="412" y="244" width="80" height="24" rx="4" fill="url(#logo-grad-card-v4)" opacity="0.4" />
        </svg>
        <div className="flex flex-col">
            {/* FindSpot Text as SVG for perfect gradient rendering */}
            <svg width="150" height="26" viewBox="0 0 150 26" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="findspot-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10b981" />
                  <stop offset="50%" stop-color="#14b8a6" />
                  <stop offset="100%" stop-color="#0ea5e9" />
                </linearGradient>
              </defs>
              <text 
                x="0" 
                y="22" 
                fill="url(#findspot-text-grad)" 
                style={{ 
                    fontSize: '26px', 
                    fontWeight: 900, 
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '-0.06em'
                }}
              >
                FindSpot
              </text>
            </svg>
            <div className="text-[10px] font-bold text-emerald-500/30 tracking-[0.25em] uppercase mt-0.5">{subtitle}</div>
        </div>
    </div>
  );
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>((props, ref) => {
  const { find, photoUrl, permission, session, type, findsCount, bestFindName } = props;

  const cardStyle: React.CSSProperties = {
    width: '1080px',
    height: '1080px',
    backgroundColor: '#020617', // Obsidian
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

  const labelStyle = "text-[10px] uppercase font-black tracking-[0.4em] text-emerald-500/50 mb-1.5";
  const valueStyle = "text-2xl font-semibold text-white/90 tracking-tight";

  if (type === 'find' || type === 'find-of-the-day') {
    if (!find) return null;

    const isTreasure = find.material === 'Gold';
    const isCoin = find.coinType || find.coinDenomination || find.objectType.toLowerCase().includes('coin');
    
    const mainTitle = isCoin && find.coinType ? `${find.coinType} Coin` : find.objectType;
    const subTitle = isCoin ? find.coinDenomination : null;

    return (
      <div ref={ref} style={cardStyle} className="p-0 m-0 border-0">
        <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% -10%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)'
        }}></div>

        {/* Header - Subtle & Professional */}
        <div className="p-16 pb-12 flex justify-between items-center z-10">
          <CardLogoGroup subtitle="Digital Archive" />
          <div className="text-right">
             <div className="text-sm font-bold text-emerald-500/40 tracking-widest">facebook.com/FindSpot</div>
          </div>
        </div>

        {/* Main Content Area - Image as focus */}
        <div className="flex-1 flex px-16 pb-20 gap-14 items-center z-10">
          
          {/* Information Column (Left) */}
          <div className="w-[340px] flex flex-col justify-center h-[720px]">
            <div className="mb-12">
                <div className={labelStyle}>Identification</div>
                <h1 style={serifStyle} className="text-5xl font-bold leading-tight text-white tracking-tight">
                    {mainTitle}
                </h1>
                {subTitle && (
                    <h2 className="text-3xl font-medium text-emerald-400 mt-3 tracking-tight">
                        {subTitle}
                    </h2>
                )}
            </div>

            <div className="grid gap-8">
                {find.ruler && (
                    <div>
                        <div className={labelStyle}>
                            {find.period === 'Celtic' ? 'Tribal' : 
                             find.period === 'Roman' ? 'Imperial' : 
                             'Authority'}
                        </div>
                        <div style={serifStyle} className="text-3xl italic text-white/90 leading-tight">{find.ruler}</div>
                    </div>
                )}

                <div>
                    <div className={labelStyle}>Era</div>
                    <div className={valueStyle}>{find.dateRange || find.period}</div>
                </div>
                
                <div>
                    <div className={labelStyle}>Region</div>
                    <div className={valueStyle}>{permission?.name || 'United Kingdom'}</div>
                </div>

                {/* Technical Specs grid */}
                <div className="pt-10 border-t border-white/5 grid grid-cols-1 gap-6">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <div className={labelStyle}>Detector</div>
                        <div className="text-sm font-bold text-white/40 tracking-wide truncate max-w-[180px]">{find.detector || '---'}</div>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <div className={labelStyle}>Signal ID</div>
                        <div className="text-sm font-bold text-white/40 font-mono tracking-widest">{find.targetId ?? '--'}</div>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <div className={labelStyle}>Depth</div>
                        <div className="text-sm font-bold text-white/40">{find.depthCm ? `${find.depthCm}cm` : '--'}</div>
                    </div>
                </div>
            </div>
          </div>

          {/* Large Specimen Portrait (Right) - THE FOCUS */}
          <div className="flex-1 h-[720px] relative">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-3xl opacity-50"></div>
            
            <div className="relative w-full h-full bg-[#050a18] rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/5">
                {photoUrl ? (
                    <img src={photoUrl} alt="Specimen" className="w-full h-full object-cover brightness-[1.08] contrast-[1.05]" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5 uppercase tracking-[0.6em] text-[10px] font-black">
                        No Image Available
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none opacity-60"></div>
            </div>
            
            {type === 'find-of-the-day' && (
                <div className="absolute -top-4 -right-4 bg-amber-500 text-black px-5 py-2 text-xs font-black uppercase tracking-[0.25em] rounded shadow-2xl transform rotate-2">
                    Gold Star Selection
                </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-12 left-16 flex items-center gap-8 opacity-20">
             <div className="text-[9px] font-black tracking-[0.4em] uppercase">Professional Field Record</div>
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
                <CardLogoGroup subtitle="Session Ledger" />
                <div className="text-right">
                    <div className="text-sm font-bold text-emerald-500/40 tracking-widest">facebook.com/FindSpot</div>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-16 pb-12 justify-center z-10">
                <div className="mb-16">
                    <div className={labelStyle}>Location Archive</div>
                    <h1 style={serifStyle} className="text-8xl font-bold tracking-tight leading-none text-white mb-4">
                        {permission?.name || 'Field Session'}
                    </h1>
                    <div className="text-4xl text-emerald-400 font-serif italic opacity-80 tracking-tight">{dateStr}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] p-10 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Environment</div>
                        <div className="text-3xl font-bold text-white/80 tracking-tight">{permission?.landType || 'Mixed'}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">{session.landUse || 'N/A'}</div>
                    </div>
                    
                    <div className="bg-white/[0.02] p-10 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Ground Status</div>
                        <div className="text-3xl font-bold text-white/80 tracking-tight">{session.isStubble ? 'Stubble' : 'Cleared'}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Natural Conditions</div>
                    </div>

                    <div className="bg-white/[0.02] p-10 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Discoveries</div>
                        <div className="text-6xl font-black text-emerald-500/80 tracking-tighter">{findsCount ?? 0}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Items Catalogued</div>
                    </div>

                    <div className="bg-white/[0.02] p-10 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className={labelStyle}>Catalogue Highlight</div>
                        <div style={serifStyle} className="text-3xl font-bold text-amber-500/70 truncate italic">{bestFindName || 'Exploring...'}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Session Choice</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-16 right-16 flex justify-between items-center opacity-10 pointer-events-none">
                <div className="text-[9px] font-black tracking-[0.5em] uppercase text-white">www.findspot.app</div>
            </div>
        </div>
    );
  }

  return null;
});
