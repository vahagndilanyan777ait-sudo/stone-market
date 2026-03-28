import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

const DesignerGrid = () => {
  const [designersList, setDesignersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ՈՒՇԱԴՐՈՒԹՅՈՒՆ: Քանի որ քո բազայում տվյալները "db" թղթապանակի մեջ են
    const designersRef = ref(db, "db/designers"); 

    const unsubscribe = onValue(designersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data); // Ստուգիր console-ում՝ տվյալները գալիս են, թե ոչ

      if (data) {
        // Եթե տվյալները օբյեկտ են, սարքում ենք զանգված
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setDesignersList(formattedData);
      } else {
        setDesignersList([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      <h1 className="text-center text-2xl font-bold mb-10 tracking-widest uppercase">
        ԴԻԶԱՅՆԵՐՆԵՐ
      </h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Բեռնվում է...</div>
      ) : designersList.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Տվյալներ չեն գտնվել:</div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designersList.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                 <img 
                   src={item.logo} 
                   alt={item.name} 
                   className="w-full h-full object-cover" 
                   onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }} 
                 />
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-sm mb-2 text-gray-800 uppercase line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {item.description || item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons & Icons */}
      <div className="flex justify-center mt-12">
        <button className="bg-[#14cf9f] text-white px-8 py-2 rounded-md font-medium hover:bg-[#11b88d] transition-colors">
          Ավելին
        </button>
      </div>

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

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ChatIcon = () => (
  <a href="/chat" className="inline-block text-white">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </a>
);

export default DesignerGrid;