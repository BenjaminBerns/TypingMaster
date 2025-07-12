import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface VirtualKeyboardProps {
  lastKeyPressed: string;
}

const keyboardLayout = [
  ['²', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '°', '+', 'Backspace'],
  ['Tab', 'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^', '$', 'Enter'],
  ['CapsLock', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù', '*'],
  ['Shift', '<', 'w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'AltGr', 'Ctrl'],
];

const specialKeys = {
  'Backspace': '⌫',
  'Enter': '↵',
  'Tab': 'Tab',
  'Shift': 'Shift',
  'CapsLock': 'Caps',
  'Ctrl': 'Ctrl',
  'Alt': 'Alt',
  'AltGr': 'AltGr',
  'Space': 'Espace',
  ' ': 'Space',
};

export function VirtualKeyboard({ lastKeyPressed }: VirtualKeyboardProps) {
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    if (lastKeyPressed) {
      const keyToHighlight = lastKeyPressed === ' ' ? 'Space' : lastKeyPressed;
      setActiveKey(keyToHighlight);
      
      const timer = setTimeout(() => {
        setActiveKey('');
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [lastKeyPressed]);

  const getKeyClass = (key: string) => {
    const baseClass = "min-h-10 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors";
    
    const isActive = activeKey === key || (key === 'Space' && activeKey === 'Space');
    const activeClass = isActive ? "bg-blue-500 text-white border-blue-500 animate-pulse" : "";
    
    // Size classes
    let sizeClass = "min-w-10";
    if (key === 'Backspace' || key === 'Tab' || key === 'CapsLock' || key === 'Enter') {
      sizeClass = "min-w-16";
    } else if (key === 'Shift') {
      sizeClass = "min-w-20";
    } else if (key === 'Space') {
      sizeClass = "min-w-48";
    } else if (key === 'Ctrl' || key === 'Alt' || key === 'AltGr') {
      sizeClass = "min-w-14";
    }
    
    return cn(baseClass, sizeClass, activeClass);
  };

  const getKeyDisplay = (key: string) => {
    return specialKeys[key as keyof typeof specialKeys] || key.toUpperCase();
  };

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clavier Virtuel</h3>
        <div className="space-y-2">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-1">
              {row.map((key, keyIndex) => (
                <div
                  key={`${rowIndex}-${keyIndex}-${key}`}
                  className={getKeyClass(key)}
                  data-key={key}
                >
                  {getKeyDisplay(key)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
