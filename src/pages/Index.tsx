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
          const speed = Math.random() * 280 + 220;
          const spiralDirection = Math.random() > 0.5 ? 1 : -1;
          
          newParticles.push({
            id: Date.now() + wave * 1000 + i + Math.random() * 10000,
            x: 50,
            y: 50,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() * 12 + 8) * spiralDirection,
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
            const newSpiralAngle = p.spiralAngle + 0.25;
            const spiralRadius = 15;
            const spiralX = Math.cos(newSpiralAngle) * spiralRadius;
            const spiralY = Math.sin(newSpiralAngle) * spiralRadius;
            
            const newVx = p.vx * 0.985;
            const newVy = p.vy * 0.985 + 180 * 0.016;
            
            return {
              ...p,
              x: p.x + (newVx + spiralX) * 0.016,
              y: p.y + (newVy + spiralY) * 0.016,
              vx: newVx,
              vy: newVy,
              spiralAngle: newSpiralAngle,
              rotation: p.rotation + p.rotationSpeed * 1.5
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
    setStage('envelope');
    setParticles([]);
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
        <div className="absolute inset-0 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-3xl py-8">
            <div className="relative">
              <div className="bg-[#f5e6d3] p-8 md:p-16 shadow-2xl relative z-10 border-4 border-[#9d4848]/30">
                <div className="text-center space-y-8">
                  <div className="text-6xl md:text-8xl mb-4">🎁</div>
                  
                  <h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4a3428] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Ты звезда и выиграла подарок от Кода публичности!
                  </h1>

                  <div className="pt-8">
                    <Button 
                      onClick={handleClose}
                      className="bg-[#9d4848] hover:bg-[#9d4848]/90 text-white px-8 py-6 text-lg"
                    >
                      Закрыть
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#f5e6d3] p-8 shadow-xl border-2 border-[#9d4848]/20">
              <h2 className="text-3xl font-bold text-[#9d4848] mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Контакты
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                <div>
                  <h3 className="font-semibold text-[#9d4848] mb-2">Электронная почта</h3>
                  <a href="mailto:contact@example.com" className="text-[#4a3428] hover:text-[#9d4848] transition-colors">
                    contact@example.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-[#9d4848] mb-2">Телефон</h3>
                  <a href="tel:+71234567890" className="text-[#4a3428] hover:text-[#9d4848] transition-colors">
                    +7 (123) 456-78-90
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-[#9d4848] mb-2">Адрес</h3>
                  <p className="text-[#4a3428]">г. Москва, ул. Примерная, д. 1</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#9d4848] mb-2">Веб-сайт</h3>
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-[#4a3428] hover:text-[#9d4848] transition-colors">
                    www.example.com
                  </a>
                </div>
              </div>
            </div>

            <footer className="text-center text-xs text-[#4a3428]/60 mt-8 pb-4">
              © 2024 Код публичности
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;