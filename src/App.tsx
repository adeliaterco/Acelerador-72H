import { useState, useEffect, useRef } from 'react';
import { useScrollProgress, useDynamicCounters } from './hooks/useGamification';
import './styles/animations.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(900);
  const [unlockedIn, setUnlockedIn] = useState(210); // ✅ ALTERADO: 180 → 210 segundos (3min30s)
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vturbiLoaded, setVturbiLoaded] = useState(false);
  const { scrollProgress } = useScrollProgress();
  const { spotsLeft, viewers, buyers } = useDynamicCounters(8, 35, 45);
  const widgetRef = useRef(null);

  useEffect(() => {
    console.log('📊 Tracking: Página de upsell carregada');
  }, []);

  // Timer principal
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Timer de desbloqueio
  useEffect(() => {
    const unlockedTimer = setInterval(() => {
      setUnlockedIn(prev => {
        if (prev <= 1) {
          setIsUnlocked(true);
          playUnlockSound();
          loadHotmartWidget();
          
          setTimeout(() => {
            widgetRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 1000);

          console.log('📊 Tracking: 3 minutos e 30 segundos atingidos');
          clearInterval(unlockedTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(unlockedTimer);
  }, []);

  // Carrega Vturb
  useEffect(() => {
    const loadVturb = () => {
      if (!vturbiLoaded && !document.querySelector('script[src*="converteai"]')) {
        const script = document.createElement('script');
        script.src = 'https://scripts.converteai.net/ea3c2dc1-1976-40a2-b0fb-c5055f82bfaf/players/69479a3bb31bcf401dd8d6a2/v4/player.js';
        script.async = true;
        script.onload = () => {
          setVturbiLoaded(true);
          console.log('✅ Vturb carregado');
        };
        script.onerror = () => {
          console.error('❌ Erro ao carregar Vturb');
        };
        document.head.appendChild(script);
      }
    };

    loadVturb();
  }, [vturbiLoaded]);

  const loadHotmartWidget = () => {
    if (!document.querySelector('script[src*="hotmart"]')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).checkoutElements) {
          (window as any).checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
          console.log('✅ Hotmart Widget carregado');
        }
      };
      document.body.appendChild(script);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playUnlockSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('⚠️ Áudio não disponível');
    }
  };

  const handleDecline = () => {
    setShowModal(true);
  };

  // ✅ ALTERADO: Redirecionamento para o downsell
  const confirmDecline = () => {
    window.location.href = 'https://72hacelerador.vercel.app/';
  };

  const backToOffer = () => {
    setShowModal(false);
    widgetRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-green-500/30 p-3 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="bg-green-500 text-black font-black text-xs px-2 py-1 rounded-full flex-shrink-0">
              ✅ CONFIRMADO
            </span>
            <div className="text-yellow-400 font-black text-base">
              ⏰ {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-yellow-500 text-black font-black text-xs px-2 py-1 rounded-full flex-shrink-0">
              🎁 BONUS
            </span>
            <span className="bg-green-500/20 text-green-300 font-bold text-xs px-2 py-0.5 rounded-full border border-green-500 flex-shrink-0">
              👥 {viewers} viendo
            </span>
            <span className="bg-red-500/20 text-red-300 font-bold text-xs px-2 py-0.5 rounded-full border border-red-500 flex-shrink-0">
              🔥 {spotsLeft} spots
            </span>
          </div>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="fixed top-[70px] left-0 right-0 h-0.5 bg-gray-800 z-[40]">
        <div 
          className="h-full bg-gradient-to-r from-yellow-500 via-green-500 to-green-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* MAIN */}
      <main className="w-full">
        
        {/* VIDEO SECTION */}
        <section className="w-full px-3 pt-6 pb-4">
          
          {/* HEADLINE */}
          <div className="bg-gradient-to-r from-green-900/40 to-green-800/20 border-2 border-green-500 rounded-lg p-4 mb-4">
            <h1 className="text-xl font-black text-white text-center leading-tight">
              ¡Felicitaciones! Acabas de asegurar tu Plan de 21 Días
            </h1>
          </div>

          {/* COPY */}
          <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/20 border-2 border-yellow-500 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-200 font-semibold leading-relaxed text-center mb-3">
              Pero espera... En los próximos 2 minutos, verás exactamente por qué 
              el 89% de las reconquistas exitosas aceleran su proceso 
              a la MITAD usando algo que la mayoría NO conoce.
            </p>
            <p className="text-base text-yellow-300 font-bold text-center">
              ⏰ Mira hasta el final. Tu oferta exclusiva te está esperando.
            </p>
          </div>

          {/* VTURB PLAYER */}
          <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg shadow-green-500/20 mb-4 border border-green-500/30" style={{ aspectRatio: '16/9' }}>
            <div id="vturb-container" style={{ width: '100%', height: '100%' }}>
              <vturb-smartplayer 
                id="vid-69479a3bb31bcf401dd8d6a2" 
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%'
                }}>
              </vturb-smartplayer>
            </div>
          </div>

          {/* VTURB SCRIPT */}
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
            (function() {
              if (!window.vturb_loaded) {
                window.vturb_loaded = true;
                var s = document.createElement("script");
                s.src = "https://scripts.converteai.net/ea3c2dc1-1976-40a2-b0fb-c5055f82bfaf/players/69479a3bb31bcf401dd8d6a2/v4/player.js";
                s.async = true;
                s.type = "text/javascript";
                document.head.appendChild(s);
              }
            })();
          `}} />

          {/* TIMER */}
          <div className="bg-gradient-to-r from-orange-900/40 to-yellow-900/40 border-2 border-orange-500 rounded-lg p-4 text-center mb-6">
            <p className="text-xs text-gray-300 mb-2">
              Faltam para desbloquear:
            </p>
            <div className="text-3xl font-black text-orange-400">
              {formatTime(unlockedIn)}
            </div>
            <p className="text-xs text-orange-300 mt-2">
              Assista o vídeo até o final
            </p>
          </div>

        </section>

        {/* UNLOCK NOTIFICATION */}
        {isUnlocked && (
          <section className="w-full px-3 py-4 animate-fade-in">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-4 text-center shadow-lg shadow-green-500/50">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-lg font-black text-black mb-1">
                ✅ OFERTA DESBLOQUEADA!
              </h2>
              <p className="text-sm text-black/90 font-semibold">
                Tu oferta exclusiva está lista.
              </p>
            </div>
          </section>
        )}

        {/* HOTMART WIDGET */}
        {isUnlocked && (
          <section className="w-full px-3 py-6 bg-gradient-to-b from-black to-yellow-950/20 animate-fade-in" ref={widgetRef}>
            <h2 className="text-lg font-black text-white mb-4 text-center leading-tight">
              Accede al Acelerador 72H AHORA:
            </h2>

            <p className="text-sm text-yellow-200 mb-6 text-center font-semibold">
              ✨ Compra en 1 clic
            </p>

            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-3 border-green-500 rounded-2xl p-6 shadow-lg shadow-green-500/20 mb-6">
              <div id="hotmart-sales-funnel" className="min-h-[300px] flex items-center justify-center">
                <p className="text-gray-400 text-center text-sm">Cargando checkout...</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🔒</div>
                <p className="text-xs text-gray-300 font-semibold">Seguro</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">⚡</div>
                <p className="text-xs text-gray-300 font-semibold">Inmediato</p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🛡️</div>
                <p className="text-xs text-gray-300 font-semibold">Garantía</p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

            <div className="text-center">
              <p className="text-xs text-gray-400 mb-3">
                ¿Prefieres continuar sin el Acelerador?
              </p>

              <button
                onClick={handleDecline}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-sm py-3 px-4 rounded-lg border border-gray-600 transition-all active:scale-95"
              >
                ❌ No, continuar sin Acelerador
              </button>

              <p className="text-xs text-yellow-400 mt-3 font-semibold">
                ℹ️ Oferta exclusiva solo en esta página
              </p>
            </div>
          </section>
        )}

        {/* PRICE SECTION */}
        {isUnlocked && (
          <section className="w-full px-3 py-6 bg-gradient-to-b from-black to-yellow-950/30 animate-fade-in">
            <div className="text-center">
              <div className="text-2xl text-gray-500 line-through mb-2 font-bold">
                $67
              </div>

              <div className="bg-red-500 text-white font-black text-xs px-3 py-1 rounded-full inline-block mb-4 shadow-lg shadow-red-500/50">
                🔥 70% OFF
              </div>

              <div className="text-5xl font-black text-yellow-400 mb-3 drop-shadow-lg">
                $17
              </div>

              <p className="text-sm text-yellow-200 font-semibold mb-4">
                Pago único. Acceso de por vida.
              </p>

              <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-2 border-red-500 rounded-lg p-3 mb-4">
                <p className="text-xs text-red-200 font-bold">
                  ⏰ Solo en los próximos {formatTime(timeLeft)} minutos
                </p>
              </div>

              <div className="text-lg font-black text-green-400">
                Ahorras $50
              </div>
            </div>
          </section>
        )}

        {/* GUARANTEE SECTION */}
        {isUnlocked && (
          <section className="w-full px-3 py-6 bg-gradient-to-b from-black to-green-950/20 animate-fade-in">
            <span className="bg-green-500 text-black font-black text-xs px-3 py-1 rounded-full inline-block mb-4 shadow-lg shadow-green-500/50">
              🛡️ GARANTÍA 30 DÍAS
            </span>

            <h2 className="text-base font-black text-white mb-4 text-center leading-tight">
              Prueba sin riesgo
            </h2>

            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-2 border-green-500 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-3 leading-relaxed text-center">
                Si en 30 días no estás satisfecho, te devuelvo el 100% de tu dinero.
              </p>

              <p className="text-base font-black text-green-400 mb-3 text-center">
                Sin preguntas.
              </p>

              <p className="text-xs text-gray-400 text-center italic mb-4">
                (Y mantienes acceso al Plan de 21 Días)
              </p>

              <div className="w-12 h-0.5 bg-green-500 mx-auto my-3"></div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-lg text-green-400 flex-shrink-0">✓</span>
                  <p className="text-xs text-gray-300">47 scripts de mensajes</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-lg text-green-400 flex-shrink-0">✓</span>
                  <p className="text-xs text-gray-300">Simulador en tiempo real</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-lg text-green-400 flex-shrink-0">✓</span>
                  <p className="text-xs text-gray-300">12 audio-guías de emergencia</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-lg text-green-400 flex-shrink-0">✓</span>
                  <p className="text-xs text-gray-300">Dinero de vuelta en 24-48h</p>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* MODAL - ✅ CORRIGIDO COM MAX-HEIGHT E OVERFLOW */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-black border-3 border-yellow-500 rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-2xl shadow-yellow-500/50 animate-fade-in">
            
            <div className="text-4xl text-center mb-4">🤔</div>

            <h2 className="text-lg font-black text-white mb-4 text-center leading-tight">
              Solo para confirmar...
            </h2>

            <p className="text-sm text-yellow-200 mb-6 text-center leading-relaxed">
              ¿Prefieres seguir solo con el Plan de 21 Días?
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 bg-black/40 p-3 rounded">
                <span className="text-lg text-yellow-400 flex-shrink-0">💰</span>
                <p className="text-xs text-white">70% de descuento ($50)</p>
              </div>

              <div className="flex items-start gap-2 bg-black/40 p-3 rounded">
                <span className="text-lg text-yellow-400 flex-shrink-0">💬</span>
                <p className="text-xs text-white">47 scripts probados</p>
              </div>

              <div className="flex items-start gap-2 bg-black/40 p-3 rounded">
                <span className="text-lg text-yellow-400 flex-shrink-0">🎯</span>
                <p className="text-xs text-white">Simulador en tiempo real</p>
              </div>

              <div className="flex items-start gap-2 bg-black/40 p-3 rounded">
                <span className="text-lg text-yellow-400 flex-shrink-0">🎧</span>
                <p className="text-xs text-white">12 audio-guías</p>
              </div>

              <div className="flex items-start gap-2 bg-black/40 p-3 rounded">
                <span className="text-lg text-yellow-400 flex-shrink-0">⚡</span>
                <p className="text-xs text-white">Reduce tiempo a la mitad</p>
              </div>
            </div>

            <div className="w-full h-px bg-yellow-500/30 mb-6"></div>

            <div className="flex flex-col gap-2">
              <button
                onClick={backToOffer}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-black text-sm py-3 px-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-green-500/50"
              >
                ✅ Sí, quiero el Acelerador
              </button>

              <button
                onClick={confirmDecline}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-sm py-3 px-4 rounded-lg border border-gray-600 transition-all active:scale-95"
              >
                No, continuar sin Acelerador
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        vturb-smartplayer {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default App;