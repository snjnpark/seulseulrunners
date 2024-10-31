// 필요한 컴포넌트와 설정 파일들을 임포트
import Pagination from "@components/Pagination";  // 페이지네이션 컴포넌트
import config from "@config/config.json";         // 설정 파일
import SeoMeta from "@layouts/partials/SeoMeta"; // SEO 메타데이터 컴포넌트
import { getSinglePage } from "@lib/contentParser"; // 컨텐츠 파싱 유틸리티
import Posts from "@partials/Posts";             // 게시물 목록 컴포넌트
const { blog_folder } = config.settings;         // 설정에서 블로그 폴더 경로 추출

// 블로그 페이지네이션을 처리하는 메인 컴포넌트
const BlogPagination = async ({ params }) => {
  // 현재 페이지 번호 계산 (파라미터가 없으면 1페이지)
  const currentPage = parseInt((params && params.slug) || 1);
  
  // 설정 파일에서 페이지당 표시할 게시물 수 가져오기
  const { pagination } = config.settings;
  
  // 모든 블로그 포스트와 작성자 정보 가져오기
  const posts = await getSinglePage(`content/${blog_folder}`);
  const authors = await getSinglePage("content/authors");
  
  // 현재 페이지에 표시할 게시물의 시작과 끝 인덱스 계산
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(posts.length / pagination);
  
  // 현재 페이지에 표시할 게시물들 추출
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // JSX 반환
  return (
    <>
      {/* SEO 메타 태그 설정 */}
      <SeoMeta title="뛰뛰 | Runners brand insight" />
      <section className="section">
        <div className="container">
          {/* 게시물 목록과 페이지네이션 컴포넌트 렌더링 */}
          <Posts className="mb-16" posts={currentPosts} authors={authors} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </section>
    </>
  );
};

export default BlogPagination;

// 정적 페이지 생성을 위한 함수
export async function generateStaticParams() {
  // 모든 블로그 포스트의 slug 가져오기
  const getAllSlug = await getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  
  // 전체 페이지 수 계산
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  
  // 각 페이지별 경로 생성 (2페이지부터 마지막 페이지까지)
  let paths = [];
  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(),
    });
  }
  
  return paths;
}