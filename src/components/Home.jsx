import React, { useState } from 'react';
import { BsPencil, BsPlus, BsXLg } from 'react-icons/bs';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../hooks/useTitle';

const Home = () => {
    useTitle('Home')
    const loadedChocolate = useLoaderData();
    const [chocolates, setChocolates] = useState(loadedChocolate);

    const handleDelete = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/chocolates/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )

                            const remaining = chocolates.filter(chocolate => chocolate._id !== id)
                            setChocolates(remaining);
                        }
                    })
            }
        })



    }
    return (
        <div className='mt-10'>
            <Link to='/add-chocolate' className='btn btn-ghost -ml-3 border outline outline-1 outline-base-300'><BsPlus className='text-2xl mr-1'></BsPlus> New Chocolate 🍫</Link>

            <div className="overflow-x-auto mt-10">
                <table className="table w-full text-center ">
                    <thead>
                        <tr>
                            <th className='bg-[#EAD5C4] py-5 rounded-s-lg'>Image</th>
                            <th className='bg-[#EAD5C4] py-5'>Name</th>
                            <th className='bg-[#EAD5C4] py-5'>Country/Factory</th>
                            <th className='bg-[#EAD5C4] py-5'>Category</th>
                            <th className='bg-[#EAD5C4] py-5 rounded-e-lg'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='px-'>
                        {
                            chocolates.map(chocolate => <tr key={chocolate._id}>
                                <td><img className='ml-5 h-20 w20
                                 rounded' src={chocolate.photo} alt="" /></td>
                                <td>{chocolate.name}</td>
                                <td>{chocolate.country}</td>
                                <td>{chocolate.category}</td>
                                <td><div>
                                    <Link to={`/update-chocolate/${chocolate._id}`} className='btn btn-ghost bg-[#ead5c4] me-5'><BsPencil className='text-xl text-[#774320]'></BsPencil></Link>
                                    <button onClick={() => handleDelete(chocolate._id)} className='btn btn-ghost bg-[#ead5c4]'><BsXLg className='text-xl text-[#774320]'></BsXLg></button>

                                </div></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;