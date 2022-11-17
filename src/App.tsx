import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Articles from './pages/articles/articles';
import ArticlesList from './pages/articles/list';
import Dashboard from './pages/dashboard';
import MedicineCategories from './pages/medicine/categories';
import MedicineList from './pages/medicine/list';
import UserInfo from './pages/users';

const routes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'users', element: <UserInfo /> },
  { path: 'medicine/list', element: <MedicineList /> },
  { path: 'medicine/info', element: <MedicineCategories /> },
  { path: 'article/list', element: <ArticlesList /> },
  { path: 'article/info', element: <Articles /> },
];

function App() {
  return (
    <AppLayout>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}></Route>
        ))}
      </Routes>
    </AppLayout>
  );
}

export default App;
