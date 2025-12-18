import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const speciesData = [
  { id: 'a', symbol: '○', color: '#0EA5E9', name: 'Вид А' },
  { id: 'b', symbol: '△', color: '#8B5CF6', name: 'Вид B' },
  { id: 'c', symbol: '◇', color: '#F97316', name: 'Вид C' },
  { id: 'd', symbol: '□', color: '#10B981', name: 'Вид D' },
  { id: 'e', symbol: '★', color: '#EC4899', name: 'Вид E' },
  { id: 'f', symbol: '▲', color: '#1A1F2C', name: 'Вид F' },
  { id: 'g', symbol: '●', color: '#6366F1', name: 'Вид G' },
  { id: 'h', symbol: '✕', color: '#8E9196', name: 'Вид H' },
];

const timePoints = ['a', 'b', 'c', 'd', 'e'];

const alleleDistribution: Record<string, Record<string, number>> = {
  a: { '○': 30, '△': 20, '●': 15, '◇': 10, '□': 8, '★': 7, '▲': 5, '✕': 5 },
  b: { '○': 15, '△': 30, '●': 18, '◇': 12, '□': 10, '★': 8, '▲': 4, '✕': 3 },
  c: { '○': 8, '△': 12, '●': 5, '◇': 20, '□': 25, '★': 15, '▲': 10, '✕': 5 },
  d: { '○': 5, '△': 8, '●': 3, '◇': 15, '□': 30, '★': 20, '▲': 12, '✕': 7 },
  e: { '○': 2, '△': 5, '●': 2, '◇': 10, '□': 35, '★': 18, '▲': 15, '✕': 13 },
};

const Index = () => {
  const [selectedTime, setSelectedTime] = useState<string>('c');
  const [highlightedSpecies, setHighlightedSpecies] = useState<string | null>(null);

  const getSpeciesForTime = (time: string) => {
    const distribution = alleleDistribution[time];
    return Object.entries(distribution)
      .filter(([_, count]) => count > 5)
      .sort((a, b) => b[1] - a[1]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Icon name="Dna" size={32} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">ЭвоГен</h1>
              <p className="text-sm text-muted-foreground">Эволюция и генофонд</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="interactive" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
            <TabsTrigger value="interactive" className="text-sm">
              <Icon name="LineChart" size={16} className="mr-2" />
              Интерактивные схемы
            </TabsTrigger>
            <TabsTrigger value="theory" className="text-sm">
              <Icon name="Book" size={16} className="mr-2" />
              Теория
            </TabsTrigger>
            <TabsTrigger value="practice" className="text-sm">
              <Icon name="FlaskConical" size={16} className="mr-2" />
              Практика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interactive" className="space-y-8 animate-in fade-in-50 duration-500">
            <Card className="p-8 border-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Филогенетическое дерево (Рис. 3)</h2>
                  <p className="text-muted-foreground text-sm">
                    Интерактивная визуализация изменения генофонда популяции во времени.
                    Различные фигуры обозначают разные аллели генофонда.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 relative overflow-hidden">
                  <svg viewBox="0 0 800 400" className="w-full h-[400px]">
                    <defs>
                      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F1F0FB" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#F1F0FB" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    
                    <rect x="0" y="0" width="800" height="400" fill="url(#bgGradient)" />
                    
                    {[1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={i * 80}
                        x2="800"
                        y2={i * 80}
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    ))}

                    <path
                      d="M 50 200 Q 200 180, 300 150 Q 400 120, 550 100 Q 650 80, 750 70"
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth="3"
                      opacity="0.4"
                    />
                    <path
                      d="M 50 200 Q 200 220, 300 250 Q 400 280, 550 300 Q 650 320, 750 330"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="3"
                      opacity="0.4"
                    />

                    {timePoints.map((time, idx) => {
                      const x = 80 + idx * 160;
                      const species = getSpeciesForTime(time);
                      const isSelected = selectedTime === time;
                      
                      return (
                        <g key={time}>
                          <line
                            x1={x}
                            y1="40"
                            x2={x}
                            y2="360"
                            stroke={isSelected ? '#0EA5E9' : '#CBD5E1'}
                            strokeWidth={isSelected ? '3' : '2'}
                            strokeDasharray={isSelected ? '0' : '5,5'}
                          />
                          
                          <circle
                            cx={x}
                            cy="380"
                            r="16"
                            fill={isSelected ? '#0EA5E9' : '#F1F0FB'}
                            stroke={isSelected ? '#0EA5E9' : '#8E9196'}
                            strokeWidth="2"
                            className="cursor-pointer hover:fill-primary/20 transition-all"
                            onClick={() => setSelectedTime(time)}
                          />
                          <text
                            x={x}
                            y="385"
                            textAnchor="middle"
                            className="text-xs font-mono font-bold"
                            fill={isSelected ? '#FFFFFF' : '#1A1F2C'}
                          >
                            {time}
                          </text>

                          {species.slice(0, 8).map(([symbol, count], i) => {
                            const speciesInfo = speciesData.find(s => s.symbol === symbol);
                            const yPos = 80 + i * 35;
                            const isHighlighted = highlightedSpecies === speciesInfo?.id;
                            
                            return (
                              <g
                                key={symbol}
                                opacity={!highlightedSpecies || isHighlighted ? 1 : 0.3}
                                className="cursor-pointer transition-all"
                                onMouseEnter={() => setHighlightedSpecies(speciesInfo?.id || null)}
                                onMouseLeave={() => setHighlightedSpecies(null)}
                              >
                                <circle
                                  cx={x}
                                  cy={yPos}
                                  r={isHighlighted ? '10' : '8'}
                                  fill={speciesInfo?.color || '#8E9196'}
                                  stroke="#FFFFFF"
                                  strokeWidth="2"
                                />
                                {isSelected && (
                                  <text
                                    x={x + 18}
                                    y={yPos + 4}
                                    className="text-[10px] font-mono"
                                    fill="#1A1F2C"
                                  >
                                    {count}%
                                  </text>
                                )}
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}

                    <text x="10" y="20" className="text-xs font-mono fill-muted-foreground">
                      Численность аллелей (%)
                    </text>
                    <text x="700" y="395" className="text-xs font-mono fill-muted-foreground">
                      время →
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {speciesData.map((species) => (
                    <Card
                      key={species.id}
                      className={`p-3 cursor-pointer transition-all border-2 ${
                        highlightedSpecies === species.id
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onMouseEnter={() => setHighlightedSpecies(species.id)}
                      onMouseLeave={() => setHighlightedSpecies(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: species.color }}
                        >
                          {species.symbol}
                        </div>
                        <span className="text-sm font-medium">{species.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">Как работать со схемой:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Наведите курсор на вид, чтобы выделить его на всей временной шкале</li>
                      <li>Кликните на временную точку (a, b, c, d, e) для просмотра распределения</li>
                      <li>Размер точек соответствует численности аллелей в генофонде</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="theory" className="animate-in fade-in-50 duration-500">
            <div className="grid gap-6">
              <Card className="p-8 border-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="BookOpen" size={28} className="text-primary" />
                    <h2 className="text-2xl font-bold">Теоретические основы</h2>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Icon name="Dna" size={20} className="text-primary" />
                        Генофонд популяции
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Генофонд</strong> — это совокупность всех аллелей генов, 
                        присутствующих в популяции. Изменение генофонда во времени отражает эволюционные процессы.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Icon name="GitBranch" size={20} className="text-primary" />
                        Видообразование
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        <strong className="text-foreground">Видообразование</strong> происходит, когда популяции 
                        становятся репродуктивно изолированными и накапливают генетические различия.
                      </p>
                      <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                        <p className="text-sm font-mono">
                          <span className="text-primary font-bold">Аллопатрическое:</span> географическая изоляция
                        </p>
                        <p className="text-sm font-mono">
                          <span className="text-primary font-bold">Симпатрическое:</span> в пределах одного ареала
                        </p>
                        <p className="text-sm font-mono">
                          <span className="text-primary font-bold">Парапатрическое:</span> в смежных популяциях
                        </p>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Icon name="TrendingUp" size={20} className="text-primary" />
                        Факторы эволюции
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { name: 'Мутации', desc: 'Источник новых аллелей', icon: 'Zap' },
                          { name: 'Естественный отбор', desc: 'Направленное изменение', icon: 'Filter' },
                          { name: 'Дрейф генов', desc: 'Случайные изменения', icon: 'Waves' },
                          { name: 'Миграция', desc: 'Обмен генами', icon: 'MoveRight' },
                        ].map((factor) => (
                          <Card key={factor.name} className="p-4 bg-muted/20 border-primary/10">
                            <div className="flex items-start gap-3">
                              <Icon name={factor.icon as any} size={20} className="text-primary mt-1" />
                              <div>
                                <h4 className="font-bold text-sm mb-1">{factor.name}</h4>
                                <p className="text-xs text-muted-foreground">{factor.desc}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="animate-in fade-in-50 duration-500">
            <div className="space-y-6">
              <Card className="p-8 border-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Microscope" size={28} className="text-primary" />
                    <h2 className="text-2xl font-bold">Практические задания</h2>
                  </div>

                  <div className="space-y-6">
                    <section className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-primary/20">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                          1
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">Выделение видов на рисунке 3</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Изучите филогенетическое дерево и определите участки, соответствующие отдельным видам.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card p-4 rounded-lg space-y-3">
                        <p className="text-sm font-semibold">Методика анализа:</p>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                          <li>Найдите участки, где доминирует один тип аллелей (более 30%)</li>
                          <li>Проследите преемственность аллелей между временными точками</li>
                          <li>Определите моменты ветвления линий (точки видообразования)</li>
                          <li>Выделите временные интервалы существования каждого вида</li>
                        </ol>
                        
                        <div className="mt-4 p-3 bg-muted/30 rounded border-l-4 border-primary">
                          <p className="text-sm">
                            <Icon name="Lightbulb" size={16} className="inline text-primary mr-2" />
                            <strong>Подсказка:</strong> Виды D (□) и E (★) показывают явное доминирование в поздние временные периоды (d-e).
                          </p>
                        </div>
                      </div>
                    </section>

                    <section className="p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg border-2 border-secondary/20">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
                          2
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">Сравнение степени родственности</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Определите, какие виды наиболее родственны, анализируя их общих предков.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card p-4 rounded-lg space-y-3">
                        <p className="text-sm font-semibold">Критерии родственности:</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5" />
                            <span><strong>Точка дивергенции:</strong> чем позже разошлись виды, тем они ближе</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5" />
                            <span><strong>Общие аллели:</strong> наличие схожих генетических маркеров</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5" />
                            <span><strong>Траектория эволюции:</strong> сходство путей изменения генофонда</span>
                          </li>
                        </ul>

                        <div className="mt-4 grid md:grid-cols-2 gap-3">
                          <div className="p-3 bg-primary/5 rounded border border-primary/20">
                            <p className="text-xs font-bold mb-1 text-primary">БЛИЗКИЕ ВИДЫ</p>
                            <p className="text-sm font-mono">Виды D (□) и F (▲)</p>
                            <p className="text-xs text-muted-foreground mt-1">Разделились в точке d, имеют общего недавнего предка</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded border border-border">
                            <p className="text-xs font-bold mb-1 text-secondary">ДАЛЬНИЕ ВИДЫ</p>
                            <p className="text-sm font-mono">Виды A (○) и H (✕)</p>
                            <p className="text-xs text-muted-foreground mt-1">Дивергировали в точке a, значительные различия</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border-2 border-accent/20">
                      <div className="flex items-start gap-3">
                        <Icon name="Target" size={24} className="text-accent mt-1" />
                        <div>
                          <h3 className="font-bold text-lg mb-2">Дополнительное задание</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Постройте филогенетическое дерево на основе данных о распределении аллелей, 
                            отразив все точки видообразования и вымирания.
                          </p>
                          <Button className="mt-2">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать шаблон
                          </Button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Dna" size={18} className="text-primary" />
              <span>ЭвоГен — образовательная платформа по эволюционной биологии</span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="Mail" size={16} />
                Контакты
              </button>
              <button className="hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="HelpCircle" size={16} />
                Помощь
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
