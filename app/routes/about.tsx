import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();
    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>{t('nav.about')}</h1>
            <p>
                This is a simple about page. You can use this spot to describe your
                project, team, or any information you'd like visitors to know.
            </p>
            <p>
                Feel free to edit this component and expand it with links, images, or
                whatever content you need.
            </p>
            
        </main>
    );
}
