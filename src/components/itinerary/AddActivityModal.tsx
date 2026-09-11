import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { ItineraryActivity } from '../../types';
import { ACTIVITY_TYPES } from '../../utils/constants';

interface AddActivityModalProps {
  dayNumber: number;
  currency: string;
  onClose: () => void;
  onAdd: (newActivity: ItineraryActivity) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  dayNumber,
  currency,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('walking-tours');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(90);
  const [cost, setCost] = useState(15);
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('02:00 PM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newAct: ItineraryActivity = {
      id: `custom-act-${Date.now()}`,
      title,
      category,
      description: description || 'Custom traveler experience added to the schedule.',
      duration: Number(duration),
      estimatedCost: Number(cost),
      location: location || 'Central Destination Area',
      recommendedTime: time,
      difficultyLevel: 'easy',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
      tags: ['Custom', 'Personalized'],
      isFavorite: false,
    };

    onAdd(newAct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#F5EBDD] max-w-md w-full overflow-hidden flex flex-col shadow-2xl text-left">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
              Day {dayNumber}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#12372A]">
              Add Custom Experience
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Activity Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunset Boat Cruise, Street Food Crawl..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs font-semibold"
              >
                {ACTIVITY_TYPES.map((act) => (
                  <option key={act.id} value={act.id}>
                    {act.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="02:30 PM"
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs"
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min={15}
                max={480}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Est. Cost ({currency})
              </label>
              <input
                type="number"
                min={0}
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Location / Area</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Seminyak Beach, Old Town..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Short Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any personal notes, reservation times, or tips..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Add to Day</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
