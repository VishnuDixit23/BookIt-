
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_SLOTS = [
  {
    id: 'slot1',
    date: '2025-11-15',
    dateShort: 'Nov 15',
    times: [
      { id: 'time1', time: '09:00 AM', available: true },
      { id: 'time2', time: '11:00 AM', available: true },
      { id: 'time3', time: '01:00 PM', available: false },
    ],
  },
  {
    id: 'slot2',
    date: '2025-11-16',
    dateShort: 'Nov 16',
    times: [
      { id: 'time4', time: '09:00 AM', available: true },
      { id: 'time5', time: '11:00 AM', available: true },
    ],
  },
  {
    id: 'slot3',
    date: '2025-11-17',
    dateShort: 'Nov 17',
    times: [
      { id: 'time6', time: '10:00 AM', available: true },
    ],
  },
];

type BookingWidgetProps = {
  price: number;
};

const BookingWidget = ({ price }: BookingWidgetProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();

  const availableTimes = MOCK_SLOTS.find(
    (slot) => slot.date === selectedDate
  )?.times;

  const handleBooking = () => {
    navigate('/checkout');
  };

  return (
    <div className="border border-border-color rounded-lg shadow-lg p-6 sticky top-8">
      <h2 className="text-3xl font-bold text-text-dark">
        ${price}
        <span className="text-base font-normal text-text-light"> / person</span>
      </h2>

      <hr className="my-6 border-border-color" />
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-dark mb-3">Select Date</h3>
        <div className="flex flex-wrap gap-2">
          {MOCK_SLOTS.map((slot) => (
            <button
              key={slot.id}
              onClick={() => {
                setSelectedDate(slot.date);
                setSelectedTime(null);
              }}
              className={`px-4 py-2 rounded-md border text-sm font-medium
                ${selectedDate === slot.date
                  ? 'bg-primary-blue text-white border-primary-blue'
                  : 'bg-white text-text-dark border-border-color hover:bg-gray-50'
                }`}
            >
              {slot.dateShort}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text-dark mb-3">Select Time</h3>
          <div className="flex flex-wrap gap-2">
            {availableTimes?.length ? (
              availableTimes.map((time) => (
                <button
                  key={time.id}
                  onClick={() => setSelectedTime(time.id)}
                  disabled={!time.available}
                  className={`px-4 py-2 rounded-md border text-sm font-medium
                    ${selectedTime === time.id
                      ? 'bg-primary-blue text-white border-primary-blue'
                      : 'bg-white text-text-dark border-border-color'
                    }
                    ${!time.available
                      ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed'
                      : 'hover:bg-gray-50'
                    }`}
                >
                  {time.time}
                </button>
              ))
            ) : (
              <p className="text-sm text-text-light">No available times for this date.</p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTime} 
        className="w-full bg-primary-blue text-white font-bold py-3 rounded-md hover:bg-primary-dark transition-colors
          disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingWidget;