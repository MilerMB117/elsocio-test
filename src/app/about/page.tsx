import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Author: React.FC = () => {
    // Información estática del autor
    const name = "Miler Menjure Barrera";
    const bio = "System Engineer and Frontend Developer";
    const avatar = "/avatar.webp"; 

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8 md:mt-12"> 
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                            <Image src={avatar} alt={name} layout="fill" objectFit="contain" className="rounded-full" />
                        </div>
                    </div>
                    <div className="md:w-2/3 md:ml-8">
                        <h1 className="text-3xl font-bold mb-2">{name}</h1>
                        <p className="text-gray-700 text-lg mb-4">{bio}</p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/MilerMB117" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaGithub className="w-6 h-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/miler-yesid-menjure-barrera-923b05129/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;
