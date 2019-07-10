import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: false
    }
  }

  getData(){
    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        data: true
      })
    }, 1000)
  }

  componentWillMount(){
    this.getData();
  }

  render() {
    return(
      <div>
      {this.state&&this.state.data&&<div>hopa hopa</div>}
    </div>
    )
  }
}

export default App;