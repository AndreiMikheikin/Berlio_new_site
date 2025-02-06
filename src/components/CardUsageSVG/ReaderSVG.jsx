import React, { useEffect } from "react";
import '../../styles/components/ReaderSVG.scss';

import { useTranslation } from "react-i18next";

const ReaderSVG = ({ cardRead }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (cardRead) {
            setTimeout(() => {
                const baElement = document.getElementById("ba");
    
                if (baElement) {
                    baElement.style.fill = "#00ff2f";
                }
    
                const dfElement = document.getElementById("df");
                const dgElement = document.getElementById("dg");
    
                if (dfElement && dgElement) {
                    dfElement.textContent = t('readerSVG.massage1');
                    dgElement.textContent = t('readerSVG.massage2');
                }
            }, 100);
        }
    }, [cardRead]);

    const hoverMap = {
        '#ck>tspan': '#bd',
        '#cg>tspan': '#be',
        '#cu>tspan': '#bf',
        '#cy>tspan': '#bg',
        '#cw>tspan': '#bh',
        '#da>tspan': '#bi',
        '#dc>tspan': '#bj',
        '#by>tspan': '#bk',
        '#cm>tspan': '#bl',
        '#cs>tspan': '#bm',
        '#ce>tspan': '#bn',
        '#ca>tspan': '#bo',
        '#ci>tspan': '#bp',
        '#cc>tspan': '#bq',
        '#co>tspan': '#br',
        '#cq>tspan': '#bs'
    };

    useEffect(() => {
        let activeElement = null;

        const applyHover = (targetElement) => {
            if (targetElement !== activeElement) {
                targetElement.style.fill = '#00ff2f';
            }
        };

        const applyNormal = (targetElement) => {
            if (targetElement !== activeElement) {
                targetElement.style.fill = '#bebebe';
            }
        };

        const handlePress = (targetElement) => {
            targetElement.style.fill = '#009c1d';
        };

        const handleRelease = (targetElement) => {
            if (activeElement === targetElement) {
                targetElement.style.fill = '#bebebe';
                activeElement = null;
            } else {
                targetElement.style.fill = '#00ff2f';
            }
        };

        Object.keys(hoverMap).forEach(tspanSelector => {
            const tspanElement = document.querySelector(tspanSelector);
            const targetElement = document.querySelector(hoverMap[tspanSelector]);

            if (tspanElement && targetElement) {
                targetElement.style.fill = '#bebebe';

                tspanElement.addEventListener('mouseenter', () => applyHover(targetElement));
                tspanElement.addEventListener('mouseleave', () => applyNormal(targetElement));
                tspanElement.addEventListener('mousedown', () => handlePress(targetElement));
                tspanElement.addEventListener('touchstart', () => handlePress(targetElement));
                tspanElement.addEventListener('mouseup', () => handleRelease(targetElement));
                tspanElement.addEventListener('touchend', () => handleRelease(targetElement));

                targetElement.addEventListener('mouseenter', () => applyHover(targetElement));
                targetElement.addEventListener('mouseleave', () => applyNormal(targetElement));
                targetElement.addEventListener('mousedown', () => handlePress(targetElement));
                targetElement.addEventListener('touchstart', () => handlePress(targetElement));
                targetElement.addEventListener('mouseup', () => handleRelease(targetElement));
                targetElement.addEventListener('touchend', () => handleRelease(targetElement));
            }
        });

        const handleClickOutside = (event) => {
            if (!Object.values(hoverMap).includes(`#${event.target.id}`)) {
                if (activeElement) {
                    activeElement.style.fill = '#bebebe';
                    activeElement = null;
                }
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 115 150"
            width="460"
            height="600"
            className="aam_reader-SVG"
            aria-labelledby="reader-title"
            role="img"
        >
            <defs id="w">
                <filter id="k" x="-0.039439" y="-0.13461" width="1.0789" height="1.2692" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="x" stdDeviation="0.7426663" />
                </filter>
                <filter id="j" x="-0.0092376" y="-0.01712" width="1.0185" height="1.0342" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="y" stdDeviation="0.049598525" />
                </filter>
                <filter id="i" x="-0.0092376" y="-0.017119" width="1.0185" height="1.0342" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="z" stdDeviation="0.049598525" />
                </filter>
                <filter id="h" x="-0.0099751" y="-0.015056" width="1.02" height="1.0301" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="aa" stdDeviation="0.043294729" />
                </filter>
                <filter id="g" x="-0.0099751" y="-0.015056" width="1.02" height="1.0301" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ab" stdDeviation="0.043294729" />
                </filter>
                <filter id="f" x="-0.034834" y="-0.016963" width="1.0697" height="1.0339" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ac" stdDeviation="0.109099" />
                </filter>
                <filter id="e" x="-0.034688" y="-0.016893" width="1.0694" height="1.0338" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ad" stdDeviation="0.109099" />
                </filter>
                <filter id="d" x="-0.034973" y="-0.014972" width="1.0699" height="1.0299" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ae" stdDeviation="0.109099" />
                </filter>
                <filter id="u" x="-0.034834" y="-0.016963" width="1.0697" height="1.0339" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="af" stdDeviation="0.109099" />
                </filter>
                <filter id="t" x="-0.034688" y="-0.016893" width="1.0694" height="1.0338" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ag" stdDeviation="0.109099" />
                </filter>
                <filter id="r" x="-0.034982" y="-0.015285" width="1.07" height="1.0306" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ah" stdDeviation="0.109099" />
                </filter>
                <filter id="q" x="-0.011136" y="-0.01301" width="1.0223" height="1.026" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ai" stdDeviation="0.04939209" />
                </filter>
                <filter id="o" x="-0.011136" y="-0.01301" width="1.0223" height="1.026" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="aj" stdDeviation="0.04939209" />
                </filter>
                <filter id="p" x="-0.011136" y="-0.01301" width="1.0223" height="1.026" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="ak" stdDeviation="0.04939209" />
                </filter>
                <filter id="n" x="-0.011136" y="-0.01301" width="1.0223" height="1.026" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="al" stdDeviation="0.04939209" />
                </filter>
                <filter id="m" x="-0.013551" y="-0.010768" width="1.0271" height="1.0215" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="am" stdDeviation="0.060036286" />
                </filter>
                <filter id="l" x="-0.013551" y="-0.010768" width="1.0271" height="1.0215" colorInterpolationFilters="sRGB">
                    <feGaussianBlur id="an" stdDeviation="0.060036286" />
                </filter>
                <radialGradient
                    id="a"
                    cx="299.52"
                    cy="252.74"
                    r="48.032"
                    gradientTransform="matrix(2.2909 -0.01041 0.014594 3.2112 -390.35 -555.76)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop id="ao" stopColor="#48ae5a" offset="0" />
                    <stop id="ap" stopColor="#48ae5a" stopOpacity="0" offset="1" />
                </radialGradient>
                <linearGradient
                    id="b"
                    x1="215.49"
                    x2="361.5"
                    y1="259.5"
                    y2="250.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop id="aq" stopColor="#176224" offset="0.47415" />
                    <stop id="ar" stopColor="#176224" stopOpacity="0" offset="1" />
                </linearGradient>
                <filter
                    id="s"
                    x="-0.042125"
                    y="-0.031938"
                    width="1.0842"
                    height="1.0639"
                    colorInterpolationFilters="sRGB"
                >
                    <feGaussianBlur id="as" stdDeviation="1.6678447" />
                </filter>
                <linearGradient
                    id="c"
                    x1="356"
                    x2="332.57"
                    y1="302"
                    y2="221.19"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop id="at" offset="0" />
                    <stop id="au" stopOpacity="0" offset="1" />
                </linearGradient>
            </defs>
            <g id="g1">
                <g id="av" transform="translate(1.5 -181)">
                    <g stroke="#000" strokeLinecap="round">
                        <path id="aw" transform="matrix(.99992 0 0 1 -213.47 -3.4987)" d="m231.56 189h76.823c2.5496 0 6.7668-0.0103 9.1103 0.96561 2.2211 0.92487 3.5062 2.4113 4.2997 4.1927 1.1212 2.5173 1.2064 7.0832 1.2064 9.8482v99.133c0 3.789-0.13292 9.9977-1.3957 13.56-2.8369 8.0023-9.2081 10.88-16.505 12.415-2.7973 0.58876-7.4174 0.88536-10.276 0.88536h-51.01c-2.6584 0-6.9853 0.0113-9.6019-0.4435-7.8674-1.3673-13.522-5.8796-16.619-14.025-1.13-2.9714-1.5923-8.1113-1.5923-11.294v-101.13c0-2.2669-0.0996-6.0255 0.73395-8.1201 0.75484-1.8969 2.0862-3.3503 3.9737-4.3759 2.6843-1.4585 7.7821-1.6086 10.853-1.6086z" fill="url(#c)" filter="url(#s)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="ax" transform="matrix(.99992 0 0 1 -215.47 -4.4988)" d="m231.56 189h76.823c2.5496 0 6.7668-0.0103 9.1103 0.96561 2.2211 0.92487 3.5062 2.4113 4.2997 4.1927 1.1212 2.5173 1.2064 7.0832 1.2064 9.8482v99.133c0 3.789-0.13292 9.9977-1.3957 13.56-2.8369 8.0023-9.2081 10.88-16.505 12.415-2.7973 0.58876-7.4174 0.88536-10.276 0.88536h-51.01c-2.6584 0-6.9853 0.0113-9.6019-0.4435-7.8674-1.3673-13.522-5.8796-16.619-14.025-1.13-2.9714-1.5923-8.1113-1.5923-11.294v-101.13c0-2.2669-0.0996-6.0255 0.73395-8.1201 0.75484-1.8969 2.0862-3.3503 3.9737-4.3759 2.6843-1.4585 7.7821-1.6086 10.853-1.6086z" fill="url(#b)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="ay" transform="matrix(.99992 0 0 1 -245.5 6.5007)" d="m258.63 193h81.336c1.6752 0 4.5477 0.094 5.7676 1.2056 0.38649 0.35219 0.68732 0.76153 0.9035 1.2082 0.62829 1.2982 0.36211 3.7731 0.36211 5.2372v91.349c-10.126 12.908-23.406 17.502-37.577 19.748-5.4557 0.86444-14.429 1.0909-19.835-0.0225-14.418-2.9696-26.464-10.468-37.588-19.725v-91.206c0-1.543-0.13101-4.1984 0.74895-5.4295 0.27087-0.37894 0.60605-0.71929 0.99119-1.0297 1.1286-0.90954 3.4379-1.3347 4.8911-1.3347z" fill="url(#a)" style={{ paintOrder: "markers stroke fill" }} />
                    </g>
                    <g id="g3" transform="matrix(1.0056 0 0 1.0227 -197.01 7.5311)">
                        <rect id="az" x="219.95" y="203.41" width="57.991" height="16.991" ry="2.8318" style={{ paintOrder: "markers stroke fill" }} />
                        <rect id="ba" transform="matrix(.95018 0 0 .90808 13.231 2.6212)" x="219.89" y="222.3" width="57.991" height="16.991" ry="2.8318" fill="#c5c5c5" filter="url(#k)" stroke="#c5c5c5" strokeLinecap="round" strokeWidth="1.0094" style={{ paintOrder: "markers stroke fill" }} />
                        <rect id="bb" x="220.29" y="203.12" width="57.991" height="16.991" ry="2.8318" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1.0094" style={{ paintOrder: "markers stroke fill" }} />
                    </g>
                    <path id="bc" transform="translate(-290 -26.492)" d="m325 274h38v25.97c0 2.2256-0.70839 5.7151-2.0176 7.5102-3.1098 4.2641-7.3354 6.0174-12.042 6.6894-2.7087 0.38675-7.1801 0.51915-9.8851 0.12133-4.8539-0.71388-8.9287-2.8994-12-6.98-1.2944-1.7197-2.0554-5.0583-2.0554-7.2134z" style={{ paintOrder: "markers stroke fill" }} />
                    <g fill="#bebebe">
                        <rect id="bd" x="54.111" y="264.88" width="10.645" height="9.1118" ry=".49592" filter="url(#n)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="be" d="m35.257 258.41c1.6652 4.0288 4.6392 5.012 7.5483 6.5728l-0.0319 8.9272c-3.5899-1.6184-6.0739-3.278-7.4526-6.4831z" filter="url(#t)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bf" transform="translate(-246.87 -23.064)" d="m282.16 290.9c1.7448 4.1184 4.7478 5.125 7.4849 6.6046l-0.0625 10.369c-7.2e-4 0.11997-0.0935 0.18608-0.20584 0.14404-3.6717-1.3737-6.5034-5.6625-7.0386-9.039-0.12312-0.77677-0.0915-2.0603-0.1028-2.8482z" filter="url(#r)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bg" d="m72.623 247.99-12.886-0.0638c2.7857 1.918 4.2618 4.3598 5.3586 6.9534 4.7374-1.2308 6.6855-3.7957 7.5275-6.8896z" filter="url(#i)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bh" d="m35.218 247.99 12.886-0.0638c-2.7857 1.918-4.2618 4.3595-5.3586 6.9531-4.7374-1.2308-6.6855-3.7954-7.5275-6.8893z" filter="url(#j)" style={{ mixBlendMode: 'normal', paintOrder: 'markers stroke fill' }} />
                        <path id="bi" d="m48.678 247.9h5.0002v6.8981c-0.45929-0.0164-7.1904 0.012-10.417 0 0.9044-2.441 2.9812-5.3077 5.4166-6.8981z" filter="url(#h)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bj" transform="matrix(-1 0 0 1 363.76 -23.334)" d="m304.67 271.23h5.0002v6.8981c-0.45929-0.0164-7.1904 0.012-10.417 0 0.9044-2.441 2.9812-5.3077 5.4166-6.8981z" filter="url(#g)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bk" d="m35.26 248.94c1.1902 4.2663 4.0629 5.2842 7.5168 6.5728l1e-5 8.8634c-3.5901-1.6184-6.0104-3.2142-7.3892-6.4193z" filter="url(#u)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bl" d="m72.648 258.29c-1.6652 4.0288-4.6392 5.012-7.5483 6.5728l0.0319 8.9272c3.5899-1.6184 6.0739-3.278 7.4526-6.4831z" filter="url(#e)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bm" transform="translate(-246.87 -23.329)" d="m319.49 290.79c-1.7448 4.1184-4.7478 5.125-7.4849 6.6046l-2e-3 10.857c-1e-5 0.0211 0.0161 0.0324 0.0359 0.0252 4.3739-1.6005 7.2632-5.8102 7.3551-10.792 3.9e-4 -0.0211 8.9e-4 -0.0553 1e-3 -0.0764z" filter="url(#d)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bn" d="m72.645 248.82c-1.1902 4.2663-4.0629 5.2842-7.5168 6.5728l-1e-5 8.8634c3.5901-1.6184 6.0104-3.2142 7.3892-6.4193z" filter="url(#f)" style={{ paintOrder: "markers stroke fill" }} />
                        <rect id="bo" x="43.173" y="255.34" width="10.645" height="9.1118" ry=".49592" filter="url(#q)" style={{ paintOrder: "markers stroke fill" }} />
                        <rect id="bp" x="43.201" y="264.92" width="10.645" height="9.1118" ry=".49592" filter="url(#o)" style={{ paintOrder: "markers stroke fill" }} />
                        <rect id="bq" x="54.164" y="255.28" width="10.645" height="9.1118" ry=".49592" filter="url(#p)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="br" transform="translate(-246.87 -23.064)" d="m290.07 297.47c2e-3 -3e-3 5e-3 -5e-3 8e-3 -8e-3 0.12622-0.12943 0.4602-0.10613 0.64591-0.10613l9.565-2e-5c0.27549-6e-3 0.30636 0.13689 0.31576 0.2932v12.72c0.0179 0.21282-0.0136 0.38606-0.29321 0.36086l-2.839 5e-3c-0.25999 4.7e-4 -0.67912-0.0309-0.9357-0.0728-2.3794-0.38946-4.6352-0.96077-6.3676-2.186-0.10455-0.074-0.18737-0.24052-0.1874-0.36869l-3e-3 -9.9873c-5e-5 -0.18571-0.03-0.51656 0.0913-0.65054z" filter="url(#m)" style={{ paintOrder: "markers stroke fill" }} />
                        <path id="bs" transform="matrix(-1 0 0 1 354.7 -23.093)" d="m290.07 297.47c2e-3 -3e-3 5e-3 -5e-3 8e-3 -8e-3 0.12622-0.12943 0.4602-0.10613 0.64591-0.10613l9.565-2e-5c0.27549-6e-3 0.30636 0.13689 0.31576 0.2932v12.72c0.0179 0.21282-0.0136 0.38606-0.29321 0.36086l-2.839 5e-3c-0.25999 4.7e-4 -0.67912-0.0309-0.9357-0.0728-2.3794-0.38946-4.6352-0.96077-6.3676-2.186-0.10455-0.074-0.18737-0.24052-0.1874-0.36869l-3e-3 -9.9873c-5e-5 -0.18571-0.03-0.51656 0.0913-0.65054z" filter="url(#l)" style={{ paintOrder: "markers stroke fill" }} />
                    </g>
                    <g id="bt" transform="translate(-350.96 -50)">
                        <circle id="bu" cx="404.96" cy="354.58" r="5.5" style={{ paintOrder: "markers stroke fill" }} />
                        <ellipse id="bv" cx="405.39" cy="354.54" rx="4.3465" ry="4.3715" fill="#bebebe" style={{ paintOrder: "markers stroke fill" }} />
                        <circle id="bw" cx="403.44" cy="354.56" r=".5" style={{ paintOrder: "markers stroke fill" }} />
                        <circle id="bx" cx="407.19" cy="354.5" r=".5" style={{ paintOrder: "markers stroke fill" }} />
                    </g>
                </g>
                <g fill="#333333" fontFamily="Sans" fontStyle="italic" fontWeight="bold" strokeLinecap="round">
                    <g fontSize="4px">
                        {[...Array(10)].map((_, i) => {
                            const ids = ["by", "ca", "cc", "ce", "cg", "ci", "ck", "cm", "co", "cq"];
                            const xValues = [38.99, 48.86, 59.11, 68.86, 38.61, 48.48, 58.86, 68.73, 48.61, 58.98];
                            const yValues = [78.22, 80.17, 80.17, 77.67, 87.17, 90.04, 90.04, 87.92, 100.92, 100.92];

                            return (
                                <text
                                    key={i}
                                    id={ids[i]}
                                    x={xValues[i]}
                                    y={yValues[i]}
                                    xmlSpace="preserve"
                                    style={{
                                        fontVariantCaps: "normal",
                                        fontVariantEastAsian: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantNumeric: "normal",
                                        paintOrder: "markers stroke fill"
                                    }}
                                >
                                    <tspan x={xValues[i]} y={yValues[i]}>{i}</tspan>
                                </text>
                            );
                        })}
                    </g>

                    <g fontSize="1.99px">
                        {[
                            { id: "cs", x: 68.04, y: 96.84, text: t('readerSVG.enter') }, /* "Ввод" */
                            { id: "cu", x: 38.04, y: 96.84, text: t('readerSVG.cancel') }, /* "Сброс" */
                            { id: "cw", x: 38.34, y: 69.84, text: t('readerSVG.return') }, /* "Возврат" */
                            { id: "cy", x: 66.84, y: 69.84, text: t('readerSVG.doze') }, /* "Доза" */
                            { id: "da", x: 49.11, y: 70.97, text: t('readerSVG.menu') }, /* "Меню" */
                            { id: "dc", x: 57.49, y: 70.97, text: t('readerSVG.lang') }, /* "Язык" */
                        ].map(({ id, x, y, text }) => (
                            <text
                                key={id}
                                id={id}
                                x={x}
                                y={y}
                                xmlSpace="preserve"
                                style={{
                                    fontVariantCaps: "normal",
                                    fontVariantEastAsian: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantNumeric: "normal",
                                    paintOrder: "markers stroke fill"
                                }}
                            >
                                <tspan x={x} y={y}>{text}</tspan>
                            </text>
                        ))}
                        <text id="de" x="30.686155" y="40.978397" fill="#000000" fontFamily="'Lucida Console'" fontSize="5px" strokeLinecap="round" strokeWidth=".2" style={{ fontVariantCaps: "normal", fontVariantEastAsian: "normal", fontVariantLigatures: "normal", fontVariantNumeric: "normal", fontStyle: "normal", paintOrder: "markers stroke fill" }} xmlSpace="preserve">
                            <tspan id="df" x="30.686155" y="40.978397"></tspan>
                            <tspan id="dg" x="30.686155" y="47.645061"></tspan>
                        </text>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default ReaderSVG;
