
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

// Initialize Resend with API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email templates
const emailTemplates = {
  "subscription-welcome": {
    subject: "Bem-vindo ao RunCash!",
    getHtml: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00ff00;">Bem-vindo ao RunCash!</h1>
        <p>Olá,</p>
        <p>Obrigado por se inscrever no plano ${data.planName}.</p>
        <p>Sua assinatura está agora ativa, e você tem acesso a todos os recursos premium.</p>
        <p>Se precisar de alguma ajuda, não hesite em nos contatar.</p>
        <p>Atenciosamente,<br>Equipe RunCash</p>
      </div>
    `,
  },
  "renewal-reminder": {
    subject: "Lembrete de renovação de assinatura",
    getHtml: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00ff00;">Lembrete de Renovação</h1>
        <p>Olá,</p>
        <p>Este é um lembrete amigável de que sua assinatura do plano ${data.planName} será renovada em ${new Date(data.renewalDate).toLocaleDateString('pt-BR')}.</p>
        <p>Não é necessária nenhuma ação da sua parte. O pagamento será processado automaticamente.</p>
        <p>Se tiver alguma dúvida, entre em contato conosco.</p>
        <p>Atenciosamente,<br>Equipe RunCash</p>
      </div>
    `,
  },
  "cancellation-confirmation": {
    subject: "Confirmação de cancelamento de assinatura",
    getHtml: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00ff00;">Assinatura Cancelada</h1>
        <p>Olá,</p>
        <p>Confirmamos que sua assinatura foi cancelada conforme solicitado.</p>
        <p>Você continuará tendo acesso aos recursos premium até ${new Date(data.endDate).toLocaleDateString('pt-BR')}.</p>
        <p>Esperamos vê-lo novamente em breve.</p>
        <p>Atenciosamente,<br>Equipe RunCash</p>
      </div>
    `,
  },
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request data
    const { recipient, templateName, data } = await req.json();
    
    // Validate input
    if (!recipient || !templateName || !emailTemplates[templateName]) {
      throw new Error("Invalid request parameters");
    }

    // Get template
    const template = emailTemplates[templateName];
    
    // Send email
    const { data: emailData, error } = await resend.emails.send({
      from: "RunCash <no-reply@runcash.app>",
      to: recipient,
      subject: template.subject,
      html: template.getHtml(data || {}),
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email sent successfully", 
      data: emailData 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Return error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending email:", errorMessage);
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
