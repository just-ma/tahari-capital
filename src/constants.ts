import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const MEDIA_SIZE = {
  mobile: "screen and (max-width: 600px)",
  desktop: "screen and (min-width: 601px)",
};
