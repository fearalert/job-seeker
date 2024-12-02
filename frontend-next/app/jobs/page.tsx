"use client";

import { Navbar } from '@/components/navbar/Navbar';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";

const JobsPage = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedNiche, setSelectedNiche] = useState("");
    const [salaryRange, setSalaryRange] = useState([0, 10000000]);

    // Update the handler type to match the expected slider value change handler
    const handleSalaryChange = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setSalaryRange(newValue);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex flex-row px-24 max-w-6xl gap-8'>
                <aside>
                    <h3>Filter area</h3>

                    <div className='my-4'>
                        <h4 className='text-lg font-semibold'>Salary Range</h4>
                        <Slider
                            value={salaryRange}
                            onChange={() => handleSalaryChange}
                            min={0}
                            max={1000000}
                            step={10000}
                            className='w-full'
                        />
                        <div className='flex justify-between mt-2'>
                            <span>{`$${salaryRange[0].toLocaleString()}`}</span>
                            <span>{`$${salaryRange[1].toLocaleString()}`}</span>
                        </div>
                    </div>
                    {/* Add filter options like city, niche, etc., here */}
                </aside>
                <section className='flex flex-col'>
                    <Input
                        placeholder='Search Here ...'
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className='w-full min-w-[500px] bg-zinc-200 border-none rounded-lg mb-4'
                    />
                    
                    {/* Jobs Card Display Section */}
                    <div>
                        {/* Display jobs that match the filters */}
                    </div>
                </section>
            </div>
        </>
    );
};

export default JobsPage;
