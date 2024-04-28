import { createClient } from "@sanity/client";

const PROJECT_ID = "x0abh6tm";
const DATASET = "production";
export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true,
  apiVersion: "2024-04-27",
});
