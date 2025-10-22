import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center animate-fade-in">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Award" className="text-primary" size={24} />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-primary">
                Поздравляем! 🎉
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Особенное послание от Кода публичности
            </p>
          </header>

          <Card className="p-8 md:p-12 bg-card border-4 border-primary/20 shadow-2xl animate-scale-in relative overflow-hidden">
            <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
              <Icon name="Stamp" size={64} className="text-primary" />
            </div>
            <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10">
              <Icon name="Stamp" size={64} className="text-primary" />
            </div>

            <div className="border-8 border-double border-primary/30 p-8 md:p-12 relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-background">
                <div className="w-full h-full border-t-4 border-l-4 border-primary/30"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-background">
                <div className="w-full h-full border-t-4 border-r-4 border-primary/30"></div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-background">
                <div className="w-full h-full border-b-4 border-l-4 border-primary/30"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background">
                <div className="w-full h-full border-b-4 border-r-4 border-primary/30"></div>
              </div>

              <div className="text-center space-y-8">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="PartyPopper" className="text-primary" size={40} />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-primary italic">
                  Поздравление
                </h2>

                <div className="prose prose-lg mx-auto text-foreground">
                  <p className="text-xl md:text-2xl leading-relaxed font-light">
                    И воздаетоль нозм нарва,<br />
                    и всемик паренв.
                  </p>
                </div>

                <div className="flex justify-center pt-6">
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Ribbon" size={20} />
                    <span className="text-sm">С уважением</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Heart" size={20} />
                    <span className="text-sm">С наилучшими пожеланиями</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center transform rotate-12">
                <Icon name="CheckCircle" className="text-primary" size={24} />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center transform -rotate-12">
                <Icon name="Star" className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <section className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
                Контакты
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <Card className="p-8 md:p-10 bg-card border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name="Mail" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary mb-1">Электронная почта</h3>
                      <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name="Phone" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary mb-1">Телефон</h3>
                      <a href="tel:+71234567890" className="text-muted-foreground hover:text-primary transition-colors">
                        +7 (123) 456-78-90
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name="MapPin" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary mb-1">Адрес</h3>
                      <p className="text-muted-foreground">
                        г. Москва, ул. Примерная, д. 1
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name="Globe" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary mb-1">Веб-сайт</h3>
                      <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        www.example.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-primary/10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <p className="text-muted-foreground text-center">Свяжитесь с нами удобным способом:</p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                    >
                      <Icon name="Send" className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                      Написать письмо
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <footer className="text-center py-8 animate-fade-in">
            <div className="flex justify-center gap-2 mb-4">
              <Icon name="Sparkles" className="text-primary" size={20} />
              <Icon name="Heart" className="text-primary" size={20} />
              <Icon name="Sparkles" className="text-primary" size={20} />
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Код публичности. Все права защищены.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
