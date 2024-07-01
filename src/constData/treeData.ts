export type TreeData = {
    id : number,
    label : string,
    children?: TreeData[]
}

const treeData: TreeData[] = [
    {
        id: 1,
        label: 'Node 1',
        children: [
            {
                id: 2,
                label: 'Node 1.1',
                children: [
                    {
                        id: 3,
                        label: 'Node 1.1.1',
                        children: [
                            {
                                id: 4,
                                label: 'Node 1.1.1.1',
                            },
                            {
                                id: 5,
                                label: 'Node 1.1.1.2',
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                label: 'Node 1.2',
            },
        ],
    },
    {
        id: 7,
        label: 'Node 2',
    },
];
export default treeData;







