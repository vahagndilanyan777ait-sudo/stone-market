import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from "../../lib/firebase";
import { ref, push, onValue, set, onDisconnect, serverTimestamp } from "firebase/database";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const Chat = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [usersStatus, setUsersStatus] = useState({});
    const scrollRef = useRef();

    // 1. Ստեղծում ենք ձայնային օբյեկտը (կարող ես փոխել հղումը քո ուզած ձայնով)
    const notificationSound = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"));

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleLogout = () => signOut(auth);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userStatusRef = ref(db, `db/status/${currentUser.uid}`);
                set(userStatusRef, {
                    state: "online",
                    last_changed: serverTimestamp(),
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    email: currentUser.email
                });
                onDisconnect(userStatusRef).update({
                    state: "offline",
                    last_changed: serverTimestamp()
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    // 2. Տվյալների ստացում և ձայնի միացում
    useEffect(() => {
        const messagesRef = ref(db, "db/messages");
        const statusRef = ref(db, "db/status");

        const unsubMessages = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const newMessagesArray = Object.values(data);
                
                // Ստուգում ենք՝ արդյոք նոր հաղորդագրություն կա և այն ուրիշինն է
                if (newMessagesArray.length > messages.length) {
                    const lastMsg = newMessagesArray[newMessagesArray.length - 1];
                    // Եթե վերջին հաղորդագրությունը իմը չէ, միացնել ձայնը
                    if (lastMsg.uid !== auth.currentUser?.uid) {
                        notificationSound.current.play().catch(err => console.log("Sound play blocked by browser"));
                    }
                }
                
                setMessages(newMessagesArray);
            }
        });

        const unsubStatus = onValue(statusRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setUsersStatus(data);
        });

        return () => {
            unsubMessages();
            unsubStatus();
        };
    }, [messages.length]); // Կախվածությունը դրված է երկարության վրա

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        const messagesRef = ref(db, "db/messages");
        await push(messagesRef, {
            text: newMessage,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            timestamp: serverTimestamp()
        });

        setNewMessage("");
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4 h-[700px]">
            {/* User List Section */}
            <div className="w-full md:w-64 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                    <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider">Օգտատերեր</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {Object.values(usersStatus).map((u, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all">
                            <div className="relative">
                                <img src={u.photoURL} alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${u.state === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-800 truncate">{u.displayName}</p>
                                <p className="text-[10px] text-gray-400 uppercase font-medium">{u.state}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
                <div className="bg-[#00e699] p-4 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                            <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">Support Chat</h2>
                            <p className="text-xs opacity-90">{user ? "Մուտք գործված է" : "Անցանց"}</p>
                        </div>
                    </div>
                    {user ? (
                        <button onClick={handleLogout} className="bg-black/10 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-black/20 transition-all">ԵԼՔ</button>
                    ) : (
                        <button onClick={handleLogin} className="bg-white text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold hover:shadow-lg transition-all">ՄՈՒՏՔ</button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30">
                    {!user && (
                        <div className="text-center py-10">
                            <button onClick={handleLogin} className="py-3 px-8 bg-[#00e699] text-white rounded-2xl font-bold shadow-lg">Google Մուտք</button>
                        </div>
                    )}

                    {messages.map((msg, index) => {
                        const isMe = msg.uid === user?.uid;
                        return (
                            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                                {!isMe && <img src={msg.photoURL} className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" alt="v" />}
                                <div className={`max-w-[75%] p-3.5 rounded-2xl text-[13px] shadow-sm ${isMe ? 'bg-[#00e699] text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                                    {!isMe && <p className="text-[9px] font-black mb-1 opacity-50 uppercase tracking-tighter">{msg.displayName}</p>}
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={scrollRef} />
                </div>

                <form onSubmit={sendMessage} className={`p-4 bg-white border-t border-gray-50 flex items-center gap-2 ${!user ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Գրեք հաղորդագրություն..."
                        className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#00e699] outline-none transition-all"
                    />
                    <button type="submit" className="bg-[#00e699] w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg hover:rotate-12 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;