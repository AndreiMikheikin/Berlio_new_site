import React from 'react';

const Logo = ({ width = 272, height = 66, className = '' }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 272 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Berlio Logo" clipPath="url(#clip0_246_7727)">
            <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M7.87137 17.723L33.9799 17.6805C38.34 17.6805 41.495 18.4958 43.4451 20.1264C45.39 21.7578 46.0892 23.8021 45.5152 26.2055C45.0409 28.2357 43.8053 29.9774 41.8085 31.4308C41.165 31.8914 40.47 32.2867 39.7353 32.6099C39.5183 32.7008 39.3348 32.8486 39.2073 33.035C39.0798 33.2213 39.014 33.4381 39.0179 33.6587C39.0217 33.8793 39.0952 34.094 39.2292 34.2764C39.3632 34.4588 39.5519 34.6009 39.772 34.6853C40.9745 35.1312 42.0347 35.8532 42.8527 36.7833C44.0496 38.2234 44.3895 40.0349 43.8725 42.2178C43.4488 44.0227 42.4983 45.6854 41.1246 47.0246C39.653 48.4853 37.86 49.6366 35.8668 50.4006C34.5875 50.9237 32.7342 51.2969 30.319 51.5316C27.0887 51.854 24.9728 52.0264 23.9438 52.0264L1.38622 52.0604C1.20048 52.0628 1.01658 52.026 0.848512 51.9528C0.680446 51.8795 0.532644 51.7717 0.41635 51.6376C0.300057 51.5034 0.218338 51.3465 0.177411 51.1787C0.136484 51.0109 0.137429 50.8366 0.180172 50.6692L7.87137 17.723ZM18.8021 31.1735H24.872C27.052 31.1735 28.6336 30.8907 29.6198 30.3083C30.0968 30.037 30.5077 29.6771 30.8267 29.2512C31.1457 28.8254 31.3659 28.3429 31.4732 27.8342C31.7052 26.8332 31.4732 26.0557 30.7343 25.4902C29.9954 24.9247 28.597 24.656 26.478 24.6617H21.3119C21.0307 24.6607 20.7577 24.7497 20.5391 24.9135C20.3205 25.0773 20.1696 25.306 20.1119 25.5608L18.8021 31.1791V31.1735ZM15.6542 44.6551L22.7652 44.641C25.1712 44.641 26.9421 44.3073 28.081 43.6598C28.6074 43.3839 29.0651 43.0084 29.4244 42.5577C29.7837 42.1071 30.0365 41.5915 30.1664 41.0444C30.2984 40.6024 30.2843 40.1339 30.1259 39.6994C29.9676 39.265 29.6721 38.8845 29.2779 38.607C28.4474 37.9906 26.8017 37.6796 24.356 37.6853H18.2678C17.9865 37.6843 17.7136 37.7732 17.495 37.937C17.2763 38.1009 17.1255 38.3295 17.0678 38.5844L15.6542 44.6438V44.6551ZM57.8718 17.641L92.7432 17.5872C92.9277 17.5852 93.1102 17.6219 93.2772 17.6945C93.4441 17.7671 93.5911 17.8738 93.7072 18.0066C93.8232 18.1394 93.9053 18.2948 93.9472 18.4611C93.9892 18.6275 93.9899 18.8004 93.9493 18.9671L92.7676 24.034C92.71 24.2889 92.5591 24.5175 92.3405 24.6814C92.1219 24.8452 91.8489 24.9341 91.5677 24.9331L70.1368 24.9671C69.8556 24.9661 69.5826 25.055 69.364 25.2188C69.1454 25.3827 68.9945 25.6113 68.9368 25.8662L68.1949 29.0415C68.1544 29.2079 68.155 29.3807 68.1968 29.5468C68.2385 29.7129 68.3203 29.8682 68.436 30.0009C68.5517 30.1336 68.6983 30.2404 68.8649 30.3132C69.0315 30.386 69.2137 30.423 69.3979 30.4214L88.0625 30.3874C88.247 30.3854 88.4295 30.422 88.5965 30.4947C88.7635 30.5673 88.9105 30.674 89.0265 30.8068C89.1426 30.9396 89.2246 31.0949 89.2666 31.2613C89.3085 31.4276 89.3092 31.6006 89.2686 31.7673L88.1664 36.4751C88.1081 36.7295 87.957 36.9575 87.7384 37.1207C87.5198 37.284 87.2472 37.3725 86.9664 37.3714L67.227 37.4025C66.9458 37.4015 66.6728 37.4905 66.4542 37.6543C66.2356 37.8181 66.0847 38.0468 66.0271 38.3017L64.9798 42.7918C64.9393 42.9582 64.9399 43.1309 64.9817 43.297C65.0234 43.4632 65.1052 43.6184 65.2209 43.7511C65.3366 43.8838 65.4833 43.9906 65.6498 44.0634C65.8164 44.1362 65.9986 44.1732 66.1828 44.1716L87.2198 44.1405C87.4044 44.1388 87.5869 44.1758 87.7537 44.2488C87.9206 44.3217 88.0674 44.4288 88.1832 44.5618C88.2989 44.6949 88.3806 44.8505 88.4221 45.017C88.4637 45.1835 88.4639 45.3566 88.4228 45.5231L87.1435 51.0142C87.0859 51.2691 86.935 51.4978 86.7164 51.6616C86.4978 51.8254 86.2248 51.9143 85.9436 51.9133L50.379 51.9727C50.1949 51.9743 50.0127 51.9374 49.8461 51.8646C49.6795 51.7917 49.5329 51.685 49.4172 51.5523C49.3015 51.4195 49.2197 51.2643 49.1779 51.0982C49.1362 50.932 49.1355 50.7593 49.1761 50.5929L56.6718 18.5373C56.7301 18.2829 56.8812 18.0549 57.0998 17.8916C57.3184 17.7284 57.591 17.6399 57.8718 17.641Z" fill="#F24942" stroke="#000D04" strokeWidth="0.283064" strokeMiterlimit="10" />
            <path id="Vector_2" d="M190.878 56.8331C191.107 56.7879 216.303 56.6663 215.943 56.8473C175.817 76.1932 128.158 61.7304 120.681 38.5475C120.599 38.2895 120.429 38.0634 120.194 37.9045C119.96 37.7455 119.676 37.6624 119.386 37.6682L116.488 37.6993H116.061C115.747 37.696 115.441 37.7941 115.197 37.9767C114.952 38.1594 114.784 38.4152 114.721 38.7002L111.38 52.9198C111.316 53.2015 111.149 53.4543 110.908 53.6363C110.667 53.8183 110.366 53.9187 110.055 53.9208L95.369 53.9519C95.1618 53.9521 94.9573 53.909 94.7706 53.8258C94.584 53.7426 94.4199 53.6215 94.2908 53.4715C94.1617 53.3215 94.0708 53.1465 94.0249 52.9594C93.9789 52.7723 93.9792 52.5781 94.0256 52.3911L103.668 12.8341C103.738 12.5482 103.912 12.2931 104.16 12.1111C104.408 11.929 104.716 11.831 105.033 11.8331L119.966 11.9095C120.174 11.9134 120.379 11.9605 120.565 12.0474C120.751 12.1342 120.913 12.2586 121.041 12.4114C121.168 12.5641 121.256 12.7413 121.3 12.93C121.343 13.1186 121.34 13.3139 121.291 13.5014L117.285 28.0263C117.237 28.214 117.235 28.4093 117.278 28.5979C117.322 28.7866 117.411 28.9637 117.538 29.1164C117.666 29.2691 117.829 29.3934 118.015 29.4802C118.201 29.5671 118.405 29.6142 118.614 29.6182C121.429 29.6182 124.638 29.4344 125.914 28.7983C126.055 28.7325 126.203 28.6822 126.357 28.6484C131.334 27.3421 134.039 25.0094 134.689 22.3374C135.755 17.9858 131.694 11.2676 121.053 9.00843C119.301 8.62954 116.534 8.06969 110.556 8.02445C108.379 8.00749 106.547 8.00749 104.959 8.03859C101.979 8.08383 99.8329 8.20541 97.7536 8.38637C86.0474 9.44952 79.5164 11.1008 70.7901 14.0131C70.7263 14.0292 70.6608 14.0387 70.5947 14.0414L56.2199 14.0895C55.9608 14.089 55.7097 14.0058 55.509 13.8539C55.3084 13.7019 55.1704 13.4906 55.1184 13.2555C55.0664 13.0203 55.1036 12.7758 55.2236 12.5631C55.3436 12.3503 55.5391 12.1824 55.7772 12.0876C71.6084 5.72002 91.3356 1.34302 111.31 1.34302C139.864 1.34302 181.535 23.4486 138.209 34.9255C137.934 34.9983 137.691 35.1484 137.512 35.355C137.333 35.5617 137.228 35.8147 137.211 36.0791C136.145 53.7879 165.191 63.4156 190.485 56.9858C190.547 56.9506 190.612 56.9203 190.68 56.8953L190.878 56.8331Z" fill="#48AE5A" />
            <path id="Vector_3" d="M105.033 11.8331C104.717 11.8323 104.411 11.9309 104.164 12.1128C103.917 12.2948 103.744 12.5491 103.674 12.8341L94.0408 52.3911C93.9944 52.5781 93.9942 52.7723 94.0401 52.9594C94.086 53.1465 94.1769 53.3215 94.3061 53.4715C94.4352 53.6216 94.5992 53.7427 94.7859 53.8258C94.9726 53.909 95.1771 53.9521 95.3843 53.9519L110.071 53.9208C110.381 53.9187 110.682 53.8184 110.923 53.6363C111.164 53.4543 111.331 53.2015 111.396 52.9199L114.736 38.7002C114.799 38.4152 114.967 38.1594 115.212 37.9767C115.456 37.7941 115.762 37.696 116.076 37.6993H116.504L119.401 37.6682C119.692 37.6624 119.976 37.7455 120.21 37.9045C120.444 38.0635 120.615 38.2895 120.696 38.5476C128.161 61.7332 175.82 76.1932 215.958 56.8473C216.318 56.6663 191.123 56.7879 190.894 56.8331L190.695 56.8925C190.627 56.9175 190.562 56.9478 190.5 56.983C165.207 63.4128 136.152 53.7851 137.226 36.0763C137.243 35.8119 137.348 35.5589 137.527 35.3522C137.706 35.1456 137.95 34.9955 138.225 34.9227C181.545 23.4458 139.864 1.34021 111.31 1.34021C91.3356 1.34021 71.6176 5.70873 55.7772 12.0848C55.5391 12.1796 55.3436 12.3475 55.2236 12.5602C55.1036 12.773 55.0664 13.0175 55.1184 13.2527C55.1704 13.4878 55.3084 13.6991 55.509 13.8511C55.7097 14.003 55.9608 14.0862 56.2199 14.0867L70.5947 14.0386C70.6608 14.0359 70.7263 14.0264 70.7901 14.0103C79.5164 11.098 86.0565 9.44671 97.7536 8.38357C99.842 8.19978 101.979 8.07254 104.959 8.0273C106.547 7.99619 108.379 7.9962 110.556 8.01316C116.534 8.0584 119.301 8.61825 121.053 8.99714C131.694 11.2592 135.755 17.9745 134.689 22.3261C134.036 25.0094 131.33 27.3421 126.357 28.6484C126.203 28.6822 126.055 28.7325 125.914 28.7983C124.638 29.4345 121.429 29.6183 118.614 29.6183C118.405 29.6142 118.201 29.5671 118.015 29.4802C117.829 29.3934 117.666 29.2691 117.538 29.1164C117.411 28.9637 117.322 28.7866 117.278 28.598C117.235 28.4093 117.237 28.214 117.285 28.0264L121.297 13.5014C121.346 13.3139 121.349 13.1186 121.306 12.93C121.262 12.7414 121.174 12.5641 121.047 12.4114C120.92 12.2586 120.757 12.1342 120.571 12.0474C120.385 11.9605 120.18 11.9134 119.972 11.9095L105.033 11.8331Z" stroke="#000D04" strokeWidth="0.283064" strokeMiterlimit="10" />
            <path id="Vector_4" fillRule="evenodd" clipRule="evenodd" d="M163.204 17.6918L175.591 17.672C175.779 17.671 175.965 17.7094 176.135 17.7843C176.304 17.8593 176.454 17.9689 176.571 18.105C176.689 18.241 176.772 18.3999 176.813 18.5698C176.855 18.7397 176.855 18.9161 176.812 19.0858L171.316 42.1131C171.274 42.2828 171.273 42.4593 171.315 42.6291C171.357 42.799 171.44 42.9579 171.557 43.0939C171.675 43.23 171.824 43.3396 171.994 43.4146C172.164 43.4896 172.349 43.528 172.538 43.5269L191.217 43.5014C191.406 43.4998 191.592 43.5379 191.762 43.6127C191.932 43.6875 192.082 43.7971 192.199 43.9333C192.317 44.0695 192.4 44.2286 192.441 44.3987C192.483 44.5688 192.482 44.7454 192.439 44.9152L190.973 51.0424C190.913 51.3002 190.759 51.5309 190.536 51.6957C190.314 51.8605 190.037 51.9493 189.752 51.9472L156.581 52.001C156.393 52.0026 156.207 51.9646 156.037 51.8897C155.866 51.8149 155.717 51.7053 155.599 51.5691C155.482 51.4329 155.399 51.2738 155.357 51.1037C155.316 50.9336 155.317 50.757 155.36 50.5872L163.204 17.6918ZM205.827 17.624L218.257 17.6013C218.445 17.6003 218.631 17.6387 218.801 17.7136C218.971 17.7886 219.12 17.8982 219.238 18.0343C219.355 18.1703 219.438 18.3292 219.48 18.4991C219.521 18.669 219.521 18.8454 219.479 19.0151L211.87 50.9746C211.809 51.2322 211.654 51.4626 211.432 51.6277C211.21 51.7928 210.933 51.8826 210.649 51.8822L199.22 51.8992C199.032 51.9003 198.846 51.8619 198.676 51.7869C198.506 51.7119 198.357 51.6023 198.24 51.4662C198.122 51.3302 198.039 51.1713 197.998 51.0014C197.956 50.8316 197.956 50.6551 197.999 50.4854L205.827 17.624ZM223.982 34.7559C225.313 29.1593 228.403 24.7983 233.252 21.673C238.101 18.5476 244.189 16.9783 251.517 16.9652C259.036 16.9538 264.46 18.475 267.791 21.5288C271.121 24.5825 272.138 28.87 270.844 34.3912C269.889 38.3912 268.218 41.6767 265.83 44.2479C263.339 46.8838 260.211 48.9377 256.701 50.2423C253.016 51.6843 248.653 52.3968 243.648 52.4081C238.56 52.4081 234.488 51.7974 231.435 50.5759C228.507 49.4501 226.121 47.3783 224.718 44.7456C223.279 42.0877 223.037 38.755 223.991 34.7474L223.982 34.7559ZM237.926 34.7757C237.096 38.2404 237.348 40.7276 238.684 42.2375C240.019 43.7474 242.145 44.4958 245.062 44.4826C248.056 44.4826 250.556 43.7408 252.561 42.2573C254.566 40.7738 256.017 38.1131 256.915 34.2752C257.678 31.0575 257.394 28.6937 256.026 27.2064C254.658 25.7192 252.506 24.9868 249.581 24.9897C246.925 24.9383 244.333 25.7474 242.253 27.2771C240.197 28.7814 238.755 31.2818 237.926 34.7785V34.7757Z" fill="#F24942" stroke="#000D04" strokeWidth="0.283064" strokeMiterlimit="10" />
            <path id="Vector_5" d="M215.341 12.7408C220.849 12.7408 225.313 9.92031 225.313 6.44107C225.313 2.96184 220.849 0.141357 215.341 0.141357C209.834 0.141357 205.369 2.96184 205.369 6.44107C205.369 9.92031 209.834 12.7408 215.341 12.7408Z" fill="#48AE5A" stroke="#000D04" strokeWidth="0.283064" strokeMiterlimit="10" />
        </g>
        <defs>
            <clipPath id="clip0_246_7727">
                <rect width="271.543" height="66" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default Logo;