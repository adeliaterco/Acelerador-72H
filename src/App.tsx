import { useState, useEffect } from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState(900);
  const [showModal, setShowModal] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [userData] = useState({
    timeSeparation: '1-4 SEMANAS',
    currentSituation: 'ME IGNORA',
    commitmentLevel: 'LO QUIERO MUCHO'
  });

  useEffect(() => {
    console.log('📊 Tracking: Página de upsell carregada');
    console.log('📊 Dados do usuário:', userData);
  }, [userData]);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).checkoutElements) {
        (window as any).checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        console.log('✅ Hotmart Widget carregado com sucesso');
      }
    };
    script.onerror = () => {
      console.error('❌ Erro ao carregar Hotmart Widget');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToWidget = () => {
    console.log('📊 Tracking: Scroll para widget');
    document.getElementById('hotmart-sales-funnel')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleDecline = () => {
    setShowModal(true);
    console.log('📊 Tracking: Usuário clicou em recusar');
  };

  const confirmDecline = () => {
    console.log('📊 Tracking: Upsell recusado definitivamente');
    alert('Redirecionando para área de membros...');
  };

  const backToOffer = () => {
    setShowModal(false);
    scrollToWidget();
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-yellow-500/30 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="bg-yellow-500 text-black font-black text-xs md:text-sm px-3 py-1.5 rounded-full">
            ✨ ANÁLISIS NIVEL 2 DESBLOQUEADO
          </span>
          <div className="text-red-400 font-black text-lg md:text-2xl animate-pulse-custom">
            ⏰ {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      <section className="pt-24 pb-12 px-4 fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            ESPERA... ANTES DE ACCEDER AL PLAN DE 21 DÍAS
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-yellow-400 font-bold mb-4 leading-snug">
            Ricardo detectó algo en tu análisis que NO TE DIJE antes...
          </h2>

          <div className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-2 border-red-500 rounded-xl p-6 mb-8">
            <div className="text-3xl md:text-4xl mb-3">⚠️</div>
            <p className="text-lg md:text-xl text-red-200 font-semibold leading-relaxed">
              (Y si no corriges esto en las próximas 72 horas, el Plan de 21 Días puede NO FUNCIONAR para tu caso específico)
            </p>
          </div>

          <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>Mira, sé que acabas de tomar la decisión correcta.</p>

            <p className="text-white font-semibold">
              El Plan de 21 Días funciona. +12.000 personas lo prueban.
            </p>

            <p>
              Pero cuando analicé tu situación específica, el sistema detectó algo que me hizo activar este protocolo de emergencia...
            </p>

            <p className="text-yellow-200">
              Basado en tu tiempo de separación, situación actual y nivel de compromiso, tu caso necesita algo que el 87% de las personas NO necesita...
            </p>

            <p className="text-2xl md:text-3xl font-black text-yellow-400 mt-8">
              Necesitas el ACELERADOR.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-black to-red-950/20 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/20 via-orange-600/10 to-red-600/10 border-2 border-red-500 rounded-2xl p-6 md:p-10 shadow-2xl shadow-red-500/20">
            <div className="text-5xl md:text-6xl mb-6 text-center">⚠️</div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 text-center leading-tight">EL PROBLEMA QUE NADIE TE DICE</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed text-center">El Plan de 21 Días te enseña QUÉ hacer en cada fase del proceso de reconquista.</p>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <div className="bg-red-900/40 border-2 border-red-400 rounded-xl p-6 mb-8">
              <p className="text-xl md:text-2xl font-black text-red-200 text-center leading-snug">Pero NO te da las PALABRAS EXACTAS para cada situación</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-black/40 border border-red-500/30 rounded-lg p-5 text-center">
                <div className="text-4xl mb-3">😰</div>
                <p className="text-base md:text-lg text-white font-bold mb-2">¿Qué digo si me ignora?</p>
              </div>
              <div className="bg-black/40 border border-red-500/30 rounded-lg p-5 text-center">
                <div className="text-4xl mb-3">😔</div>
                <p className="text-base md:text-lg text-white font-bold mb-2">¿Qué digo si respondió frío?</p>
              </div>
              <div className="bg-black/40 border border-red-500/30 rounded-lg p-5 text-center">
                <div className="text-4xl mb-3">😨</div>
                <p className="text-base md:text-lg text-white font-bold mb-2">¿Qué digo si está con otra persona?</p>
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-300 text-center mb-6">Sabes que DEBES actuar... pero no sabes CÓMO decirlo sin arruinarlo todo.</p>
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500 rounded-xl p-6">
              <p className="text-xl md:text-2xl font-black text-yellow-400 text-center">Por eso creé el ACELERADOR 72H</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-b from-yellow-950/10 via-red-950/20 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 text-center leading-tight">
            Tu ex está en la Fase 2 del proceso neurológico
          </h2>

          <p className="text-xl md:text-2xl text-red-300 mb-10 text-center leading-relaxed">
            Eso significa que tienes una ventana de 14 días antes de que su cerebro entre en 'Modo Defensa Permanente'
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border-2 border-red-500 rounded-2xl p-6 md:p-8">
              <div className="text-4xl md:text-5xl mb-4">❌</div>
              <div className="text-red-400 font-black text-lg md:text-xl mb-4">SIN ACELERADOR:</div>
              <p className="text-white text-base md:text-lg leading-relaxed">
                Sé lo que debo hacer, pero no sé CÓMO decirlo
              </p>
              <p className="text-red-300 text-sm md:text-base mt-4 italic">
                Dudas constantes, miedo a equivocarte, oportunidades perdidas
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-2 border-green-500 rounded-2xl p-6 md:p-8">
              <div className="text-4xl md:text-5xl mb-4">✅</div>
              <div className="text-green-400 font-black text-lg md:text-xl mb-4">CON ACELERADOR:</div>
              <p className="text-white text-base md:text-lg leading-relaxed">
                Tengo el script exacto para enviar AHORA
              </p>
              <p className="text-green-300 text-sm md:text-base mt-4 italic">
                Confianza total, acción inmediata, resultados comprobados
              </p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-xl p-6 text-center">
            <p className="text-xl md:text-2xl font-black text-yellow-400">
              La diferencia entre intentar... y SABER exactamente qué hacer
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-b from-black to-yellow-950/20">
        <div className="max-w-4xl mx-auto">
          <span className="bg-yellow-500 text-black font-black text-sm md:text-base px-6 py-2 rounded-full inline-block mb-8">
            🎯 OFERTA EXCLUSIVA - SOLO PARA TI
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            PROTOCOLO ACELERADOR 72H
          </h2>

          <p className="text-2xl md:text-3xl text-yellow-400 font-bold mb-12 leading-snug">
            Arsenal Completo de Mensajes Prohibidas
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mb-12"></div>

          <div className="space-y-4 mb-12">
            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    47 Scripts de Mensajes Probados
                  </h3>
                  <p className="text-base text-gray-300">
                    Qué decir exactamente en cada fase: primeras 24h, si te ignora, si está con otra persona, para reactivar atracción
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    Simulador de Respuestas en Tiempo Real
                  </h3>
                  <p className="text-base text-gray-300">
                    Analiza las respuestas de tu ex palabra por palabra y te dice exactamente qué significa cada mensaje y cuál es tu próximo paso inmediato
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    12 Audio-Guías de Emergencia
                  </h3>
                  <p className="text-base text-gray-300">
                    Protocolos de voz para situaciones críticas: 'Me bloqueó', 'Respondió frío', 'Me dijo que no siente nada' - escucha y actúa en minutos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    Mapa Mental de Decisiones Interactivo
                  </h3>
                  <p className="text-base text-gray-300">
                    Diagrama paso a paso que te guía en cada bifurcación del proceso. Nunca más te quedarás sin saber qué hacer
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    Protocolo de Encuentro Presencial
                  </h3>
                  <p className="text-base text-gray-300">
                    Si consigues verlo/a en persona: qué hacer en los primeros 5 minutos, lenguaje corporal que reactiva atracción, frases que resetean la memoria emocional
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    BONUS: Técnicas de Lenguaje Corporal
                  </h3>
                  <p className="text-base text-gray-300">
                    Los gestos y posturas exactas que reactivan la atracción física a nivel inconsciente
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/0 border-l-4 border-green-500 p-5 md:p-6 rounded-r-xl hover:from-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl text-green-400">✅</span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    Acceso Inmediato (Disponible en 2 minutos)
                  </h3>
                  <p className="text-base text-gray-300">
                    No esperas. Compras ahora, accedes ahora, empiezas a actuar ahora
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border-2 border-green-500 rounded-2xl p-8 mt-8">
            <p className="text-xl md:text-2xl font-black text-center text-green-400 leading-relaxed">
              Todo lo que necesitas para reconquistar en 9-14 días en lugar de 18-28 días
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-b from-yellow-950/20 via-green-950/10 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-900/20 to-green-900/20 border-2 border-yellow-500/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center leading-tight">
              De las 12.847 reconquistas exitosas:
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="text-center p-6 bg-green-900/30 rounded-2xl border border-green-500/30">
                <div className="text-6xl md:text-7xl font-black text-green-400 mb-3">89%</div>
                <div className="text-xl md:text-2xl text-white font-bold mb-2">Usaron el Acelerador</div>
                <div className="text-base md:text-lg text-green-200">Reconquista promedio: 9-14 días</div>
              </div>

              <div className="text-center p-6 bg-red-900/30 rounded-2xl border border-red-500/30">
                <div className="text-6xl md:text-7xl font-black text-red-400 mb-3">11%</div>
                <div className="text-xl md:text-2xl text-white font-bold mb-2">Solo Plan 21 Días</div>
                <div className="text-base md:text-lg text-red-200">Reconquista promedio: 18-28 días</div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-8"></div>

            <div className="bg-black/50 rounded-xl p-6 text-center">
              <p className="text-lg md:text-xl text-yellow-200 font-semibold leading-relaxed">
                ⚡ CON Acelerador: 9-14 días | ⏳ SIN Acelerador: 18-28 días
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-center text-green-400 mt-8">
              El Acelerador reduce el tiempo de reconquista a la MITAD
            </h3>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-b from-black to-yellow-950/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl md:text-5xl text-gray-500 line-through mb-4 font-bold">
            $67
          </div>

          <div className="bg-red-500 text-white font-black text-xl md:text-2xl px-8 py-3 rounded-full inline-block mb-6 shadow-lg shadow-red-500/50 animate-pulse-custom">
            🔥 70% DE DESCUENTO
          </div>

          <div className="text-7xl md:text-8xl lg:text-9xl font-black text-yellow-400 mb-6 drop-shadow-2xl">
            $17
          </div>

          <p className="text-xl md:text-2xl text-yellow-200 font-semibold mb-8">
            Pago único. Acceso de por vida.
          </p>

          <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-2 border-red-500 rounded-2xl p-6 mb-8">
            <p className="text-lg md:text-xl text-red-200 font-bold leading-relaxed">
              ⏰ Solo en esta página. Solo en los próximos {formatTime(timeLeft)} minutos
            </p>
          </div>

          <div className="text-2xl md:text-3xl font-black text-green-400">
            Ahorras $50 AHORA
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-b from-yellow-950/30 to-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center leading-tight">
            Accede al Acelerador 72H AHORA:
          </h2>

          <p className="text-lg md:text-xl text-yellow-200 mb-8 text-center font-semibold">
            ✨ Compra en 1 clic (sin rellenar datos de nuevo)
          </p>

          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-4 border-green-500 rounded-3xl p-8 md:p-12 shadow-2xl shadow-green-500/30 mb-8">
            <div id="hotmart-sales-funnel" className="min-h-[200px] flex items-center justify-center">
              <p className="text-gray-400 text-center">Cargando checkout seguro...</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm md:text-base text-gray-300 font-semibold">Pago 100% Seguro</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm md:text-base text-gray-300 font-semibold">Acceso Inmediato</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-sm md:text-base text-gray-300 font-semibold">Garantía 30 Días</p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12"></div>

          <div className="text-center">
            <p className="text-base text-gray-400 mb-4">
              ¿Prefieres continuar sin el Acelerador?
            </p>

            <button
              onClick={handleDecline}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-base md:text-lg py-4 px-8 rounded-xl border-2 border-gray-600 transition-all duration-300 inline-block"
            >
              ❌ No, prefiero continuar sin el Acelerador
            </button>

            <p className="text-sm text-red-400 mt-4 font-semibold">
              ⚠️ Atención: Esta decisión es irreversible. No podrás acceder al Acelerador después de esta página.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 8: Garantia */}
      <section className="px-4 py-16 bg-gradient-to-b from-black to-green-950/20">
        <div className="max-w-4xl mx-auto">
          <span className="bg-green-500 text-black font-black text-xl md:text-2xl px-8 py-4 rounded-full inline-block mb-10 shadow-lg shadow-green-500/50">
            🛡️ GARANTÍA DE 30 DÍAS
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center leading-tight">
            Prueba el Acelerador sin ningún riesgo
          </h2>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-2 border-green-500 rounded-3xl p-8 md:p-12">
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed text-center">
              Si en 30 días sientes que el Acelerador no te dio las respuestas exactas que necesitabas, te devuelvo el 100% del valor del Acelerador.
            </p>

            <p className="text-2xl md:text-3xl font-black text-green-400 mb-6 text-center">
              Sin preguntas. Sin complicaciones.
            </p>

            <p className="text-lg md:text-xl text-gray-400 text-center italic">
              (Y aún así mantienes acceso al Plan de 21 Días)
            </p>

            <div className="w-24 h-1 bg-green-500 mx-auto my-8"></div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-400">✓</span>
                <p className="text-base md:text-lg text-gray-300">Prueba todos los 47 scripts de mensajes</p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-400">✓</span>
                <p className="text-base md:text-lg text-gray-300">Usa el simulador de respuestas en tiempo real</p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-400">✓</span>
                <p className="text-base md:text-lg text-gray-300">Escucha las 12 audio-guías de emergencia</p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-400">✓</span>
                <p className="text-base md:text-lg text-gray-300">Si no te sirve, recuperas tu dinero en 24-48 horas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-black border-4 border-red-500 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl shadow-red-500/50 animate-fade-in">
            <div className="text-7xl md:text-8xl text-center mb-6">⚠️</div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 text-center leading-tight">
              ¿Estás completamente seguro?
            </h2>

            <p className="text-lg md:text-xl text-red-200 mb-8 text-center leading-relaxed">
              Esta oferta no volverá a aparecer. Perderás:
            </p>

            <div className="space-y-3 mb-8 max-w-lg mx-auto">
              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-lg">
                <span className="text-2xl text-red-400">❌</span>
                <p className="text-base md:text-lg text-white">70% de descuento ($50 de ahorro)</p>
              </div>

              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-lg">
                <span className="text-2xl text-red-400">❌</span>
                <p className="text-base md:text-lg text-white">47 scripts de mensajes probados</p>
              </div>

              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-lg">
                <span className="text-2xl text-red-400">❌</span>
                <p className="text-base md:text-lg text-white">Simulador de respuestas en tiempo real</p>
              </div>

              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-lg">
                <span className="text-2xl text-red-400">❌</span>
                <p className="text-base md:text-lg text-white">12 audio-guías de emergencia</p>
              </div>

              <div className="flex items-start gap-3 bg-black/40 p-4 rounded-lg">
                <span className="text-2xl text-red-400">❌</span>
                <p className="text-base md:text-lg text-white">Reducir tiempo de reconquista a la mitad</p>
              </div>
            </div>

            <div className="w-full h-px bg-red-500/30 my-8"></div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={backToOffer}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-black text-lg md:text-xl py-5 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/50"
              >
                ✅ No, quiero el Acelerador 72H
              </button>

              <button
                onClick={confirmDecline}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-base md:text-lg py-5 px-8 rounded-xl border-2 border-gray-600 transition-all"
              >
                Sí, continuar sin Acelerador
              </button>
            </div>
          </div>
        </div>
      )}

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t-4 border-yellow-500 p-4 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
              <div className="text-red-400 font-black text-xl md:text-2xl">
                ⏰ {formatTime(timeLeft)}
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-black text-2xl md:text-3xl">$17</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-70%</span>
              </div>
            </div>

            <button
              onClick={scrollToWidget}
              className="bg-green-500 hover:bg-green-600 text-black font-black text-base md:text-xl py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/50 w-full md:w-auto"
            >
              ✅ QUIERO EL ACELERADOR AHORA
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-custom {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-pulse-custom {
          animation: pulse-custom 2s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes animate-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: animate-fade-in 0.3s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;