import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { InsertTestResult } from "@shared/schema";

export function useTestResults() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveTestResult = useMutation({
    mutationFn: async (result: InsertTestResult) => {
      return await apiRequest("/api/test-results", "POST", result);
    },
    onSuccess: () => {
      // Invalidate and refetch user test results if user is authenticated
      queryClient.invalidateQueries({ queryKey: ["/api/user/test-results"] });
      queryClient.invalidateQueries({ queryKey: ["/api/test-results"] });
      
      toast({
        title: "Test terminé !",
        description: "Votre résultat a été sauvegardé avec succès.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expirée",
          description: "Vous allez être redirigé vers la page de connexion.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      
      console.error("Error saving test result:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le résultat du test.",
        variant: "destructive",
      });
    },
  });

  return {
    saveTestResult: saveTestResult.mutate,
    isSaving: saveTestResult.isPending,
  };
}