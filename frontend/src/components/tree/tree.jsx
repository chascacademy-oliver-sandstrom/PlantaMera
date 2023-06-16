import React, { useState, useEffect } from 'react';
import { getPoints } from '../../api/auth';

const TreeStageImage = ({ stage }) => {
  const getImageSource = () => {
    switch (stage) {
      case 1:
        return './tree_stage_0.svg';
      case 2:
        return './tree_stage_1.svg';
      case 3:
        return './tree_stage_2.svg';
      case 4:
        return './tree_stage_3.svg';
      case 5:
        return './tree_stage_4.svg';
      default:
        return '';
    }
  };

  return (
    <div className="tree-stage-image-container">
      <img src={getImageSource()} alt={`Träd steg ${stage}`} />
    </div>
  );
};

const Tree = ({ isCameraActive }) => {
  const TREE_STAGES = {
    STAGE_1: 1,
    STAGE_2: 2,
    STAGE_3: 3,
    STAGE_4: 4,
    STAGE_5: 5
    

  };

  const [treeStage, setTreeStage] = useState(TREE_STAGES.STAGE_1);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { points } = await getPoints();
        setUserPoints(points);
        if (points >= 0 && points < 40) {
          setTreeStage(TREE_STAGES.STAGE_1);
        }

        
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    const interval = setInterval(fetchPoints, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userPoints >= 40 && userPoints < 80) {
      setTreeStage(TREE_STAGES.STAGE_2);
    } else if (userPoints >= 80 && userPoints < 120) {
      setTreeStage(TREE_STAGES.STAGE_3);
    } else if (userPoints >= 120 && userPoints < 160) {
      setTreeStage(TREE_STAGES.STAGE_4);
    } else if (userPoints >= 160 && userPoints < 200) {
      setTreeStage(TREE_STAGES.STAGE_5);
    } else if (userPoints >= 200) {
      setTreeStage(TREE_STAGES.STAGE_5);
    } else {
      setTreeStage(TREE_STAGES.STAGE_1);
    }
  }, [userPoints]);

  if (isCameraActive) {
    return (
      <div className="tree-container hidden">
        <div className="tree-stage-container"></div>
      </div>
    );
  }

  return (
    <div className="tree-container">
      <div className="tree-stage-container">
        <TreeStageImage stage={treeStage} />
      </div>
    </div>
  );
};


export default Tree;
