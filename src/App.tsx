import * as React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import AdminPage from './pages/AdminPage';
import RequireAuth from './components/commonComponents/RequireAuth/RequireAuth';
import ProfilePage from './pages/ProfilePage';

const App: React.FunctionComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='/login' element={<AuthPage />} />
                <Route path='/register' element={<AuthPage />} />
                <Route path='/admin' element={
                    <RequireAuth>
                        <AdminPage/>
                    </RequireAuth>} 
                />
                <Route path='/profile' element={
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>} 
                />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;