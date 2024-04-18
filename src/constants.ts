import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const MOBILE_WIDTH = 800;

export const MEDIA_SIZE = {
  mobile: `screen and (max-width: ${MOBILE_WIDTH}px)`,
  desktop: `screen and (min-width: ${MOBILE_WIDTH + 1}px)`,
};
