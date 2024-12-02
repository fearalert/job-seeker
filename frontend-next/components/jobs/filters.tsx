import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import React from 'react'
import { Label } from '../ui/label';

interface FiltersProps {
    selectedCity: string; // Currently selected city
    setSelectedCity: (city: string) => void; // Callback to update city
    selectedNiche: string; // Currently selected niche
    setSelectedNiche: (niche: string) => void; // Callback to update niche
    salaryRange: [number, number]; // Selected salary range
    setSalaryRange: (range: [number, number]) => void; // Callback to update salary range
    cities: string[]; // List of available cities
    niches: string[]; // List of available niches
  }
  
  const Filters = ({
    selectedCity,
    setSelectedCity,
    selectedNiche,
    setSelectedNiche,
    salaryRange,
    setSalaryRange,
    cities,
    niches}: FiltersProps) => {
  return (
    <aside className="w-full md:w-[300px] hidden md:block bg-secondary/10 rounded-lg p-6 mb-6 md:mb-0">
    <h3 className="font-semibold text-lg text-center text-primary mb-6">
      Job Filters
    </h3>

    <div className="space-y-6">
      {/* City Filter */}
      <div className="space-y-2">
      <p className="text-sm font-medium">Loaction</p>
      <Select
        value={selectedCity}
        onValueChange={(value: string) => setSelectedCity(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter By City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>

      {/* Niche Filter */}
      <div className="space-y-2">
      <p className="text-sm font-medium">Niches</p>
      <Select
        value={selectedNiche}
        onValueChange={(value: string) => setSelectedNiche(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter By Niche" />
        </SelectTrigger>
        <SelectContent>
          {niches.map((niche) => (
            <SelectItem key={niche} value={niche}>
              {niche}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>

      {/* Salary Range Slider */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Salary Range (NRS.)</p>
        <Slider
          value={salaryRange}
          onValueChange={(values: [number, number]) =>
            setSalaryRange(values)
          }
          min={0}
          max={300000}
          step={1000}
          minStepsBetweenThumbs={1}
        />
        <div className="flex justify-between text-xs">
          <span>0</span>
          <span>100k</span>
          <span>200k</span>
          <span>300k</span>
        </div>
      </div>
    </div>
  </aside>
  )
}

export default Filters