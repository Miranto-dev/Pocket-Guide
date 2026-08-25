import { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  Delete, 
  WifiOff, 
  Edit3, 
  Check, 
  Coins, 
  Sparkles,
  Info
} from 'lucide-react';

export function ConverterView() {
  const [direction, setDirection] = useState<'EUR_TO_MGA' | 'MGA_TO_EUR'>('EUR_TO_MGA');
  const [currentInput, setCurrentInput] = useState<string>('100');
  const [exchangeRate, setExchangeRate] = useState<number>(4900);
  const [isEditingRate, setIsEditingRate] = useState<boolean>(false);
  const [tempRateInput, setTempRateInput] = useState<string>('4900');

  const formattedOutput = useMemo(() => {
    const num = parseFloat(currentInput) || 0;
    if (direction === 'EUR_TO_MGA') {
      const converted = num * exchangeRate;
      return new Intl.NumberFormat('fr-FR').format(Math.round(converted));
    } else {
      const converted = num / exchangeRate;
      return converted.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }, [currentInput, exchangeRate, direction]);

  const handleAppend = (char: string) => {
    if (currentInput === '0' && char !== '.') {
      setCurrentInput(char);
    } else if (char === '.' && currentInput.includes('.')) {
      return;
    } else if (currentInput.length < 9) {
      setCurrentInput(prev => prev + char);
    }
  };

  const handleDelete = () => {
    if (currentInput.length > 1) {
      setCurrentInput(prev => prev.slice(0, -1));
    } else {
      setCurrentInput('0');
    }
  };

  const handleClear = () => {
    setCurrentInput('0');
  };

  const handleSwap = () => {
    setDirection(prev => prev === 'EUR_TO_MGA' ? 'MGA_TO_EUR' : 'EUR_TO_MGA');
    setCurrentInput('100');
  };

  const handleSaveRate = () => {
    const parsed = parseFloat(tempRateInput);
    if (!isNaN(parsed) && parsed > 0) {
      setExchangeRate(parsed);
      setIsEditingRate(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 pt-4 pb-24 flex flex-col min-h-[calc(100vh-140px)]">
      {/* Title */}
      <div className="text-center mb-5">
        <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl sm:text-3xl text-[#1A1C1A] mb-1">
          Convertisseur
        </h1>
        <p className="text-sm text-[#56423E]">
          Calculez rapidement vos dépenses à Madagascar
        </p>
      </div>

      {/* Main Conversion Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,109,91,0.08)] border border-[#ddc0ba]/40 relative overflow-hidden mb-6">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#9DF3DC]/20 rounded-bl-full pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Top Input Box (Source Currency) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#89726D]">
              <span>Vous donnez</span>
              <div className="flex items-center gap-1 bg-[#EFEEEB] px-2.5 py-1 rounded-md text-[#1A1C1A] font-bold">
                <span>{direction === 'EUR_TO_MGA' ? '€ EUR' : 'Ar MGA'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b-2 border-[#E3E2E0] pb-2">
              <span className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl text-[#89726D] font-bold">
                {direction === 'EUR_TO_MGA' ? '€' : 'Ar'}
              </span>
              <div className="text-right font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-bold text-[#1A1C1A] tracking-tight">
                {currentInput}
              </div>
            </div>
          </div>

          {/* Swap Button in center */}
          <div className="flex justify-center -my-2 relative z-20">
            <button
              onClick={handleSwap}
              className="w-11 h-11 rounded-full bg-[#FAF9F6] shadow-sm border border-[#ddc0ba]/60 flex items-center justify-center text-[#9F402D] hover:bg-white hover:scale-105 active:scale-95 transition-all"
              title="Inverser les devises"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Output Box (Destination Currency) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#89726D]">
              <span>Vous obtenez</span>
              <div className="flex items-center gap-1 bg-[#EFEEEB] px-2.5 py-1 rounded-md text-[#1A1C1A] font-bold">
                <span>{direction === 'EUR_TO_MGA' ? 'Ar MGA' : '€ EUR'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#E2725B]/10 p-4 rounded-2xl border border-[#E2725B]/25">
              <span className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl text-[#9F402D] font-bold">
                {direction === 'EUR_TO_MGA' ? 'Ar' : '€'}
              </span>
              <div className="text-right">
                <div className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-bold text-[#9F402D] tracking-tight">
                  {formattedOutput}
                </div>
                <div className="text-[11px] text-[#9F402D]/80 font-mono mt-0.5">
                  Taux appliqué : 1 € = {new Intl.NumberFormat('fr-FR').format(exchangeRate)} Ar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Amount Presets */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar mb-4">
        {(direction === 'EUR_TO_MGA' ? ['5', '10', '20', '50', '100', '200'] : ['10000', '20000', '50000', '100000', '500000']).map((val) => (
          <button
            key={val}
            onClick={() => setCurrentInput(val)}
            className="shrink-0 px-3 py-1.5 bg-white border border-[#ddc0ba]/50 rounded-xl text-xs font-semibold text-[#56423E] hover:bg-[#FAF9F6] active:scale-95 shadow-2xs"
          >
            {direction === 'EUR_TO_MGA' ? `${val} €` : `${new Intl.NumberFormat('fr-FR').format(Number(val))} Ar`}
          </button>
        ))}
      </div>

      {/* Custom Numpad */}
      <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto w-full mb-4">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((btn) => (
          <button
            key={btn}
            onClick={() => handleAppend(btn)}
            className="h-13 sm:h-14 rounded-2xl bg-white border border-[#ddc0ba]/40 text-xl font-['Montserrat',sans-serif] font-bold text-[#1A1C1A] flex items-center justify-center hover:bg-[#FAF9F6] active:scale-95 transition-all shadow-2xs"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={handleDelete}
          className="h-13 sm:h-14 rounded-2xl bg-[#E3E2E0] text-[#9F402D] flex items-center justify-center hover:bg-[#dbdad7] active:scale-95 transition-all shadow-2xs"
          title="Effacer le dernier chiffre"
        >
          <Delete className="w-6 h-6" />
        </button>
      </div>

      {/* Taux Customization & Offline status */}
      <div className="mt-auto flex flex-col items-center gap-2 pt-2">
        <div className="flex items-center gap-2 text-xs text-[#56423E]">
          <WifiOff className="w-3.5 h-3.5 text-[#89726D]" />
          <span>Dernière mise à jour : il y a 2 heures (Hors-ligne)</span>
          <button
            onClick={() => setIsEditingRate(!isEditingRate)}
            className="text-[#9F402D] hover:underline font-semibold flex items-center gap-1 ml-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>Modifier taux</span>
          </button>
        </div>

        {/* Rate Editor Dialog if active */}
        {isEditingRate && (
          <div className="bg-white p-3 rounded-2xl border border-[#ddc0ba] shadow-md flex items-center gap-2 w-full mt-2">
            <span className="text-xs font-semibold text-[#1A1C1A]">1 € =</span>
            <input
              type="number"
              value={tempRateInput}
              onChange={(e) => setTempRateInput(e.target.value)}
              className="flex-1 bg-[#FAF9F6] border border-[#ddc0ba] rounded-lg px-2 py-1 text-sm font-bold text-[#1A1C1A]"
            />
            <span className="text-xs text-[#56423E]">Ar</span>
            <button
              onClick={handleSaveRate}
              className="px-3 py-1 bg-[#006B5B] text-white rounded-lg text-xs font-bold"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
