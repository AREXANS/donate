import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import DonationForm from "@/components/DonationForm";
import Leaderboard from "@/components/Leaderboard";
import PaymentModal from "@/components/PaymentModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"donate" | "leaderboard">("donate");
  const [paymentData, setPaymentData] = useState<{
    transactionId: string;
    qrString: string;
    totalAmount: number;
    name: string;
    message: string;
  } | null>(null);

  const handlePaymentCreated = (data: typeof paymentData) => {
    setPaymentData(data);
  };

  const handlePaymentSuccess = () => {
    setPaymentData(null);
    setActiveTab("leaderboard");
  };

  const handlePaymentClose = () => {
    setPaymentData(null);
  };

  return (
    <>
      <Helmet>
        <title>Arexans - Support Creator dengan QRIS</title>
        <meta name="description" content="Dukung kreator favoritmu dengan mudah menggunakan QRIS. Pembayaran otomatis, aman, dan cepat." />
      </Helmet>

      <div className="min-h-screen text-foreground font-sans selection:bg-primary/30 overflow-x-hidden relative">
        <AnimatedBackground />

        <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col p-4 md:p-6">
          <Header />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex-1 relative pb-10">
            {activeTab === "donate" && (
              <DonationForm onPaymentCreated={handlePaymentCreated} />
            )}
            {activeTab === "leaderboard" && <Leaderboard />}
          </div>

          {/* Footer */}
          <div className="text-center py-4 text-muted-foreground text-xs">
            Made with ❤️ by Arexans
          </div>
        </div>

        {paymentData && (
          <PaymentModal
            isOpen={!!paymentData}
            onClose={handlePaymentClose}
            onSuccess={handlePaymentSuccess}
            data={paymentData}
          />
        )}
      </div>
    </>
  );
};

export default Index;
