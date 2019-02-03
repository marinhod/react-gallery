import React from 'react';
import s from "./gallery.scss";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expandedSrc: ''
    };
  }

  handleExpand = (item) => {
    document.body.setAttribute('class', 'stopScrolling');
    this.setState({
      expanded: true,
      expandedSrc: item.src
    });
  }

  handleClose = () => {
    this.setState({expanded: false});
  }

  render() {
    const items = this.props.items.map(item => (
      <li>
        <div 
          className="imgDiv" 
          style={{backgroundImage: `url("${item.src}")`}}
          onClick={()=>this.handleExpand(item)}>
        </div>
      </li>
    ));
    const screenObj = window.screen;
    return (
      <div>
        <div 
          id="imgDivExpanded" 
          style={{
            height: screenObj.availHeight,
            display: this.state.expanded ? 'table' : 'none'
          }}>
          <div class="middle">
            <div class="inner">
              <span class="close" onClick={this.handleClose}></span>
              <img src={this.state.expandedSrc} />
            </div>
          </div>
          </div>
        <ul style={{display: this.state.expanded ? 'none' : 'block'}}>
          {items}
        </ul>
      </div>
    );
  }
}

export default Gallery;
