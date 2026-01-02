import React, { useState, useEffect } from 'react';
import { BookingProvider } from './context/BookingContext';
import { Hero, Services, Staff, Gallery, Testimonials, Contact } from './components/Sections';
import { BookingWizard } from './components/BookingWizard';
import { Menu, X, Scissors } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#home' },
        { name: 'Servicios', href: '#services' },
        { name: 'Equipo', href: '#team' },
        { name: 'Galería', href: '#gallery' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className={`font-serif text-2xl font-bold flex items-center gap-2 ${isScrolled ? 'text-dark' : 'text-white'} group`}>
                    <img src="/logo.png" alt="Estética Luna" className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110" />
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium relative group ${isScrolled ? 'text-gray-600' : 'text-gray-100'} hover:text-accent transition-colors`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <a
                        href="#booking-section"
                        className="relative overflow-hidden bg-accent text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md group"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Reservar Cita</span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#b5952f]/80"></div>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center space-y-8 h-[100dvh]"
                    >
                        <button className="absolute top-6 right-6 text-white hover:text-accent" onClick={() => setIsOpen(false)}>
                            <X size={32} />
                        </button>
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="font-serif text-3xl font-bold text-white hover:text-accent"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            href="#booking-section"
                            onClick={() => setIsOpen(false)}
                            className="mt-8 bg-accent text-white px-10 py-4 rounded-full text-xl font-bold"
                        >
                            Reservar Ahora
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => {
    const [showPolicy, setShowPolicy] = useState(false);

    return (
        <footer className="bg-dark text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-12">
                    <div>
                        <div
                            className="flex items-center gap-2 mb-4 cursor-pointer group"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <img src="/logo.png" alt="Estética Luna" className="h-14 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="font-serif text-2xl font-bold group-hover:text-accent transition-colors">Estética Luna</h3>
                        </div>
                        <p className="text-gray-400">Tu destino de belleza en Cartago. Expertos en realzar tu esencia natural con los mejores productos y técnicas.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
                        <ul className="space-y-3 text-gray-400">
                            {['Servicios', 'Equipo', 'Galería', 'Reservar Cita', 'Contacto'].map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-accent hover:pl-2 transition-all duration-300 inline-block">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contáctanos</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>
                                <a href="tel:+50622223333" className="hover:text-accent transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="group-hover:translate-x-1 transition-transform">+506 2222-3333</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@esteticaluna.cr" className="hover:text-accent transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="group-hover:translate-x-1 transition-transform">info@esteticaluna.cr</span>
                                </a>
                            </li>
                            <li>
                                <span className="hover:text-accent transition-colors duration-300 cursor-default block hover:translate-x-1 transition-transform">Cartago Centro, Costa Rica</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 Estética Luna - Todos los derechos reservados</p>
                    <a
                        href="https://srstudio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent font-bold uppercase tracking-wider text-xs border-b border-transparent hover:border-accent transition-all duration-300 pb-0.5"
                    >
                        Realizado por SR STUDIO
                    </a>
                </div>
            </div>

            <AnimatePresence>
                {showPolicy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setShowPolicy(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white text-dark p-8 rounded-2xl max-w-md relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="font-serif text-2xl font-bold mb-4">Política de Cancelación</h3>
                            <div className="max-h-[60vh] overflow-y-auto space-y-4 text-gray-600">
                                <p>Entendemos que pueden surgir imprevistos. Para respetar el tiempo de nuestras estilistas y otros clientes, solicitamos seguir estas pautas:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Las citas deben cancelarse con al menos <strong>24 horas</strong> de anticipación.</li>
                                    <li>Cancelaciones con menos tiempo podrían aplicar un cargo del 50% en tu próxima visita.</li>
                                    <li>Si llegas más de 15 minutos tarde, tu cita podría ser reprogramada o acortada.</li>
                                </ul>
                                <p className="text-sm mt-4 bg-gray-100 p-3 rounded-lg">Para reagendar o cancelar, contacta al +506 2222-3333 o responde al email de confirmación.</p>
                            </div>
                            <button onClick={() => setShowPolicy(false)} className="absolute top-4 right-4 text-gray-400 hover:text-dark">
                                <X size={24} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
};

const App = () => {
    return (
        <BookingProvider>
            <div className="font-sans text-dark bg-white selection:bg-accent selection:text-white">
                <Navbar />

                <main>
                    <Hero />
                    <Services />
                    <Testimonials />
                    <Gallery />
                    <Staff />

                    {/* Booking Section */}
                    <section id="booking-section" className="py-24 bg-gradient-to-b from-white to-secondary relative">
                        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent" />
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="text-center mb-16">
                                <span className="text-accent font-bold tracking-widest uppercase text-sm">Reserva Online</span>
                                <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-6">Agenda tu Momento</h2>
                                <p className="text-gray-500 max-w-xl mx-auto">Selecciona tu servicio, tu estilista favorita y el horario que mejor te convenga en unos simples pasos.</p>
                            </div>
                            <BookingWizard />
                        </div>
                    </section>

                    <Contact />
                </main>

                <Footer />
            </div>
        </BookingProvider>
    );
};

export default App;
