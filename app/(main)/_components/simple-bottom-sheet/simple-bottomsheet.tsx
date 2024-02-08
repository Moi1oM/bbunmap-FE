"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";
import { LucideArrowDownCircle, LucideArrowUpCircle } from "lucide-react";
import { useState } from "react";

export default function SimpleBottomSheet() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      initial={false} // Set initial to false to keep the initial styles
      animate={{ height: isOpen ? "85%" : "25%" }} // Set the height based on isOpen
      transition={{ duration: 0.3 }} // Animation duration in seconds
      className={cn(
        "flex justify-center items-start fixed bottom-0 bg-main w-full max-w-[450px]"
      )}
    >
      {isOpen && (
        <LucideArrowDownCircle
          onClick={toggle}
          className="hover:cursor-pointer"
        />
      )}
      {!isOpen && (
        <LucideArrowUpCircle
          onClick={toggle}
          className="hover:cursor-pointer"
        />
      )}
    </motion.div>
  );
}
