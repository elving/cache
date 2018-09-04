import inDevelopment from './inDevelopment';
import getTokenFromSession from './getTokenFromSession';

export default function getHeaders(session) {
  const headers = {
    'X-Parse-REST-API-Key': inDevelopment()
      ? process.env.PARSE_DEV_REST_API_KEY
      : process.env.PARSE_REST_API_KEY,

    'X-Parse-Application-Id': inDevelopment()
      ? process.env.PARSE_DEV_APPLICATION_ID
      : process.env.PARSE_APPLICATION_ID
  };

  if (session) {
    headers['X-Parse-Session-Token'] = getTokenFromSession(session)
  }

  return headers;
}
