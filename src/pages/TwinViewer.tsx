import { ADT3DViewer, Theme } from '@microsoft/iot-cardboard-js';
import React, { useContext, useState } from 'react';
import { ApplicationContext } from '../App';

export interface ITwinViewerProps {
  className?: string;
}

export const TwinViewer: React.FC<ITwinViewerProps> = ({ className }) => {
  const { ADT3DSceneAdapter, config } = useContext(ApplicationContext);

  // TODO: Should not be hardcoded, get it from logged in user info
  // What do we get from config, if there is an [] of scenesIDs does ADT3DViewer creates Breadcrumb as dropdown
  const scenesMap: Map<string, string> = new Map(Object.entries(JSON.parse(process.env.REACT_APP_SCENEIDS)));

  const [selectedSceneId, setSelectedSceneId] = useState(scenesMap.get(scenesMap.keys().next().value));

  const handleSceneChange = (event) => {
    setSelectedSceneId(event.target.value);
  };

  return (
    <div className={className}>
      <div>
        <select id="sceneSelect" value={selectedSceneId} onChange={handleSceneChange}>
          {Array.from(scenesMap.entries()).map(([sceneName, sceneId]) => (
            <option key={sceneId} value={sceneId}>
              {sceneName}
            </option>
          ))}
        </select>
        {selectedSceneId && <p>Selected scene : {selectedSceneId}</p>}
      </div>

      <ADT3DViewer
        scenesConfig={config as any}
        sceneId={process.env.REACT_APP_SCENEID}
        title="3D Viewer"
        theme={Theme.Kraken}
        adapter={ADT3DSceneAdapter}
      />
    </div>
  );
}
