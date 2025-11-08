import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import SharedAdminLayout from './pages/admin/SharedLayout';
import AllPosts from './pages/admin/AllPosts';
import PostInfo from './pages/post/PostInfo';
import PostMain from './pages/post/PostMain';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Post from './pages/admin/Post';
import Episodes from './pages/admin/Episodes';
import { useEffect } from 'react';
import { AppDispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/authSlice';
import Loading from './components/Loading';
import Genres from './pages/admin/Genres';
import Studios from './pages/admin/Studios';
import Histories from './pages/Histories';
import Favorites from './pages/Favorites';
import SingleQueryPosts from './pages/SingleQueryPosts';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Statistics from './pages/admin/Statistics';
import Users from './pages/admin/Users';
import { getAllGenres } from './store/slices/genresSlice';
import { getAllStudios } from './store/slices/studiosSlice';
import QueryPosts from './pages/QueryPosts';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
TimeAgo.addDefaultLocale(en);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllStudios());
    dispatch(getUser());
  });
  const gettingUser = useSelector((state: RootState) => state.auth.gettingUser);
  if (gettingUser) {
    return (
      <Loading
        style={{
          marginTop: '60px',
          height: '550px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route key='/for-all' path='/' element={<SharedLayout />}>
            <Route path='' element={<Navigate to='home' replace />} />
            <Route path='home' element={<Home />} />
            <Route path='posts/:postId' element={<PostInfo />} />
            <Route path='posts/:postId/episodes' element={<PostMain />} />
            <Route
              path='recently-updated'
              element={
                <SingleQueryPosts
                  key='updated'
                  option={{
                    season: 'all',
                    sort: 'updated',
                    status: 'all',
                    type: 'all',
                  }}
                  pageName='Recently Updated'
                />
              }
            />
            <Route
              path='tv'
              element={
                <SingleQueryPosts
                  key='tv'
                  option={{
                    season: 'all',
                    sort: 'updated',
                    status: 'all',
                    type: 'tv',
                  }}
                  pageName='TV'
                />
              }
            />
            <Route
              path='movie'
              element={
                <SingleQueryPosts
                  key='movie'
                  option={{
                    season: 'all',
                    sort: 'updated',
                    status: 'all',
                    type: 'movie',
                  }}
                  pageName='Movie'
                />
              }
            />
            <Route
              path='ova'
              element={
                <SingleQueryPosts
                  key='ova'
                  option={{
                    season: 'all',
                    sort: 'updated',
                    status: 'all',
                    type: 'ova',
                  }}
                  pageName='OVA'
                />
              }
            />
            <Route
              path='ona'
              element={
                <SingleQueryPosts
                  key='ona'
                  option={{
                    season: 'all',
                    sort: 'updated',
                    status: 'all',
                    type: 'ona',
                  }}
                  pageName='ONA'
                />
              }
            />
            <Route
              path='genres/:genreId'
              element={<SingleQueryPosts pageName='Genre' key='genre' />}
            />
            <Route path='filter' element={<QueryPosts />} />
          </Route>
          <Route
            path='/'
            key='/protected-route'
            element={
              <ProtectedRoute type='both' key='both'>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path='histories' element={<Histories />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route
            path='/admin'
            key='/protected-route-admin'
            element={
              <ProtectedRoute type='admin' key='admin'>
                <SharedAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path='posts' element={<AllPosts />} />
            <Route path='posts/:postId' element={<Post key='post-update' />} />
            <Route path='posts/:postId/episodes' element={<Episodes />} />
            <Route path='add-post' element={<Post key='post-add' />} />
            <Route path='genres' element={<Genres />} />
            <Route path='studios' element={<Studios />} />
            <Route path='statistics' element={<Statistics />} />
            <Route path='users' element={<Users />} />
          </Route>
          <Route path='*' element={<Navigate to='home' replace />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
