import React from "react";
import ReactDOM from "react-dom";

import TaskBarIcon  from './taskbaricon';

import '../styles/wmgr/taskbar.css';

import arrowDown from '../styles/images/icons/arrow-down.png';
import arrowUp from '../styles/images/icons/arrow-up.png';

const heightFolded=38;
const heightFull=60;

/**
 *
 */
export default class TaskBar extends React.Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
      taskbarSize: "small",
      barHeight: heightFolded
    };

    this.onIconClicked = this.onIconClicked.bind(this);
    this.onArrowClicked = this.onArrowClicked.bind(this);
  }

  /**
   *
   */
  componentDidMount () {
    console.log ("componentDidMount");
    
    this.setState ({folded: false, taskbarSize: "medium", barHeight: heightFull});  
  }  

  /**
   * 
   */
  onIconClicked (id) {
    //console.log ("onIconClicked ("+id+")");
    
    if (this.props.appmanager) {
      this.props.appmanager.toggle (id);
    }
  }

  /**
   *
   */
  /* 
  addSeparator () {
    let newIcons=this.state.icons.concat ({type:"separator"}); 
    this.setState ({icons: newIcons});
  }
  */
  
  /**
   * 
   */
  onArrowClicked (){
    //console.log ("onArrowClicked ()");
    if (this.state.folded==true) {
      this.setState ({folded: false, taskbarSize: "medium", barHeight: heightFull});  
    } else {
      this.setState ({folded: true, taskbarSize: "small", barHeight: heightFolded});  
    }
  }  

  /**
   *
   */
  render() {
    let arrow;
    let apps=this.props.appmanager.getAppReference ();
          
    if (this.state.folded==false) {
      arrow=<div className="taskbarGripper" onClick={this.onArrowClicked}><img src={arrowDown} className="taskbarGripperIconStyle" /></div>
    } else {
      arrow=<div className="taskbarGripper" onClick={this.onArrowClicked}><img src={arrowUp} className="taskbarGripperIconStyle" /></div>
    }
    
    let icons=null;

    if (apps.length>0) {
      icons=[];
      for (let i=0;i<apps.length;i++) {
        let app=apps [i];

        if (app.icon) {
          icons.push (<TaskBarIcon key={"icon"+i} tsize={this.state.taskbarSize} icon={app.icon} title={app.name} appId={app.id} iconClicked={this.onIconClicked}/>);
        }

        /*
        if (icon.type=="separator") {
          icons.push (<div key={"sep"+i} className="taskbarVr"></div> );
        } 
        */     
      }
    } else {
      icons="Loading taskbar icons ...";
    }

    return (
      <div className="taskbarBar">
        {icons}
        {arrow}
      </div>
    );
  }
}
