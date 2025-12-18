import { useEffect, useState } from 'react';

const PurchaseConfirmation = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confettiPieces] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][Math.floor(Math.random() * 5)]
    }))
  );

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 8000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4">
      {/* Confetti */}
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`
          }}
        />
      ))}

      {/* Card de Confirmação */}
      <div
        className={`bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 border-4 border-yellow-400 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl pointer-events-auto transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 animate-bounce">
            <span className="text-6xl">✅</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-center leading-tight">
          ¡COMPRA CONFIRMADA!
        </h2>

        <p className="text-xl md:text-2xl text-yellow-100 font-bold mb-6 text-center">
          🎉 Tu Acelerador 72H está listo
        </p>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <p className="text-lg md:text-xl text-white text-center leading-relaxed">
            <strong className="text-yellow-300">Acceso inmediato desbloqueado.</strong><br />
            Revisa tu email en los próximos 2 minutos.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4">
            <span className="text-3xl">📧</span>
            <p className="text-white font-semibold">Email con acceso enviado</p>
          </div>
          <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4">
            <span className="text-3xl">⚡</span>
            <p className="text-white font-semibold">Disponible AHORA</p>
          </div>
          <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4">
            <span className="text-3xl">🎯</span>
            <p className="text-white font-semibold">47 scripts listos</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
          }}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg py-4 rounded-xl transition-all"
        >
          CONTINUAR
        </button>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseConfirmation;