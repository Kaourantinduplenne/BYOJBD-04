'use client';
import { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [arrows, setArrows] = useState([]);
  const [arrowId, setArrowId] = useState(0);

  const addArrow = () => {
    const id = arrowId + 1;
    setArrows([...arrows, { id, x: 30, y: 30, w: 100, h: 10, rotate: 0 }]);
    setArrowId(id);
  };

  const updateArrow = (id, newData) => {
    setArrows(arrows.map(a => a.id === id ? { ...a, ...newData } : a));
  };

  const setArrowAngle = (id, angle) => {
    updateArrow(id, { rotate: angle });
  };

  return (
    <div className="p-4 space-y-4 w-[1123px] h-[794px] border-2 border-black overflow-auto">
      <h1 className="text-xl font-bold text-center">Rig JBD Builder with Arrow Controls</h1>
      <button onClick={addArrow} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Blue Arrow</button>

      <div className="relative w-full h-[500px] border mt-4 bg-white">
        {arrows.map((a) => (
          <Rnd
            key={`a-${a.id}`}
            size={{ width: a.w, height: a.h }}
            position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) =>
              updateArrow(a.id, {
                w: parseInt(ref.style.width),
                h: parseInt(ref.style.height),
                ...pos,
              })
            }
            enableResizing
            style={{ position: 'absolute', overflow: 'visible' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${a.rotate}deg)`,
                transformOrigin: 'center center',
                backgroundColor: 'blue',
                borderRadius: '4px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'move',
              }}
            >
              ↔
            </div>
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 flex gap-1">
              <button onClick={() => setArrowAngle(a.id, 0)} className="text-xs bg-gray-300 px-1 rounded">↔</button>
              <button onClick={() => setArrowAngle(a.id, 90)} className="text-xs bg-gray-300 px-1 rounded">↕</button>
              <button onClick={() => setArrowAngle(a.id, 45)} className="text-xs bg-gray-300 px-1 rounded">⤺</button>
              <button onClick={() => setArrowAngle(a.id, 315)} className="text-xs bg-gray-300 px-1 rounded">⤻</button>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
