import React from 'react';
import {
    FiSearch, FiLogOut, FiHeart, FiShoppingCart, FiChevronDown,
    FiInstagram, FiFacebook, FiPhone, FiMail
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const StoneMarket = () => {
    return (
        <>

            <section className="bg-[#111821] py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">


                    <div className="w-full md:w-1/3 bg-[#1A232E] p-8 rounded-2xl shadow-xl">
                        <h2 className="text-white text-xl font-bold mb-2">ՀԵՏԱԴԱՐՁ ԿԱՊ</h2>
                        <p className="text-gray-400 text-sm mb-6">Լրացրեք տվյալները և մենք կկապնվենք Ձեզ հետ հնարավորինս շուտ:</p>

                        <form className="space-y-4">
                            <input type="text" placeholder="Անուն" className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#00E5BC] outline-none" />
                            <input type="email" placeholder="Էլ․ հասցե" className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#00E5BC] outline-none" />
                            <div className="flex gap-2">
                                <div className="flex items-center bg-transparent border border-gray-700 rounded-lg px-2 text-white">
                                    <img src="https://flagicons.lipis.dev/flags/4x3/am.svg" className="w-4 h-3 mr-1" alt="AM" />
                                    <span className="text-sm">+374</span>
                                </div>
                                <input type="tel" className="flex-1 bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#00E5BC] outline-none" />
                            </div>
                            <input type="text" placeholder="Կազմակերպություն" className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#00E5BC] outline-none" />

                            <label className="flex items-start gap-2 cursor-pointer py-2">
                                <input type="checkbox" className="mt-1 accent-[#00E5BC]" />
                                <span className="text-xs text-gray-400">Համաձայն եմ կայքի պայմաններին</span>
                            </label>

                            <button className="w-full bg-[#00E5BC] text-[#111821] font-bold py-3 rounded-lg hover:bg-[#00c5a0] transition-colors">
                                Ուղարկել
                            </button>
                        </form>
                    </div>


                    <div className="w-full md:w-2/3 rounded-2xl overflow-hidden relative group">
                        <img
                            src="https://www.stonemarket.am/_next/image?url=%2Fimages%2Ffeedback.webp&w=1920&q=75"
                            alt="Showroom"
                            className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                </div>
            </section>


            <footer className="bg-[#111821] border-t border-gray-800 pt-16 pb-8 px-6 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">


                        <div className="space-y-6">
                            <img src="https://www.stonemarket.am/icons/logo-light.svg" alt="Footer Logo" className="h-8" />
                            <div className="space-y-2 text-gray-400 text-sm">
                                <p className="flex items-center gap-2"><FiPhone className="text-[#00E5BC]" /> +374 (33) 76-73-77</p>
                                <p className="flex items-center gap-2"><FiMail className="text-[#00E5BC]" /> stonemarket@yandex.ru</p>
                            </div>
                        </div>


                        <div>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Գլխավոր</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Խանութ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Դիզայներներ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Մեր մասին</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Կապ</a></li>
                            </ul>
                        </div>


                        <div>
                            <h4 className="font-bold mb-4">Ծառայություններ</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li>Արտադրական լինիայի աուդիտ</li>
                                <li>Հանքավայրի շահագործման ծառայություններ</li>
                                <li>Մարքեթինգային փաթեթավորում</li>
                                <li>Էքսպորտի կազմակերպում</li>
                            </ul>
                        </div>


                        <div>
                            <h4 className="font-bold mb-4">Հետևեք մեզ սոցցանցերում</h4>
                            <div className="space-y-3 text-gray-400 text-sm">
                                <a href="#" className="flex items-center gap-2 hover:text-white"><FiInstagram /> stonemarket.am</a>
                                <a href="#" className="flex items-center gap-2 hover:text-white"><FiFacebook /> Stone Market</a>
                                <div className="flex gap-4 pt-4">
                                    <button className="bg-[#00E5BC] p-2 rounded-lg text-white"><FaWhatsapp size={20} /></button>
                                    <button className="bg-[#00E5BC] p-2 rounded-lg text-white"><FaTelegramPlane size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 gap-4">
                        <div className="flex gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-8" alt="App Store" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-8" alt="Google Play" />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default StoneMarket;