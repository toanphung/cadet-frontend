import { Variant } from 'js-slang/dist/types';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import DashboardContainer from 'src/pages/achievement/subcomponents/AchievementDashboardContainer';

import NavigationBar from '../navigationBar/NavigationBar';
import { Role } from './ApplicationTypes';
import { ExternalLibraryName } from './types/ExternalTypes';
export type ApplicationProps = DispatchProps & StateProps & RouteComponentProps<{}>;

export type DispatchProps = {
  handleClearContext: (
    chapter: number,
    variant: Variant,
    externalLibraryName: ExternalLibraryName,
    shouldInitLibrary: boolean
  ) => void;
  handleEditorValueChange: (val: string) => void;
  handleEditorUpdateBreakpoints: (breakpoints: string[]) => void;
  handleEnsureLibrariesLoaded: () => void;
  handleLogOut: () => void;
  handleExternalLibrarySelect: (external: ExternalLibraryName) => void;
  handleSetExecTime: (execTime: string) => void;
};

export type StateProps = {
  accessToken?: string;
  currentPlaygroundChapter: number;
  currentPlaygroundVariant: Variant;
  role?: Role;
  title: string;
  name?: string;
  currentExternalLibrary: ExternalLibraryName;
};

class Application extends React.Component<ApplicationProps, {}> {
  public render() {
    const fullPaths = Constants.playgroundOnly
      ? null
      : [
          <Route path="/academy" component={toAcademy(this.props)} key={0} />,
          <Route
            path={'/mission-control/:assessmentId(-?\\d+)?/:questionId(\\d+)?'}
            render={toIncubator}
            key={1}
          />,
          <Route path="/achievement" component={toAchievement(this.props)} key={2} />,
          <Route path="/login" render={toLogin(this.props)} key={3} />
        ];

    return (
      <div className="Application">
        <NavigationBar
          handleLogOut={this.props.handleLogOut}
          role={this.props.role}
          name={this.props.name}
          title={this.props.title}
        />
        <div className="Application__main">
          <Switch>
            <Route exact={true} path="/achievement" component={DashboardContainer} />
            <Route render={this.redirectToAchievement} />
          </Switch>
        </div>
      </div>
    );
  }

  private redirectToAchievement = () => <Redirect to="/achievement" />;
}

export default Application;
