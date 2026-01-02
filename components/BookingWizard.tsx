import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { SERVICES, STYLISTS } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Calendar, User, Clock, Loader2, Sparkles } from 'lucide-react';
import { format, addDays, startOfToday, isSunday, isBefore, isSameDay, addMinutes, setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import confetti from 'canvas-confetti';

// --- Shared Animations ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

// --- Step 1: Services ---
const StepServices = () => {
  const { selectedService, setSelectedService } = useBooking();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SERVICES.map((service) => (
        <motion.div
          key={service.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedService(service.id)}
          className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-center gap-4 ${selectedService === service.id
            ? 'border-accent bg-accent/5'
            : 'border-gray-100 hover:border-accent/50 bg-white'
            }`}
        >
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={service.image} alt={service.name} className="object-cover w-full h-full" />
            {selectedService === service.id && (
              <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                <Check className="text-white w-8 h-8 drop-shadow-md" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-serif font-semibold text-dark text-lg">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.duration} mins</p>
            <p className="text-accent font-bold mt-1">₡{service.price.toLocaleString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- Step 2: Stylists ---
const StepStylists = () => {
  const { selectedStylist, setSelectedStylist } = useBooking();

  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ scale: 1.02, rotateX: 2 }}
        onClick={() => setSelectedStylist(null)}
        className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative overflow-hidden ${selectedStylist === null ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent/50 bg-white'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="text-accent w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-lg">Primera Disponible</h3>
            <p className="text-sm text-gray-500">Te asignaremos la estilista que esté libre antes.</p>
          </div>
          {selectedStylist === null && <div className="ml-auto text-accent"><Check size={24} /></div>}
        </div>
        <div className="absolute top-2 right-2 bg-accent text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
          Popular
        </div>
      </motion.div>

      {STYLISTS.map((stylist) => (
        <motion.div
          key={stylist.id}
          whileHover={{ scale: 1.02, rotateX: 2 }}
          onClick={() => setSelectedStylist(stylist.id)}
          className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedStylist === stylist.id ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent/50 bg-white'
            }`}
        >
          <img src={stylist.image} alt={stylist.name} className="w-16 h-16 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="font-serif font-semibold text-lg">{stylist.name}</h3>
            <p className="text-xs text-accent font-medium uppercase">{stylist.specialty}</p>
          </div>
          {selectedStylist === stylist.id && <div className="text-accent"><Check size={24} /></div>}
        </motion.div>
      ))}
    </div>
  );
};

// --- Step 3: Date & Time ---
const StepDateTime = () => {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  // Generate calendar days
  const daysInMonth = () => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];
    for (let d = 1; d <= end.getDate(); d++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }
    return days;
  };

  const availableSlots = (date: Date) => {
    // Generate all potential slots first
    const slots = [];
    // 8am to 10pm (22:00) range covers all requested blocks
    let current = setHours(setMinutes(date, 0), 8);
    const endOfDay = setHours(setMinutes(date, 0), 22);

    while (isBefore(current, endOfDay) || current.getTime() === endOfDay.getTime()) {
      const hour = current.getHours();

      // Filter based on requested blocks:
      // Morning: 8-12
      // Afternoon: 14-17 (2pm-5pm)
      // Night: 17-22 (5pm-10pm)
      let type = '';
      if (hour >= 8 && hour < 12) type = 'Mañana';
      else if (hour >= 14 && hour < 17) type = 'Tarde';
      else if (hour >= 17 && hour < 22) type = 'Noche';

      if (type) {
        // Mock occupancy
        const hash = current.toISOString() + 'salt';
        let hashNum = 0;
        for (let i = 0; i < hash.length; i++) hashNum += hash.charCodeAt(i);
        const isOccupied = hashNum % 3 === 0;

        slots.push({
          time: format(current, 'HH:mm'), // Keep 24h format for logic, display can be tweaked if needed, but keeping 24h is standard here unless requested otherwise (User said "no trabajemos en formato 24 horas" -> wait, user implies grouping? Or display format? "diga mañana : y de las 8 a las 12". I will group them). 
          // Ah, user said "no trabajemos en formato 24 horas". I should probably display 12h format? 
          // "si no que diga mañana : y de las 8 a las 12..."
          // I will update display to 12h format inside the buttons if possible, or just group them effectively. 
          // Let's use 12h format for display: 'h:mm a'
          displayTime: format(current, 'h:mm a'),
          available: !isOccupied,
          type
        });
      }
      current = addMinutes(current, 30); // 30 min intervals
    }
    return slots;
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const slots = selectedDate ? availableSlots(selectedDate) : [];
  const sections = ['Mañana', 'Tarde', 'Noche'];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} disabled={isBefore(currentMonth, new Date(today.getFullYear(), today.getMonth(), 1))} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30">
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-serif font-bold text-lg capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => <span key={d} className="text-gray-400 font-medium py-2">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysInMonth().map((date, idx) => {
          const isPast = isBefore(date, today);
          const isSun = isSunday(date);
          const disabled = isPast || isSun;
          const isSelected = selectedDate && isSameDay(date, selectedDate);

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
              className={`
                        aspect-square rounded-full flex items-center justify-center transition-all relative font-medium
                        ${isSelected ? 'bg-accent text-white shadow-lg scale-110' : ''}
                        ${!disabled && !isSelected ? 'hover:border-accent hover:border-2 hover:text-accent bg-white border border-transparent' : ''}
                        ${disabled ? 'text-gray-300 line-through cursor-not-allowed' : ''}
                    `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>

      {/* Slots */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-6 border-t border-gray-100 space-y-6"
          >
            {sections.map(section => {
              const sectionSlots = slots.filter(s => s.type === section);
              if (sectionSlots.length === 0) return null;

              return (
                <div key={section}>
                  <h4 className="font-serif font-medium mb-3 text-gray-500 flex items-center gap-2 text-sm uppercase tracking-wider">
                    {section === 'Mañana' && '🌅 Mañana'}
                    {section === 'Tarde' && '☀️ Tarde'}
                    {section === 'Noche' && '🌙 Noche'}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {sectionSlots.map((slot, idx) => (
                      <motion.button
                        key={slot.time}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.displayTime)}
                        className={`
                                        py-2 px-1 text-center rounded-lg text-xs font-semibold border transition-all truncate
                                        ${selectedTime === slot.displayTime
                            ? 'bg-accent border-accent text-white shadow-md'
                            : slot.available
                              ? 'bg-white border-gray-200 hover:border-accent hover:text-accent'
                              : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'}
                                    `}
                      >
                        {slot.displayTime}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )
            })}
            {slots.length === 0 && <p className="text-center text-gray-400 py-4">No hay horarios disponibles para este día.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Step 4: Details ---
const StepDetails = () => {
  const { clientData, setClientData } = useBooking();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof typeof clientData, value: any) => {
    setClientData({ ...clientData, [field]: value });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const errors = {
    name: touched.name && clientData.name.length < 3,
    phone: touched.phone && !/^\+506\s\d{4}-\d{4}$/.test(clientData.phone),
    email: touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)
  };

  // Auto-mask phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (val.startsWith('506')) val = val.substring(3); // Remove 506 if typed
    if (val.length > 8) val = val.substring(0, 8);

    let formatted = '';
    if (val.length > 0) formatted += '+506 ';
    if (val.length > 4) {
      formatted += val.substring(0, 4) + '-' + val.substring(4);
    } else {
      formatted += val;
    }
    handleChange('phone', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-accent transition-colors">
          <User size={20} />
        </div>
        <input
          type="text"
          value={clientData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Nombre Completo"
          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-accent'}`}
        />
        {errors.name && <span className="text-red-500 text-xs ml-4 mt-1">Mínimo 3 caracteres</span>}
      </div>

      <div className="relative group">
        <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-accent transition-colors">
          <span className="font-bold text-lg leading-none">#</span>
        </div>
        <input
          type="text"
          value={clientData.phone}
          onChange={handlePhoneChange}
          onBlur={() => handleBlur('phone')}
          placeholder="+506 8888-8888"
          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-accent'}`}
        />
        {errors.phone && <span className="text-red-500 text-xs ml-4 mt-1">Formato inválido</span>}
      </div>

      <div className="relative group">
        <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-accent transition-colors">
          <span className="font-bold">@</span>
        </div>
        <input
          type="email"
          value={clientData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="correo@ejemplo.com"
          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-accent'}`}
        />
        {errors.email && <span className="text-red-500 text-xs ml-4 mt-1">Email inválido</span>}
      </div>

      <div>
        <textarea
          value={clientData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          maxLength={200}
          placeholder="¿Alguna preferencia o comentario especial?"
          className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-accent outline-none min-h-[100px] resize-none"
        />
        <div className="text-right text-xs text-gray-400 mt-1">{clientData.notes.length}/200</div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${clientData.isFirstVisit ? 'bg-accent border-accent' : 'border-gray-300 group-hover:border-accent'}`}>
          {clientData.isFirstVisit && <Check size={16} className="text-white" />}
        </div>
        <input type="checkbox" className="hidden" checked={clientData.isFirstVisit} onChange={(e) => handleChange('isFirstVisit', e.target.checked)} />
        <span className="text-gray-600">Es mi primera visita</span>
      </label>
    </div>
  );
};

// --- Step 5: Confirmation ---
const StepConfirmation = () => {
  const { selectedService, selectedStylist, selectedDate, selectedTime, clientData, saveBooking, resetBooking } = useBooking();
  const [status, setStatus] = useState<'review' | 'loading' | 'success'>('review');
  const [confirmId, setConfirmId] = useState('');

  const service = SERVICES.find(s => s.id === selectedService);
  const stylist = STYLISTS.find(s => s.id === selectedStylist);

  const handleConfirm = () => {
    setStatus('loading');
    setTimeout(() => {
      const id = saveBooking();
      setConfirmId(id);
      setStatus('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F4C2C2', '#D4AF37', '#FAFAFA']
      });
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
        >
          <Check className="w-12 h-12 text-green-600" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-dark mb-2">¡Reserva Confirmada!</h3>
          <p className="text-gray-500 max-w-xs mx-auto">Tu cita ha sido agendada exitosamente.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 max-w-sm mx-auto">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Código de Reserva</p>
          <p className="font-mono text-xl font-bold text-dark">{confirmId}</p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>📧 Te enviamos un email a <span className="font-semibold">{clientData.email}</span></p>
          <p>📱 Recibirás un recordatorio 24h antes.</p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button className="w-full py-3 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-white transition-colors">
            Agregar a Google Calendar
          </button>
          <button onClick={resetBooking} className="text-gray-400 hover:text-dark text-sm underline">
            Hacer otra reserva
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-accent/30 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-accent" />

        <h3 className="font-serif font-bold text-xl mb-6 text-center">Resumen de Cita</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-start pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase">Servicio</p>
              <p className="font-semibold text-dark">{service?.name}</p>
              <p className="text-sm text-gray-500">{service?.duration} mins</p>
            </div>
            <p className="font-bold text-accent">₡{service?.price.toLocaleString()}</p>
          </div>

          <div className="flex justify-between pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase">Estilista</p>
              <p className="font-semibold text-dark">{stylist ? stylist.name : 'Primera Disponible'}</p>
            </div>
            {stylist && <img src={stylist.image} className="w-10 h-10 rounded-full object-cover" alt="" />}
          </div>

          <div className="flex justify-between pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase">Fecha y Hora</p>
              <p className="font-semibold text-dark capitalize">
                {selectedDate && format(selectedDate, 'EEEE d MMM, yyyy', { locale: es })}
              </p>
              <p className="text-accent font-bold">{selectedTime}</p>
            </div>
            <Calendar className="text-gray-300" />
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase mb-1">Cliente</p>
            <p className="font-medium text-dark">{clientData.name}</p>
            <p className="text-sm text-gray-500">{clientData.phone}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={status === 'loading'}
        className="w-full bg-accent text-white py-4 rounded-xl font-bold shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Confirmar Reserva'}
      </button>
    </div>
  );
};

// --- Main Wizard Component ---
export const BookingWizard = () => {
  const { step, setStep, selectedService, selectedStylist, selectedDate, selectedTime, clientData } = useBooking();
  const [direction, setDirection] = useState(0);
  const [shake, setShake] = useState(false);

  const canAdvance = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return selectedStylist !== undefined; // null is valid
    if (step === 3) return !!selectedDate && !!selectedTime;
    if (step === 4) {
      // Simple check, real logic inside component states but redundant check here for button
      return clientData.name.length >= 3 &&
        /^\+506\s\d{4}-\d{4}$/.test(clientData.phone) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email);
    }
    return true;
  };

  const handleNext = () => {
    if (canAdvance()) {
      setDirection(1);
      setStep((step + 1) as any);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((step - 1) as any);
  };

  return (
    <div id="booking-wizard" className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      {/* Header & Progress */}
      <div className="bg-gray-50 p-6 border-b border-gray-100">
        <div className="flex justify-between mb-8 relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0">
            <motion.div
              className="h-full bg-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (step - 1) / 4 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500
                    ${s < step ? 'bg-green-500 text-white' : s === step ? 'bg-accent text-white ring-4 ring-accent/20' : 'bg-gray-200 text-gray-400'}
                `}>
              {s < step ? <Check size={16} /> : s}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-serif text-center font-bold text-dark">
          {step === 1 && 'Selecciona tu Servicio'}
          {step === 2 && 'Elige a tu Profesional'}
          {step === 3 && 'Fecha y Hora'}
          {step === 4 && 'Tus Datos'}
          {step === 5 && 'Confirmación'}
        </h2>
      </div>

      {/* Content */}
      <div className={`flex-1 p-6 md:p-8 overflow-y-auto ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full"
          >
            {step === 1 && <StepServices />}
            {step === 2 && <StepStylists />}
            {step === 3 && <StepDateTime />}
            {step === 4 && <StepDetails />}
            {step === 5 && <StepConfirmation />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {step < 5 && (
        <div className="p-6 border-t border-gray-100 flex justify-between bg-white z-20">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={20} /> Atrás
          </button>
          <button
            onClick={handleNext}
            disabled={!canAdvance()}
            className="px-8 py-3 bg-dark text-white rounded-xl font-medium hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Siguiente <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
