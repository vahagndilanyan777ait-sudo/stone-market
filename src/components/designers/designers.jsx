
import React from 'react';
import DesignerCard from './card';

const designers = [
  {
    name: "Unique Design",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740466806085--Messenger_creation_4D4BF230-75CC-4580-A6C6-5B77D4AED49E.webp&w=1920&q=75", 
    description: "Ճարտարապետական 3D մոդելների մշակում ըստ ձեր գծագրերի և էսքիզների..."
  },
  {
    name: "ARCHITECTUM LLC",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739358817839--WhatsApp_Image_2025-02-12_at_15.01.36_b320a8a6.webp&w=1920&q=75", 
    description: "1. Էսքիզային նախագծերի մշակում, ցուցադրական նյութերի պատրաստում..."
  },
  {
    name: "LUMINAR studio",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739528262438--WhatsApp_Image_2025-02-14_at_13.51.57_73d0dfcd.webp&w=1920&q=75",
    description: "Նախագծման ընթացքում մեր փորձառու մասնագետները կիրառում են միմի..."
  },
  {
    name: "SILAS DESIGN AND CONSTRUCTION",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743664023548--photo_2025-04-03_11-05-29.webp&w=1920&q=75",
    description: "SILAS DESIGN AND CONSTRUCTION հիմնադրվել է 2010 թվականին: Այն..."
  },
  {
    name: "ԻՄԵՅՋՄԵՆ Ինտերիեր-դիզայնի և...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739859337970--Logo_IMAGEMAN.webp&w=1920&q=75",
    description: " ԻՄԵՅՋՄԵՆ արվեստանոցը հիմնադրվել է 1999 թվականին, ինտերիեր դիզայներ..."
  },
   {
    name: "ԴԱԱՊ ճարտարապետական...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1739874444574--WhatsApp_Image_2025-02-18_at_14.15.03_101ceb94.webp&w=1920&q=75",
    description: " ԴԱԱՊ ճարտարապետական արվեստանոցը նախկին «QC Architects»-ի համահիմնադիր ճարտարապետ Ալեքսանդր Դանիելյանի նոր բիզնես նախագիծն է: 2020-ին գրացված..."
  },
   {
    name: "ՆԵՐԳԱՂԹ ՃԱՐՏԱՐԱՊԵՏԱԿԱՆ...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1740464484847--IMG_20250225_101526_731.webp&w=1920&q=75",
    description: "  Ներգաղթ ճարտարապետական արվեստանոցը հիմնադրվել է 2006թ․-ին։ Իր գործունեության ընթացք..."
  },
   {
    name: "Ջի–Էմ–Ջի Ինթիրիորս...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1741863888966--Logo_16x10.webp&w=1920&q=75",
    description: "      Ջի–Էմ–Ջի Ինթիրիորս ստուդիան հիմնադրվել է 2018 թվականին,..."
  },
  {
    name: "«Archimikanika» արվեստանոց...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743496374536--photo_2025-04-01_12-07-17_(3).webp&w=1920&q=75",
    description: "«Archimikanika» արվեստանոցը հիմնադրվել է 2013թ.-ին ճարտարապետ..."
  },
  {
    name: "ElMI DESIGN CONSTRUCTION...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1743515286102--530DE1F7-D095-4A8B-BBC0-64BA3DFA4C6F%5B1%5D.webp&w=1920&q=75",
    description: " Նախգծում ենք տարբեր տեսակի տարածքներ ՝..."
  },
  {
    name: "UPROject",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1745225933703--WhatsApp_Image_2025-04-21_at_12.34.35_3c21b472.webp&w=1920&q=75",
    description: "  Ճարտարապետություն, ինտերիերի դիզայն, գրաֆիկ դիզայն..."
  },
   {
    name: "Ակկուռատ Գրուպ ՍՊԸ",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1745317648399--WhatsApp_Image_2025-02-24_at_14.49.41_c7e30489.webp&w=1920&q=75",
    description: " «Ակկուռատ Գրուպ» ընկերությունը հիմնադրվել է 2002թ.-ին: Սկզբնական..."
  },
   {
    name: "Ատրիում ճարտարապետական...",
    logo: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1745933324974--WhatsApp_Image_2025-04-29_at_15.34.50_8c599435.webp&w=1920&q=75",
    description: "  Ատրիում ճարտարապետական արվեստանոցը հիմնադրվել է 2006 թ․-ի..."
  },
];



const DesignerGrid = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-black text-gray-900 mb-10 uppercase tracking-widest">
          ԴԻԶԱՅՆԵՐՆԵՐ
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designers.map((designer, index) => (
            <DesignerCard key={index} {...designer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignerGrid;