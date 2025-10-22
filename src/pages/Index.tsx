import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  size: number;
  color: string;
  shape: string;
}

const Index = () => {
  const [stage, setStage] = useState<'envelope' | 'cracking' | 'firework' | 'tossing' | 'opening' | 'message'>('envelope');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [envelopeY, setEnvelopeY] = useState(0);
  const [envelopeRotation, setEnvelopeRotation] = useState(0);

  const handleSealClick = () => {
    if (stage !== 'envelope') return;
    
    setStage('cracking');
    createWaxFragments();
    
    setTimeout(() => {
      setStage('firework');
      createFireworks();
    }, 500);
    
    setTimeout(() => {
      setStage('tossing');
      animateEnvelopeToss();
    }, 1300);
    
    setTimeout(() => {
      setStage('opening');
    }, 2300);
    
    setTimeout(() => {
      setStage('message');
      createStarShower();
    }, 2900);
  };

  const createWaxFragments = () => {
    const fragments: Particle[] = [];
    const colors = ['#9d4848', '#c14f4f'];
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = Math.random() * 150 + 100;
      
      fragments.push({
        id: Date.now() + i,
        x: 50,
        y: 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        size: Math.random() * 20 + 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: 'fragment'
      });
    }
    
    setParticles(fragments);
  };

  const createFireworks = () => {
    const fireworks: Particle[] = [];
    const colors = ['#e29563', '#ffd700', '#ffffff'];
    
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const speed = Math.random() * 250 + 250;
      
      fireworks.push({
        id: Date.now() + i + 1000,
        x: 50,
        y: 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: 0,
        size: Math.random() * 12 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: 'spark'
      });
    }
    
    setParticles(fireworks);
  };

  const createStarShower = () => {
    const stars: Particle[] = [];
    const colors = ['#ffd700', '#e29563', '#ffffff'];
    
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        setParticles(prev => [...prev, {
          id: Date.now() + i + Math.random() * 1000,
          x: Math.random() * 100,
          y: -10,
          vx: (Math.random() - 0.5) * 50,
          vy: Math.random() * 80 + 40,
          rotation: Math.random() * 360,
          size: Math.random() * 25 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: 'star'
        }]);
      }, i * 50);
    }
  };

  const animateEnvelopeToss = () => {
    let time = 0;
    const duration = 1000;
    
    const animate = () => {
      time += 16;
      const progress = time / duration;
      
      if (progress < 1) {
        const bounceProgress = progress < 0.6 ? progress / 0.6 : (1 - progress) / 0.4;
        setEnvelopeY(Math.sin(bounceProgress * Math.PI) * -100);
        setEnvelopeRotation(Math.sin(progress * Math.PI * 2) * 15);
        requestAnimationFrame(animate);
      } else {
        setEnvelopeY(0);
        setEnvelopeRotation(0);
      }
    };
    
    animate();
  };

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.vx * 0.016,
          y: p.y + p.vy * 0.016,
          vy: p.vy + (p.shape === 'star' ? 50 : 300) * 0.016,
          rotation: p.rotation + 5
        })).filter(p => p.y < 120 && p.y > -20)
      );
    }, 16);

    setTimeout(() => {
      if (stage === 'cracking' || stage === 'firework') {
        setParticles([]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [particles, stage]);

  const handleClose = () => {
    setStage('envelope');
    setParticles([]);
    setEnvelopeY(0);
    setEnvelopeRotation(0);
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
            style={{
              transform: `translateY(${envelopeY}px) rotate(${envelopeRotation}deg)`,
              transition: 'none'
            }}
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