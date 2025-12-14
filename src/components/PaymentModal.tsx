import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  data: {
    transactionId: string;
    qrString: string;
    totalAmount: number;
    name: string;
    message: string;
  };
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const PaymentModal = ({ isOpen, onClose, onSuccess, data }: PaymentModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm glass-strong rounded-2xl p-6 shadow-glow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Pembayaran QRIS
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Scan QR code di bawah untuk melakukan pembayaran
              </p>

              {/* QR Code Placeholder */}
              <div className="w-48 h-48 mx-auto bg-card/50 rounded-xl flex items-center justify-center mb-6 border border-border/50">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Generating QR...</p>
                </div>
              </div>

              {/* Amount */}
              <div className="glass rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                <p className="text-2xl font-display font-bold text-gradient">
                  {formatCurrency(data.totalAmount)}
                </p>
              </div>

              {/* Donor Info */}
              <div className="text-left glass rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dari</span>
                  <span className="text-foreground font-medium">{data.name}</span>
                </div>
                {data.message && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Pesan: </span>
                    <span className="text-foreground">{data.message}</span>
                  </div>
                )}
              </div>

              {/* Simulate Success Button */}
              <motion.button
                onClick={onSuccess}
                className="w-full py-3 px-6 rounded-xl font-display font-bold bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-neon transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="w-5 h-5" />
                Konfirmasi Pembayaran
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
