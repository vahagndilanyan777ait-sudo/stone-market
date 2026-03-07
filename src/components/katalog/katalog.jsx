import React from "react";
import { BiChevronDown } from "react-icons/bi";

const categories = [
    { name: 'Բնական քար', img: '🪨' },
    { name: 'Արհեստական քար', img: '🧱' },
    { name: 'Հաստոցներ', img: '⚙️' },
    { name: 'Քարամշակման գործիքներ', img: '🔨' },
    { name: 'Քիմիական նյութեր', img: '🧪' },
    { name: 'Արտադրական ծառայություններ', img: '🏭' },
    { name: 'Mane Tiles', img: '🎨' },
]

export default function Katalog() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">

            <div className="col-span-12 lg:col-span-3 bg-white h-full rounded-2xl p-4 shadow-sm border border-gray-50 self-start">
                {categories.map((cat, i) => (
                    <div key={i} className="flex items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white border border-transparent group-hover:border-gray-100">
                            {cat.img}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    </div>
                ))}
            </div>


            <div className="col-span-12 lg:col-span-9 relative rounded-3xl overflow-hidden aspect-video bg-gray-900 group">

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                >
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
}

