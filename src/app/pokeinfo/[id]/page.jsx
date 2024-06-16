"use client"

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Pokeinfo() {

    const params = useParams();
    const [poke, setPoke] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const fetchPokeDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
                const PokeData = await response.json();
                setPoke(PokeData);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        if (params.id) {
            fetchPokeDetails();
        }

    }, [params.id])

    return (
        <div className='p-24'>
            <Link href='/' className='bg-blue-500 text-white p-3 rounded-md'>Go Back</Link>
            <section className='flex justify-center items-center mt-10 text-center'>
                <div className='shadow-md p-10 rounded-md'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {poke.name && (
                                <>
                                    <h3 className='text-3xl'>{poke.name}</h3>
                                    <Image src={poke.sprites?.other?.['official-artwork']?.front_default || '/placeholder.png'} width={300} height={300} alt={poke.name} />

                                    <div className='mt-5'>
                                        <p className='py-3'>Height: {poke.height} </p>
                                        <p>Weigth: {poke.weight} </p>
                                        <p className='py-3'>
                                            Abilities: {poke.abilities?.map(val => (
                                                <span key={val.ability.name} 
                                                    className='bg-gray-500 text-white px-3 py-1 rounded-md me-1'>
                                                    {val.ability.name}    
                                                </span>
                                            ))}
                                            
                                        </p>
                                        <p className='py-3'>
                                            Types: {poke.types?.map(val => (
                                                <span key={val.type.name} 
                                                    className='bg-gray-500 text-white px-3 py-1 rounded-md me-1'>
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