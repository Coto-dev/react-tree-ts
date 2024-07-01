import './App.css'
import treeData, {TreeData} from './constData/treeData'
import React, {useEffect} from "react"
import Tree from "./components/Tree"
import {SelectedNodeContext} from "./SelectedNodeProvider.ts";

const App = () => {
    const [selectedNodeId, setSelectedNodeId] = React.useState<number|null>(null)
    const [tree, setTree] = React.useState<TreeData[]>(JSON.parse(JSON.stringify(treeData)))
    const [counter, increaseCount] = React.useState(8)
    const addChildToNode = (id : number|null, childNode : TreeData) => {
        const updatedTreeData = JSON.parse(JSON.stringify(tree))
        const traverseAndUpdate = (nodes: TreeData[]) => {
            if (id === null )
            {
                nodes.push(childNode)
                return
            }
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    if (!nodes[i].children) {
                        nodes[i].children = []
                    }
                    nodes[i].children?.push(childNode)
                    return
                }

                if (nodes[i].children) {
                    traverseAndUpdate(nodes[i].children!)
                }
            }
        }
        traverseAndUpdate(updatedTreeData)
        setTree(updatedTreeData)
    }

    const removeNodeById = (id : number | null) => {
        const updatedTreeData = JSON.parse(JSON.stringify(tree))
        const traverseAndDelete = (nodes: TreeData[]) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    nodes.splice(i, 1)
                    return
                }

                if (nodes[i].children) {
                    traverseAndDelete(nodes[i].children!)
                }
            }
        }
        traverseAndDelete(updatedTreeData)
        setSelectedNodeId(null)
        setTree(updatedTreeData)
    }
    const editNode = (id : number | null, name : string) => {
        const updatedTreeData = JSON.parse(JSON.stringify(tree))
        const traverseAndUpdate = (nodes: TreeData[]) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    nodes[i].label = name
                    return
                }

                if (nodes[i].children) {
                    traverseAndUpdate(nodes[i].children!)
                }
            }
        }
        traverseAndUpdate(updatedTreeData)
        setTree(updatedTreeData)
    }
    const onButtonAddClick = () => {
        const newNode = {
            id : counter,
            label: 'New Node',
        }
        addChildToNode(selectedNodeId, newNode)
        increaseCount(counter+1)
    }
    const onButtonDeleteClick = () => {
        removeNodeById(selectedNodeId)
    }
    const onButtonEditClick = () => {
        let name = prompt("New name :") ?? ""
        name = name.trim().length == 0 ? "default name" : name
        editNode(selectedNodeId,name)
    }
    const onButtonReset = () => {
        setTree(treeData)
        setSelectedNodeId(null)

    }
    const handleOutClick = (event: Event) => {
        const target = event.target as HTMLButtonElement;
        if (target.className === "container") {
            setSelectedNodeId(null)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutClick)
    })
    return (
        <div>
            <div className="container">
                <div className="tree">
                    <div className="header">Tree</div>
                        <SelectedNodeContext.Provider value={{selectedNodeId: selectedNodeId,setSelectedNodeId: setSelectedNodeId}}>
                    <Tree data={tree}
                    />
                        </SelectedNodeContext.Provider>
                    <div className="buttons">
                        <button className="btn" type="button" onClick={onButtonAddClick}>Add</button>
                        <button className="btn" type="button" disabled={selectedNodeId===null} onClick={onButtonDeleteClick}>Remove</button>
                        <button className="btn" type="button" disabled={selectedNodeId===null} onClick={onButtonEditClick}>Edit</button>
                        <button className="btn" type="button" onClick={onButtonReset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default App
