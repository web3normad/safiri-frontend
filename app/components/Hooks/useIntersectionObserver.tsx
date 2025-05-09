"use client";

import { useEffect, useState } from 'react';

interface IntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

interface RefObject<T> {
    current: T | null;
}

export const useIntersectionObserver = (
    ref: RefObject<Element>,
    options: IntersectionObserverOptions = {}
): boolean => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isIntersecting;
};