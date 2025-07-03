import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router';


function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-6">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
