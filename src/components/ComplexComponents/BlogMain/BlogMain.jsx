import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/BlogMain.scss';

const BlogMain = () => {
    const { t } = useTranslation();

    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

    const blogSection = [
        {
            image: `${baseUrl}/assets/images/berlio-work-cover.png`,
            title: t('blogMain.list.item1'),
            description: t('blogMain.list.desc1'),
            link: `/about/blog/bisonsOfEconomics`,
        },
    ];

    const renderBlogItem = ({image, title, description, link}) => {
        return (
            <li key={title} className="aam_blog-main__blog-list--item">
                <Link to={link}>
                    <img width='200' src={image} alt={title} />
                    <h5>{title}</h5>
                    <span>{description}</span>
                </Link>
            </li>
        );
    };

    return (
        <main className='aam_blog-main'>
            {/* Breadcrumbs */}
            <div className="aam_blog-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/about">{t('breadCrumbs.about')}</Link> /{' '}
                {t('breadCrumbs.blog')}
            </div>

            {/* Title */}
            <h1 className="aam_blog-main__header">{t('blogMain.name')}</h1>

            {/* Description */}
            <p className="aam_blog-main__description">
                {t('blogMain.description')}
            </p>

            {/* Blog List */}
            <h2 className="aam_blog-main__list-title">{t('blogMain.listTitle')}</h2>
            
            {/* List */}
            <ul className="aam_blog-main__blog-list">
                {blogSection.map(renderBlogItem)}
            </ul>

            {/* Navigation buttons */}
            <div className="aam_blog-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t('blogMain.homeLink')}
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        document.getElementById('header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t('blogMain.upLink')}
                </button>
            </div>
        </main>
    )
}

export default BlogMain;