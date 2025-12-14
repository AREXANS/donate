import { motion } from "framer-motion";

interface TabNavigationProps {
  activeTab: "donate" | "leaderboard";
  onTabChange: (tab: "donate" | "leaderboard") => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <motion.div 
      className="flex gap-2 p-1 glass rounded-2xl mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <button
        onClick={() => onTabChange("donate")}
        className={`flex-1 py-3 px-4 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
          activeTab === "donate"
            ? "bg-gradient-primary text-primary-foreground shadow-glow"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Donate
      </button>
      <button
        onClick={() => onTabChange("leaderboard")}
        className={`flex-1 py-3 px-4 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
          activeTab === "leaderboard"
            ? "bg-gradient-primary text-primary-foreground shadow-glow"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Leaderboard
      </button>
    </motion.div>
  );
};

export default TabNavigation;
