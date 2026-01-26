export const MARKER_ICONS = {
  bookmark: `
       <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
      <div class="w-4 h-4 bg-hana-green rounded-full flex items-center justify-center shadow-inner">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M5 5C5 3.34315 6.34315 2 8 2H16C17.6569 2 19 3.34315 19 5V22L12 19L5 22V5Z" /></svg>
      </div>
    </div>`,
  embassy: `
   <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
      <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-inner">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg>
      </div>
    </div>`,
  hospital: `
    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
      <div class="w-4 h-4 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="#F43F5E" stroke="#F43F5E" stroke-linejoin="round"/></svg>
      </div>
    </div>`,
  myLocation: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"/>`,
  exchange: `
    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
      <div class="w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center shadow-inner">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
    </div>`,
};

export const DEFAULT_COORDS = { lat: 37.5445, lng: 127.0557 };

export const NAVER_MAP_SCRIPT_URL =
  'https://oapi.map.naver.com/openapi/v3/maps.js';
