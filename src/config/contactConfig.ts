export interface ContactConfig {
  whatsappNumber: string; // Digits only including country code (e.g. 919876543210 for +91)
  whatsappDisplay: string;
  email: string;
  behance: string;
  linkedin: string;
}

export const CONTACT_CONFIG: ContactConfig = {
  // Configured WhatsApp number (digits only, e.g. 919908177179)
  whatsappNumber: '919908177179',
  whatsappDisplay: '+91 99081 77179',
  email: 'mandhalavinodh@gmail.com',
  behance: 'https://www.behance.net/AkkySigns',
  linkedin: 'https://www.linkedin.com/in/vinnythewebdesigner/',
};

export function buildWhatsAppUrl(message: string, phoneNumber: string = CONTACT_CONFIG.whatsappNumber): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message.trim())}`;
}

