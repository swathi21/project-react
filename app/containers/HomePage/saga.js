/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

var arr = [{"position":[37.38745,-121.90226],"id": "1234a56-78aa-42bb-9d06-c66d3b784594", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "21", "zip code": "95131"},
{"position":[36.735209,-119.792098],"id": "1234a676-78aa-42bb-9d06-c66d3b78559", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "21", "zip code": "95131"}, 
{"position":[37.42204,-121.81659],"id": "1234a676-78aa-42bb-9d06-c66d3b78559", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "21.1", "zip code": "95035"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78653", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "2.1", "zip code": "95130"},
{"position":[37.40898,-121.82790],"id": "1234a676-78aa-42bb-9d06-c66d3b78769", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "2.3", "zip code": "95132"},
{"position":[37.37164,-121.86119],"id": "1234a676-78aa-42bb-9d06-c66d3b78535", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "3.0", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78552", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "1.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78779", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "1.4", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78779", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "1.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78129", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "2.1", "zip code": "95130"}, 
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78899", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "23.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78349", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "5.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78467", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "9.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78926", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "2.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78269", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "5.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78176", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "7.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78270", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "9.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78398", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "3.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78286", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "3.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78294", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "1.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b785829", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "1.0", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78333", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "6.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78837", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "10.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78827", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "9.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78222", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "3.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78974", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "2.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78639", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "1.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78123", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "15.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78289", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "3.1", "zip code": "95130"},
{"position":[37.28516,-121.97782],"id": "1234a676-78aa-42bb-9d06-c66d3b78248", "hostname": "MIL-BRANCH-3750-STACK", "macAddress": "40.0.2.21", "version": "5.1", "zip code": "95130"},]


/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(arr, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
