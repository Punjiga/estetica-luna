import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SERVICES, STYLISTS, GALLERY_IMAGES, TESTIMONIALS } from '../constants';
import { Clock, MapPin, Phone, Mail, Facebook, Instagram, X, Star, Quote } from 'lucide-react';

// --- Hero Section ---
export const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 250]);

    const scrollToBooking = () => {
        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1600&q=80")' }}
                />
                <div className="absolute inset-0 bg-black/70" />
            </motion.div>

            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    Tu belleza, <span className="text-primary italic">nuestra pasión</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl font-light mb-10 max-w-2xl mx-auto text-gray-100"
                >
                    Descubre la experiencia de belleza más completa y exclusiva en Cartago.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToBooking}
                    className="relative overflow-hidden bg-accent text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all tracking-wide group"
                >
                    <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">Reservar Cita Ahora</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>
            </div>
        </section>
    );
};

// --- Services Section ---
export const Services = () => {
    return (
        <section id="services" className="py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl font-bold text-dark mb-4">Nuestros Servicios</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group h-[400px] perspective-1000"
                        >
                            <div className="relative h-full w-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-12">
                                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg bg-white">
                                    <div className="h-3/5 overflow-hidden">
                                        <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    </div>
                                    <div className="p-6 h-2/5 flex flex-col justify-between relative z-10 bg-white">
                                        <div className="transition-transform duration-700 ease-out group-hover:-translate-y-4">
                                            <h3 className="font-serif text-xl font-bold text-dark">{service.name}</h3>
                                            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                                <span>{service.duration} min</span>
                                                <span className="font-bold text-accent text-lg">₡{service.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-6 pt-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-white via-white to-transparent">
                                            <button
                                                onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="w-full bg-dark text-white py-3 rounded-xl font-medium relative overflow-hidden group/btn transition-all duration-300 hover:shadow-lg mt-2"
                                            >
                                                <span className="relative z-10 group-hover/btn:text-white transition-colors">Reservar</span>
                                                <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Staff Section ---
export const Staff = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section id="team" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl font-bold text-dark mb-4">Nuestro Equipo</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">Profesionales apasionadas por resaltar tu belleza natural con las mejores técnicas.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {STYLISTS.map((stylist, index) => (
                        <motion.div
                            key={stylist.id}
                            style={{ y: index % 2 === 0 ? 0 : y }} // Staggered parallax
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="text-center group"
                        >
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 shadow-xl">
                                <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-dark">{stylist.name}</h3>
                            <p className="text-accent font-medium mb-3">{stylist.specialty}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{stylist.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Gallery Section ---
export const Gallery = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);

    return (
        <section id="gallery" className="py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="font-serif text-4xl font-bold text-dark mb-12 text-center">Nuestros Trabajos</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-8">
                    {GALLERY_IMAGES.map((img, idx) => (
                        <motion.div
                            key={idx}
                            style={{ y: idx < 3 ? y1 : y2 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group"
                            onClick={() => setLightboxImg(img)}
                        >
                            <img src={img} alt="Gallery work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" loading="lazy" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                    <span className="font-serif italic">Ver</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightboxImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                        onClick={() => setLightboxImg(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={lightboxImg}
                            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                        <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2">
                            <X size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// --- Testimonials Section ---
export const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setIndex((index + 1) % TESTIMONIALS.length);
    const prev = () => setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="font-serif text-4xl font-bold text-dark mb-16 text-center">Clientes Felices</h2>

                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden py-12 px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="bg-secondary p-12 rounded-3xl relative shadow-lg text-center mx-4 md:mx-12 cursor-default transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white"
                            >
                                <Quote className="absolute top-8 left-8 text-accent/20 w-16 h-16" />
                                <div className="flex justify-center gap-1 text-accent mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#D4AF37" />)}
                                </div>
                                <div className="min-h-[120px] flex items-center justify-center">
                                    <p className="text-gray-600 mb-8 italic text-xl md:text-2xl leading-relaxed relative z-10 font-serif">"{TESTIMONIALS[index].text}"</p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <img src={TESTIMONIALS[index].image} alt={TESTIMONIALS[index].name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" />
                                    <span className="font-serif font-bold text-dark text-lg">{TESTIMONIALS[index].name}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-accent w-6' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Contact Section ---
export const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-light">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="font-serif text-4xl font-bold text-dark">Visítanos</h2>
                        <p className="text-gray-600">Estamos ubicados en el corazón de Cartago. Un oasis de tranquilidad para tu cuidado personal.</p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark group-hover:text-accent transition-colors duration-300">Dirección</h4>
                                    <p className="text-gray-500 group-hover:text-accent transition-colors duration-300">200 metros norte de la Basílica, Cartago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark group-hover:text-accent transition-colors duration-300">Teléfono</h4>
                                    <p className="text-gray-500 group-hover:text-accent transition-colors duration-300">+506 2222-3333</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark group-hover:text-accent transition-colors duration-300">Horario</h4>
                                    <p className="text-gray-500 group-hover:text-accent transition-colors duration-300">Lun-Vie: 9am - 6pm | Sáb: 9am - 4pm</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="https://srstudio.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center hover:bg-accent hover:rotate-[360deg] transition-all duration-500">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.136279930602!2d-83.91890368520775!3d9.86595599294247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0dfe6d110996b%3A0x6b69b2d97858c7e0!2sBas%C3%ADlica%20de%20Nuestra%20Se%C3%B1ora%20de%20los%20%C3%81ngeles!5e0!3m2!1sen!2scr!4v1677700000000!5m2!1sen!2scr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
