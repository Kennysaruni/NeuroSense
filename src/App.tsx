import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Topic from './pages/Topic';
import Activity from './pages/Activity';

export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  let content;
  if (route === '/') {
    content = <Home />;
  } else if (route === '/library') {
    content = <Library />;
  } else if (route.startsWith('/library/')) {
    const topicId = route.split('/')[2];
    content = <Topic topicId={topicId} />;
  } else if (route === '/activity') {
    content = <Activity />;
  } else {
    content = <Home />;
  }

  return (
    <Layout currentRoute={route}>
      {content}
    </Layout>
  );
}
