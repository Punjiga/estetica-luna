import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BookingStep, ClientData, Booking } from '../types';

interface BookingContextType {
  step: BookingStep;
  setStep: (step: BookingStep) => void;
  selectedService: string | null;
  setSelectedService: (id: string) => void;
  selectedStylist: string | null;
  setSelectedStylist: (id: string | null) => void; // null means "First Available"
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  clientData: ClientData;
  setClientData: (data: ClientData) => void;
  resetBooking: () => void;
  saveBooking: () => string; // Returns confirmation number
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    isFirstVisit: false,
  });

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientData({
      name: '',
      phone: '',
      email: '',
      notes: '',
      isFirstVisit: false,
    });
  };

  const saveBooking = () => {
    const confirmationNumber = `#EST-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newBooking: Booking = {
      id: confirmationNumber,
      serviceId: selectedService!,
      stylistId: selectedStylist || 'any',
      date: selectedDate!,
      time: selectedTime!,
      client: clientData,
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem('estetica_bookings') || '[]');
    localStorage.setItem('estetica_bookings', JSON.stringify([...existingBookings, newBooking]));

    return confirmationNumber;
  };

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        selectedService,
        setSelectedService,
        selectedStylist,
        setSelectedStylist,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        clientData,
        setClientData,
        resetBooking,
        saveBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
