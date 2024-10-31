import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { sortByDate } from "./utils/sortFunctions";

// _index.md와 같은 리스트 페이지 데이터를 가져오는 함수
// filePath: 파일 경로를 받아서 해당 페이지의 frontmatter와 content를 반환
export const getListPage = async (filePath) => {
 // 지정된 파일 경로에서 페이지 데이터를 UTF-8 형식으로 읽어옴
 const pageData = fs.readFileSync(path.join(filePath), "utf-8");
 // gray-matter를 사용해 frontmatter와 content를 분리
 const pageDataParsed = matter(pageData);
 // 404 페이지 데이터도 함께 로드 (페이지를 찾지 못할 경우 사용)
 const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
 const notFoundDataParsed = matter(notFoundPage);
 let frontmatter, content;

 // 페이지 데이터가 정상적으로 파싱되었다면 해당 데이터 사용
 if (pageDataParsed) {
   content = pageDataParsed.content;
   frontmatter = pageDataParsed.data;
 } else {
   // 페이지를 찾지 못했다면 404 페이지 데이터 사용
   content = notFoundDataParsed.content;
   frontmatter = notFoundDataParsed.data;
 }

 return {
   frontmatter,
   content,
 };
};

// 단일 페이지들의 데이터를 가져오는 함수 (예: blog/post.md 또는 blog/post.mdx)
// folder: 콘텐츠가 저장된 폴더 경로
export const getSinglePage = (folder) => {
 // 지정된 폴더 내의 모든 파일 목록을 읽어옴
 const filesPath = fs.readdirSync(path.join(folder));
 
 // .md와 .mdx 파일만 필터링
 // 마크다운(.md)과 MDX(.mdx) 형식의 파일만 처리하도록 필터
 const sanitizeFiles = filesPath.filter((file) => 
   file.endsWith(".md") || file.endsWith(".mdx")
 );
 
 // '_'로 시작하지 않는 파일만 필터링 
 // (_로 시작하는 파일은 보통 임시파일이나 특수 설정 파일로 간주)
 const filterSingleFiles = sanitizeFiles.filter((file) =>
   file.match(/^(?!_)/)
 );
 
 // 각 파일을 처리하여 필요한 데이터 구조로 변환
 const singlePages = filterSingleFiles.map((filename) => {
   // 파일 이름에서 확장자(.md 또는 .mdx)를 제거하여 slug 생성
   const slug = filename.replace(/\.(md|mdx)$/, "");
   
   // 파일의 전체 내용을 읽어옴
   const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
   
   // gray-matter로 frontmatter와 컨텐츠를 분리
   const pageDataParsed = matter(pageData);
   
   // frontmatter 데이터를 문자열로 변환 후 다시 파싱
   // (깊은 복사 효과를 얻기 위함)
   const frontmatterString = JSON.stringify(pageDataParsed.data);
   const frontmatter = JSON.parse(frontmatterString);
   
   // 마크다운 컨텐츠 부분 추출
   const content = pageDataParsed.content;
   
   // URL 생성: frontmatter에 url이 있으면 사용, 없으면 slug 사용
   // 슬래시(/) 제거하여 깔끔한 URL 생성
   const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
   
   return { frontmatter: frontmatter, slug: url, content: content };
 });

 // 게시 가능한 페이지만 필터링
 // 1. draft가 아닌 것
 // 2. 404 페이지가 아닌 것
 // 3. 유효한 페이지인 것
 const publishedPages = singlePages.filter(
   (page) =>
     !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
 );
 
 // 날짜순으로 정렬하여 반환
 const filterByDate = sortByDate(publishedPages);
 return filterByDate;
};

// 여러 페이지 중에서 특정 단일 페이지의 데이터를 가져오는 함수
// slug: URL에서 사용되는 고유 식별자
export const getRegularPage = async (slug) => {
 let frontmatter, content;
 
 // posts 폴더와 content 폴더의 모든 페이지 데이터를 가져옴
 const publishedPages = getSinglePage("content/posts");
 const regularPage = getSinglePage("content");
 
 // 요청된 slug가 posts 폴더에 있는 경우
 if (publishedPages.map((page) => page.slug).includes(slug)) {
   const pageData = publishedPages.filter((data) => data.slug === slug);
   content = pageData[0].content;
   frontmatter = pageData[0].frontmatter;
 } 
 // 요청된 slug가 일반 content 폴더에 있는 경우
 else if (regularPage.map((el) => el.slug).includes(slug)) {
   const regulerData = regularPage.filter((data) => data.slug === slug);
   content = regulerData[0].content;
   frontmatter = regulerData[0].frontmatter;
 } 
 // 요청된 slug를 찾지 못한 경우 404 페이지 데이터 반환
 else {
   const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
   const notFoundDataParsed = matter(notFoundPage);
   content = notFoundDataParsed.content;
   frontmatter = notFoundDataParsed.data;
 }

 return {
   frontmatter,
   content,
 };
};