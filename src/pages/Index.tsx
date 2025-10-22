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
        <div className="absolute inset-0 flex items-center justify-center p-4 animate-fade-in overflow-y-auto bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/a32cc27b-a241-4470-b1e2-04ad4cb6634b.jpg)' }}>
          <div className="w-full max-w-3xl py-8">
            <div className="relative">
              <div className="p-8 md:p-16 shadow-2xl relative z-10 border-4 border-[#9d4848]/30">
                <div className="text-center space-y-8">
                  <div className="mb-4 animate-bounce">
                    <img 
                      src="https://cdn.poehali.dev/files/1eb5aa42-a943-443b-8876-6105d896ea20.png" 
                      alt="Подарок" 
                      className="w-32 h-32 md:w-40 md:h-40 mx-auto"
                    />
                  </div>
                  
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1810] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}
                  >
                    Ты звезда и выиграла подарок от Кода публичности!
                  </h1>

                  <div className="pt-8">
                    <Button 
                      onClick={handleClose}
                      className="bg-gradient-to-r from-[#9d4848] to-[#c85a5a] hover:from-[#b35555] hover:to-[#d66868] text-white px-12 py-8 text-xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse border-4 border-[#ffd700]"
                    >
                      Забрать подарок! 🎁
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 shadow-xl border-4 border-[#9d4848]/30">
              <h2 className="text-3xl font-bold text-[#2d1810] mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif", textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
                Контакты
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-bold text-[#2d1810] mb-2 text-lg">Телефон / WhatsApp</h3>
                  <a href="https://wa.me/79147043536" target="_blank" rel="noopener noreferrer" className="text-[#1a0f08] hover:text-[#9d4848] transition-colors font-semibold text-lg">
                    +7 (914) 704-35-36
                  </a>
                </div>
                <div>
                  <h3 className="font-bold text-[#2d1810] mb-2 text-lg">Адрес</h3>
                  <a href="https://2gis.ru/vladivostok/firm/70000001035564383" target="_blank" rel="noopener noreferrer" className="text-[#1a0f08] hover:text-[#9d4848] transition-colors font-semibold text-lg">
                    Ангар Edwin Group
                  </a>
                </div>
                <div>
                  <h3 className="font-bold text-[#2d1810] mb-2 text-lg">Веб-сайт</h3>
                  <a href="https://kodpublichnosti-vl.ru/networking" target="_blank" rel="noopener noreferrer" className="text-[#1a0f08] hover:text-[#9d4848] transition-colors break-all font-semibold text-lg">
                    kodpublichnosti-vl.ru
                  </a>
                </div>
              </div>
            </div>

            <footer className="text-center text-sm text-[#2d1810] font-semibold mt-8 pb-4" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
              © 2024 Код публичности
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;