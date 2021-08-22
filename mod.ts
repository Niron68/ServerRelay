import { Application, Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import axiod from "https://deno.land/x/axiod@0.22/mod.ts";
import {
  generateParams,
  getParamsObject,
  getRouteFromParams,
} from "./utils/paramsBuilder.ts";

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Salut je suis le server relay";
  })
  .get(`/:port${generateParams()}`, async (context) => {
    const req = await axiod.get(
      `http://localhost:${context.params.port}${
        getRouteFromParams(context.params)
      }`,
      { params: getParamsObject(context.request.url.searchParams) },
    );
    context.response.body = req.data;
    context.response.headers = req.headers;
  })
  .post(`/:port${generateParams()}`, async (context) => {
    const req = await axiod.post(
      `http://localhost:${context.params.port}${
        getRouteFromParams(context.params)
      }`,
      { params: await context.request.body().value },
    );
    context.response.body = req.data;
    context.response.headers = req.headers;
  })
  .put(`/:port${generateParams()}`, async (context) => {
    const req = await axiod.put(
      `http://localhost:${context.params.port}${
        getRouteFromParams(context.params)
      }`,
      { params: await context.request.body().value },
    );
    context.response.body = req.data;
    context.response.headers = req.headers;
  })
  .delete(`/:port${generateParams()}`, async (context) => {
    const req = await axiod.delete(
      `http://localhost:${context.params.port}${
        getRouteFromParams(context.params)
      }`,
      { params: await context.request.body().value },
    );
    context.response.body = req.data;
    context.response.headers = req.headers;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 170 });
