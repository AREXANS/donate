import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";

interface DonationFormProps {
  onPaymentCreated: (data: {
    transactionId: string;
    qrString: string;
    totalAmount: number;
    name: string;
    message: string;
  }) => void;
}

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000];

const DonationForm = ({ onPaymentCreated }: DonationFormProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || amount < 1000) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onPaymentCreated({
        transactionId: `TXN-${Date.now()}`,
        qrString: "simulated-qr-string",
        totalAmount: amount,
        name: name.trim(),
        message: message.trim(),
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Nama Kamu
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama..."
          className="w-full px-4 py-3 rounded-xl glass border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-card/50 text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none"
          required
        />
      </div>

      {/* Amount Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <Heart className="w-4 h-4 text-accent" />
          Pilih Nominal
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PRESET_AMOUNTS.map((preset) => (
            <motion.button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                setCustomAmount("");
              }}
              className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                amount === preset && !customAmount
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "glass text-foreground hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formatCurrency(preset)}
            </motion.button>
          ))}
        </div>
        
        {/* Custom Amount */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            Rp
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (e.target.value) {
                setAmount(parseInt(e.target.value) || 0);
              }
            }}
            placeholder="Nominal lainnya..."
            className="w-full pl-10 pr-4 py-3 rounded-xl glass border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-card/50 text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none"
            min="1000"
          />
        </div>
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <Send className="w-4 h-4 text-cyan-400" />
          Pesan (Opsional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan dukunganmu..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl glass border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-card/50 text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading || !name.trim() || amount < 1000}
        className="w-full py-4 px-6 rounded-xl font-display font-bold text-lg bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          <>
            <Heart className="w-5 h-5" />
            Donate {formatCurrency(amount)}
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default DonationForm;
