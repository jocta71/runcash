
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Copy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CustomSelect } from "@/components/ui/custom-select";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado",
      description: "Link do perfil copiado para a área de transferência.",
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  // Sample city options
  const cityOptions = ["Bridgeport", "New York", "Los Angeles", "Chicago", "Houston"];
  
  // Sample postcode options
  const postcodeOptions = ["31005", "10001", "90001", "60601", "77001"];
  
  // Sample country options
  const countryOptions = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

  return (
    <div className="container py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="col-span-1">
          <Card className="p-6 bg-white dark:bg-vegas-darkgray border-vegas-darkgray">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-vegas-gold">
                  <img 
                    src={user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-vegas-gold rounded-full p-1 text-white">
                  <Camera size={16} />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.user_metadata?.name || user?.email?.split('@')[0] || "Usuário"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.user_metadata?.company || "Microsoft Inc."}
              </p>
              
              <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                <div className="p-2">
                  <h3 className="font-bold text-amber-500">32</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Opportunities applied</p>
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-green-500">26</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Opportunities won</p>
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-blue-500">6</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current opportunities</p>
                </div>
              </div>
              
              <Button variant="outline" className="mt-6 w-full">
                View Public Profile
              </Button>
              
              <div className="flex items-center justify-between w-full mt-4 p-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-vegas-black rounded">
                <span className="truncate text-xs">https://app.aiherogo.../</span>
                <button onClick={handleCopyLink}>
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Profile Settings */}
        <div className="col-span-1 md:col-span-2">
          <Card className="overflow-hidden bg-white dark:bg-vegas-darkgray border-vegas-darkgray">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <TabsList className="w-full flex overflow-x-auto bg-transparent h-auto p-0 rounded-none">
                  <TabsTrigger 
                    value="account" 
                    className="py-3 px-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    Account Settings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="company" 
                    className="py-3 px-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    Company Settings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents" 
                    className="py-3 px-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    Documents
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="py-3 px-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    Billing
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="py-3 px-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="account" className="p-6">
                <form onSubmit={handleUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        defaultValue="Nathaniel" 
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        defaultValue="Poole" 
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input 
                        id="phoneNumber" 
                        defaultValue="+1800-000" 
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="nathaniel.poole@microsoft.com" 
                        readOnly
                        className="bg-gray-50 dark:bg-vegas-black border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <CustomSelect 
                        id="city"
                        options={cityOptions}
                        defaultValue="Bridgeport"
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/County</Label>
                      <Input 
                        id="state" 
                        defaultValue="WA"
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <CustomSelect 
                        id="postcode"
                        options={postcodeOptions}
                        defaultValue="31005"
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <CustomSelect 
                        id="country"
                        options={countryOptions}
                        defaultValue="United States"
                        className="bg-white dark:bg-vegas-darkgray border-gray-300 dark:border-gray-700"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Update
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="company" className="p-6">
                <h3 className="text-lg font-medium">Company Settings</h3>
                <p className="text-gray-500 dark:text-gray-400">Manage your company information and settings.</p>
              </TabsContent>
              
              <TabsContent value="documents" className="p-6">
                <h3 className="text-lg font-medium">Documents</h3>
                <p className="text-gray-500 dark:text-gray-400">Upload and manage your documents.</p>
              </TabsContent>
              
              <TabsContent value="billing" className="p-6">
                <h3 className="text-lg font-medium">Billing Information</h3>
                <p className="text-gray-500 dark:text-gray-400">Manage your subscription and payment details.</p>
              </TabsContent>
              
              <TabsContent value="notifications" className="p-6">
                <h3 className="text-lg font-medium">Notification Settings</h3>
                <p className="text-gray-500 dark:text-gray-400">Control which notifications you receive.</p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
