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
      <View>
        <View>
          <Text>REGISTER</Text>
        </View>
        <View>
        <Input
          placeholder='Email'
          value={this.state.inputEmail}
          onChangeText={(val)=>this.setState({inputEmail:val})}
          />
        <Input
          placeholder='Username'
          value={this.state.inputUsername}
          onChangeText={(val)=>this.setState({inputUsername:val})}
          />
        <Input
          placeholder='Phone number'
          value={this.state.inputPhone}
          onChangeText={(val)=>this.setState({inputPhone:val})}
        />
        </View>
        <View>
          <TouchableOpacity onPress={()=> this._submit()}>
            <View style={styles.button}>
              <Text>This is Button</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#AAF",
    borderRadius:5,
    width:"95%",
    marginRight:"auto",
    marginLeft:"auto",
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