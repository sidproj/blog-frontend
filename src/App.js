import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Home from './pages/home';
import styled from 'styled-components';
import Contact from './pages/contact';
import About from './pages/about';
import Disclaimer from './pages/disclaimer';
import Topics from './pages/topics';
import Topic from './pages/topic';
import Article from './pages/article';
import { useRecoilState } from 'recoil';
import { TopicAtom } from './recoil/topics';
import { ArticleAtom } from './recoil/articles';
import Login from './pages/login';
import Register from './pages/register';

const Container = styled.div`
  padding:1.2rem;
  display:flex;
  flex-direction:column;
  row-gap:2rem;
`

const App = () => {

  const [sidebar,setSidebar] = useState(false);
  // HOME , TOPICS , TOPIC , ARTICLE , ABOUT , CONTACT , DISCLAIMER
  const [content,setContent] = useState("ARTICLE");

  // recoil state
  const [topicsData,setTopicsData] = useRecoilState(TopicAtom);
  const [articlesData,setArticlesData] = useRecoilState(ArticleAtom);

  return (
    <Router>
      <div className="App">
        {
          sidebar && <Sidebar setSidebar={setSidebar} setContent={setContent}/>
        }

        <Navbar setSidebar={setSidebar}/>
        
        <Container>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/topics" element={<Topics/>} />
            <Route exact path="/topic" element={<Topic/>} />
            <Route exact path="/article" element={<Article/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/contact" element={<Contact/>} />
            <Route exact path="/disclaimer" element={<Disclaimer/>} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </Container>

      </div>
    </Router>
  );
}

export default App;
