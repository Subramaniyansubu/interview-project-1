import { store } from "@/lib/store";
import { getTurtles } from "@/services/api";
import type { MetadataRoute } from "next";

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: turtles } = await store.dispatch(getTurtles.initiate());

  const turtleRoutes =
    turtles?.map((turtle) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/turtles/${turtle.id}`,
      lastModified: new Date().toISOString().split("T")[0],
    })) || [];

  const routes = [""].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...turtleRoutes];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemap();
}
