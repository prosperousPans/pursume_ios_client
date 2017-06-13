import axios from 'axios';

function gettingMatches (userID) {
  return {
    type: 'GETTING_MATCHES',
    userID
  }
};

function gotMatches (results) {
  return {
    type: 'GOT_MATCHES',
    results
  }
};

function getMatchesError(getError) {
  return {
    type: 'GET_MATCHES_ERROR',
    getError
  }
}

function getNextMatch() {
  return {
    type: 'GET_NEXT_MATCH'
  }
}



export function getMatches (userID) {
  return (dispatch) => {
    dispatch(gettingMatches(userID));

    axios.get('http://localhost:3000/get-profile', {params: {id: userID}})
    .then( result => {
      var allMatches = JSON.parse(result.data[0].daily_all_matches)
      dispatch(gotMatches(allMatches));

      return allMatches;
    })
    .catch( error => {
      dispatch(getMatchesError(error))
    });
  }
};

export function nextMatch (userID) {
  return (dispatch) => {
    dispatch( getNextMatch() );
  }
};