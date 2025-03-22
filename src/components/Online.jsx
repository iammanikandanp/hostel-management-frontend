import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const Online = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true); 

      gsap.fromTo(
        messageRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 20,
          delay: 3, 
          duration: 1,
          onComplete: () => setShowOnlineMessage(false), 
        }
      );
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false); 

      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      ref={messageRef}
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 rounded-md font-bold text-white transition-all duration-500 ${
        isOnline && showOnlineMessage ? "bg-green-600" : !isOnline ? "bg-red-600" : "hidden"
      }`}
    >
      {isOnline && showOnlineMessage ? "You are back online!" : "You are offline!"}
    </div>
  );
};
