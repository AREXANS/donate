import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Stars/particles
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.01;
      
      // Clear with fade effect
      ctx.fillStyle = "rgba(8, 12, 24, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.5 + 0.5;
        const opacity = star.opacity * twinkle;
        
        // Star glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(147, 197, 253, 0)");
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Random shooting star spawn
      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          vx: (Math.random() - 0.5) * 5,
          vy: Math.random() * 8 + 4,
          life: 0,
          maxLife: Math.random() * 60 + 30,
        });
      }

      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        const progress = star.life / star.maxLife;
        const opacity = 1 - progress;

        // Trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.vx * 15, star.y - star.vy * 15
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 15, star.y - star.vy * 15);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (star.life >= star.maxLife) {
          shootingStars.splice(index, 1);
        }
      });

      // Draw nebula waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        const waveOffset = time * 0.5 + i * 2;
        const colors = [
          `rgba(139, 92, 246, ${0.03 - i * 0.01})`, // Purple
          `rgba(6, 182, 212, ${0.03 - i * 0.01})`,  // Cyan
          `rgba(236, 72, 153, ${0.02 - i * 0.005})`, // Pink
        ];
        
        for (let x = 0; x <= canvas.width; x += 20) {
          const y = canvas.height - 200 - i * 100 +
            Math.sin(x * 0.003 + waveOffset) * 50 +
            Math.sin(x * 0.001 + waveOffset * 0.7) * 30;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initial clear
    ctx.fillStyle = "rgb(8, 12, 24)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Aurora layers */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-[-30%] left-[-20%] w-[80%] h-[60%] rounded-full blur-[150px] animate-aurora"
          style={{ 
            background: 'linear-gradient(135deg, hsl(280, 100%, 65%, 0.3), hsl(330, 100%, 60%, 0.2))',
          }}
        />
        <div 
          className="absolute top-[10%] right-[-10%] w-[60%] h-[50%] rounded-full blur-[120px] animate-aurora stagger-2"
          style={{ 
            background: 'linear-gradient(225deg, hsl(199, 89%, 48%, 0.25), hsl(160, 100%, 50%, 0.2))',
            animationDelay: '5s',
          }}
        />
        <div 
          className="absolute bottom-[-20%] left-[20%] w-[70%] h-[50%] rounded-full blur-[130px] animate-aurora stagger-4"
          style={{ 
            background: 'linear-gradient(45deg, hsl(25, 100%, 55%, 0.2), hsl(280, 100%, 65%, 0.15))',
            animationDelay: '10s',
          }}
        />
      </div>

      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(280, 100%, 65%, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(199, 89%, 48%, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(330, 100%, 60%, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
