import { useQuery } from "@tanstack/react-query";

// function to reuse usequerry
function useTanstack(querrykey, querryfn, stime) {
    return useQuery({
        queryKey: [querrykey],
        queryFn: querryfn,
        staleTime: stime
    });
};


export { useTanstack };