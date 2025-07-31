import { useContext } from 'react';
import { Outlet } from 'react-router-dom'; 
import { AppContext } from '../../context/AppContext';
import BottomNav from '../../components/Navigation/BottomNav';

export default function Layout() {
  const { selectedEmotion } = useContext(AppContext);
  const emotion = (selectedEmotion || 'neutral').toLowerCase();

  return (
    <div className={`app-layout ${emotion}`}>
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}