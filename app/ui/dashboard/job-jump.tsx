"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import {
    ArrowRightEndOnRectangleIcon
  } from '@heroicons/react/24/outline';

const JobJump: React.FC = () => {
    const [jobId, setJobId] = useState('');
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobId(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (jobId) {
            router.push(`/jobs/${jobId}`)
        }
    };

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm text-sm font-medium">
            <div className="flex p-4">
            <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-gray-700" />
        <h3 className="ml-2 text-sm font-medium">Quick Job Jump</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="jobId"
                    value={jobId}
                    onChange={handleInputChange}
                    className="ml-2"
                />
                <button type="submit" className="ml-2">Go</button>
            </form>
            </div>

        </div>
    );
};

export default JobJump;