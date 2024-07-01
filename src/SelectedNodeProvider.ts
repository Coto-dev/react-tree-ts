import { createContext } from 'react';
export type SelectedNode = {
    selectedNodeId: number|null,
    setSelectedNodeId : (selectedNodeId: number|null) => void
}

export const SelectedNodeContext = createContext<SelectedNode>({selectedNodeId : null, setSelectedNodeId : () => {} })