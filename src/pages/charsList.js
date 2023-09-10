
import React, { useState, useEffect, useRef } from 'react';
import { useGetListsQuery } from '../redux/services/charAPI';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';


const CharsList = () => {
    const [allCharacters, setAllCharacters] = useState([]);
    const [records, setRecords] = useState([]);
    const [recordsbool, setRecordsbool] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const intervalRef = useRef(null);
    const { data: character, isLoading, isError, error } = useGetListsQuery(pageNumber);
    // --------------------------------------------------------------------------

    useEffect(() => {
        if (character) {
            setAllCharacters((prevCharacters) => [...prevCharacters, ...character.results]);
            if (character.info.next) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        }
    }, [character,]);
    // --------------------------------------------------------------------------

    const debouncedSearch = debounce((search) => {
        const searchCharacters = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
        );
        setRecords(searchCharacters);
        setRecordsbool(true);
        if (statusFilter) {
            setRecords(
                searchCharacters.filter((character) => character.status === statusFilter)
            );
        } else if (speciesFilter) {
            setRecords(
                searchCharacters.filter((character) => character.species === speciesFilter)
            );
        } else {
            setRecords(searchCharacters);
        }

    }, 2000);

    const changeHandler = (event) => {
        const search = event.target.value;
        setNameFilter(event.target.value)
        setSearchInput(search);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        debouncedSearch(search);
    };
    // --------------------------------------------------------------------------

    const changeStatusFilter = (event) => {
        setStatusFilter(event.target.value)
        const searchCharacters = allCharacters.filter((character) =>
            character.status === event.target.value
        );
        console.log(searchCharacters)
        setRecords(searchCharacters);
        console.log(records)
        setRecordsbool(true);
        if (nameFilter && speciesFilter) {
            setRecords(
                searchCharacters.filter(
                    (character) =>
                        character.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                        character.status === speciesFilter
                )
            );
        } else if (nameFilter) {
            setRecords(
                searchCharacters.filter((character) =>
                    character.name.toLowerCase().includes(nameFilter.toLowerCase())
                )
            );
        } else if (statusFilter) {
            setRecords(
                searchCharacters.filter((character) =>
                    character.status === statusFilter
                )
            );
        } else {
            setRecords(searchCharacters);
        }
    }
    // --------------------------------------------------------------------------

    const changeSpeciesFilter = (event) => {
        setSpeciesFilter(event.target.value)
        const searchCharacters = allCharacters.filter((character) =>
            character.species === event.target.value
        );
        setRecords(searchCharacters);
        setRecordsbool(true);
        if (nameFilter && statusFilter) {
            setRecords(
                searchCharacters.filter(
                    (character) =>
                        character.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                        character.status === statusFilter
                )
            );
        } else if (nameFilter) {
            setRecords(
                searchCharacters.filter((character) =>
                    character.name.toLowerCase().includes(nameFilter.toLowerCase())
                )
            );
        } else if (statusFilter) {
            setRecords(
                searchCharacters.filter((character) =>
                    character.status === statusFilter
                )
            );
        } else {
            setRecords(searchCharacters);
        }
    }
    // --------------------------------------------------------------------------
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.status}</div>;
    }
    // --------------------------------------------------------------------------

    return (
        <>
            <div>
                <div className='max-w-[90%]  mx-auto mt-14'>
                    <h1 className=' text-center text-6xl font-extrabold text-amber-500'>The Rick and Morty API</h1>
                    <div className="w-full max-w-screen-xl mx-auto px-6">
                        <div className="flex justify-center p-4 px-3 py-10">
                            <div className="w-full ">
                                <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                                    <div className="flex justify-between items-center j bg-gray-200 rounded-md">
                                        <div className='flex items-center align-middle'>
                                            <div className="pl-2">
                                                <svg className="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24">
                                                    <path className="heroicon-ui"
                                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                                </svg>
                                            </div>
                                            <input
                                                className=" w-80 rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                                id="search" type="text" placeholder="Search Character" onChange={changeHandler} value={searchInput} />
                                        </div>
                                        <div>
                                            <div className="relative inline-flex ">
                                                <select onChange={changeStatusFilter} id="status" class="text-gray-700 text-lg bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                                    <div className="py-3 text-sm flex flex-wrap justify-between">
                                        {recordsbool
                                            ? records.map((character) => (
                                                <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" key={character.id}>
                                                    <Link
                                                        to={`/character/${character.name}`}
                                                        state={{ data: character }}>
                                                        <div className='flex'>
                                                            <span className=" inline-block  bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                                            <div className="flex-grow font-medium px-2 w-[14rem]">{character.name}</div>
                                                        </div>
                                                    </Link>
                                                </div >
                                            ))
                                            : allCharacters.map((character) => (
                                                <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2" key={character.id}>
                                                    <Link
                                                        to={`/character/${character.name}`}
                                                        state={{ data: character }}>
                                                        <div className='flex'>
                                                            <span className=" inline-block bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                                            <div className="flex-grow font-medium px-2 w-[14rem]">{character.name}</div>
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
