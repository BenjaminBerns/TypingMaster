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

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading ? (
        <Route path="/" component={() => <div className="flex justify-center items-center min-h-screen">Chargement...</div>} />
      ) : isAuthenticated ? (
        <>
          <Route path="/" component={TypingTest} />
          <Route path="/test" component={TypingTest} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </>
      ) : (
        <>
          <Route path="/" component={Landing} />
          <Route path="/test" component={TypingTest} />
          <Route component={NotFound} />
        </>
      )}
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
