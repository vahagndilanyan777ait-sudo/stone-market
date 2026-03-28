import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; // Ստուգիր, որ ուղին ճիշտ է
import DesignerCard from './card';

const DesignerGrid = () => {
  const [designersList, setDesignersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Քանի որ Firebase-ում տվյալները "db" թղթապանակի մեջ են
    const designersRef = ref(db, "db/designers");

    // Իրական ժամանակում տվյալների ստացում
    const unsubscribe = onValue(designersRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Եթե Firebase-ից եկած տվյալները օբյեկտ են, դարձնում ենք զանգված
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
      console.error("Firebase կապի սխալ:", error);
      setLoading(false);
    });

    // Կապի ընդհատում կոմպոնենտը փակելիս
    return () => unsubscribe();
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-black text-gray-900 mb-10 uppercase tracking-widest">
          ԴԻԶԱՅՆԵՐՆԵՐ
        </h2>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Բեռնվում է...</div>
        ) : designersList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Տվյալներ չեն գտնվել</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {designersList.map((designer) => (
              <DesignerCard key={designer.id} {...designer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignerGrid;