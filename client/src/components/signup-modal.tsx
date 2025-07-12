import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, User, UserPlus, LogIn } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
}

export function SignupModal({ isOpen, onClose, wpm, accuracy }: SignupModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    window.location.href = "/api/login";
  };

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = "/api/login";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Bravo pour votre premier test !
          </DialogTitle>
          <DialogDescription>
            Vous avez terminé votre test avec {wpm} mots/min et {accuracy}% de précision
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Débloquez votre potentiel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sauvegardez vos performances</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Suivez votre progression</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Accédez à votre historique détaillé</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Comparez vos statistiques</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleSignup} 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Créer un compte gratuit
            </Button>
            
            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <LogIn className="w-4 h-4 mr-2" />
              J'ai déjà un compte
            </Button>
          </div>

          <div className="text-center">
            <Button 
              onClick={onClose}
              variant="ghost"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Continuer sans compte
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}