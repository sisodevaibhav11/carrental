import React, { useState, useEffect } from 'react';
import { dummyMyBookingsData } from '../../assets/assets';
import { assets } from '../../assets/assets';
import Title from '../../components/owner/Title';

const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    // In a real app, this would be an API call
    setBookings(dummyMyBookingsData);
  };

  // Handler for changing status
  const handleStatusChange = (index, newStatus) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = newStatus;
    setBookings(updatedBookings);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel request, and manage booking status"
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className='text-gray-500 bg-gray-50'>
            <tr className="border-b border-gray-200">
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className='border-t border-borderColor text-gray-500 hover:bg-gray-50 transition-colors'>
                {/* Car Brand & Model */}
                <td className='p-3 flex items-center gap-3'>
                  <img
                    src={booking.car.image}
                    alt=""
                    className='h-12 w-12 aspect-square rounded-md object-cover bg-gray-100'
                  />
                  <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
                </td>

                {/* Date range splitting from snippet */}
                <td className='p-3 max-md:hidden'>
                  {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                </td>

                {/* Price Display */}
                <td className='p-3 font-medium text-gray-800'>{currency}{booking.price}</td>

                {/* Payment Method Badge */}
                <td className='p-3 max-md:hidden'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                </td>

                {/* Status Logic from snippet */}
                <td className='p-3'>
                  {booking.status === 'pending' ? (
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className='px-2 py-1.5 text-gray-500 border border-borderColor rounded-md outline-none bg-white cursor-pointer'
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                      }`}>
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;