import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavorites = create(
  persist(
    (set) => ({
      favorites: [],
      
      toggleFavorite: (product) => set((state) => {
        if (!product || !product.id) return state;

        const isFavorite = state.favorites.some((p) => p && p.id === product.id);
        
        if (isFavorite) {
          return { favorites: state.favorites.filter((p) => p && p.id !== product.id) };
        } else {
          return { favorites: [...state.favorites, product] };
        }
      }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    { name: 'favorites-storage' }
  )
);

export default useFavorites;