import axios from "axios";
import logger from "base/logger";

const APIRequestModel = {};

async function saveRequest(service, requestId, uri, method, data, headers, doneAt, result) {
  const options = {
    requestId,
    service,
    method,
    uri,
    data,
    headers: { ...headers, Connection: "keep-alive" },
    insecure: true,
    rejectUnauthorized: false,
    retriedAt: null,
    doneAt,
    response: result,
  };

  const newRequest = await APIRequestModel.create(options);
  return newRequest;
}

logger.log(saveRequest);

async function TrueAxios(service, requestId, uri, method, data, headers) {
  const requestObject = {
    method,
    uri,
    headers,
    json: true,
  };

  switch (method) {
    case "GET":
      requestObject.qs = data;
      break;
    case "POST":
      requestObject.body = data;
      break;
    default:
      requestObject.body = data;
      requestObject.qs = data;
      break;
  }
  const doneAt = Date.now();
  const result = axios(requestObject);

  await Queue.add(
    "saveRequest",
    {
      service,
      requestId,
      uri,
      method,
      headers,
      data,
      doneAt,
      result,
    },
    { attempts: 3 }
  );
  return result;
}

export default TrueAxios;
