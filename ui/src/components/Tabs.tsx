import React, { Component, ReactNode } from 'react';

interface TabsProps {
    children: ReactNode;
}

interface TabsState {
    activeTabIndex: number;
}

interface TabListProps {
    children: React.ReactNode;
    activeTabIndex: number;
    onTabClick: (index: number) => void;
}

interface TabProps {
    isActive: boolean;
    onClick: (index: number) => void;
    children: React.ReactNode;
    index: number;
}

interface TabPanelProps {
    isActive: boolean;
    children: React.ReactNode;
    index: number;
  }
  
// Type guards
function isTabList(child: React.ReactNode): child is React.ReactElement<TabListProps> {
    return (React.isValidElement(child) && child.type === TabList);
}

function isTab(child: React.ReactNode): child is React.ReactElement<TabProps> {
    return (React.isValidElement(child) && child.type === Tab);
}

function isTabPanel(child: React.ReactNode): child is React.ReactElement<TabPanelProps> {
    return (React.isValidElement(child) && child.type === TabPanel);
}

class TabList extends Component<TabListProps> {
  render() {
    const { children, activeTabIndex, onTabClick } = this.props;

    return (
      <div className="tab-list">
        {React.Children.map(children, (child, index) => {
          if (isTab(child)) {
            return React.cloneElement<TabProps>(child, {
              isActive: activeTabIndex === index,
              onClick: () => onTabClick(index),
            });
          }
          return child;
        })}
      </div>
    );
  }
}
class Tab extends Component<TabProps> {
    render() {
        const { index, isActive, onClick, children } = this.props;
        return (
        <div className={`tab ${isActive ? "active" : ""}`} onClick={() => onClick(index)}>
            {children}
        </div>
        );
    }
}
 
class TabPanel extends Component<TabPanelProps> {
    render() {
        const { isActive, children } = this.props;

        return (
        <div className={`tab-panel ${isActive ? 'active' : ''}`}>
            {children}
        </div>
        );
    }
}
class Tabs extends Component<TabsProps, TabsState> {
    state: TabsState = {
        activeTabIndex: 0,
    };

    handleTabClick = (index: number) => {
        this.setState({
        activeTabIndex: index,
        });
    };

    render() {
        const { children } = this.props;
        const { activeTabIndex } = this.state;

        return (
        <div className="tabs">
            {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {  // probably don't need this check since checking in type guard funcs in the subsequent if checks.
                if (child.type === TabList && isTabList(child)) {
                return React.cloneElement<TabListProps>(child, {
                    activeTabIndex,
                    onTabClick: this.handleTabClick,
                });
                } else if (child.type === TabPanel && isTabPanel(child)) {
                return React.cloneElement<TabPanelProps>(child, {
                    isActive: activeTabIndex === child.props.index,
                });
                } else if (child.type === Tab && isTab(child)) {
                return React.cloneElement<TabProps>(child, {
                    isActive: activeTabIndex === child.props.index,
                });
                }
            }
            return child;
            })}
        </div>
        );
    }
}

export { Tabs, TabList, Tab, TabPanel };
