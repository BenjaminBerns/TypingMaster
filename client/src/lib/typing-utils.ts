export function calculateWPM(charactersTyped: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const wordsTyped = charactersTyped / 5; // Standard: 5 characters = 1 word
  const timeInMinutes = timeInSeconds / 60;
  return Math.round(wordsTyped / timeInMinutes);
}

export function calculateAccuracy(totalCharacters: number, errors: number): number {
  if (totalCharacters === 0) return 100;
  return Math.round(((totalCharacters - errors) / totalCharacters) * 100);
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getCharacterClass(
  originalChar: string,
  typedChar: string | undefined,
  isCurrentPosition: boolean
): string {
  if (isCurrentPosition) {
    return "bg-blue-100 text-blue-700 border-l-2 border-blue-500 pl-1";
  }
  
  if (typedChar === undefined) {
    return "text-gray-300";
  }
  
  if (typedChar === originalChar) {
    return "text-green-600 bg-green-50";
  }
  
  return "text-red-600 bg-red-100";
}

export function mapKeyToDisplay(key: string): string {
  const keyMap: { [key: string]: string } = {
    ' ': 'Space',
    'Backspace': '⌫',
    'Enter': '↵',
    'Tab': 'Tab',
    'Shift': 'Shift',
    'CapsLock': 'Caps',
    'Control': 'Ctrl',
    'Alt': 'Alt',
    'AltGraph': 'AltGr',
    'Escape': 'Esc',
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
  };
  
  return keyMap[key] || key.toUpperCase();
}
