import { create } from "zustand";

type LocationType = "ALL" | "REMOTE" | "ONSITE" | "HYBRID";
type SortOption = "newest" | "salary" | "relevant";

interface JobsStore {
  search: string;
  locationType: LocationType;
  sort: SortOption;
  setSearch: (s: string) => void;
  setLocationType: (t: LocationType) => void;
  setSort: (s: SortOption) => void;
}

export const useJobsStore = create<JobsStore>((set) => ({
  search: "",
  locationType: "ALL",
  sort: "newest",
  setSearch: (search) => set({ search }),
  setLocationType: (locationType) => set({ locationType }),
  setSort: (sort) => set({ sort }),
}));
