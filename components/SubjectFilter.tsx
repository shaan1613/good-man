"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects, subjectsColors } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";


const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);
    const [isOpen, setIsOpen] = useState(false);
    
    // Get the color for the selected subject or default to a neutral color
    const getSubjectColor = (subj: string) => {
        return subj && subj !== "all" ? subjectsColors[subj as keyof typeof subjectsColors] : "#f3f4f6";
    };
    
    const getSubjectIcon = (subj: string) => {
        if (!subj || subj === "all") return "/icons/cap.svg";
        return `/icons/${subj}.svg`;
    };

    useEffect(() => {
        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }
        router.push(newUrl, { scroll: false });
    }, [subject, router, searchParams]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Select 
                onValueChange={(value) => {
                    setSubject(value);
                    setIsOpen(false);
                }} 
                value={subject}
                onOpenChange={setIsOpen}
            >
                <SelectTrigger 
                    className={`input capitalize transition-all duration-300 ease-in-out flex items-center gap-2 px-4 py-2 ${isOpen ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-sm'} [&>svg]:hidden`}
                    style={{ 
                        backgroundColor: getSubjectColor(subject),
                        borderColor: isOpen ? 'transparent' : getSubjectColor(subject),
                    }}
                >
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: isOpen ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image 
                            src={getSubjectIcon(subject)} 
                            alt={subject || "subject"} 
                            width={18} 
                            height={18} 
                            className="opacity-80"
                        />
                    </motion.div>
                    <SelectValue placeholder="Subject" />
                    <ChevronDownIcon className="size-4 opacity-50 ml-1" />
                </SelectTrigger>
                <SelectContent className="border-none shadow-lg rounded-lg overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SelectItem 
                            value="all" 
                            className="capitalize hover:bg-gray-100 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <Image src="/icons/cap.svg" alt="all" width={16} height={16} />
                                All subjects
                            </div>
                        </SelectItem>
                        {subjects.map((subj) => (
                            <SelectItem 
                                key={subj} 
                                value={subj} 
                                className="capitalize hover:bg-gray-100 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-2">
                                    <Image src={`/icons/${subj}.svg`} alt={subj} width={16} height={16} />
                                    {subj}
                                </div>
                            </SelectItem>
                        ))}
                    </motion.div>
                </SelectContent>
            </Select>
        </motion.div>
    );
};

export default SubjectFilter;