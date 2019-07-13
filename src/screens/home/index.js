import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getQuestion } from '../../redux/actions/places';
import { connect } from 'react-redux'
import { Text } from 'react-native-elements'

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
      company : "PT ABC DEFGHIJKLMN",
      desc : "ini adalah perusahaan fiktif",
      available_pos : "All Position"
    },
  ]

  _start(){
    this.props.getQuestion(this.props.navigation)
    this.props.navigation.navigate('interview')
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text h4>{item.company}</Text>
              <Text h5>Deskripsi:</Text>
              <Text>{item.desc}</Text>
              <Text>Posisi : {item.available_pos}</Text>
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
  container:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"#41EAD4"
  },
  card: {
    padding:10,
    borderWidth:0.5,
    width:'95%',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:5,
    borderRadius:5,
    backgroundColor:'#FCFCFC',
    borderColor:"#CCC"
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