import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";

interface DonorEntry {
  id: string;
  name: string;
  amount: number;
  message?: string;
  createdAt: string;
}

const SAMPLE_DONORS: DonorEntry[] = [
  { id: "1", name: "Anonymous Hero", amount: 500000, message: "Keep up the great work! 🚀", createdAt: "2024-01-15" },
  { id: "2", name: "CyberNinja", amount: 250000, message: "Love your content!", createdAt: "2024-01-14" },
  { id: "3", name: "TechWizard", amount: 150000, createdAt: "2024-01-13" },
  { id: "4", name: "PixelMaster", amount: 100000, message: "Amazing work! 💫", createdAt: "2024-01-12" },
  { id: "5", name: "CodeNinja", amount: 75000, createdAt: "2024-01-11" },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-400" />;
    case 2:
      return <Trophy className="w-5 h-5 text-gray-300" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="w-5 h-5 text-muted-foreground font-bold text-sm flex items-center justify-center">#{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "border-yellow-400/50 bg-yellow-400/10";
    case 2:
      return "border-gray-300/50 bg-gray-300/10";
    case 3:
      return "border-amber-600/50 bg-amber-600/10";
    default:
      return "border-border/50 bg-card/30";
  }
};

const Leaderboard = () => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg font-bold text-foreground">Top Supporters</h2>
      </div>

      <div className="space-y-3">
        {SAMPLE_DONORS.map((donor, index) => (
          <motion.div
            key={donor.id}
            className={`p-4 rounded-xl glass border ${getRankStyle(index + 1)} transition-all duration-300 hover:scale-[1.02]`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getRankIcon(index + 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground truncate">{donor.name}</span>
                  <span className="text-sm font-bold text-gradient whitespace-nowrap">
                    {formatCurrency(donor.amount)}
                  </span>
                </div>
                {donor.message && (
                  <p className="text-sm text-muted-foreground mt-1 truncate">{donor.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {SAMPLE_DONORS.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Belum ada donasi</p>
          <p className="text-sm mt-1">Jadilah yang pertama!</p>
        </div>
      )}
    </motion.div>
  );
};

export default Leaderboard;
