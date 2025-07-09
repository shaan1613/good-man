'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import { motion } from "framer-motion";
//  npm install @jsmastery/utils

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    // Remove unused 'query' variable
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);
        
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, searchParams, pathname]);

    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div 
            className={`relative border ${isFocused ? 'border-blue-500 shadow-md' : 'border-black hover:border-gray-500'} rounded-lg items-center flex gap-2 px-3 py-2 h-fit transition-all duration-300 ease-in-out`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <motion.div
                animate={{ rotate: isFocused ? [0, -10, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5 }}
            >
                <Image 
                    src="/icons/search.svg" 
                    alt="search" 
                    width={16} 
                    height={16} 
                    className={`transition-all duration-300 ${isFocused ? 'opacity-100' : 'opacity-70'}`}
                />
            </motion.div>
            <input
                placeholder="Search companions..."
                className="outline-none w-full bg-transparent text-sm transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {searchQuery && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setSearchQuery('')}
                >
                    ×
                </motion.button>
            )}
        </motion.div>
    )
}
export default SearchInput