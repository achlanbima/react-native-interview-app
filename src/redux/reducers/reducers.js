import { ADD_CROSSWORD, GET_CROSSWORD, ADD_ANSWERS } from '../actions/types'

const initialState = {
  user:{},
  questions:[],
  fetching: false,
  fetched: false,
  error:null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case 'SET_USER':
      state = {
        user: action.payload
      }
    
    case 'FETCH_QUESTIONS_PENDING':
      state = {
        ...state, fetching:true, questions: []
      }
      return state
      break

    case 'FETCH_QUESTIONS_FULFILLED':
      state = {
        ...state, fetching:false, fetched:true, questions: action.payload.data.data
      }
      return state
      break

    case 'FETCH_QUESTIONS_REJECTED':
      state = {
        ...state, fetching:false, error: action.payload
      }
      return state
      break
       
    return state

    
    default:
      return state
  }
}

export default reducer

// const { navigation } = this.props
    // this.column = navigation.getParam('column')
    // const id = navigation.getParam('id')
    // this.props.fetchData(id)