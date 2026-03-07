import React from 'react';

const designers = [
  { id: 1, name: "Unique Design", desc: "Ճարտարապետական 3D մոդելների մշակում...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740466806085--Messenger_creation_4D4BF230-75CC-4580-A6C6-5B77D4AED49E.webp&w=1920&q=75" },
  { id: 2, name: "ARCHITECTUM LLC", desc: "1. Էսքիզային նախագծերի մշակում, ցուցադրական...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739358817839--WhatsApp_Image_2025-02-12_at_15.01.36_b320a8a6.webp&w=1920&q=75" },
  { id: 3, name: "LUMINAR studio", desc: "Նախագծման ընթացքում մեր փորձառու մասնագետները...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739528262438--WhatsApp_Image_2025-02-14_at_13.51.57_73d0dfcd.webp&w=1920&q=75" },
  { id: 4, name: "SILAS DESIGN AND CONSTRUCTION", desc: "SILAS DESIGN AND CONSTRUCTION հիմնադրվել է 2010...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743664023548--photo_2025-04-03_11-05-29.webp&w=1920&q=75" },
  { id: 5, name: "ԻՄԵՋՄԵՆ Ինտերիեր-դիզայն", desc: "ԻՄԵՋՄԵՆ արվեստանոցը հիմնադրվել է 1999 թվականին...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739859337970--Logo_IMAGEMAN.webp&w=1920&q=75" },
  { id: 6, name: "ԴԱԱՊ ճարտարապետական", desc: "ԴԱԱՊ ճարտարապետական արվեստանոցը նախկին QC Architects...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739874444574--WhatsApp_Image_2025-02-18_at_14.15.03_101ceb94.webp&w=1920&q=75" },
  { id: 7, name: "ՆԵՐԳԱՂԹ ՃԱՐՏԱՐԱՊԵՏԱԿԱՆ", desc: "Ներգաղթ ճարտարապետական արվեստանոցը հիմնադրվել է...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740464484847--IMG_20250225_101526_731.webp&w=1920&q=75" },
  { id: 8, name: "ՋԻ–ԷՄ–ՋԻ Ինթերիորս", desc: "ՋԻ–ԷՄ–ՋԻ Ինթերիորս ստուդիան հիմնադրվել է 2018...", logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1741863888966--Logo_16x10.webp&w=1920&q=75" },
];

const DesignerGrid = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      {/* Page Title */}
      <h1 className="text-center text-2xl font-bold mb-10 tracking-widest uppercase">
        ԴԻԶԱՅՆԵՐՆԵՐ
      </h1>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {designers.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
               <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-sm mb-2 text-gray-800 uppercase line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* "More" Button */}
      <div className="flex justify-center mt-12">
        <button className="bg-[#14cf9f] text-white px-8 py-2 rounded-md font-medium hover:bg-[#11b88d] transition-colors">
          Ավելին
        </button>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="bg-[#14cf9f] p-3 rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
          <PhoneIcon />
        </button>
        <button className="bg-[#14cf9f] p-3 rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
          <ChatIcon />
        </button>
      </div>
    </div>
  );
};

// Simple SVG Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default DesignerGrid;