import { Play, ArrowRight, Users, Headphones, Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, PageTransition } from '@/components';
import { ContentWrapper } from '@/layouts';
import { APP_CONFIG } from '@/constants';

export function Home() {
  const steps = [
    { num: 1, title: 'Watch Welcome Video', desc: 'Get an overview of the platform and how it works.' },
    { num: 2, title: 'Click Get Started On The Menu To Send Your First Attack', desc: 'Launch your first attack and see the power in action.' },
    { num: 3, title: 'Execute and Prepare For Financial Freedom', desc: 'Stay consistent, follow the system, and build your future.' }
  ];

  const sessions = [
    { date: 'Tuesday, May 7 • 6:00 PM EST', title: 'Dispute Academy Live', instructor: 'Marcus C.', img: 'https://i.pravatar.cc/150?u=1' },
    { date: 'Thursday, May 9 • 6:00 PM EST', title: 'Advanced Attack Strategies', instructor: 'Tasha R.', img: 'https://i.pravatar.cc/150?u=2' },
    { date: 'Tuesday, May 14 • 6:00 PM EST', title: 'Q&A Power Hour', instructor: 'Kevin L.', img: 'https://i.pravatar.cc/150?u=3' },
  ];

  return (
    <PageTransition>
      <ContentWrapper className="relative w-full pb-12 max-w-full px-4 md:px-8 xl:px-12">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Important Banner */}
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-1.5 rounded-full text-xs font-bold border border-primary-100 shadow-sm mb-5">
            <div className="bg-primary-500 rounded-full p-0.5">
              <Play className="w-3 h-3 text-white fill-current" />
            </div>
            IMPORTANT: ENROLL YOUR CLIENTS NOW
          </div>
        </div>

        {/* Welcome Text */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to M2 Phenom, Dion <span className="inline-block animate-wave origin-bottom-right">👋</span></h1>
          <p className="text-surface-500 text-sm">Your success starts here. Follow these quick steps to get set up and start winning.</p>
        </div>

        {/* Top Grid: Steps & Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left: Steps */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-surface-200 z-0" />
              
              {steps.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={step.num} 
                  className="flex items-start gap-4 relative z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                    {step.num}
                  </div>
                  <Card className="p-4 flex-1 hover:border-primary-300 transition-colors cursor-default">
                    <h3 className="font-bold text-foreground text-sm mb-1">{step.title}</h3>
                    <p className="text-surface-500 text-xs">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Video Card */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full bg-surface rounded-2xl overflow-hidden relative shadow-sm border border-border flex flex-col"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/vr4PY1Ie-YY?si=yIdQyNxIU19rfPRu" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>

              <div className="bg-surface p-6 border-t border-border z-20 flex items-end justify-between w-full">
                <div>
                  <p className="text-surface-500 text-xs font-medium mb-1 uppercase tracking-wider">Welcome to</p>
                  <h2 className="text-2xl font-black text-foreground tracking-tight leading-none mb-1">M2 PHENOM</h2>
                  <p className="text-primary-500 text-xs font-bold tracking-widest flex items-center gap-1">
                    SEE HOW IT WORKS <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
                <div className="flex items-center gap-2 text-surface-600 text-sm bg-surface-50 border border-border px-3 py-1.5 rounded-md font-medium">
                  <Clock className="w-4 h-4"/> 1:51
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Grid: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          
          {/* Card 1: Free Communities */}
          <Card className="p-6 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-surface-100 rounded-lg">
                <Users className="w-5 h-5 text-surface-600" />
              </div>
              <h3 className="font-bold text-foreground">Free Communities</h3>
            </div>
            <p className="text-xs text-surface-500 mb-6">Join our free communities and connect with others.</p>
            
            <div className="space-y-4 mt-auto">
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1">Join Free Community</h4>
                    <p className="text-xs text-surface-600">Connect, share insights, and grow with other members.</p>
                  </div>
                </div>
                <Button className="w-full bg-brand-gradient border-0 text-white font-bold h-10 shadow-sm">Join Community</Button>
              </div>

              <div className="bg-surface-50 border border-surface-200 rounded-xl p-4 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-surface-200 rounded-full flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5 text-surface-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1">Technical Support Community</h4>
                    <p className="text-xs text-surface-600">Get help, ask questions, and receive technical support.</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-surface font-bold h-10">Join Community</Button>
              </div>
            </div>
          </Card>

          {/* Card 2: Live Training Calendar */}
          <Card className="p-6 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-surface-100 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-surface-600" />
              </div>
              <h3 className="font-bold text-foreground">Live Training Calendar</h3>
            </div>
            <p className="text-xs text-surface-500 mb-6">Stay up to date with training days, off days, and holidays.</p>
            
            <div className="flex flex-col xl:flex-row gap-6 mt-auto">
              {/* Fake Calendar View */}
              <div className="flex-1 bg-surface-50 border border-surface-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <button className="p-1 hover:bg-surface-200 rounded transition-colors"><ChevronLeft className="w-4 h-4 text-surface-500" /></button>
                  <span className="text-sm font-bold text-foreground">May 2026</span>
                  <button className="p-1 hover:bg-surface-200 rounded transition-colors"><ChevronRight className="w-4 h-4 text-surface-500" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
                    <div key={d} className="text-[10px] font-bold text-surface-400">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {/* Mock calendar grid */}
                  <div className="p-1.5 text-surface-300">26</div><div className="p-1.5 text-surface-300">27</div><div className="p-1.5 text-surface-300">28</div><div className="p-1.5 text-surface-300">29</div><div className="p-1.5 text-surface-300">30</div><div className="p-1.5 text-foreground">1</div><div className="p-1.5 text-foreground">2</div>
                  <div className="p-1.5 text-foreground">3</div><div className="p-1.5 text-foreground">4</div><div className="p-1.5 text-foreground">5</div><div className="p-1.5 text-foreground">6</div>
                  <div className="p-1.5 bg-green-100 text-green-700 font-bold rounded-full">7</div>
                  <div className="p-1.5 text-foreground">8</div>
                  <div className="p-1.5 bg-green-100 text-green-700 font-bold rounded-full">9</div>
                  <div className="p-1.5 text-foreground">10</div><div className="p-1.5 text-foreground">11</div><div className="p-1.5 text-foreground">12</div><div className="p-1.5 text-foreground">13</div>
                  <div className="p-1.5 bg-green-100 text-green-700 font-bold rounded-full">14</div>
                  <div className="p-1.5 text-foreground">15</div>
                  <div className="p-1.5 bg-primary-100 text-primary-700 font-bold rounded-full">16</div>
                  {/* Rest cut for brevity visually */}
                  <div className="p-1.5 text-foreground">17</div><div className="p-1.5 text-foreground">18</div><div className="p-1.5 text-foreground">19</div><div className="p-1.5 text-foreground">20</div><div className="p-1.5 text-foreground">21</div><div className="p-1.5 text-foreground">22</div><div className="p-1.5 text-foreground">23</div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-surface-200 text-[10px] font-medium text-surface-500 justify-center">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> Training</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-surface-300"></div> Off</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary-500"></div> Holiday</div>
                </div>
              </div>

              {/* Upcoming Sessions List */}
              <div className="flex-1 flex flex-col">
                <h4 className="text-xs font-bold text-foreground mb-4">Upcoming Sessions</h4>
                <div className="space-y-4 mb-4 flex-1">
                  {sessions.map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <img src={s.img} className="w-10 h-10 rounded-full border border-surface-200" alt="instructor" />
                      <div>
                        <div className="text-[10px] text-surface-500 mb-0.5">{s.date}</div>
                        <div className="text-xs font-bold text-foreground leading-tight">{s.title}</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-[10px] text-surface-500">Instructor: {s.instructor}</div>
                          <div className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase">Live</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full text-xs font-bold h-9 bg-surface">
                  View Full Schedule <CalendarIcon className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Card 3: 1:1 Walkthrough Call */}
          <div className="flex flex-col gap-4 h-full">
            <Card className="p-6 flex-1 hover:shadow-md transition-shadow relative overflow-hidden bg-surface">
              {/* Headphones Image BG */}
              <div className="absolute right-[20px] top-1/2 -translate-y-1/2 opacity-90">
                <img src="src\assets\head-set.png" className="w-50 h-50 object-contain drop-shadow-2xl mix-blend-multiply" alt="headphones" style={{ filter: 'drop-shadow(0 20px 13px rgba(0,0,0,0.15))' }} />
              </div>

              <div className="relative z-10 w-2/3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-surface-100 p-1.5 rounded-lg"><Headphones className="w-4 h-4 text-surface-700" /></div>
                  <h3 className="font-bold text-foreground leading-tight">Book a 1:1 Walkthrough Call</h3>
                </div>
                <p className="text-[11px] text-surface-500 mb-4 leading-relaxed">Get personalized help and a step-by-step walkthrough of the platform.</p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-medium text-surface-700"><CheckCircle2 className="w-3.5 h-3.5 text-primary-500" /> Learn the system faster</li>
                  <li className="flex items-center gap-2 text-xs font-medium text-surface-700"><CheckCircle2 className="w-3.5 h-3.5 text-primary-500" /> Get expert guidance</li>
                  <li className="flex items-center gap-2 text-xs font-medium text-surface-700"><CheckCircle2 className="w-3.5 h-3.5 text-primary-500" /> Maximize your results</li>
                </ul>

                <Button className="bg-brand-gradient border-0 text-white font-bold h-10 px-6 shadow-md">
                  Book Your Call <CalendarIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 flex flex-col items-center text-center hover:border-primary-300 transition-colors cursor-pointer group bg-surface">
                <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary-100 transition-colors">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <h4 className="text-xs font-bold text-foreground mb-1">Community Help</h4>
                <p className="text-[10px] text-surface-500 mb-2">Get help from our community.</p>
                <div className="text-[10px] font-bold text-primary-600 flex items-center mt-auto">Go to Community <ArrowRight className="w-3 h-3 ml-1" /></div>
              </Card>

              <Card className="p-4 flex flex-col items-center text-center hover:border-primary-300 transition-colors cursor-pointer group bg-surface">
                <div className="w-10 h-10 bg-surface-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-surface-100 transition-colors">
                  <Wrench className="w-5 h-5 text-surface-700" />
                </div>
                <h4 className="text-xs font-bold text-foreground mb-1">Technical Support</h4>
                <p className="text-[10px] text-surface-500 mb-2">Having technical issues?</p>
                <div className="text-[10px] font-bold text-primary-600 flex items-center mt-auto">Get Support <ArrowRight className="w-3 h-3 ml-1" /></div>
              </Card>
            </div>
          </div>

        </div>
      </ContentWrapper>
    </PageTransition>
  );
}
