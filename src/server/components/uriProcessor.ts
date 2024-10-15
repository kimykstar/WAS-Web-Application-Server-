import { NotFoundUriException } from "../../exception/HttpException.ts";
import { router } from "./middlewares/Router.ts";
import { getStaticFileResponse } from "./middlewares/staticFileManager.ts";
import Request from "../httpDomain/Request.ts";

export const getResponseByUri = async (request: Request): Promise<Buffer> => {
  const staticFileResponse = getStaticFileResponse(request);
  if (staticFileResponse) return staticFileResponse;

  const apiResponse = router.processApi(request);
  if (apiResponse) return apiResponse;

  throw new NotFoundUriException();
};
