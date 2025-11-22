export function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  export function isValidCode(code: string): boolean {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  }