import crypto from 'crypto';

export default function hashText(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex');
}
