import * as fs from 'fs/promises';
import { Application, Asset } from 'playcanvas';
import { HTMLCanvasElement } from '@playcanvas/canvas-mock/src/index.mjs';

let data = await fs.readFile('./template.js');
data = data.toString();

const json = JSON.parse(data);
const asset = new Asset(json.name, json.type, null, json.data);
asset.id = 123;

const canvas1 = new HTMLCanvasElement(100, 100);
canvas1.id = 1;

const app1 = new Application(canvas1);
app1.id = 1;
app1.autoRender = false;
app1.assets.add(asset);
app1.assets.load(asset);
app1.start();

const template1 = app1.assets.get(123).resource;
const entity1 = template1.instantiate();
const entity2 = template1.instantiate();

console.log(entity1._app.id); // RESULT 1, EXPECTED 1
console.log(entity2._app.id); // RESULT 1, EXPECTED 1

const canvas2 = new HTMLCanvasElement(100, 100);
canvas2.id = 2;

const app2 = new Application(canvas2);
app2.id = 2;
app2.autoRender = false;
app2.assets.add(asset);
app2.assets.load(asset);
app2.start();

const template2 = app2.assets.get(123).resource;
const entity3 = template2.instantiate();

console.log(entity3._app.id); // RESULT 1, EXPECTED 2
