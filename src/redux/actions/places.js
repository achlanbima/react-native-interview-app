// import { ADD_CROSSWORD, ADD_ANSWERS, GET_CROSSWORD } from './types'
import axios from 'axios'
import URL from '../../Config/URL'
// import AsyncStorage from 'react-native'
import { NavigationActions } from 'react-navigation'


// export const setUserReduce = (payload) => ({
//   type : 'SET_USER',
//   payload : payload
// })

export function setUser(data, nav){
  return(dispatch) => {
    const {username, email, phone_number} = data
    // console.log(nav);
    
    nav.navigate('home')
    
    // axios.post(`${URL}/user`,{
    //   username,
    //   email,
    //   phone_number
    // }).then((res) => {
    //   dispatch({
    //     type : 'SET_USER',
    //     payload : res.data.data
    //   })
    //   console.log(res.data.data);
      
    //   nav.navigate('home')
    // })
    // .catch((err) => {
    //   console.log(err.response)
    //   alert(err.response.data.message)
    // })
  }
}

export function getQuestion(data, nav){
  return(dispatch) => {
    
    dispatch({
      type: 'FETCH_QUESTIONS',
      payload : axios.get(`${URL}/questions`)
    })
  }
}

export function setAnswer(){
  
}