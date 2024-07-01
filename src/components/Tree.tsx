import '../App.css'
import Node from "./Node"
import {TreeData} from "../constData/treeData.ts";

export type TreeProps = {
    data: TreeData[],
}
const Tree = (props: TreeProps) => {

    return <div>{props.data.map(node =>
        <Node id={node.id}
              label={node.label}
              children = {node.children}
        />

    )}</div>
}

export default Tree