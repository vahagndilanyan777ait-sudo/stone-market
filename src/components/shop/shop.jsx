import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; // Համոզվիր, որ ուղին ճիշտ է
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
        setLoading(true);
        // Դիմում ենք բազայի "db/products" բաժնին
        const productsRef = ref(db, "db/products");

        // Իրական ժամանակում տվյալների ստացում
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            
            if (data) {
                // Firebase-ի օբյեկտը դարձնում ենք զանգված
                const formattedData = Object.keys(data).map(key => ({
                    id: key, // Օգտագործում ենք Firebase-ի key-ը որպես ID
                    ...data[key]
                }));
                setProducts(formattedData);
            } else {
                setProducts([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firebase fetch error:", error);
            setLoading(false);
        });

        // Մաքրում ենք կապը կոմպոնենտը փակվելիս
        return () => unsubscribe();
    }, []);

    const filteredProducts = activeCategory === "Բոլորը"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm mb-10 text-gray-500">
                <a href="/" className="hover:text-emerald-600 transition-colors">Գլխավոր</a>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-bold">Խանութ</span>
            </nav>

            {/* Categories */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
                <h2 className="text-lg font-black text-gray-900 pt-1 whitespace-nowrap">
                    Կատեգորիա:
                </h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-300 ${
                                activeCategory === cat
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-400 hover:text-emerald-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
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