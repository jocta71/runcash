
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Check, Copy, RefreshCcw } from "lucide-react";
import { showSuccessToast } from '@/components/ui/success-toast';
import { showErrorToast } from '@/components/ui/error-toast';
import LoadingSpinner from '../ui/loading-spinner';
import { supabase } from '@/integrations/supabase/client';

const TwoFactorSetup = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryKeys, setRecoveryKeys] = useState<string[]>([]);
  
  // Enable 2FA for the user
  const setupTwoFactorAuth = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call a Supabase Function to generate a 2FA secret
      // For demo purposes, we'll simulate the API response
      
      // This would be the actual API call:
      // const { data, error } = await supabase.functions.invoke('setup-2fa', { body: {} });
      
      // Simulated response - in a real app this would come from Supabase
      setTimeout(() => {
        setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/RunCash:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=RunCash');
        setSecretKey('JBSWY3DPEHPK3PXP');
        setIsSetupMode(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error setting up 2FA:', error);
      showErrorToast("Error", "Failed to set up two-factor authentication");
      setIsLoading(false);
    }
  };
  
  // Verify the code entered by the user
  const verifyAndEnable = async () => {
    setIsLoading(true);
    
    try {
      // This would call a Supabase Function to verify the code
      // For demo purposes, any 6-digit code will work
      
      if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
        throw new Error('Please enter a valid 6-digit code');
      }
      
      // Simulate API call
      setTimeout(() => {
        // Generate 8 random recovery keys
        const keys = Array.from({ length: 8 }, () => 
          Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8)
        );
        
        setRecoveryKeys(keys);
        setIsEnabled(true);
        setIsSetupMode(false);
        showSuccessToast("2FA Enabled", "Two-factor authentication has been successfully enabled");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error verifying 2FA code:', error);
      showErrorToast("Error", error instanceof Error ? error.message : "Failed to verify code");
      setIsLoading(false);
    }
  };
  
  // Disable 2FA
  const disableTwoFactorAuth = async () => {
    setIsLoading(true);
    
    try {
      // This would call a Supabase Function to disable 2FA
      // Simulate API call
      setTimeout(() => {
        setIsEnabled(false);
        setRecoveryKeys([]);
        showSuccessToast("2FA Disabled", "Two-factor authentication has been disabled");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      showErrorToast("Error", "Failed to disable two-factor authentication");
      setIsLoading(false);
    }
  };
  
  // Copy recovery keys to clipboard
  const copyRecoveryKeys = () => {
    navigator.clipboard.writeText(recoveryKeys.join('\n'));
    showSuccessToast("Copied", "Recovery keys copied to clipboard");
  };

  if (recoveryKeys.length > 0) {
    return (
      <Card className="bg-[#1A191F] border-[#33333359] text-white">
        <CardHeader>
          <CardTitle className="text-green-500">Save Your Recovery Keys</CardTitle>
          <CardDescription className="text-gray-400">
            Store these recovery keys in a safe place. You will need them if you lose access to your authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#0f0f13] rounded-md p-4 font-mono text-sm mb-4">
            {recoveryKeys.map((key, index) => (
              <div key={index} className="mb-1">
                {index + 1}. {key}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={copyRecoveryKeys}
              variant="outline"
              className="flex-1"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Keys
            </Button>
            <Button 
              onClick={() => setRecoveryKeys([])}
              className="flex-1 bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
            >
              <Check className="mr-2 h-4 w-4" />
              I've Saved Them
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isSetupMode) {
    return (
      <Card className="bg-[#1A191F] border-[#33333359] text-white">
        <CardHeader>
          <CardTitle>Setup Two-Factor Authentication</CardTitle>
          <CardDescription className="text-gray-400">
            Scan the QR code with your authenticator app or enter the secret key manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            {qrCode && (
              <div className="bg-white p-2 rounded-md mb-4">
                <img src={qrCode} alt="QR Code" width={200} height={200} />
              </div>
            )}
            <div className="flex items-center space-x-2 bg-[#0f0f13] px-3 py-2 rounded-md">
              <code className="text-xs sm:text-sm font-mono text-gray-300">{secretKey}</code>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={() => {
                  navigator.clipboard.writeText(secretKey);
                  showSuccessToast("Copied", "Secret key copied to clipboard");
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Enter Verification Code</Label>
              <Input 
                id="verification-code" 
                placeholder="6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="bg-[#252429] border-[#33333359] text-white"
                maxLength={6}
                inputMode="numeric"
              />
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsSetupMode(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
                onClick={verifyAndEnable}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size={16} variant="primary" className="mr-2" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Verify and Enable
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1A191F] border-[#33333359] text-white">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>Two-Factor Authentication</CardTitle>
          {isEnabled && (
            <div className="ml-2 px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">
              Enabled
            </div>
          )}
        </div>
        <CardDescription className="text-gray-400">
          Add an extra layer of security to your account by requiring a verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="bg-[#252429] p-3 rounded-full">
            <Smartphone className="h-6 w-6 text-[#00ff00]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold">Authenticator App</h4>
            <p className="text-sm text-gray-400">
              Use an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator to get verification codes.
            </p>
            {isEnabled ? (
              <div className="mt-4 flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={disableTwoFactorAuth}
                  disabled={isLoading}
                  className="bg-red-600/20 text-red-400 border-red-800/50 hover:bg-red-600/30"
                >
                  {isLoading ? (
                    <LoadingSpinner size={16} className="mr-2" />
                  ) : null}
                  Disable 2FA
                </Button>
                <Button 
                  variant="outline"
                  className="bg-[#252429] hover:bg-[#2a292f]"
                  onClick={setupTwoFactorAuth}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size={16} className="mr-2" />
                  ) : (
                    <RefreshCcw className="mr-2 h-4 w-4" />
                  )}
                  Reset 2FA
                </Button>
              </div>
            ) : (
              <Button 
                className="mt-4 bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
                onClick={setupTwoFactorAuth}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size={16} variant="primary" className="mr-2" />
                ) : (
                  <QrCode className="mr-2 h-4 w-4" />
                )}
                Setup 2FA
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Required for TypeScript
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-200 mb-1">
    {children}
  </label>
);

export default TwoFactorSetup;
