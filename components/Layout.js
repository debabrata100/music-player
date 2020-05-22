// import React from 'react';
import themes from '../theme';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Switch, SearchBox } from './ui';
import styles from './layout.module.scss';
export const ThemeContext = React.createContext(themes.darkMode);
const siteTitle = "Music Player";
export default ({ children, onSearchSongs, isSearching }) => {
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
                    <meta charSet='utf-8' />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                    <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="description" content="Music Player" />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#ff0088"/>
                    <title>{siteTitle}</title>
                </Head>
                <header className={styles.header} style={currentTheme.header}>
                    <Link href="/"><a><img className={styles.logo} src="/logo.png" alt="Logo" /></a></Link>
                    <SearchBox 
                        style={currentTheme.searchBox} 
                        onChange={(e) => onSearchSongs(e.target.value)} 
                        isLoading = { isSearching }
                        placeholder="Search Artist or Album "
                    />
                    <a href="https://github.com/debabrata100/music-player"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubLink}
                    >
                    <img src="/images/github-logo.png" height={32} alt="github logo" />
                    </a>
                    <div className={styles.switchTheme}>
                        <Switch onChange={onChangeTheme} />
                    </div>
                </header>
                <main style={currentTheme.main} className={styles.main}>{children}</main>
            </nav>
        </ThemeContext.Provider>
    );
}