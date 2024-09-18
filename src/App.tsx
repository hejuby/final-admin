import { useState } from 'react';
import LoginForm from './components/LoginForm';

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <main className="p-2">
      <h1 className="text-3xl mb-4">다인체험단 관리자 페이지</h1>
      {isLogin ? (
        <></>
      ) : (
        <section className="max-w-lg">
          <LoginForm
            handleSuccess={() => {
              setIsLogin(true);
            }}
          />
        </section>
      )}
    </main>
  );
};

export default App;
