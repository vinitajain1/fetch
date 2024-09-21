import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MAIN_URL } from "../utils/utilities";
import { BreedsResponse } from "../types/types";


const useBreeds = (): UseQueryResult<BreedsResponse, Error> => {
    return useQuery({
        queryKey: ['breeds'],
        queryFn: async (): Promise<BreedsResponse> => {
            try {
                const res = await fetch(`${MAIN_URL}/dogs/breeds`, { credentials: "include" });
                if (!res.ok) {
                    throw new Error(`Failed to fetch breeds: ${res.statusText}`);
                }
                const breedsRes: BreedsResponse = await res.json();
                return breedsRes;
            } catch (e) {
                if (e instanceof Error) {
                    throw new Error(`Error fetching breeds: ${e.message}`);
                }
                throw new Error("An unknown error occurred while fetching breeds");
            }
        },
        staleTime: 5 * 60 * 1000,  // Data will be considered fresh for 5 minutes
        refetchOnWindowFocus: false,  // Prevent refetching when the window regains focus
        refetchOnMount: false,       // Prevent refetching on component mount
        refetchOnReconnect: false,   // Prevent refetching on reconnecting the network
    });
};

export default useBreeds;
