import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-6">
      {/* Logo with spinning ring animation */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Outer spinning ring with gradient */}
        <div className="absolute -inset-4 animate-spin-ring-slow">
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, hsl(199, 89%, 48%), hsl(280, 100%, 65%), hsl(330, 100%, 60%), hsl(25, 100%, 55%), hsl(160, 100%, 50%), hsl(199, 89%, 48%))',
              padding: '3px',
            }}
          >
            <div className="w-full h-full rounded-full bg-background" />
          </div>
        </div>

        {/* Inner spinning ring (reverse) */}
        <div className="absolute -inset-2 animate-spin-ring-reverse">
          <div 
            className="w-full h-full rounded-full opacity-50"
            style={{
              background: 'conic-gradient(from 180deg, hsl(160, 100%, 50%), hsl(25, 100%, 55%), hsl(330, 100%, 60%), hsl(280, 100%, 65%), hsl(199, 89%, 48%), hsl(160, 100%, 50%))',
              padding: '2px',
            }}
          >
            <div className="w-full h-full rounded-full bg-background" />
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-6 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse-glow" />

        {/* Logo image container */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/30 shadow-neon">
          <img 
            src="https://files.catbox.moe/raona5.jpg" 
            alt="Arexans Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Title with animated gradient */}
      <motion.h1 
        className="mt-8 font-display text-4xl md:text-5xl font-black tracking-tight text-gradient-animated"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        AREXANS
      </motion.h1>
      
      <motion.p 
        className="text-muted-foreground text-sm font-medium tracking-[0.3em] mt-2 uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Support Creator
      </motion.p>

      {/* Decorative animated line */}
      <motion.div 
        className="mt-4 h-0.5 bg-gradient-primary rounded-full animate-gradient-flow"
        style={{ backgroundImage: 'var(--gradient-animated)', backgroundSize: '300% 100%' }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 96, opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
    </div>
  );
};

export default Header;
