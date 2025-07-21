import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AnimatedPage = ({ children }) => {
  // --- FIX: Create a capitalized alias for the motion component ---
  // This satisfies the ESLint rule for JSX component naming.
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionDiv>
  );
};

export default AnimatedPage;
