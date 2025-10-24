import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  spiralAngle: number;
  size: number;
  color: string;
  shape: string;
}

const Index = () => {
  const [stage, setStage] = useState<'envelope' | 'firework' | 'opening' | 'message'>('envelope');
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleSealClick = () => {
    if (stage !== 'envelope') return;
    
    setStage('firework');
    createFireworks();
    
    setTimeout(() => {
      setStage('opening');
    }, 5000);
    
    setTimeout(() => {
      setStage('message');
      createStarShower();
    }, 5500);
  };

  const createFireworks = () => {
    setParticles([]);
    const colors = ['#e29563', '#ffd700', '#ffffff', '#ff6b6b', '#4ecdc4'];
    const totalWaves = 5;
    const particlesPerWave = 40;
    
    for (let wave = 0; wave < totalWaves; wave++) {
      setTimeout(() => {
        const newParticles: Particle[] = [];
        
        for (let i = 0; i < particlesPerWave; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 200 + 180;
          const spiralDirection = Math.random() > 0.5 ? 1 : -1;
          
          newParticles.push({
            id: Date.now() + wave * 1000 + i + Math.random() * 10000,
            x: 50,
            y: 50,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() * 10 + 6) * spiralDirection,
            spiralAngle: 0,
            size: Math.random() * 22 + 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: 'spark'
          });
        }
        
        setParticles(prev => [...prev, ...newParticles]);
      }, wave * 1000);
    }
  };

  const createStarShower = () => {
    setParticles([]);
    const colors = ['#ffd700', '#e29563', '#ffffff'];
    
    for (let i = 0; i < 70; i++) {
      setTimeout(() => {
        const xPos = 10 + Math.random() * 80;
        setParticles(prev => [...prev, {
          id: Date.now() + i + Math.random() * 10000,
          x: xPos,
          y: -5,
          vx: (Math.random() - 0.5) * 30,
          vy: Math.random() * 60 + 50,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 8 + 5,
          spiralAngle: 0,
          size: Math.random() * 35 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: 'star'
        }]);
      }, i * 85);
    }
  };

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => {
          if (p.shape === 'spark') {
            const newSpiralAngle = p.spiralAngle + 0.35;
            const time = p.spiralAngle / 10;
            const spiralRadius = 20 + time * 5;
            const spiralX = Math.cos(newSpiralAngle) * spiralRadius;
            const spiralY = Math.sin(newSpiralAngle) * spiralRadius;
            
            const newVx = p.vx * 0.975;
            const newVy = p.vy * 0.975 + 120 * 0.016;
            
            return {
              ...p,
              x: p.x + (newVx + spiralX) * 0.016,
              y: p.y + (newVy + spiralY) * 0.016,
              vx: newVx,
              vy: newVy,
              spiralAngle: newSpiralAngle,
              rotation: p.rotation + p.rotationSpeed * 2
            };
          } else {
            const newVy = p.vy + 40 * 0.016;
            return {
              ...p,
              x: p.x + p.vx * 0.016,
              y: p.y + newVy * 0.016,
              vy: newVy,
              spiralAngle: p.spiralAngle,
              rotation: p.rotation + p.rotationSpeed
            };
          }
        }).filter(p => p.y < 130 && p.y > -10)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  const handleClose = () => {
    window.open('https://kodpublichnosti-vl.ru/networking', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-[#f5e6d3] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            fontSize: p.shape === 'star' ? `${p.size}px` : undefined,
            width: p.shape !== 'star' ? `${p.size}px` : undefined,
            height: p.shape !== 'star' ? `${p.size}px` : undefined,
            backgroundColor: p.shape !== 'star' ? p.color : undefined,
            color: p.shape === 'star' ? p.color : undefined,
            borderRadius: p.shape === 'fragment' ? '30%' : p.shape === 'spark' ? '50%' : undefined,
            boxShadow: p.shape === 'spark' ? `0 0 10px ${p.color}` : undefined,
          }}
        >
          {p.shape === 'star' && '⭐'}
        </div>
      ))}
      {stage !== 'message' ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`relative transition-opacity duration-600 ${
              stage === 'opening' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div
              className={`cursor-pointer ${stage === 'envelope' ? 'hover:scale-105' : ''} transition-transform duration-300`}
              onClick={handleSealClick}
            >
              <img 
                src="https://cdn.poehali.dev/files/7d89ea53-68de-4c78-8e71-728ba4aca4b4.jpg"
                alt="Конверт с восковой печатью"
                className="w-screen h-screen object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-start sm:items-center justify-center p-2 sm:p-4 animate-fade-in overflow-y-auto bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/1b8c6eb3-afb1-4d3f-9832-49d72347704c.jpeg)' }}>
          <div className="absolute inset-0 bg-white/40"></div>
          <div className="w-full py-8 sm:py-8 px-2 sm:px-4 relative z-10 mt-4 sm:mt-0">
            <div className="relative">
              <div className="p-4 sm:p-8 md:p-16 shadow-2xl relative z-10 border-2 sm:border-4 border-[#9d4848]/30 bg-white/50 animate-slide-in-up">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="pt-4 sm:pt-8 md:pt-12"></div>
                  <div 
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight px-1 sm:px-2 uppercase break-words animate-slide-in-up"
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      background: 'linear-gradient(90deg, #9d4848 0%, #ffd700 25%, #2d1810 50%, #c85a5a 75%, #ffd700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: 'none',
                      filter: 'drop-shadow(2px 2px 4px rgba(255,255,255,0.9)) drop-shadow(0 0 15px rgba(255,255,255,0.6))',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      animationDelay: '0.2s',
                      opacity: 0
                    }}
                  >
                    ТЫ ЗВЕЗДА!!!!!
                    <br />
                    ТЫ ВЫИГРАЛА ПРИЗ ОТ  КОДА ПУБЛИЧНОСТИ
                  </div>


                </div>
              </div>
            </div>

            <footer className="text-center text-sm text-[#2d1810] font-semibold mt-8 pb-4" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
              © 2025 Код публичности
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;