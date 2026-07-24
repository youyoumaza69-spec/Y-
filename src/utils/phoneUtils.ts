export const makePhoneCall = (phoneNumber: string) => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  // Force triggering phone dialer link across all platforms/browsers
  window.location.href = `tel:${cleanNumber}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older frames
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    }
  } catch (err) {
    console.error("Copy failed", err);
    return false;
  }
};
