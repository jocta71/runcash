
import { supabase } from "@/integrations/supabase/client";

export interface EmailNotificationData {
  recipient: string;
  templateName: string;
  data?: Record<string, any>;
}

export const EmailNotificationsService = {
  /**
   * Send subscription welcome email
   */
  sendSubscriptionWelcome: async (email: string, planName: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-subscription-notification', {
        body: {
          recipient: email,
          templateName: 'subscription-welcome',
          data: {
            planName,
            welcomeDate: new Date().toISOString(),
          }
        }
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending subscription welcome email:', error);
      return { success: false, error };
    }
  },

  /**
   * Send subscription renewal reminder email
   */
  sendRenewalReminder: async (email: string, planName: string, renewalDate: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-subscription-notification', {
        body: {
          recipient: email,
          templateName: 'renewal-reminder',
          data: {
            planName,
            renewalDate,
          }
        }
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending renewal reminder email:', error);
      return { success: false, error };
    }
  },

  /**
   * Send cancellation confirmation email
   */
  sendCancellationConfirmation: async (email: string, endDate: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-subscription-notification', {
        body: {
          recipient: email,
          templateName: 'cancellation-confirmation',
          data: {
            endDate,
          }
        }
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending cancellation email:', error);
      return { success: false, error };
    }
  }
};
