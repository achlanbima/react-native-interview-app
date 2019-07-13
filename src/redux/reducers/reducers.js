
const initialState = {
  user:{},
  questions:[],
  answers:[],
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
       
    case 'SET_ANSWERS_PENDING':
      state = {
        ...state, fetching:true, answers: []
      }
      return state
      break

    case 'SET_ANSWERS_FULFILLED':
      state = {
        ...state, fetching:false, fetched:true, answers: action.payload.data.data
      }
      return state
      break

    case 'SET_ANSWERS_REJECTED':
      state = {
        ...state, fetching:false, error: action.payload
      }
      return state
      break
       

    
    default:
      return state
  }
}

export default reducer
