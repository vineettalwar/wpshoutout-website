import { ReactNode } from "react";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransition: Transition = {
  duration: 0.22,
  ease: [0.4, 0.0, 0.2, 1],
};

interface PageTransitionProps {
  locationKey: string;
  children: ReactNode;
}

export function PageTransition({ locationKey, children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={locationKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="min-w-0 w-full"
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
