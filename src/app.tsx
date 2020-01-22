import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './app.css';

export default () => {
	//1) setup the diagram engine
	var engine = createEngine();

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel({
		name: 'Node 1',
		color: 'rgb(0,192,255)'
	});
	node1.setPosition(100, 100);
	let port1 = node1.addOutPort('Out');

	//3-B) create another default node
	var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
	let port2 = node2.addInPort('In');
	node2.setPosition(400, 100);

	// link the ports
	let link1 = port1.link<DefaultLinkModel>(port2);
	link1.getOptions().testName = 'Test';
	link1.addLabel('Hello World!');

	//4) add the models to the root graph
	model.addAll(node1, node2, link1);

	//5) load model into engine
	engine.setModel(model);

	//6) render the diagram!
	const FullscreenCanvas = styled(DemoCanvasWidget)`
	  height: 100%;
	  width: 100%;
	`;

	const Container = styled.div`
	  height: 100vh;
	  width: 100vw;
	`;

	return (
		<Tabs>
			<TabList>
			  <Tab>Title 1</Tab>
			  <Tab>Title 2</Tab>
			  <Tab>Title 3</Tab>			  
			</TabList>

			<TabPanel>
				<h2>Any content 1</h2>
			</TabPanel>
			<TabPanel>
				<Container>
					<FullscreenCanvas>
					  <CanvasWidget engine={engine}>
					  </CanvasWidget>
					</FullscreenCanvas>
				</Container>
			</TabPanel>
			<TabPanel>
				<h2>Any content 3</h2>
			</TabPanel>			
		</Tabs>
	);
};