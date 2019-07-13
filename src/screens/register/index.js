import React, {Component} from 'react'
import {StyleSheet ,View, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import { setUser } from '../../redux/actions/places'



class index extends Component{

  constructor(props){
    super(props)
    this.state = {
      inputEmail :"",
      inputUsername :"",
      inputPhone :""
    }
  }

  _submit(){
    // alert(this.state.inputEmail+'\n'+this.state.inputUsername+'\n'+this.state.inputPhone+'\n')
    const data = {
      email: this.state.inputEmail,
      username: this.state.inputUsername,
      phone_number: this.state.inputPhone
    }

    // console.log(this.props.navigation);
    
    this.props.setUser(data, this.props.navigation)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logo}>Kerja Yuks</Text>
        </View>
        <View>
        <Input
          placeholderTextColor='#FFF'
          placeholder='Email'
          value={this.state.inputEmail}
          onChangeText={(val)=>this.setState({inputEmail:val})}
          />
        <Input
          placeholderTextColor='#FFF'
          placeholder='Username'
          value={this.state.inputUsername}
          onChangeText={(val)=>this.setState({inputUsername:val})}
          />
        <Input
          placeholderTextColor='#FFF'
          placeholder='Phone number'
          value={this.state.inputPhone}
          onChangeText={(val)=>this.setState({inputPhone:val})}
        />
        </View>
        <View>
          <TouchableOpacity onPress={()=> this._submit()}>
            <View style={styles.button}>
              <Text style={{color:'#FFF'}}>This is Button</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    marginTop:-100,
    backgroundColor:"#41EAD4"
  },
  logoWrapper:{
    alignItems:"center"
  },
  logo:{
    fontSize:35,
    color:"#FFF"
  },
  button:{
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#AAF",
    borderRadius:5,
    width:"95%",
    marginRight:"auto",
    marginLeft:"auto",
    marginTop:10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    setUser: (data, nav) => {
      dispatch(setUser(data, nav))
    }
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(index)