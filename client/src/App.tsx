import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import TypingTest from "@/pages/typing-test";
import Landing from "@/pages/landing";
import Profile from "@/pages/profile";
import Premium from "@/pages/premium";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  return (
    <Switch>
      <Route path="/" component={TypingTest} />
      <Route path="/landing" component={Landing} />
      <Route path="/test" component={TypingTest} />
      <Route path="/profile" component={isAuthenticated ? Profile : NotFound} />
      <Route path="/premium" component={Premium} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
