import { merge } from 'lodash';

export default function parseResponse(response, requestData) {
  return merge({}, requestData, response.data);
}
