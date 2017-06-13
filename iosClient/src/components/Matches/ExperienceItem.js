import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';

class ExperienceItem extends Component {
  constructor (props){
    super();
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.medText}>{this.props.exp.organization}</Text>
        <Text style={styles.smallText}>{this.props.exp.role}</Text>
        <Text style={styles.smallText}>{this.props.exp.start_date} - {this.props.exp.end_date}</Text>
        <Text style={styles.smallText}>Description: {this.props.exp.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  medText: {
    // alignSelf: 'center',  
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallText: {
    color: 'grey',
    fontSize: 10,
    fontWeight: 'bold',
  }   
})

module.exports = ExperienceItem;