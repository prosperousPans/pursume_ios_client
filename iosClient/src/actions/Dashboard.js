import axios from 'axios';

function gettingData (userID) {
  return {
    type: 'GETTING_DATA',
    userID
  }
};

function gotAllConnect (results) {
  return {
    type: 'GOT_ALL_CONNECT',
    results
  }
};

function gotAllAccept (results) {
  return {
    type: 'GOT_ALL_ACCEPT',
    results
  }
};

function gotPercentMatches (results) {
  return {
    type: 'GOT_PERCENT_MATCHES',
    results
  }
};

function gotTopReason (results) {
  return {
    type: 'GOT_TOP_REASON',
    results
  }
};

function gotTopVertical (results) {
  return {
    type: 'GOT_TOP_VERTICAL',
    results
  }
};

function getDataError(getError) {
  return {
    type: 'GET_DATA_ERROR',
    getError
  }
}

export function getData (userID) {
  return (dispatch) => {
    dispatch(gettingData(userID));

    axios.all([
      axios.get('http://localhost:3000/get-connect', {
        params: {users_b_id: userID}
      }),
      axios.get('http://localhost:3000/get-connect/get-accept', {
        params: {users_b_id: userID, status: 'accept'}
      }),
      axios.get('http://localhost:3000/get-connect/get-reason', {
        params: {users_b_id: userID, status: 'accept'}
      }),
      axios.get('http://localhost:3000/get-connect/get-vertical', {
        params: {users_b_id: userID, status: 'accept'}
      })
    ])
    .then(axios.spread( (allConnect, allAccept, topReason, topVertical) => {
      dispatch( gotAllConnect(allConnect.data) );
      dispatch( gotAllAccept(allAccept.data) );

      var percentMatches = allAccept.data.length / allConnect.data.length;
      dispatch( gotPercentMatches(percentMatches) );

      dispatch( gotTopReason(topReason.data) );
      dispatch( gotTopVertical(topVertical.data) );
    }))
    .catch ( error => {
      dispatch( getDataError(error) );
    })

  }
};
