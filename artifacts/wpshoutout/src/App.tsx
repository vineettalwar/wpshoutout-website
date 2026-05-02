import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Seasons from "@/pages/Seasons";
import Schedule from "@/pages/Schedule";
import JoinUs from "@/pages/JoinUs";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import { PlayerProvider } from "@/context/PlayerContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/seasons" component={Seasons} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/join-us" component={JoinUs} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlayerProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </PlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
