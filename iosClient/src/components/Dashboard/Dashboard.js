import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../../actions/Dashboard';

import axios from 'axios';

export class Dashboard extends Component {
  constructor (props){
    super();
    this.fetchData = this.fetchData.bind(this);    
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchData(4);
  }  
  
  render() {
    // {console.log(this.props,'this.props INSIDE DASHBOARD RENDER')}
    if (this.props.topVertical){
      return (
        <View>
          <Text style={styles.bigText}>{Math.floor(this.props.percentMatches * 100)}%</Text>
          <Text style={styles.medText}>of Matches Connected</Text>
          <Text style={styles.bigText}>{"'" + this.props.topReason + "'"}</Text>
          <Text style={styles.medText}>Top Reason for Connection</Text>
          <Text style={styles.bigText}>{"'" + this.props.topVertical + "'"}</Text>
          <Text style={styles.medText}>Top Vertical of Connections</Text>
        </View>
      )
    } else {
      return (<View>{console.log('LOADING DASH')}</View>)
    }
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN mapStateToProps - Dashboard', state)
  return {
    ...state,
    percentMatches: state.Dashboard.percentMatches,
    topReason: state.Dashboard.topReason,
    topVertical: state.Dashboard.topVertical
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (userID) => { dispatch( getData(userID) ) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  bigText: {
    alignSelf: 'center',  
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  medText: {
    alignSelf: 'center',      
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
  },  
  smallText: {
    alignSelf: 'center',      
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
  },
})

