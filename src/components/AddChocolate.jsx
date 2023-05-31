import React from 'react';
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../hooks/useTitle';

const AddChocolate = () => {
    useTitle('Add Chocolate')
    const handleAdd = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const country = form.country.value;
        const category = form.category.value;
        const photo = form.photo.value;

        const chocolate = {
            name,
            country,
            category,
            photo,
        }

        fetch('http://localhost:5000/chocolates', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(chocolate)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Inserted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    form.reset();
                }
            })
    }
    return (
        <div className='mt-10'>
            <Link to='/' className='btn btn-ghost -ml-3'><BsArrowLeft className='text-2xl mr-1'></BsArrowLeft> All Chocolates</Link>
            <hr className='my-5 block' />
            <div className='bg-base-200 px-24 py-10 rounded-lg'>
                <h2 className='text-center font-bold text-3xl'>New Chocolates</h2>
                <p className='text-center text-gray-500 my-3'>Use the below form to create a new product</p>
                <form onSubmit={handleAdd}>

                    <label className='block font-semibold text-lg mb-1'>Name</label>
                    <input type="text" name='name' placeholder="Enter Chocolate Name" className="input input-bordered w-full font-semibold" />

                    <label className='block font-semibold text-lg mb-1'>Country</label>
                    <input type="text" name='country' placeholder="Enter Country Name" className="input input-bordered w-full font-semibold" />

                    <label className='block font-semibold text-lg mb-1'>Category</label>
                    <select defaultValue='Premium' name='category' className="select select-bordered w-full">
                        <option value='Premium'>Premium</option>
                        <option value='Standard'>Standard</option>
                        <option value='Basic'>Basic</option>
                    </select>

                    <label className='block font-semibold text-lg mb-1'>Photo</label>
                    <input type="text" name='photo' placeholder="Enter Photo URL" className="input input-bordered w-full font-semibold" />

                    <input className='btn btn-ghost bg-[#91572B] text-white w-full mt-5 hover:bg-[#b37b51]' type="submit" value="Save" />

                </form>
            </div>
        </div>
    );
};

export default AddChocolate;