"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function PokeData() {

    const [poke, setPoke] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchPokeData = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon');
                const PokeData = await response.json();
                setPoke(PokeData.results);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        fetchPokeData();

    }, []);

    return (
        <main className='container text-center mx-auto'>
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className='grid grid-cols-5'>
                    {poke.map((val, index) => (
                        <Link key={val.name} href={`/pokeinfo/[id]`} as={`pokeinfo/${index + 1}`}>
                            <section key={index} className='flex justify-center items-center shadow-md transition cursor-pointer hover:shadow-lg m-3 rounded-md'>
                                <div>
                                    <h3>{val.name}</h3>
                                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} width={150} height={150} alt={val.name} />
                                </div>
                            </section>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    )
}