import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await CustomBaseUrl.get("/std/room");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".room-card",
      { opacity: 0, y:-30,  },
      { 
        opacity: 1, 
        y: 0, 
      
        duration: 1, 
        stagger: 0.5, 
        ease:'expo.inOut' 
      }
    );
  }, [rooms]);


  useEffect(() => {
    const roomCards = document.querySelectorAll(".room-card");

    roomCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.5)",
          duration: 0.3,
          ease: "power2.out",
          repeat: 1,
          yoyo: true,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      roomCards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, [rooms]);

  return (
    <div className="outpass min-h-screen">
      <div className="mx-auto bg-black min-h-screen bg-opacity-45 md:pt-24 p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Room List</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer">
          {rooms.map((room) => (
            <div
              key={room.roomNo}
              className="room-card border border-gray-600 p-4 rounded-lg shadow-lg min-h-[200px] min-w-[200px] flex flex-col justify-start bg-gray-300 transition-transform transform-gpu"
            >
              <h3 className="text-lg font-semibold text-center">Room {room.roomNo}</h3>
              <ul className="mt-3 space-y-2">
                {room.students.map((student, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-black text-lg font-normal">{student}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
