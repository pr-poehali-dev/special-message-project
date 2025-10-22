import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Butterfly {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  size: number;
  color: string;
}

const Index = () => {
  const [stage, setStage] = useState<'envelope' | 'peeling' | 'falling' | 'opening' | 'message'>('envelope');
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  const handleEnvelopeClick = () => {
    if (stage !== 'envelope') return;
    
    setStage('peeling');
    
    setTimeout(() => setStage('falling'), 800);
    setTimeout(() => setStage('opening'), 1900);
    setTimeout(() => {
      setStage('message');
      createButterflies();
    }, 2500);
  };

  const createButterflies = () => {
    const newButterflies: Butterfly[] = [];
    const colors = ['#d4a373', '#9d4848'];
    
    for (let i = 0; i < 20; i++) {
      newButterflies.push({
        id: i,
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 200,
        vy: -Math.random() * 150 - 50,
        rotation: Math.random() * 360,
        size: Math.random() * 24 + 24,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setButterflies(newButterflies);
  };

  useEffect(() => {
    if (butterflies.length === 0) return;

    const interval = setInterval(() => {
      setButterflies(prev => 
        prev.map(b => ({
          ...b,
          x: b.x + b.vx * 0.016,
          y: b.y + b.vy * 0.016,
          vy: b.vy + 98 * 0.016,
          rotation: b.rotation + 5
        })).filter(b => b.y < 150)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [butterflies]);

  const handleClose = () => {
    setStage('envelope');
    setButterflies([]);
  };

  return (
    <div className="min-h-screen bg-[#f5e6d3] relative overflow-hidden">
      {stage !== 'message' ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative">
            <div 
              className={`cursor-pointer transition-all duration-500 ${
                stage === 'opening' ? 'opacity-0 scale-95' : 'opacity-100'
              }`}
              onClick={handleEnvelopeClick}
            >
              <img 
                src="https://cdn.poehali.dev/files/7d89ea53-68de-4c78-8e71-728ba4aca4b4.jpg"
                alt="Конверт"
                className="w-[90vw] max-w-[600px] h-auto"
              />
            </div>

            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${
                stage === 'peeling' 
                  ? 'animate-[flip_0.8s_ease-out_forwards]' 
                  : stage === 'falling'
                  ? 'animate-[fall_1s_ease-in_forwards]'
                  : stage === 'opening'
                  ? 'opacity-0'
                  : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
          {butterflies.map(b => (
            <div
              key={b.id}
              className="absolute pointer-events-none"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: `rotate(${b.rotation}deg)`,
                fontSize: `${b.size}px`,
                color: b.color,
                transition: 'all 0.016s linear'
              }}
            >
              🦋
            </div>
          ))}

          <div className="w-full max-w-3xl animate-fade-in">
            <div className="relative">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                    color: ['#d4a373', '#9d4848', '#ffffff'][Math.floor(Math.random() * 3)],
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  ⭐
                </div>
              ))}

              <div className="bg-[#f5e6d3] p-12 md:p-16 shadow-2xl relative z-10 border-4 border-[#9d4848]/20">
                <div className="text-center space-y-8">
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a3428] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Ты звезда, и ты выиграла подарок от Кода публичности!
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
              <h2 className="text-3xl font-bold text-[#9d4848] mb-6 text-center">Контакты</h2>
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

      <style>{`
        @keyframes flip {
          0% { transform: translate(-50%, -50%) rotateY(0deg); }
          100% { transform: translate(-50%, -50%) rotateY(180deg); }
        }
        
        @keyframes fall {
          0% { transform: translate(-50%, -50%) rotateY(180deg); }
          60% { transform: translate(-50%, 100vh) rotateY(180deg) rotate(20deg); }
          70% { transform: translate(-50%, 95vh) rotateY(180deg) rotate(-10deg); }
          80% { transform: translate(-50%, 98vh) rotateY(180deg) rotate(5deg); }
          100% { transform: translate(-50%, 100vh) rotateY(180deg) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Index;
