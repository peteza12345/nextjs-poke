"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

function Header() {

    const router = useRouter();
    const [pokeName, setPokeName] = useState("");

    const handleInput = (e) => {
        setPokeName(e.target.value);
    };

    const handleFrom = (e) => {
        e.preventDefault();
        
        router.push(`/pokesearch/${pokeName}`);
    };

    return (
        <header className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px] flex justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-white text-5xl mb-3'>Next-JS Pokemon Finder App</h1>
                <p className='text-white text-2xl'>Find Your favorite Pokemon</p>

                <form onSubmit={handleFrom} className='flex mt-2'>
                    <input onChange={handleInput} 
                        type="text" name="search" id="search" 
                        className='w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-md outline-none'
                        placeholder='Ppkemon Name...'
                    />

                    <button type='submit' className='inline-flex items-center mx-2 px-4 py-2 rounded-md bg-green-500 text-white shadow-md'>
                        Search
                    </button>

                </form>

            </div>
        </header>
    )
}

export default Header