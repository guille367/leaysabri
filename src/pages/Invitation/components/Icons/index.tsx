// SVG Icons for the invitation

export function ChurchIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 4v12M26 10h12M32 16l16 12v32H16V28l16-12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28 60V44a4 4 0 018 0v16" stroke="currentColor" strokeWidth="2"/>
            <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
    )
}

export function PartyIcon({ className = '' }: { className?: string }) {
    return (
<svg className={className} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  {/* <defs>
    <style>
      .cls-1 {
        fill: none;
        stroke: #41484f;
        stroke-miterlimit: 10;
        stroke-width: 1.15px;
      }

      .cls-2 {
        fill: #f3f1eb;
      }
    </style>
  </defs> */}
  <g>
    <path className="cls-1" d="M35.12,25.7s-6.21,15.58-1.47,23.79c1.61,2.78,5.27,3.75,8.05,2.13,8.18-4.78,10.5-21.4,10.5-21.4"/>
    <path className="cls-1" d="M52.2,30.23s.02-1.86-7.2-4.16c-7.22-2.3-9.87-.37-9.87-.37,0,0,.09,3.14,8.12,4.94,8.03,1.8,8.96-.42,8.96-.42Z"/>
    <path className="cls-2" d="M34.55,37s-1.63,11.27,3.05,12.47c4.68,1.2,8.18-5.45,10.82-13.37,0,0-3.54-1.68-7.37,1.12-3.32,2.42-6.5-.21-6.5-.21Z"/>
    <line className="cls-1" x1="37.44" y1="52.42" x2="30.23" y2="81.56"/>
    <line className="cls-1" x1="26.42" y1="80.4" x2="34" y2="82.26"/>
  </g>
  <g>
    <path className="cls-1" d="M51.73,39.49s.49,16.77,8.1,22.41c2.58,1.92,6.33,1.35,8.23-1.24,5.61-7.64,1.13-23.81,1.13-23.81"/>
    <path className="cls-1" d="M69.2,36.85s-.72-1.71-8.26-.95c-7.54.76-9.2,3.59-9.2,3.59,0,0,1.33,2.85,9.41,1.31,8.08-1.54,8.05-3.94,8.05-3.94Z"/>
    <path className="cls-2" d="M55.7,50.09s2.99,10.99,7.76,10.23c4.77-.76,5.34-8.26,4.61-16.57,0,0-3.91-.14-6.32,3.95-2.08,3.54-6.05,2.39-6.05,2.39Z"/>
    <line className="cls-1" x1="64.48" y1="63.08" x2="69.85" y2="92.61"/>
    <line className="cls-1" x1="65.89" y1="93.06" x2="73.58" y2="91.75"/>
  </g>
  <line className="cls-1" x1="72.72" y1="22.9" x2="62.83" y2="29.66"/>
  <line className="cls-1" x1="65.81" y1="11.47" x2="58.83" y2="26.66"/>
  <line className="cls-1" x1="52.62" y1="14.86" x2="54.37" y2="24.72"/>
</svg>
    )
}

export function MapPinIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
    )
}

export function CalendarIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export function ClockIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export function GiftIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="8" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v14M3 12h18" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8c-2-2-4-3-5-2s0 3 2 4h6c2-1 3-3 2-4s-3 0-5 2z" stroke="currentColor" strokeWidth="2"/>
        </svg>
    )
}

export function HashtagIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8h16M4 16h16M8 4l-2 16M18 4l-2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export function SpotifyIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
    )
}

export function InstagramIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="6" r="1" fill="currentColor"/>
        </svg>
    )
}

export function WhatsAppIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    )
}

export function ChevronDownIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export function ArrowUpIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export function HeartIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    )
}
