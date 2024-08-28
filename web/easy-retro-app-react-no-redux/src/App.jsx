import React from 'react';
import './App.scss';
import Layout from './features/dashboard/components/Layout/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EasyProgress from './features/easy-progress/components/EasyProgress/EasyProgress';
import EasyReport from './features/easy-report/components/EasyReport/EasyReport';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EasyItems from './features/easy-items/components/EasyItems/EasyItems';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="items" element={<EasyItems />} />
            <Route path="progress" element={<EasyProgress />} />
            <Route path="report" element={<EasyReport />} />
          </Route>
        </Routes>
      </Router>
    </div>
    </DndProvider>
  );
}

export default App;
