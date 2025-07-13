import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  Crown, 
  Globe, 
  Play, 
  Trophy, 
  Timer, 
  Target,
  Settings,
  Copy,
  Share2
} from 'lucide-react';
import { HorizontalAdBanner } from '@/components/ad-banner';

interface MultiplayerRoom {
  id: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  mode: string;
  difficulty: string;
  language: string;
  status: 'waiting' | 'in-progress' | 'finished';
  isPrivate: boolean;
}

export default function Multiplayer() {
  const { user, isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState<MultiplayerRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockRooms: MultiplayerRoom[] = [
      {
        id: '1',
        name: 'Défi Rapide',
        host: 'Pierre123',
        players: 3,
        maxPlayers: 5,
        mode: '1min',
        difficulty: 'medium',
        language: 'fr',
        status: 'waiting',
        isPrivate: false
      },
      {
        id: '2',
        name: 'Compétition Pro',
        host: 'Marie_Fast',
        players: 2,
        maxPlayers: 4,
        mode: '3min',
        difficulty: 'hard',
        language: 'fr',
        status: 'waiting',
        isPrivate: false
      },
      {
        id: '3',
        name: 'Entraînement Débutant',
        host: 'Lucas_Learn',
        players: 4,
        maxPlayers: 6,
        mode: '1min',
        difficulty: 'easy',
        language: 'fr',
        status: 'in-progress',
        isPrivate: false
      }
    ];
    setRooms(mockRooms);
  }, []);

  const handleCreateRoom = () => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }
    
    if (!roomName.trim()) return;
    
    setIsCreating(true);
    // TODO: Implement room creation API
    setTimeout(() => {
      const newRoom: MultiplayerRoom = {
        id: Date.now().toString(),
        name: roomName,
        host: user?.firstName || user?.email || 'Utilisateur',
        players: 1,
        maxPlayers: 5,
        mode: '1min',
        difficulty: 'medium',
        language: 'fr',
        status: 'waiting',
        isPrivate: false
      };
      setRooms([newRoom, ...rooms]);
      setRoomName('');
      setIsCreating(false);
    }, 1000);
  };

  const handleJoinRoom = (roomId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }
    
    // TODO: Implement room joining and game logic
    console.log('Joining room:', roomId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'finished': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'En attente';
      case 'in-progress': return 'En cours';
      case 'finished': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                Mode Multijoueur
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Défiez d'autres joueurs en temps réel et améliorez votre vitesse ensemble
            </p>
          </div>

          {/* Ad Banner */}
          <div className="mb-8">
            <HorizontalAdBanner 
              slot="6789012345" 
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Room */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Créer une salle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom de la salle</label>
                    <Input
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Entrez le nom de votre salle"
                      disabled={isCreating}
                    />
                  </div>
                  <Button 
                    onClick={handleCreateRoom}
                    disabled={!roomName.trim() || isCreating}
                    className="w-full"
                  >
                    {isCreating ? (
                      <>
                        <Timer className="w-4 h-4 mr-2 animate-spin" />
                        Création...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Créer la salle
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Join with code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Rejoindre par code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Code de la salle</label>
                    <Input
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      placeholder="Entrez le code"
                    />
                  </div>
                  <Button 
                    onClick={() => handleJoinRoom(joinCode)}
                    disabled={!joinCode.trim()}
                    className="w-full"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Rejoindre
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Rooms List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Salles publiques ({rooms.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`
                          p-4 rounded-lg border transition-all cursor-pointer
                          ${selectedRoom === room.id ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}
                        `}
                        onClick={() => setSelectedRoom(room.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{room.name}</h3>
                              <Badge className={getStatusColor(room.status)}>
                                {getStatusText(room.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Hôte: {room.host}</span>
                              <span>Joueurs: {room.players}/{room.maxPlayers}</span>
                              <Badge className={getDifficultyColor(room.difficulty)}>
                                {room.difficulty}
                              </Badge>
                              <Badge variant="outline">
                                {room.mode}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {room.status === 'waiting' && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJoinRoom(room.id);
                                }}
                                size="sm"
                                disabled={room.players >= room.maxPlayers}
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Rejoindre
                              </Button>
                            )}
                            {room.status === 'in-progress' && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleJoinRoom(room.id);
                                }}
                                size="sm"
                                variant="outline"
                              >
                                <Target className="w-4 h-4 mr-1" />
                                Spectateur
                              </Button>
                            )}
                            <Users className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Comment ça marche ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Rejoignez une salle</h3>
                  <p className="text-sm text-gray-600">
                    Trouvez une salle publique ou créez la vôtre pour inviter vos amis
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Timer className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Tapez ensemble</h3>
                  <p className="text-sm text-gray-600">
                    Tous les joueurs tapent le même texte en même temps
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Gagnez des points</h3>
                  <p className="text-sm text-gray-600">
                    Le plus rapide et le plus précis remporte la partie
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ad Banner - Bottom */}
          <div className="mt-8">
            <HorizontalAdBanner 
              slot="7890123456" 
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}