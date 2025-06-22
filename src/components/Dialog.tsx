import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKey);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] snap-none flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl p-6 max-w-[90vw] max-h-[90vh] w-fit h-fit  overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
              },
            }}
            exit={{
              x: "100vw",
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-third hover:text-primary hover:scale-[1.4] duration-200 ease-in-out transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
