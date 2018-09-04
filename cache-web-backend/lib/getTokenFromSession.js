export default function getTokenFromSession(session) {
  return `r:${session.split(':')[1]}`;
}
