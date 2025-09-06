import { StatusCodes } from "npm:http-status-codes";

export const generateResponse = (
  statusCode: StatusCodes,
  response: Record<string, string>,
) => {
  const responseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json",
  };
  return new Response(
    JSON.stringify(response),
    {
      status: statusCode,
      headers: responseHeaders,
    },
  );
};
