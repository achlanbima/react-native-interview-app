import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox, Input } from 'react-native-elements'
import { RNCamera, FaceDetector } from 'react-native-camera';


class index extends Component {

  constructor(props){
    super(props)
    this.state = {
      page : 0,
      answer :[],
      //
      checked:[],
      
      //
  }
  }


  _nextHandle(){
    if(this.state.page < this.props.questions.length-1){
      this.setState({
        page: this.state.page+1,
        answer: []
      })
    }
  }

  _backHandle(){
    if(this.state.page > 0){
      this.setState({
        page: this.state.page-1,
        answer: []
      })
    }
  }

  _submit(questionId, userId){
    alert(questionId+"\n"+userId+"\n"+this.state.answer)
  }

  handleChange = (index) => {
    let checked = [...this.state.checked];
    checked[index] = !checked[index];
    let answer = [...this.state.answer]
    if(!checked[index]){
      answer[index] = ''
    }else{

      answer[index] = index+1
    }
    this.setState({ answer })
    this.setState({ checked });
  }
  
  
  render() {
    if(this.props.fetching){
      return(
        <View style={{flex: 1, justifyContent:"center"}}>
        <ActivityIndicator size="large" color="#AAA" />
        <Text style={{textAlign:"center", fontSize:20, color:"#AAA", fontWeight:"bold"}}>Please Wait</Text>
      </View>)
    }else{
      if(this.props.fetched){
        console.log(this.state.answer.join(''))
        
        questionId = this.props.questions[this.state.page].id
        userId = this.props.userId
        
        if(this.props.questions[this.state.page].type=='multiple choice'){
          
        }
        let { data, checked } = this.state
        return (
          
          <View>
          {
            this.props.questions[this.state.page].type=='multiple choice'?(
            <View>
              <MultipleChoice
              data={this.props.questions[this.state.page]}
              radioAction={(value) => {this.setState({answer:value})}}
              />
              <TouchableOpacity onPress={()=>this._submit(questionId, userId)}>
                <View style={styles.btnSubmit}>
                  <Text>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            </View>
          ):this.props.questions[this.state.page].type=='multi select'?(
            <View>
              <Text>{this.props.questions[this.state.page].description}</Text>
              <FlatList
                data={this.props.questions[this.state.page].options.split(',')}
                extraData={this.state}
                renderItem={({ item, index }) =>
                <CheckBox
                center
                title={item}
                onPress={() => this.handleChange(index)}
                  checked={checked[index]} />
                }
              />
              <TouchableOpacity onPress={()=>this._submit(questionId, userId)}>
                <View style={styles.btnSubmit}>
                  <Text>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            ):this.props.questions[this.state.page].type=='text'?(
              <View>
                <Text>{this.props.questions[this.state.page].description}</Text>
                <Input
                  placeholder='BASIC INPUT'
                  />
                <TouchableOpacity onPress={()=>this._submit(questionId, userId)}>
                  <View style={styles.btnSubmit}>
                      <Text>SUBMIT</Text>
                    </View>
                  </TouchableOpacity>
              </View>
            
            ):
              <Text>{this.props.questions[this.state.page].description}</Text>
          }
            
          
            
            <View style={styles.btnNavContainer}>
              <TouchableOpacity onPress={()=> this._backHandle()}>
                <View style={styles.btnNav}>
                  <Text>Back</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this._nextHandle()}>
                <View style={styles.btnNav}>
                  <Text>Next</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
  }
}

class MultipleChoice extends Component{
  render(){
    radio_props = [
    ]
    options = this.props.data.options.split(',')
    options.map((opt) => {
      radio_props = [...radio_props,{label: opt, value: opt}]
    })
    return(
      <View>
        <View>
          <Text> {this.props.data.description}</Text>
        </View>
        <View>
        <RadioForm
          radio_props={radio_props}
          initial={-1}
          onPress={(value)=>this.props.radioAction(value)}
        />
        </View>
        <View>
          
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  questions : state.reducers.questions,
  fetched : state.reducers.fetched,
  fetching : state.reducers.fetching,
  userId : 1
})

export default connect(mapStateToProps)(index)

const styles = StyleSheet.create({
  btnSubmit: {
    padding:10,
    alignItems:"center",
    backgroundColor:"#99F",
  },

  btnNavContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:5
  },

  btnNav:{
    backgroundColor:"red",
    padding:10,
    paddingHorizontal:30,
    borderRadius:5
  }
})
