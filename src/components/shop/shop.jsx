import React, { useState, useEffect } from 'react';
import ProductCard from './card';

const ShopContent = () => {
    const [activeCategory, setActiveCategory] = useState("Բոլորը");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        "Բոլորը", "Բնական քար", "Արհեստական քար", "Հաստոցներ",
        "Քարամշակման գործիքներ", "Քիմիական նյութեր", "Արտադրական ծառայություններ"
    ];

    useEffect(() => {
        const fetchFromDB = () => {
            setLoading(true);

            const dbData = [
                {
                    id: 1,
                    category: "Բնական քար",
                    title: "Տրավերտինե հավաքածու N097",
                    price: 250000,
                    description: "Սեղան և նստարաններ բնական տրավերտին քարից՝ նախատեսված...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N097--1772606804540.webp&w=1920&q=75"
                },
                {
                    id: 2,
                    category: "Բնական քար",
                    title: "Տրավերտինե հավաքածու N093",
                    price: 350000 ,
                    description: "Սուրճի սեղան բնական տրավերտին քարից՝ յուրահատուկ և ժամանակակից...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N093--1772606461964.webp&w=1920&q=75" 
                },
                {
                    id: 3,
                    category: "Բնական քար",
                    title: "Տրավերտինե դեկոր N082",
                    price: 100000 ,
                    description: "Բնական տրավերտին քարից մոմակալ՝ նրբագեղ և ջերմ ձևավորմամբ։...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N082--1772547557216.webp&w=1920&q=75" 
                },
                {
                   id: 4,
                    category: "Արհեստական քար",
                    title: "Բետոնե Սեղան N073",
                    price: 600000 ,
                    description: "Սեղան բետոնից՝ յուրահատուկ և արտահայտիչ դիզայնով։...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F%C3%94%C2%BF%C3%95%C2%88%C3%94%C2%B4_N073-1--1772700511503.webp&w=1920&q=75"  
                },
                {
                   id: 5,
                    category: "Հաստոցներ",
                    title: "3D և 4D փորագրող հաստոց",
                    price: 4890000,
                    description: "Արտադրող երկիր - ՉինաստանՇարժիչի հզորություն - 5,5 kw Աշխատանքային դաշտ - 2500x1250x450մմ...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1744456851466--tempImage8DG84d.webp&w=1920&q=75"  
                },
                 {
                   id: 6,
                    category: "Հաստոցներ",
                    title: "Չափաբերող հաստոց",
                    price: 6000000,
                    description: "Հաստոցը գտնվում է անթերի վիճակում...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1744289507021--tempImageGOzThS.webp&w=1920&q=75"  
                },
                {
                   id: 7,
                    category: "Հաստոցներ",
                    title: "Ուղղահայաց և հորիզոնական սղոցներով",
                    price: 20000000,
                    description: "Հաստոցը գտնվում է աշխատանքային լավ վիճակում...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F1744289011870--tempImagejlfTJN.webp&w=1920&q=75"  
                },
                {
                   id: 8,
                    category: "Քարամշակման գործիքներ",
                    title: "Ճոպանի ռետինե անիվ N003",
                    price: 15000,
                    description: "Չափս - 320մմ...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F51--1772289339921.webp&w=1920&q=75"  
                },
                {
                   id: 9,
                    category: "Քարամշակման գործիքներ",
                    title: "Ճոպանի ռետինե անիվ N002",
                    price: 7000,
                    description: "Չափս - 200մմ...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F50--1772289267500.webp&w=1920&q=75"  
                },
                {
                   id: 10,
                    category: "Քարամշակման գործիքներ",
                    title: "Ճոպանի ռետինե անիվ N001",
                    price: 18000,
                    description: "Չափս - 380մմ...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2F49--1772182708560.webp&w=1920&q=75"  
                },
                {
                   id: 11,
                    category: "Քիմիական նյութեր",
                    title: "Պաշտպանիչ լաք Tenax Proseal 0.25լ",
                    price: 8600,
                    description: "PROSEAL-ը բարձր արդյունավետությամբ պաշտպանիչ միջոց է բոլոր տեսակի բնակա...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2FtempImageJ11k2E--1764921180319.webp&w=1920&q=75"  
                },
                {
                   id: 12,
                    category: "Քիմիական նյութեր",
                    title: "Քարի սոսինձ",
                    price: 48000,
                    description: "Պրոֆեսիոնալ սոսինձ բնական քարերի համար...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2FStone_post2--1762766057282.webp&w=1920&q=75"  
                },
                {
                   id: 13,
                    category: "Քիմիական նյութեր",
                    title: "Քարի մածիկ N004",
                    price: 35000,
                    description: "Բարձրակարգ սոսինձ-մածիկ՝ նախատեսված տրավերտինի, մարմարի...",
                    image: "https://www.stonemarket.am/_next/image?url=https%3A%2F%2Fapi.stonemarket.am%2FStone_post1--1762765773424.webp&w=1920&q=75"  
                },

            ];

            setTimeout(() => {
                setProducts(dbData);
                setLoading(false);
            }, 500);
        };

        fetchFromDB();
    }, []);

    const filteredProducts = activeCategory === "Բոլորը"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">

            <nav className="flex items-center space-x-2 text-sm mb-10 text-gray-500">
                <a href="#" className="hover:text-emerald-600 transition-colors">Գլխավոր</a>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-bold">Խանութ</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
                <h2 className="text-lg font-black text-gray-900 pt-1 whitespace-nowrap">
                    Կատեգորիա:
                </h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-300 ${activeCategory === cat
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-400 hover:text-emerald-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-500">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium italic">Այս կատեգորիայում ապրանքներ չեն գտնվել:</p>
                </div>
            )}
        </div>
    );
};

export default ShopContent;