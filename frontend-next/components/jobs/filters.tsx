/** @format */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedNiche: string;
  setSelectedNiche: (value: string) => void;
  salaryRange: [number, number];
  setSalaryRange: (value: [number, number]) => void;
  cities: string[];
  niches: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedCity,
  setSelectedCity,
  selectedNiche,
  setSelectedNiche,
  salaryRange,
  setSalaryRange,
  cities,
  niches,
}) => {
  const [openSection, setOpenSection] = useState<string | null>('City');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md sticky top-8 h-fit">
      {/* Filter Header */}
      <h2 className="text-xl font-bold text-primary mb-4">Filters</h2>

      {/* City Filter */}
      <div className="mb-4">
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center px-2 py-2 font-semibold text-left text-gray-700 dark:text-gray-200"
          onClick={() => toggleSection('City')}>
          City
          {openSection === 'City' ? <ChevronUp /> : <ChevronDown />}
        </Button>
        <AnimatePresence>
          {openSection === 'City' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border rounded-lg bg-zinc-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                {cities.map((city) => (
                  <option
                    key={city}
                    value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Niche Filter */}
      <div className="mb-4">
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center px-2 py-2 font-semibold text-left text-gray-700 dark:text-gray-200"
          onClick={() => toggleSection('Niche')}>
          Niche
          {openSection === 'Niche' ? <ChevronUp /> : <ChevronDown />}
        </Button>
        <AnimatePresence>
          {openSection === 'Niche' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2">
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full p-2 border rounded-lg bg-zinc-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                {niches.map((niche) => (
                  <option
                    key={niche}
                    value={niche}>
                    {niche === 'all' ? 'All Niches' : niche}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-4">
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center px-2 py-2 font-semibold text-left text-gray-700 dark:text-gray-200"
          onClick={() => toggleSection('Salary')}>
          Salary Range
          {openSection === 'Salary' ? <ChevronUp /> : <ChevronDown />}
        </Button>
        <AnimatePresence>
          {openSection === 'Salary' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2">
              <div className="flex justify-between mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <span>Rs. {salaryRange[0].toLocaleString()}</span>
                <span>Rs. {salaryRange[1].toLocaleString()}</span>
              </div>
              <Slider
                value={salaryRange}
                min={0}
                max={500000}
                step={1000}
                onValueChange={(value) =>
                  setSalaryRange(value as [number, number])
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full mt-4 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-all"
        onClick={() => {
          setSelectedCity('all');
          setSelectedNiche('all');
          setSalaryRange([0, 300000]);
        }}>
        Reset Filters
      </Button>
    </aside>
  );
};

export default Filters;
