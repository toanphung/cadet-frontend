import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router';

import AchievementEditor from '../../../commons/achievement/control/AchievementEditor';
import AchievementPreview from '../../../commons/achievement/control/AchievementPreview';
import GoalEditor from '../../../commons/achievement/control/GoalEditor';
import AchievementInferencer from '../../../commons/achievement/utils/AchievementInferencer';
import Constants from '../../../commons/utils/Constants';
import { AchievementContext } from '../../../features/achievement/AchievementConstants';
import { AchievementItem, GoalDefinition } from '../../../features/achievement/AchievementTypes';

export type DispatchProps = {
  handleBulkUpdateAchievements: (achievements: AchievementItem[]) => void;
  handleBulkUpdateGoals: (goals: GoalDefinition[]) => void;
  handleGetAchievements: () => void;
  handleGetOwnGoals: () => void;
};

export type StateProps = {
  inferencer: AchievementInferencer;
};

function AchievementControl(props: DispatchProps & StateProps) {
  const {
    handleBulkUpdateAchievements,
    handleBulkUpdateGoals,
    handleGetAchievements,
    handleGetOwnGoals,
    inferencer
  } = props;

  /**
   * The latest achievements and goals from backend are fetched when the page is rendered
   */
  useEffect(() => {
    if (Constants.useBackend) {
      handleGetAchievements();
      handleGetOwnGoals();
    }
  }, [handleGetAchievements, handleGetOwnGoals]);

  const achievements = inferencer.getAllAchievements();
  const goals = inferencer.getAllGoals();

  /**
   * Monitors changes that are awaiting publish
   */
  const publishState = useState<boolean>(false);
  const [awaitPublish, setAwaitPublish] = publishState;
  const handlePublish = () => {
    // NOTE: Update goals first because goals must exist before their ID can be specified in achievements
    handleBulkUpdateGoals(goals);
    handleBulkUpdateAchievements(achievements);
    setAwaitPublish(false);
  };
  const requestPublish = () => {
    setAwaitPublish(true);
    forceRender();
  };

  /**
   * Allows editor components to trigger a page re-render so that the AchievementPreview
   * displays the latest local changes
   */
  const [render, setRender] = useState<boolean>();
  const forceRender = () => setRender(!render);

  return (
    <AchievementContext.Provider value={inferencer}>
      <Prompt
        message="You have unpublished changes. Are you sure you want to leave?"
        when={awaitPublish}
      />

      <div className="AchievementControl">
        <AchievementPreview awaitPublish={awaitPublish} handlePublish={handlePublish} />

        <AchievementEditor requestPublish={requestPublish} />

        <GoalEditor requestPublish={requestPublish} />
      </div>
    </AchievementContext.Provider>
  );
}

export default AchievementControl;
