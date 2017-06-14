import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../../actions/Dashboard';

import axios from 'axios';

export class Dashboard extends Component {
  constructor (props){
    super();
    this.determineUser();
  }

  async determineUser(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+ result[1][1] }
        }
        this.props.fetchData(authid, config);
      })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
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
          <Text style={styles.medText}>Top Industry of Connections</Text>
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
    fetchData: (authid, config) => { dispatch( getData(authid, config) ) },
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

