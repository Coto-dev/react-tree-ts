import '../App.css'
import {TreeData} from "../constData/treeData.ts";
import {SelectedNodeContext} from "../SelectedNodeProvider.ts";
import {useContext} from "react";
export type NodeProps = {
    id: number,
    label: string,
    children: TreeData[]|undefined,
}
const Node = (props : NodeProps) => {
    const selectedNode = useContext(SelectedNodeContext);

    const handleNodeClick = () => {
        selectedNode.setSelectedNodeId(selectedNode.selectedNodeId == props.id ? null : props.id)
    }
    return (
        <div>
            <label className={
                `Label  ${props.id === selectedNode.selectedNodeId ? 'selected' : ''}`}
                   onClick={handleNodeClick}>
                {props.label}
            </label>
            {props.children && <ul>{props.children.map((d) =>
                <Node
                    id={d.id}
                    label={d.label}
                    children={d.children}
                />
            )}</ul>}
        </div>
    )
}

export default Node