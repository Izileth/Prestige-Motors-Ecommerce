

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Gem } from "lucide-react"
import {CustomerTestimonials} from "~/src/data/testmonial"

interface CarouselProps {
    autoplayDelay?: number
    showDots?: boolean
    showArrows?: boolean
    itemsPerView?: {
        mobile: number
        tablet: number
        desktop: number
    }
}

export function TestimonialsCarousel({
    autoplayDelay = 4000,
    showDots = true,
    showArrows = true,
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [itemsToShow, setItemsToShow] = useState(itemsPerView.mobile)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Responsive items per view
    useEffect(() => {
        const updateItemsToShow = () => {
        if (window.innerWidth >= 1024) {
            setItemsToShow(itemsPerView.desktop)
        } else if (window.innerWidth >= 768) {
            setItemsToShow(itemsPerView.tablet)
        } else {
            setItemsToShow(itemsPerView.mobile)
        }
        }

        updateItemsToShow()
        window.addEventListener("resize", updateItemsToShow)
        return () => window.removeEventListener("resize", updateItemsToShow)
    }, [itemsPerView])

    const totalSlides = Math.ceil(CustomerTestimonials.length / itemsToShow)

    // Autoplay functionality
    const startAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
        if (!isHovered) {
            setCurrentIndex((prev) => (prev + 1) % totalSlides)
        }
        }, autoplayDelay)
    }, [autoplayDelay, isHovered, totalSlides])

    useEffect(() => {
        startAutoplay()
        return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [startAutoplay])

    // Navigation functions
    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        startAutoplay()
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
        startAutoplay()
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
        startAutoplay()
    }

    // Get visible testimonials for current slide
    const getVisibleTestimonials = (slideIndex: number) => {
        const startIndex = slideIndex * itemsToShow
        return CustomerTestimonials.slice(startIndex, startIndex + itemsToShow)
    }

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-full">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gray-900 dark:bg-gray-100 mx-auto mb-6"
            />
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4"
            >
                DEPOIMENTOS
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 font-light text-base md:text-lg max-w-md mx-auto"
            >
                O que nossos clientes dizem sobre nós
            </motion.p>
            </div>

            {/* Carousel Container */}
            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* Testimonials */}
            <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`grid gap-6 md:gap-8 ${
                    itemsToShow === 1
                        ? "grid-cols-1"
                        : itemsToShow === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
                >
                    {getVisibleTestimonials(currentIndex).map((testimonial, index) => (
                    <motion.div
                        key={`${currentIndex}-${testimonial.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -8 }}
                        className="group bg-white dark:bg-gray-800 p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300 transition-all duration-500 h-full flex flex-col"
                    >
                        {/* Rating */}
                        <div className="flex items-center mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Gem
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 mr-1 ${
                                i < testimonial.rating
                                ? "text-gray-900 dark:text-gray-100"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                                >
                            </Gem>
                        ))}
                        </div>

                        {/* Testimonial Text */}
                        <div className="flex-grow mb-6">
                        <p className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
                            "{testimonial.text}"
                        </p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="relative mr-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-gray-900 dark:group-hover:border-gray-300 transition-colors duration-300">
                            <span className="text-base md:text-lg font-light text-gray-900 dark:text-gray-100">
                                {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-base md:text-lg mb-1">
                            {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-light">{testimonial.role}</p>
                        </div>
                        </div>
                    </motion.div>
                    ))}
                </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {showArrows && totalSlides > 1 && (
                <>
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-gray-100" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-gray-100" />
                </button>
                </>
            )}
            </div>

            {/* Dot Indicators */}
            {showDots && totalSlides > 1 && (
            <div className="flex justify-center mt-8 md:mt-12 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                        ? "bg-gray-900 dark:bg-gray-100 scale-125"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
                ))}
            </div>
            )}

            {/* Progress Bar */}
            <div className="mt-6 md:mt-8 max-w-xs mx-auto">
            <div className="h-px bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <motion.div
                className="absolute top-0 left-0 h-full bg-gray-900 dark:bg-gray-100"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                    duration: autoplayDelay / 1000,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                key={currentIndex}
                />
            </div>
            </div>
        </div>
        </section>
    )
}
