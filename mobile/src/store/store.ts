import { create } from 'zustand'

interface StateStore {
	removeFileInput: boolean
	comprovante: any
	setRemoveFileInput: (removeFile: boolean) => void
	setComprovante: (comprovante: any) => void
}

export const useStateStore = create<StateStore>()(set => ({
	removeFileInput: false,
	comprovante: null,
	setRemoveFileInput: (removeFile: boolean) =>
		set({ removeFileInput: removeFile }),
	setComprovante: (comprovante: any) => set({ comprovante: comprovante }),
}))
