import config from "@config/config.json"; // 설정 파일에서 구성(config) 데이터를 불러옵니다.
import NotFound from "@layouts/404"; // 404 페이지 레이아웃을 가져옵니다.
import About from "@layouts/About"; // "About" 페이지 레이아웃을 가져옵니다.
import Contact from "@layouts/Contact"; // "Contact" 페이지 레이아웃을 가져옵니다.
import Default from "@layouts/Default"; // 기본 페이지 레이아웃을 가져옵니다.
import SeoMeta from "@layouts/partials/SeoMeta"; // SEO 메타 데이터 설정을 위한 컴포넌트를 가져옵니다.
import PostSingle from "@layouts/PostSingle"; // 단일 포스트 페이지 레이아웃을 가져옵니다.
import { getRegularPage, getSinglePage } from "@lib/contentParser"; // 컨텐츠 파싱 함수들을 가져옵니다.
const { blog_folder } = config.settings; // 설정에서 `blog_folder` 경로 정보를 불러옵니다.

// 모든 정규 페이지를 위한 컴포넌트
const RegularPages = async ({ params }) => {
  // 서버 사이드 렌더링에서 실행됩니다.
  const { regular: slug } = params; // URL 파라미터에서 'slug' 정보를 추출합니다.
  const pageData = await getRegularPage(slug); // 'slug'에 해당하는 정규 페이지 데이터를 가져옵니다.
  
  // 블로그 포스트 폴더에 있는 모든 slug를 불러와 필터링에 사용
  const getPostSlug = getSinglePage(`content/${blog_folder}`);
  const postSlug = getPostSlug.map((item) => item.slug); // 블로그 포스트의 슬러그만 추출하여 배열로 저장합니다.
  
  // 작가(author) 데이터를 불러옵니다.
  const authors = getSinglePage("content/authors"); // 작가 정보를 담고 있는 'content/authors' 데이터를 가져옵니다.
  
  // 모든 단일 페이지(포스트)를 불러옵니다.
  const posts = getSinglePage(`content/${blog_folder}`); // 블로그 포스트 전체 데이터를 가져옵니다.
  
  // pageData의 frontmatter에서 메타데이터를 구조분해 할당으로 불러옵니다.
  const { title, meta_title, description, image, noindex, canonical, layout } = pageData.frontmatter;
  const { content } = pageData; // 페이지의 내용(content)을 불러옵니다.

  return (
    <>
      <SeoMeta
        title={title} // SEO 메타 태그의 제목
        description={description ? description : content.slice(0, 120)} // SEO 메타 설명 (content에서 일부 발췌)
        meta_title={meta_title} // 메타 제목을 위한 설정
        image={image} // 이미지 URL
        noindex={noindex} // 검색 엔진 색인을 금지하는 설정
        canonical={canonical} // 정규 URL을 설정합니다.
      />

      {/* 조건부 렌더링을 통해 페이지 레이아웃을 결정합니다 */}
      {postSlug.includes(slug) ? ( // 만약 현재 slug가 포스트의 slug 목록에 포함되어 있다면
        <PostSingle
          slug={slug} // 현재 포스트의 slug
          post={pageData} // 현재 포스트 데이터
          authors={authors} // 모든 작가 정보
          posts={posts} // 모든 포스트 데이터
        />
      ) : layout === "404" ? ( // 페이지 레이아웃이 "404"라면
        <NotFound data={pageData} /> // 404 Not Found 페이지를 렌더링합니다.
      ) : layout === "about" ? ( // 페이지 레이아웃이 "about"이라면
        <About data={pageData} /> // About 페이지를 렌더링합니다.
      ) : layout === "contact" ? ( // 페이지 레이아웃이 "contact"라면
        <Contact data={pageData} /> // Contact 페이지를 렌더링합니다.
      ) : (
        <Default data={pageData} /> // 그 외의 경우에는 기본 레이아웃을 사용해 페이지를 렌더링합니다.
      )}
    </>
  );
};
export default RegularPages; // RegularPages 컴포넌트를 기본 내보내기로 설정합니다.

// 정규 페이지 경로를 위한 함수
export async function generateStaticParams() {
  const regularSlugs = await getSinglePage("content"); // 정규 페이지의 slug를 가져옵니다.
  const postSlugs = await getSinglePage(`content/${blog_folder}`); // 블로그 폴더에서 포스트 slug를 가져옵니다.
  const allSlugs = [...regularSlugs, ...postSlugs]; // 두 종류의 slug를 모두 합칩니다.
  const paths = allSlugs.map((item) => ({
    regular: item.slug, // 모든 slug에 대해 경로 객체를 생성합니다.
  }));

  return paths; // Next.js에 필요한 정적 경로를 반환합니다.
}
