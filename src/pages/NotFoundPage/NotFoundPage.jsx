import { Link } from "react-router-dom";
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={css.section}>
      <p>Page not found, <Link to="/" className={css.backLink}>return to homepage</Link></p>
      
    </main>
    
  );
}

export default NotFoundPage;