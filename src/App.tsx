import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <main className="p-2">
      <h1 className="text-3xl mb-4">다인체험단 관리자 페이지</h1>
      {/* <section className="max-w-lg">
        <LoginForm />
      </section> */}
      <Outlet />
    </main>
  );
};

export default App;
