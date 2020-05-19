// import React from 'react';
import themes from '../theme';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Switch } from './ui';
import styles from './layout.module.scss';
export const ThemeContext = React.createContext(themes.darkMode);
const siteTitle = "Music Player";
export default ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(themes.darkMode);
    const onChangeTheme = (checked) => {
        if(checked){
            setCurrentTheme(themes.darkMode);
        }else{
            setCurrentTheme(themes.lightMode);
        }
    }
    return (
        <ThemeContext.Provider value={currentTheme}>
            <nav className={styles.container}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                    name="description"
                    content="Music Player"
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <header className={styles.header} style={currentTheme.header}>
                    <Link href="/"><a><img className={styles.logo} src="/logo.png" alt="Logo" /></a></Link>
                    <div className={styles.searchBox} style={currentTheme.search}>Music Player</div>
                    <div className={styles.switchTheme}>
                        <Switch onChange={onChangeTheme} />
                    </div>
                </header>
                <main style={currentTheme.main}>{children}</main>
            </nav>
        </ThemeContext.Provider>
    );
}