import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from "../../lib/firebase";
import { ref, push, onValue, set, onDisconnect, serverTimestamp } from "firebase/database";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const Chat = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [usersStatus, setUsersStatus] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [unreadCounts, setUnreadCounts] = useState({});
    
    const scrollRef = useRef();
    const notificationSound = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"));
    const prevMessagesCount = useRef({});

    const getChatId = (uid1, uid2) => {
        return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
    };

    const playNotificationSound = () => {
        notificationSound.current.currentTime = 0;
        notificationSound.current.play().catch(err => console.log("Ձայնի նվագարկման սխալ:", err));
    };

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try { await signInWithPopup(auth, provider); } catch (error) { console.error(error); }
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
                    uid: currentUser.uid
                });
                onDisconnect(userStatusRef).update({ state: "offline", last_changed: serverTimestamp() });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        const chatsRef = ref(db, "db/chats");
        const unsubNotifications = onValue(chatsRef, (snapshot) => {
            const allChats = snapshot.val();
            if (!allChats) return;

            let shouldPlaySound = false;
            
            setUnreadCounts(prevCounts => {
                const newCounts = { ...prevCounts };
                
                Object.keys(allChats).forEach(chatId => {
                    if (chatId.includes(user.uid)) {
                        const msgsArray = Object.values(allChats[chatId]);
                        const currentCount = msgsArray.length;
                        const lastMsg = msgsArray[currentCount - 1];
                        const otherUserId = lastMsg.uid;

                        if (prevMessagesCount.current[chatId] !== undefined) {
                            if (otherUserId !== user.uid && currentCount > prevMessagesCount.current[chatId]) {
                                if (selectedUser?.uid !== otherUserId) {
                                    newCounts[otherUserId] = (newCounts[otherUserId] || 0) + (currentCount - prevMessagesCount.current[chatId]);
                                    shouldPlaySound = true;
                                }
                            }
                        }
                        prevMessagesCount.current[chatId] = currentCount;
                    }
                });

                if (shouldPlaySound) {
                    playNotificationSound();
                }
                
                return newCounts;
            });
        });

        const statusRef = ref(db, "db/status");
        const unsubStatus = onValue(statusRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setUsersStatus(data);
        });

        return () => { unsubNotifications(); unsubStatus(); };
    }, [user, selectedUser]);

    useEffect(() => {
        if (selectedUser && user) {
            setUnreadCounts(prev => {
                const updated = { ...prev };
                delete updated[selectedUser.uid];
                return updated;
            });

            const chatId = getChatId(user.uid, selectedUser.uid);
            const chatRef = ref(db, `db/chats/${chatId}`);
            const unsubChat = onValue(chatRef, (snapshot) => {
                const data = snapshot.val();
                const msgs = data ? Object.values(data) : [];
                setMessages(msgs);
                prevMessagesCount.current[chatId] = msgs.length;
            });
            return () => unsubChat();
        }
    }, [selectedUser, user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !selectedUser) return;

        const chatId = getChatId(user.uid, selectedUser.uid);
        const chatRef = ref(db, `db/chats/${chatId}`);
        
        try {
            await push(chatRef, {
                text: newMessage,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                timestamp: serverTimestamp()
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Ժամանակի ֆորմատավորման ֆունկցիա
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 h-[85vh] antialiased">
            {/* Sidebar */}
            <div className="w-full md:w-80 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center text-gray-900">
                    <h3 className="font-black text-sm uppercase tracking-wider">Կոնտակտներ</h3>
                    {user && <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="" />}
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {Object.values(usersStatus)
                        .filter(u => u.uid !== user?.uid)
                        .map((u) => (
                        <div 
                            key={u.uid} 
                            onClick={() => setSelectedUser(u)}
                            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all relative ${selectedUser?.uid === u.uid ? 'bg-emerald-50 shadow-sm' : 'hover:bg-gray-50'}`}
                        >
                            <div className="relative">
                                <img src={u.photoURL} alt="user" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${u.state === 'online' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-800 truncate">{u.displayName}</p>
                                <p className="text-[11px] text-gray-400 capitalize">{u.state}</p>
                            </div>
                            {unreadCounts[u.uid] > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full">
                                    {unreadCounts[u.uid]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                {user && <button onClick={handleLogout} className="m-4 p-3 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black hover:bg-red-50 hover:text-red-500 transition-all">ԵԼՔ</button>}
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
                {selectedUser ? (
                    <>
                        <div className="bg-[#00e699] p-4 flex items-center gap-3 text-white">
                            <img src={selectedUser.photoURL} className="w-10 h-10 rounded-full border-2 border-white/30" alt="" />
                            <div>
                                <h2 className="font-bold text-lg leading-tight">{selectedUser.displayName}</h2>
                                <p className="text-xs opacity-90">{selectedUser.state === 'online' ? 'Առցանց' : 'Ոչ հասանելի'}</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30">
                            {messages.map((msg, index) => {
                                const isMe = msg.uid === user?.uid;
                                return (
                                    <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                                        {!isMe && <img src={msg.photoURL} className="w-7 h-7 rounded-full" alt="" />}
                                        <div className={`max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-[#00e699] text-white rounded-br-none' : 'bg-white text-gray-800 border rounded-bl-none'}`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1 px-1">
                                                {formatTime(msg.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={scrollRef} />
                        </div>

                        <form onSubmit={sendMessage} className="p-4 bg-white border-t flex items-center gap-2">
                            <input 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Գրեք հաղորդագրություն..."
                                className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-[#00e699] outline-none"
                            />
                            <button type="submit" className="bg-[#00e699] w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/10">
                         <h3 className="font-bold text-gray-900 mb-1">Ընտրեք օգտատեր</h3>
                         <p className="text-sm">Սեղմեք կոնտակտի վրա՝ նամակագրությունը սկսելու համար։</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;