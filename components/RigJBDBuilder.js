'use client';
import { useState } from 'react';
import { Rnd } from 'react-rnd';
import Draggable from 'react-draggable';

const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8'];

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [workers, setWorkers] = useState([]);
  const [positions, setPositions] = useState({});
  const [zones, setZones] = useState({ green: [], red: [], black: [] });
  const [arrows, setArrows] = useState([]);
  const [arrowId, setArrowId] = useState(0);
  const [zoneId, setZoneId] = useState(0);

  const addWorker = () => {
    if (workerName.trim()) {
      setWorkers([...workers, workerName]);
      setWorkerName('');
    }
  };

  const updatePosition = (index, data) => {
    setPositions({ ...positions, [index]: { x: data.x, y: data.y } });
  };

  const addZone = (color) => {
    const id = zoneId + 1;
    setZones(prev => ({ ...prev, [color]: [...prev[color], { id, x: 20, y: 20, w: 100, h: 100 }] }));
    setZoneId(id);
  };

  const updateZone = (color, id, newZone) => {
    setZones(prev => ({
      ...prev,
      [color]: prev[color].map(z => z.id === id ? newZone : z)
    }));
  };

  const addArrow = () => {
    const id = arrowId + 1;
    setArrows([...arrows, { id, x: 30, y: 30, w: 100, h: 10, rotate: 0 }]);
    setArrowId(id);
  };

  const rotateArrow = (id) => {
    setArrows(arrows.map(a => a.id === id ? { ...a, rotate: (a.rotate + 30) % 360 } : a));
  };

  return (
    <div className="p-4 space-y-4 w-[1123px] h-[794px] border-2 border-black overflow-auto text-sm">
      <h1 className="text-xl font-bold text-center">Build Your Own Job By Design</h1>
      <div className="flex space-x-2">
        <div className="flex flex-col"><label>OPERATION</label><input value={operation} onChange={(e) => setOperation(e.target.value)} className="border rounded p-1" /></div>
        <div className="flex flex-col"><label>RIG</label><input value={rig} onChange={(e) => setRig(e.target.value)} className="border rounded p-1" /></div>
        <div className="flex flex-col"><label>PIC</label><input value={pic} onChange={(e) => setPic(e.target.value)} className="border rounded p-1" /></div>
      </div>
      <div className="flex flex-col">
        <label>LINE OF FIRE HAZARD</label>
        <input value={lofHazard} onChange={(e) => setLofHazard(e.target.value)} className="border rounded p-1 w-full" />
      </div>
      <div className="flex space-x-2 items-end">
        <div className="flex flex-col w-full"><label>Add Personnel</label><input value={workerName} onChange={(e) => setWorkerName(e.target.value)} className="border rounded p-1" /></div>
        <button onClick={addWorker} className="bg-blue-600 text-white px-2 py-1 rounded h-fit">Add</button>
      </div>
      <ul className="space-y-1">
        {workers.map((w, i) => <li key={i}>{i + 1}. {w}</li>)}
      </ul>
      <div className="flex space-x-2 mb-2">
        <button onClick={() => addZone('green')} className="bg-green-500 text-white px-2 py-1 rounded">+ Green Zone</button>
        <button onClick={() => addZone('red')} className="bg-red-500 text-white px-2 py-1 rounded">+ Red Zone</button>
        <button onClick={() => addZone('black')} className="bg-black text-white px-2 py-1 rounded">+ Black Zone</button>
        <button onClick={addArrow} className="bg-blue-500 text-white px-2 py-1 rounded">+ Blue Arrow</button>
      </div>
      <div className="relative w-full h-[500px] border bg-white">
        {workers.map((w, i) => (
          <Draggable key={i} position={positions[i] || { x: 10 + i * 10, y: 10 + i * 10 }} onStop={(e, d) => updatePosition(i, d)}>
            <div className="absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-xs cursor-move z-10"
              style={{ backgroundColor: colors[i % colors.length] }}>
              {i + 1}
            </div>
          </Draggable>
        ))}
        {zones.green.map(z => (
          <Rnd key={`g-${z.id}`} size={{ width: z.w, height: z.h }} position={{ x: z.x, y: z.y }}
            onDragStop={(e, d) => updateZone('green', z.id, { ...z, x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => updateZone('green', z.id, { width: parseInt(ref.style.width), height: parseInt(ref.style.height), ...pos })}
            style={{ border: '2px dashed green', backgroundColor: 'rgba(0,255,0,0.1)', position: 'absolute' }} />
        ))}
        {zones.red.map(z => (
          <Rnd key={`r-${z.id}`} size={{ width: z.w, height: z.h }} position={{ x: z.x, y: z.y }}
            onDragStop={(e, d) => updateZone('red', z.id, { ...z, x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => updateZone('red', z.id, { width: parseInt(ref.style.width), height: parseInt(ref.style.height), ...pos })}
            style={{ border: '2px dashed red', backgroundColor: 'rgba(255,0,0,0.1)', position: 'absolute' }} />
        ))}
        {zones.black.map(z => (
          <Rnd key={`b-${z.id}`} size={{ width: z.w, height: z.h }} position={{ x: z.x, y: z.y }}
            onDragStop={(e, d) => updateZone('black', z.id, { ...z, x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => updateZone('black', z.id, { width: parseInt(ref.style.width), height: parseInt(ref.style.height), ...pos })}
            style={{ border: '2px dashed black', backgroundColor: 'rgba(0,0,0,0.1)', position: 'absolute' }} />
        ))}
        {arrows.map(a => (
          <Rnd key={`a-${a.id}`} size={{ width: a.w, height: a.h }} position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) =>
              updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), ...pos })}
            style={{ position: 'absolute', overflow: 'visible' }}
          >
            <div
              onDoubleClick={() => rotateArrow(a.id)}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',
                transform: `rotate(${a.rotate}deg)`,
                transformOrigin: 'center center',
                borderRadius: '4px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >↻</div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
