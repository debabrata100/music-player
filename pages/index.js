import Layout from "../components/Layout";
import { useContext } from "react";
import { ThemeContext } from '../components/Layout';
export default () => {
    const theme = useContext(ThemeContext);
    console.log("theme",theme);
    return (
        <Layout>
            Layout added
        </Layout>
    );
}