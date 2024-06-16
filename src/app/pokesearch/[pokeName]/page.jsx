"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PokeSearch() {

    const params = useParams();
    const [pokeData, setPokeData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPokeData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`);
                const resData = await response.json();
                setPokeData(resData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        if (params.pokeName) {
            fetchPokeData();
        }
    }, [params.pokeName]);

    return (
        <div className='p-24'>
            <Link href='/' className='bg-blue-500 text-white p-3 rounded-md'>Go Back</Link>
            <section className='flex justify-center items-center mt-10 text-center'>
                <div className='shadow-md p-10 rounded-md'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {pokeData.name && (
                                <>
                                    <h3 className="text-3xl">{pokeData.name}</h3>
                                    <Image src={pokeData.sprites?.other?.['official-artwork']?.front_default || '/placeholder.png'} width={300} height={300} alt={pokeData.name} />
                                    <div className="mt-5">
                                        <p className="py-3">Height: {pokeData.height}</p>
                                        <p>Weight: {pokeData.weight}</p>
                                        <p className="py-3">
                                            Abilities: {pokeData.abilities?.map(val => (
                                                <span key={val.ability.name} className="bg-gray-500 text-white px-3 py-1 rounded-md me-1">
                                                    {val.ability.name}
                                                </span>
                                            ))}
                                        </p>
                                        <p className="py-3">
                                            Types: {pokeData.types?.map(val => (
                                                <span key={val.type.name} className="bg-gray-500 text-white px-3 py-1 rounded-md me-1">
                                                    {val.type.name}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}