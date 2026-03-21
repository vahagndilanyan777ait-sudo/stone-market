import React from 'react';
import useFavorites from '../../store/useFavorites'; // Ճիշտ ուղին դեպի store

const ProductCard = ({ product }) => {
  const { toggleFavorite, favorites } = useFavorites();

  if (!product || !product.id) return null;

  const isFavorite = favorites?.some((p) => p && p.id === product.id) || false;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image || ""} 
          alt={product.title || "Product"} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product);
          }}
          className={`absolute top-3 right-3 p-2 backdrop-blur-md rounded-full transition-all active:scale-90 z-10 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'
          }`}
        >
          <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-[15px] font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 h-10 leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-6 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-baseline">
            <span className="text-lg font-black text-gray-900">
              {product.price?.toLocaleString() || 0}
            </span>
            <span className="text-[10px] ml-1 font-bold text-gray-500 uppercase">դր.</span>
          </div>
          <button className="flex items-center justify-center w-10 h-10 border-2 border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;