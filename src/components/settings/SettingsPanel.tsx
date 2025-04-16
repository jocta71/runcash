
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Globe, Lock, Save, User } from "lucide-react";
import { showSuccessToast } from '../ui/success-toast';
import LoadingSpinner from '../ui/loading-spinner';
import TwoFactorSetup from './TwoFactorSetup';

const SettingsPanel = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    promotions: false,
    updates: true,
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showSuccessToast("Configurações salvas", "Suas preferências foram atualizadas com sucesso.");
    }, 1000);
  };

  return (
    <Card className="bg-[#1A191F] border-[#33333359] text-white">
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription className="text-gray-400">
          Gerencie suas preferências e configurações de conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid grid-cols-3 bg-[#111118] border border-[#33333359]">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Bell className="mr-2 h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Lock className="mr-2 h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" className="bg-[#252429] border-[#33333359] text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="seu@email.com" className="bg-[#252429] border-[#33333359] text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <select id="language" className="bg-[#252429] border border-[#33333359] rounded-md p-2 text-white w-full">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações por email</p>
                  <p className="text-sm text-gray-400">Receba atualizações sobre sua assinatura</p>
                </div>
                <Switch 
                  checked={notifications.email} 
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promoções e ofertas</p>
                  <p className="text-sm text-gray-400">Receba ofertas exclusivas e promoções</p>
                </div>
                <Switch 
                  checked={notifications.promotions} 
                  onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atualizações do sistema</p>
                  <p className="text-sm text-gray-400">Receba informações sobre atualizações do sistema</p>
                </div>
                <Switch 
                  checked={notifications.updates} 
                  onCheckedChange={(checked) => setNotifications({...notifications, updates: checked})} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alterar Senha</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input id="current-password" type="password" className="bg-[#252429] border-[#33333359] text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova senha</Label>
                  <Input id="new-password" type="password" className="bg-[#252429] border-[#33333359] text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                  <Input id="confirm-password" type="password" className="bg-[#252429] border-[#33333359] text-white" />
                </div>
              </div>
              
              <div className="pt-4">
                <TwoFactorSetup />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
          >
            {isSaving ? (
              <>
                <LoadingSpinner size={16} className="mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar alterações
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
