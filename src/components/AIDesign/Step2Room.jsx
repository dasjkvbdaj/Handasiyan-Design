import React from 'react';
import {
    Utensils, Sofa, Briefcase, Bed,
    Bath, Coffee, Book, Gamepad2,
    Monitor, Warehouse, ArrowRight,
    Home, Baby, Dumbbell, Car
} from 'lucide-react';

const rooms = [
    { id: 'living', name: 'Living Room', icon: Sofa },
    { id: 'bedroom', name: 'Bedroom', icon: Bed },
    { id: 'kitchen', name: 'Kitchen', icon: Utensils },
    { id: 'bathroom', name: 'Bathroom', icon: Bath },
    { id: 'office', name: 'Home Office', icon: Monitor },
    { id: 'dining', name: 'Dining Room', icon: Utensils },
    { id: 'study', name: 'Study Room', icon: Book },
    { id: 'gaming', name: 'Gaming Room', icon: Gamepad2 },
    { id: 'coffee', name: 'Coffee Shop', icon: Coffee },
    { id: 'restaurant', name: 'Restaurant', icon: Warehouse },
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
                {rooms.map((room) => {
                    const Icon = room.icon;
                    const isSelected = data.roomType === room.id;
                    return (
                        <button
                            key={room.id}
                            onClick={() => updateData({ roomType: room.id })}
                            className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border backdrop-blur-sm group ${isSelected
                                ? 'bg-[#d4af37]/20 border-[#d4af37] text-white'
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-[#d4af37] text-black' : 'bg-white/10 text-white/40 group-hover:text-white'
                                }`}>
                                <Icon size={22} />
                            </div>
                            <span className="font-medium text-left">{room.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8">
                <button
                    disabled={!data.roomType}
                    onClick={onNext}
                    className={`px-12 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${data.roomType
                        ? 'bg-[#d4af37] text-black hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                        }`}
                >
                    Continue
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Step2Room;
