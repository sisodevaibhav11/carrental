import React, { useEffect, useState } from 'react';
import { dummyMyBookingsData } from '../assets/assets';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchMyBookings = async () => {
    // In a real app, you'd fetch from an API here
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto'>
      <Title title="My Bookings" subTitle="View and manage your bookings" align="left" />

      <div className='flex flex-col gap-5 mt-12'>
        {bookings.map((booking, index) => (
          <div key={booking._id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg">
            
            {/* Column 1: Car Image & Info */}
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover' />
              </div>
              <p className='text-lg font-medium mt-2'>{booking.car.brand} {booking.car.model}</p>
              <p className='text-gray-500'>{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
            </div>

            {/* Column 2 & 3: Booking Details (Spanning 2 columns for better spacing) */}
            <div className='md:col-span-2 flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded'>Booking #{index + 1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600' : 'bg-red-400/15 text-red-600'}`}>
                  {booking.status}
                </p>
              </div>

              <div className='flex items-start gap-2 mt-2'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-500 leading-none'>Rental Period</p>
                  <p className='mt-1'>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <img src={assets.location_icon} alt="" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-500 leading-none'>Pick-up Location</p>
                  <p className='mt-1'>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* Column 4: Payment Info */}
            <div className='md:col-span-1 flex flex-col justify-between items-end text-right'>
              <div className='text-sm text-gray-500'>
                <p>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>{currency}{booking.price}</h1>
                <p className='mt-2'>Booked on {booking.createdAt.split('T')[0]}</p>
              </div>
              {/* You could add a "Cancel" or "Details" button here later */}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;