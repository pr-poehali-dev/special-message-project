import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {!isOpen ? (
          <div className="relative animate-fade-in">
            <div 
              className="relative bg-[#e8d5b7] shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #e8d5b7 0%, #f5e6d3 50%, #e8d5b7 100%)',
              }}
            >
              <div className="relative aspect-[1.414/1] flex items-center justify-center">
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
                  }}
                />
                
                <div 
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: '40%',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    background: 'linear-gradient(to bottom, #d4a373, #c89968)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                />

                <button
                  onClick={() => setIsOpen(true)}
                  className="relative z-10 mt-12 hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src="https://cdn.poehali.dev/files/7d89ea53-68de-4c78-8e71-728ba4aca4b4.jpg"
                    alt="Нажмите, чтобы открыть"
                    className="w-48 h-48 object-contain drop-shadow-2xl"
                  />
                </button>

                <div className="absolute bottom-8 left-8 text-primary/60 italic text-sm font-serif">
                  От: Код публичности
                </div>
                <div className="absolute bottom-8 right-8 text-primary/60 italic text-sm font-serif">
                  Для: Вас
                </div>
              </div>
            </div>

            <p className="text-center mt-6 text-muted-foreground animate-pulse">
              Нажмите на печать, чтобы открыть послание
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-card p-8 md:p-12 shadow-2xl border-4 border-primary/20 relative overflow-hidden">
              <div className="border-8 border-double border-primary/30 p-8 md:p-12 relative">
                <div className="text-center space-y-8">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-5xl">🎉</span>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold text-primary italic">
                    Поздравляем!
                  </h1>

                  <div className="prose prose-lg mx-auto text-foreground">
                    <p className="text-xl md:text-2xl leading-relaxed font-light">
                      И воздаетоль нозм нарва,<br />
                      и всемик паренв.
                    </p>
                  </div>

                  <div className="flex justify-center pt-6">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 pt-4 text-muted-foreground">
                    <span className="text-sm">С уважением и наилучшими пожеланиями</span>
                  </div>

                  <div className="pt-8">
                    <Button 
                      onClick={() => setIsOpen(false)}
                      variant="outline"
                      className="border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground"
                    >
                      Закрыть послание
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-card p-8 shadow-xl border-2 border-primary/20">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Контакты</h2>
              <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Электронная почта</h3>
                  <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@example.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Телефон</h3>
                  <a href="tel:+71234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +7 (123) 456-78-90
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Веб-сайт</h3>
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    www.example.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="fixed bottom-4 left-0 right-0 text-center text-xs text-muted-foreground">
        © 2024 Код публичности
      </footer>
    </div>
  );
};

export default Index;
