import { NotFoundUriException } from "../exception/HttpException.ts";
import { router } from "./Router.ts";
import { getStaticFileContent } from "./staticFileManager.ts";
import Request from "../server/Request.ts";

export const getResponseByUri = async (request: Request): Promise<Buffer> => {
  const staticFileResponse = getStaticFileContent(request);
  if (staticFileResponse) return staticFileResponse;

  const apiResponse = router.processApi(request);
  if (apiResponse) return apiResponse;

  throw new NotFoundUriException();
};
