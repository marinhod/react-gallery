import React from 'react';
import s from "./gallery.scss";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expandedItem: {},
      expandedPosition: 0
    };
  }

  handleExpand = (item, index) => {
    document.body.setAttribute('class', 'stopScrolling');
    this.setState({
      expanded: true,
      expandedItem: item,
      expandedPosition: index
    });
  }

  handleClose = () => {
    this.setState({expanded: false});
  }

  handlePosition = (newPositionVirtual) => {
    let newPosition = this.state.expandedPosition;
    if (this.props.items[newPositionVirtual]) {
      newPosition = newPositionVirtual;
    }
    let newItem = this.props.items[newPosition];
    this.setState({
      expandedItem: newItem,
      expandedPosition: newPosition
    });
  }

  handlePrevious = () => {
    let newPosition = this.state.expandedPosition - 1;
    this.handlePosition(newPosition);
  }

  handleNext = () => {
    let newPosition = this.state.expandedPosition + 1;
    this.handlePosition(newPosition);
  }

  showPrevious = () => {
    if (this.props.items[this.state.expandedPosition - 1]) {
      return true;
    } else {
      return false;
    }
  }

  showNext = () => {
    if (this.props.items[this.state.expandedPosition + 1]) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
  }

  handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      this.handlePrevious();
    } else if (event.key === 'ArrowRight') {
      this.handleNext();
    } else if (event.key === 'Escape') {
      this.handleClose();
    }
  }

  render() {
    const items = this.props.items.map((item, index) => (
      <li>
        <div 
          className="imgDiv" 
          style={{backgroundImage: `url("${item.src}")`}}
          onClick={()=>this.handleExpand(item, index)}>
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
              {this.showPrevious() ?
                <span className="previous" onClick={this.handlePrevious}></span>
                : null}
              {this.showNext() ?
                <span className="next" onClick={this.handleNext}></span>
                : null}
              <a 
                download={this.state.expandedItem.title} 
                href={this.state.expandedItem.src}>
                <span className="download"></span>
              </a>
              <span className="close" onClick={this.handleClose}></span>
              <img src={this.state.expandedItem.src} />
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
