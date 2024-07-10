// import { create } from 'zustand'

// export const useEventInfoStore = create((set) => ({
//   eventInfo: {},
//   updateEventInfo: () => set((info : any) => ({ eventInfo: info })),
// }))



import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EventInfoState {
  // 뒤로가기 여부
  eventInfo: object | null;
  updateEventInfo: (eventInfo: object) => void;
}

export const useEventInfoStore = create<EventInfoState>()(
  devtools((set) => ({
    eventInfo: null,
    updateEventInfo: (eventInfo) => set(() => ({ eventInfo })),
  })),
);
