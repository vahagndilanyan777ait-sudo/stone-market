import React from 'react';
import { FiSearch, FiLogOut, FiHeart, FiShoppingCart, FiChevronDown } from 'react-icons/fi';

const Header = () => {
    return (
        <header className="w-full bg-white border-b border-gray-100 px-8 py-4">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">

                <div className="flex flex-col">
                    <img
                        src="https://www.stonemarket.am/icons/logo-primary.svg"
                        alt="Stone Market Logo"
                        className="h-10 w-auto"
                    />
                </div>

                <nav className="hidden lg:flex items-center space-x-10">
                    <a href="/" className="text-[15px] font-semibold text-gray-900 hover:text-[#00E5BC] transition-colors">Գլխավոր</a>
                    <a href="/shop" className="text-[15px] font-semibold text-gray-900 hover:text-[#00E5BC] transition-colors">Խանութ</a>
                    <a href="/designers" className="text-[15px] font-semibold text-gray-900 hover:text-[#00E5BC] transition-colors">Դիզայներներ</a>
                    <a href="/about" className="text-[15px] font-semibold text-gray-900 hover:text-[#00E5BC] transition-colors">Մեր մասին</a>
                    <a href="/contact" className="text-[15px] font-semibold text-gray-900 hover:text-[#00E5BC] transition-colors">Կապ</a>
                </nav>

                <div className="flex items-center space-x-3">
                    <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"><FiSearch size={18} /></button>
                    <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"><FiLogOut size={18} /></button>
                    <a href='/fav' className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"><FiHeart size={18} /></a>
                    <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"><FiShoppingCart size={18} /></button>

                    <div className="flex items-center space-x-2 cursor-pointer border border-gray-200 rounded-full px-3 py-2 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col w-5 h-3.5 rounded-[2px] overflow-hidden border border-gray-100">
                            <div className="h-1/3 bg-[#FF0000]"></div>
                            <div className="h-1/3 bg-[#0033A0]"></div>
                            <div className="h-1/3 bg-[#F2A800]"></div>
                        </div>
                        <FiChevronDown className="text-gray-400" size={14} />
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;