import { Component } from 'react';
import Enumerable from 'linq';

const nodesCount = 100;

const speed = 1;
const halfSpeed = speed / 2;


const minX = -200;
const maxX = 2000;

const minY = -200;
const maxY = 2000;

export class MainBackground extends Component {
    static displayName = MainBackground.name;

    constructor(props) {
        super(props);

        this.moveNodes = this.moveNodes.bind(this);

        this.nodes = this.generateNodes();
    }

    generateNodes() {
        let nodes = Enumerable
            .range(0, nodesCount)
            .select(nodeIndex => ({
                position: {
                    cx: Math.random() * (maxX - minX) + minX,
                    cy: Math.random() * (maxY - minY) + minY,
                    r: Math.random() * 10 + 2
                },
                opacity: Math.random(),
                speed: {
                    x: Math.random() * speed - halfSpeed,
                    y: Math.random() * speed - halfSpeed
                }
            }))
            .toArray();
        nodes.forEach((fromNode, fromNodeIndex) => {
            fromNode.lines = Enumerable
                .range(0, Math.random() * 3 + 2)
                .select(line => {
                    while (true) {
                        let toNodeIndex = Math.floor(Math.random() * nodesCount);
                        if (toNodeIndex !== fromNodeIndex) {
                            return {
                                toNode: nodes[toNodeIndex],
                                width: Math.random() * 1 + 1,
                                opacity: Math.random() * 0.5
                            }
                        }
                    }

                })
                .toArray();

        });
        return nodes;
    }

    componentDidMount() {
        this.intervalHandler = setInterval(this.moveNodes, 50);
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandler);
    }

    moveNodes() {
        this.nodes.forEach(node => {
            if ((node.position.cx >= maxX) || (node.position.cx < minX)) {
                node.speed.x = node.speed.x * -1;
            }
            node.position.cx += node.speed.x;

            if ((node.position.cy >= maxY) || (node.position.cy < minY)) {
                node.speed.y = node.speed.y * -1;
            }
            node.position.cy += node.speed.y;
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div className="MainBackground">
                <svg xmlns="http://www.w3.org/2000/svg" className="BackgroundSVG">
                    <g>
                        {
                            this.nodes.map(node => node.lines.map((line, lineKey) => <line key={lineKey} x1={node.position.cx} y1={node.position.cy} x2={line.toNode.position.cx} y2={line.toNode.position.cy} style={{ opacity: line.opacity, strokeWidth: line.width }} />))
                        }
                        {
                            this.nodes.map((node, nodeIndex) => <circle key={nodeIndex} {...node.position} style={{ opacity: node.opacity }} />)
                        }
                    </g>
                </svg>
            </div>
        );
    }
}
