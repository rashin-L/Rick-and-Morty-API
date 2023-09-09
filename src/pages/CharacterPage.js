import React from 'react';
import { useLocation } from 'react-router-dom';

const CharacterPage = () => {
    // const { id } = useParams();
    const location = useLocation();
    const data = location; // Access the props from the location state


    return (
        <div className='max-w-[90%] bg-slate-100 p-10 rounded-lg  mx-auto mt-14'>
            <div class=" flex w-full max-w-screen-xl mx-auto px-6">
                <div>
                    <h3 className=' text-center mb-3 text-3xl font-semibold text-zinc-700 p-5 bg-amber-500 rounded-lg'>{data.state.data.name}</h3>
                    <img className=' mr-11 w-full h-auto max-w-xl rounded-lg' srcset={data.state.data.image} alt={data.state.data.id}></img>
                </div>
                <div className=' ml-10  self-end'>
                    <table class="w-full rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class=" text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className=' text-sm'>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Species
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Gender
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-sm bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class=" text-sm px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.state.data.status}
                                </th>
                                <td class="px-6 py-4 text-sm">
                                    {data.state.data.species}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {data.state.data.gender}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            </div>
        </div>
    );
};

export default CharacterPage;