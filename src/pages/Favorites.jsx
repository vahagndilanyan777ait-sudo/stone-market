import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer'
import useFavorites from '../store/useFavorites'; 
import ProductCard from '../components/shop/card'; 

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-white">
      <div className="flex justify-between items-end mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Իմ նախընտրածները</h1>
          <p className="text-gray-500 mt-2 font-medium">Ցանկում առկա է {favorites.length} ապրանք</p>
        </div>
        {favorites.length > 0 && (
          <button onClick={clearFavorites} className="text-sm text-red-500 hover:text-red-700 font-bold transition-colors">
            ՄԱՔՐԵԼ ՑԱՆԿԸ
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-xl italic font-medium">Ձեր նախընտրածների ցանկը դատարկ է:</p>
          <a href="/shop" className="mt-8 inline-block bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 uppercase tracking-wider">
            Գնալ խանութ
          </a>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Favorites;