import React, { useEffect } from 'react';
import Logo from '@/assets/logo.svg';
import LoginForm from './form';
import styles from './style/index.module.less';

function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>Cyan</div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
