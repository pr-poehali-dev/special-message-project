import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {!isOpen ? (
          <div 
            className="fixed inset-0 cursor-pointer group"
            onClick={() => setIsOpen(true)}
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/files/7d89ea53-68de-4c78-8e71-728ba4aca4b4.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center animate-pulse">
                <p className="text-white text-2xl md:text-4xl font-bold drop-shadow-2xl bg-black/30 px-8 py-4 rounded-lg backdrop-blur-sm">
                  Нажмите, чтобы открыть послание
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-2xl space-y-12">
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

              <div className="bg-card p-8 shadow-xl border-2 border-primary/20">
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

              <footer className="text-center text-xs text-muted-foreground pb-4">
                © 2024 Код публичности
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;