
import React, { useState, useEffect, useRef } from 'react';
import { useGetListsQuery } from '../redux/services/charAPI';
import { Link } from 'react-router-dom';


const CharsList = () => {
    const [allCharacters, setAllCharacters] = useState([]);
    const [records, setRecords] = useState([]);
    const [recordsbool, setRecordsbool] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [statusFilter, setStatusFilter] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const intervalRef = useRef(null);

    const { data: character, isLoading, isError, error } = useGetListsQuery(pageNumber);

    useEffect(() => {
        if (character) {
            setAllCharacters((prevCharacters) => [...prevCharacters, ...character.results]);
            if (character.info.next) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        }
    }, [character,]);

    const changeHandler = (event) => {
        let search = event.target.value;
        setRecordsbool(true)
        setSearchInput(search);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            const searchCharacters = allCharacters.filter((character) =>
                character.name.includes(event.target.value)
            );
            setRecords(searchCharacters);
        }, 2000);
    };


    const changeStatusFilter = (event) => {
        setRecordsbool(true)
        setStatusFilter(event.target.value)
        setRecords(allCharacters.filter((character) =>
            character.status === event.target.value
        ));
        return allCharacters
    }

    const changeSpeciesFilter = (event) => {
        setRecordsbool(true)
        setStatusFilter(event.target.value)
        setRecords(allCharacters.filter((character) =>
            character.species === event.target.value
        ));
        return allCharacters
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.status}</div>;
    }
    return (
        <>
            <div>
                <div className='max-w-[90%]  mx-auto mt-14'>
                    <h1 className=' text-center text-6xl font-extrabold text-amber-500'>The Rick and Morty API</h1>
                    <div class="w-full max-w-screen-xl mx-auto px-6">
                        <div class="flex justify-center p-4 px-3 py-10">
                            <div class="w-full ">
                                <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">                                    
                                    <div class="flex justify-between items-center j bg-gray-200 rounded-md">
                                        <div className='flex items-center align-middle'>
                                            <div class="pl-2">
                                                <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24">
                                                    <path class="heroicon-ui"
                                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                                </svg>
                                            </div>
                                            <input
                                                class=" w-80 rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                                id="search" type="text" placeholder="Search Character" onChange={changeHandler} value={searchInput} />
                                        </div>
                                        <div>
                                            <div className="relative inline-flex ">
                                                <select onChange={changeStatusFilter} id="spice" class="text-gray-700 text-lg bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>select status</option>
                                                    <option value='Alive'>Alive</option>
                                                    <option value='Dead' >Dead </option>
                                                </select>
                                            </div>
                                            <div className="relative inline-flex">
                                                <select onChange={changeSpeciesFilter} id="spice" class="text-gray-700 text-lg bg-gray-50 border border-gray-300 ml-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>select species</option>
                                                    <option value='Human'>Human</option>
                                                    <option value='Alien'>Alien</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="py-3 text-sm flex flex-wrap justify-between">

                                        {recordsbool
                                            ? records.map((character) => (
                                                <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" key={character.id}>
                                                    <Link
                                                        to={`/character/${character.name}`}
                                                        state={{ data: character }}>
                                                        <div className='flex'>
                                                            <span class=" inline-block  bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                                            <div class="flex-grow font-medium px-2 w-[14rem]">{character.name}</div>
                                                        </div>
                                                    </Link>
                                                </div >
                                            ))
                                            : allCharacters.map((character) => (
                                                <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" key={character.id}>
                                                    <Link
                                                        to={`/character/${character.name}`}
                                                        state={{ data: character }}>
                                                        <div className='flex'>
                                                            <span class=" inline-block bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                                            <div class="flex-grow font-medium px-2 w-[14rem]">{character.name}</div>
                                                        </div>
                                                    </Link>
                                                </div >
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CharsList;
