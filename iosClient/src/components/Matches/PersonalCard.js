import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import ExperienceItem from './ExperienceItem.js'

export class PersonalCard extends Component {
  constructor (props){
    super();
  }

  render() {
    let currentProfile = this.props.currentMatch.profile[0];
    return (
      <View>
        <Text style={styles.bigText}>Personal</Text>
        <Text style={styles.smallText}>{currentProfile.summary}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    currentMatch: state.Matches.currentMatch
  }
};

export default connect(mapStateToProps)(PersonalCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    justifyContent: 'center',    
    alignSelf: 'center',  
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  medText: {
    color: 'grey',
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallText: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
  } 
})
