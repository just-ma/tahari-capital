import { useQuery } from "@tanstack/react-query";
import { DocumentBase, client } from ".";

export default function useGetDocument<T extends DocumentBase>(
  type: T["_type"]
) {
  return useQuery({
    queryKey: [type],
    queryFn: async (): Promise<T | undefined> => {
      const response = await client.fetch(`*[_type == "${type}"]`);
      return response?.[0];
    },
  });
}
