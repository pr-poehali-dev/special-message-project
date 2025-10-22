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
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 animate-fade-in overflow-y-auto bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/1b8c6eb3-afb1-4d3f-9832-49d72347704c.jpeg)' }}>
          <div className="absolute inset-0 bg-white/40"></div>
          <div className="w-full py-4 sm:py-8 px-2 sm:px-4 relative z-10">
            <div className="relative">
              <div className="p-4 sm:p-8 md:p-16 shadow-2xl relative z-10 border-2 sm:border-4 border-[#9d4848]/30 bg-white/50">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="pt-4 sm:pt-8 md:pt-12"></div>
                  <h1 
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight px-1 sm:px-2 uppercase break-words"
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      background: 'linear-gradient(90deg, #9d4848 0%, #ffd700 25%, #2d1810 50%, #c85a5a 75%, #ffd700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: 'none',
                      filter: 'drop-shadow(2px 2px 4px rgba(255,255,255,0.9)) drop-shadow(0 0 15px rgba(255,255,255,0.6))',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    Ты звезда и выиграла подарок от Кода публичности!
                  </h1>

                  <div className="pt-4 sm:pt-8">
                    <Button 
                      onClick={handleClose}
                      className="relative bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] hover:from-[#ffed4e] hover:via-[#ffd700] hover:to-[#ffed4e] text-[#2d1810] px-6 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 lg:py-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-black shadow-[0_0_30px_rgba(255,215,0,0.8),0_0_60px_rgba(255,215,0,0.4)] sm:shadow-[0_0_50px_rgba(255,215,0,1),0_0_100px_rgba(255,215,0,0.5)] transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 border-2 sm:border-4 border-[#9d4848] rounded-full"
                      style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      🎁 Узнать подробнее 🎁
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-12 p-4 sm:p-8 md:p-12 shadow-xl border-2 sm:border-4 border-[#9d4848]/30 relative z-20 bg-white/60">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2d1810] mb-6 sm:mb-10 text-center" style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>
                Контакты
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <h3 className="font-bold text-[#2d1810] mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl">📱 Телефон / WhatsApp</h3>
                  <a 
                    href="tel:+79147043536"
                    className="inline-block w-full sm:w-auto text-[#1a0f08] hover:text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] font-black text-lg sm:text-xl md:text-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    +7 (914) 704-35-36
                  </a>
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <h3 className="font-bold text-[#2d1810] mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl">📍 Адрес</h3>
                  <a 
                    href="https://2gis.ru/vladivostok/firm/70000001035564383" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block w-full sm:w-auto text-white bg-gradient-to-r from-[#9d4848] to-[#c85a5a] hover:from-[#b35555] hover:to-[#d66868] font-black text-lg sm:text-xl md:text-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    Ангар Edwin Group
                  </a>
                </div>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <h3 className="font-bold text-[#2d1810] mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl">🌐 Веб-сайт</h3>
                  <a 
                    href="https://kodpublichnosti-vl.ru/networking" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block w-full sm:w-auto text-white bg-gradient-to-r from-[#2d1810] to-[#4a2f20] hover:from-[#4a2f20] hover:to-[#2d1810] font-black text-lg sm:text-xl md:text-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 break-all"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                  >
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