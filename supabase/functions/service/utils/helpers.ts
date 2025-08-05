export const extractUrls = (content: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = content.match(urlRegex);
  return urls ?? [];
};

export const extractHashtags = (content: string): string[] => {
  const hashtagRegex = /(#\w+)/g;
  const hashtags = content.match(hashtagRegex);
  return hashtags ?? [];
};

export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
