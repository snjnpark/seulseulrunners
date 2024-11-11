/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://seulseulrunners.com', // 게시하는 site의 url
    generateRobotsTxt: true, // robots.txt 자동생성 여부 (true로 변경)
    sitemapSize: 7000, // sitemap별 최대 크기
    changefreq: 'daily', // 페이지 주소 변경 빈도
    priority: 1, // 페이지 주소 우선순위
    exclude: ['/search', '/categories', '/tags', '/authors'], // 제외할 페이지 경로
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', disallow: ['/search', '/categories', '/tags', '/authors'] }, // disallow 설정
        ],
    },
};
