import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox, Input } from 'react-native-elements'
import { RNCamera, FaceDetector } from 'react-native-camera'
import { setAnswer } from '../../redux/actions/places'
import CountDown from 'react-native-countdown-component';


class index extends Component {

  constructor(props){
    super(props)
    this.state = {
      page : 0,
      answer :[],
      //
      checked:[],
      userId:"",
      //
    }
  }


  _nextHandle(){
    if(this.state.page < this.props.questions.length-1){
      this.setState({
        page: this.state.page+1,
        answer: ''
      })
    }else{
      alert('terimakasih telah menjawab, kami akan segera menghubungi anda')
      this.props.navigation.navigate('register')
    }
  }

  _backHandle(){
    if(this.state.page > 0){
      this.setState({
        page: this.state.page-1,
        answer: ''
      })
    }
  }

  _submit(questionId, userId, type, attachment=""){
    let data

    if(attachment!=""){
      data = {
        question_id:questionId,
        user_id:userId,
        attachment
      }
      
      this.props.setAnswer(data)
        this.setState({
        page:this.state.page+1,
        answer: ''
      })

    }else{
      
      if(this.state.answer.length!=0){
        
        if(type=='multiple choice'){
          data = {
            question_id:questionId,
            user_id:userId,
            answer:this.state.answer,
          }
        }else if(type == 'multi select'){
          data = {
            question_id:questionId,
            user_id:userId,
            answer:this.state.answer.join(''),
          }
        }else if(type == 'text'){
          data = {
            question_id:questionId,
            user_id:userId,
            answer:this.state.answer,
          }
        }
        this.props.setAnswer(data)
        this.setState({
        page:this.state.page+1,
        answer: ''
      })
    }else{
      alert('Soal belum dijawab')
    }
  }
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

  async startRecording(userId, questionId) {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4" } = await this.camera.recordAsync();
    this.setState({ recording: false, processing: true });
    const type = `video/${codec}`;

    const data = new FormData();
    data.append("video", {
      name: "mobile-video-upload",
      type,
      uri
    });

    this._submit(questionId,userId,'record video', data)
    // console.log(questionId+' '+userId);
    

    this.setState({ processing: false });
  }

  stopRecording() {
    this.camera.stopRecording();
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
        const { recording, processing } = this.state;
        
        questionId = this.props.questions[this.state.page].id
        userId = this.props.userId
        button = (
          <TouchableOpacity
          onPress={()=>this.startRecording(questionId, userId)}
          style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );
        
        if (recording) {
          button = (
            <TouchableOpacity
            onPress={()=>this.stopRecording()}
            style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
            </TouchableOpacity>
          );
        }
        
        if (processing) {
          button = (
            <View style={styles.capture}>
              <ActivityIndicator animating size={18} />
            </View>
          );
        }
        
        
        // this.questionId=questionId
        // this.userId=userId
        
        if(this.props.questions[this.state.page].type=='multiple choice'){
          
        }
        let { data, checked } = this.state
        return (
          
          <View style={styles.container}>
            <View style={styles.header}>
              <Text>Kerja Yuks</Text>
            </View>
          {
            this.props.questions[this.state.page].type=='multiple choice'?(
            <View  style={styles.descWrapper}>
              <Counter
                time={(this.props.questions[this.state.page].timer * 60)+0.1}
                currentPage={this.state.page+1}
                totalPage={this.props.questions.length}
                finishEvent={()=> this._nextHandle()}
              />
              
              <MultipleChoice
              data={this.props.questions[this.state.page]}
              radioAction={(value) => {this.setState({answer:value})}}
              />
              <TouchableOpacity onPress={()=>this._submit(questionId, userId, 'multiple choice')}>
                <View style={styles.btnSubmit}>
                  <Text>SUBMIT</Text>
                </View>
              </TouchableOpacity>
              
            </View>
          ):this.props.questions[this.state.page].type=='multi select'?(
            <View style={styles.descWrapper}>
              <Counter
                time={(this.props.questions[this.state.page].timer * 60)+0.2}
                currentPage={this.state.page+1}
                totalPage={this.props.questions.length}
                finishEvent={()=>this._nextHandle()}
              />
              <Text style={styles.desc}>{this.props.questions[this.state.page].description}</Text>
              <FlatList
                data={this.props.questions[this.state.page].options.split(',')}
                extraData={this.state}
                renderItem={({ item, index }) =>
                <CheckBox
                style={{width:'100%'}}
                left
                title={item}
                onPress={() => this.handleChange(index)}
                  checked={checked[index]} />
                }
              />
              <TouchableOpacity onPress={()=>this._submit(questionId, userId, 'multi select')}>
                <View style={styles.btnSubmit}>
                  <Text>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            
            </View>
            
            ):this.props.questions[this.state.page].type=='text'?(
              <View style={styles.descWrapper}>
                <Counter
                  time={(this.props.questions[this.state.page].timer * 60)+0.3}
                  currentPage={this.state.page+1}
                  totalPage={this.props.questions.length}
                  finishEvent={()=>this._nextHandle()}
                />
                <Text style={styles.desc}>{this.props.questions[this.state.page].description}</Text>
                <Input
                  placeholder='Isi jawaban disini'
                  value={this.state.answer}
                  onChangeText={(val)=> this.setState({answer:val})}
                  />
                <TouchableOpacity onPress={()=>this._submit(questionId, userId, 'text')}>
                  <View style={styles.btnSubmit}>
                      <Text>SUBMIT</Text>
                    </View>
                  </TouchableOpacity>
              
              </View>
            
            ):
              
            (
              <View style={{flex:1}}>
                <Counter
                  time={(this.props.questions[this.state.page].timer * 60)+0.1}
                  currentPage={this.state.page+1}
                  totalPage={this.props.questions.length}
                  finishEvent={()=>this._nextHandle()}
                />

                <View style={{flex:1}}>
                  <Text>{this.props.questions[this.state.page].description}</Text>
                  
                </View>
                <View  style={{flex:1}}>

                  <RNCamera
                    ref={ref => {
                      this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                      title: 'Permission to use camera',
                      message: 'We need your permission to use your camera',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                      title: 'Permission to use audio recording',
                      message: 'We need your permission to use your audio',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                    />
                  {button}
                  </View>
              </View>
              )
          }
            
          
            {/* <View style={styles.btnNavContainer}>
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
              </View> */}
            
          </View>
        )
      }
    }
  }
}

class Counter extends Component{
  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent:"space-between", alignItems:"center"}}>
        <Text>Question {this.props.currentPage} of {this.props.totalPage}</Text>
        <CountDown
          until={this.props.time}
          onFinish={() => this.props.finishEvent()}
          timeToShow={['M', 'S']}
          timeLabels={{m: '', s: ''}}
          size={15}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#000'}}
          timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
          separatorStyle={{color: '#000'}}
          showSeparator
        />
      </View>
    )
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
          <Text style={styles.desc}> {this.props.data.description}</Text>
        </View>
        <View>
          <RadioForm
            style={styles.radio}
            radio_props={radio_props}
            initial={-1}
            onPress={(value)=>this.props.radioAction(value)}
          />
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  header:{
    paddingHorizontal:20,
    paddingVertical:15,
    backgroundColor:"#41EAD4",
    borderBottomWidth:0.5,
    borderBottomColor:"#CCC"
  },
  descWrapper:{
    // backgroundColor:"red",
    padding:20,
  },
  desc:{
    textAlign:"justify",
    marginTop:10
  },
  btnSubmit: {
    padding:10,
    alignItems:"center",
    backgroundColor:"#99F",
    width:'94%',
    marginLeft:'auto',
    marginRight:'auto',
    borderRadius:5,
    marginTop:5
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
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 5,
    alignItems: 'center',
    width:'100%'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  radio:{
    padding:20,
  }
})


const mapDispatchToProps = dispatch => {
  return {
    setAnswer: (data) => {
      dispatch(setAnswer(data))
    }
  }
}

const mapStateToProps = (state) => ({
  questions : state.reducers.questions,
  fetched : state.reducers.fetched,
  fetching : state.reducers.fetching,
  userId : state.reducers.user.id
})


export default connect(mapStateToProps, mapDispatchToProps)(index)