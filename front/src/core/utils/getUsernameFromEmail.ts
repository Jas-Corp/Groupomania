export default function getUsernameFromEmail(email: string): string {
  return email.split("@")[0];
}
