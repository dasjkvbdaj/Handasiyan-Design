import React from 'react';
import {
    Utensils, Sofa, Bed,
    Bath, Coffee, Book, Gamepad2,
    Monitor, Warehouse, ArrowRight,
    Baby, Dumbbell, Home,
    Briefcase, Box, Droplets, Sun, Maximize, Flower2, Layers
} from 'lucide-react';

const rooms = [
    { id: 'living', name: 'Living Room', icon: Sofa },
    { id: 'bedroom', name: 'Bedroom', icon: Bed },
    { id: 'kitchen', name: 'Kitchen', icon: Utensils },
    { id: 'bathroom', name: 'Bathroom', icon: Bath },
    { id: 'office', name: 'Home Office', icon: Monitor },
    { id: 'dining', name: 'Dining Room', icon: Home }, // ✅ changed icon
    { id: 'study', name: 'Study Room', icon: Book },
    { id: 'gaming', name: 'Gaming Room', icon: Gamepad2 },
    { id: 'coffee', name: 'Coffee Shop', icon: Coffee },
    { id: 'restaurant', name: 'Restaurant', icon: Warehouse },
    { id: 'office_comm', name: 'Office', icon: Briefcase },
    { id: 'attic', name: 'Attic', icon: Box },
    { id: 'toilet', name: 'Toilet', icon: Droplets },
    { id: 'balcony', name: 'Balcony', icon: Sun },
    { id: 'hall', name: 'Hall', icon: Maximize },
    { id: 'garden', name: 'Garden', icon: Flower2 },
    { id: 'deck', name: 'Deck', icon: Layers },
    { id: 'gym', name: 'Home Gym', icon: Dumbbell },
    { id: 'nursery', name: 'Nursery', icon: Baby },
];

const Step2Room = ({ onNext, data, updateData }) => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Choose Room</h2>
                <p className="text-white/60">Select a room to design and see it transformed</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 max-w-5xl mx-auto px-2 sm:px-4">
                {rooms.map((room) => {
                    const Icon = room.icon;
                    const isSelected = data.roomType === room.id;

                    return (
                        <button
                            type="button" 
                            key={room.id}
                            onClick={() => updateData({ roomType: room.id })}
                            className={`flex items-center gap-2 sm:gap-4 p-2.5 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 border backdrop-blur-sm group w-full ${
                                isSelected
                                    ? 'bg-[#d4af37]/20 border-[#d4af37] text-white scale-[1.02] sm:scale-105'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            <div
                                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors shrink-0 ${
                                    isSelected
                                        ? 'bg-[#d4af37] text-black'
                                        : 'bg-white/10 text-white/40 group-hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>

                            <span className="font-medium text-left text-xs sm:text-base line-clamp-1 sm:line-clamp-none leading-tight">
                                {room.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Step2Room;