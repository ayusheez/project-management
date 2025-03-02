
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link2, Github, Mail, Trash2 } from "lucide-react";

interface ConnectedAccount {
  id: string;
  provider: "google" | "github";
  email: string;
  connected: boolean;
  isMain: boolean;
}

export function ConnectedAccounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: "1",
      provider: "google",
      email: "alex.johnson@gmail.com",
      connected: true,
      isMain: true
    },
    {
      id: "2",
      provider: "github",
      email: "alexjohnson",
      connected: true,
      isMain: false
    }
  ]);

  const connectAccount = (provider: "google" | "github") => {
    toast.info(`Connecting to ${provider}...`);
    setTimeout(() => {
      if (provider === "google" && !accounts.some(a => a.provider === "google")) {
        setAccounts([
          ...accounts,
          {
            id: Math.random().toString(),
            provider: "google",
            email: "alex.johnson@gmail.com",
            connected: true,
            isMain: false
          }
        ]);
        toast.success(`Successfully connected to ${provider}`);
      } else if (provider === "github" && !accounts.some(a => a.provider === "github")) {
        setAccounts([
          ...accounts,
          {
            id: Math.random().toString(),
            provider: "github",
            email: "alexjohnson",
            connected: true,
            isMain: false
          }
        ]);
        toast.success(`Successfully connected to ${provider}`);
      } else {
        toast.error(`Account already connected to ${provider}`);
      }
    }, 1000);
  };

  const disconnectAccount = (id: string) => {
    const account = accounts.find(a => a.id === id);
    
    if (account?.isMain) {
      toast.error("Cannot disconnect your main account");
      return;
    }
    
    setAccounts(accounts.filter(a => a.id !== id));
    toast.success(`Disconnected from ${account?.provider}`);
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-950 to-transparent">
        <CardTitle className="text-white flex items-center gap-2">
          <Link2 className="h-5 w-5 text-cyan-500" />
          Connected Accounts
        </CardTitle>
        <CardDescription className="text-cyan-500/80">
          Manage your connected accounts and services
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-cyan-500/10">
              <div className="flex items-center gap-3">
                {account.provider === "google" ? (
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10">
                    <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10">
                    <Github className="h-5 w-5 text-cyan-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-white">
                    {account.provider === "google" ? "Google" : "GitHub"}
                    {account.isMain && (
                      <span className="ml-2 text-xs py-0.5 px-2 rounded-full bg-cyan-500/20 text-cyan-400">
                        Main
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{account.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => disconnectAccount(account.id)}
                disabled={account.isMain}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-medium text-white mb-4">Connect Additional Accounts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline" 
              className="bg-black/30 border-cyan-500/20 hover:bg-cyan-950 hover:border-cyan-400 py-6 justify-start gap-3"
              onClick={() => connectAccount("google")}
              disabled={accounts.some(a => a.provider === "google")}
            >
              <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <div className="text-left">
                <p className="font-medium text-white">Google</p>
                <p className="text-sm text-muted-foreground">Connect your Google account</p>
              </div>
            </Button>
            
            <Button
              variant="outline" 
              className="bg-black/30 border-cyan-500/20 hover:bg-cyan-950 hover:border-cyan-400 py-6 justify-start gap-3"
              onClick={() => connectAccount("github")}
              disabled={accounts.some(a => a.provider === "github")}
            >
              <Github className="h-5 w-5 text-cyan-400" />
              <div className="text-left">
                <p className="font-medium text-white">GitHub</p>
                <p className="text-sm text-muted-foreground">Connect your GitHub account</p>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
