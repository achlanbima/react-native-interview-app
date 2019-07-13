import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getQuestion } from '../../redux/actions/places';
import { connect } from 'react-redux'

class index extends Component {

  constructor(props){
    super(props)

  }

  data = [
    {
      company : "PT MAJU MUNDUR",
      desc : "Maju enggak mundur enggak",
      available_pos : "Ngelap kesang dunungan"
    },
    {
      company : "PT MENCARI CINTA SEJATI",
      desc : "Masih ada yang pake ini di profile FB nya?",
      available_pos : "All Position"
    },
  ]

  _start(){
    this.props.getQuestion(this.props.navigation)
    this.props.navigation.navigate('interview')
  }

  render() {
    return (
      <View>
        <Text> Home Here </Text>
        <FlatList
          data={this.data}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text>{item.company}</Text>
              <Text>{item.desc}</Text>
              <Text>{item.available_pos}</Text>
              <TouchableOpacity onPress={()=> this._start()}>
                <View style={styles.button}>
                  <Text>Start Interview</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding:10,

  },
  button:{
    backgroundColor:"#99F",
    padding:10,
    alignItems:"center",
    borderRadius:5,
    marginTop:5
  }
})


const mapDispatchToProps = dispatch => {
  return {
    getQuestion: () => {
      dispatch(getQuestion())
    }
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(index)