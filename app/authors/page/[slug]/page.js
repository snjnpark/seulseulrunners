import Pagination from "@components/Pagination"; // 페이지네이션을 처리하는 컴포넌트 가져오기
import config from "@config/config.json"; // 설정 파일을 가져와서 페이지네이션 등의 설정을 참조
import SeoMeta from "@layouts/partials/SeoMeta"; // SEO 메타데이터 처리를 위한 컴포넌트 가져오기
import { getListPage, getSinglePage } from "@lib/contentParser"; // 파일을 파싱하여 데이터를 가져오는 함수 가져오기
import { markdownify } from "@lib/utils/textConverter"; // Markdown을 HTML 요소로 변환하는 유틸 함수 가져오기
import Authors from "@partials/Authors"; // 저자 목록을 표시하는 컴포넌트 가져오기

// 블로그 페이지네이션을 위한 컴포넌트
const AuthorPagination = async ({ params }) => {
  //
  const currentPage = parseInt((params && params.slug) || 1); // 현재 페이지 번호를 URL 파라미터에서 가져오며, 기본값은 1로 설정
  const { pagination } = config.settings; // 설정 파일에서 페이지네이션 항목 수를 불러오기
  const authors = getSinglePage("content/authors"); // 모든 저자 데이터를 content/authors 디렉토리에서 가져오기
  const authorIndex = await getListPage("content/authors/_index.md"); // 저자 페이지의 메인 인덱스 파일(_index.md)을 가져오기

  // 각 페이지에 표시할 저자들의 시작과 끝 인덱스를 계산
  const indexOfLastAuthor = currentPage * pagination; // 현재 페이지에서 마지막으로 표시될 저자의 인덱스
  const indexOfFirstAuthor = indexOfLastAuthor - pagination; // 현재 페이지에서 첫 번째로 표시될 저자의 인덱스
  const totalPages = Math.ceil(authors.length / pagination); // 전체 저자 수를 페이지당 저자 수로 나눠 총 페이지 수 계산
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor); // 현재 페이지에 해당하는 저자 목록을 추출
  const { frontmatter, content } = authorIndex; // authorIndex에서 frontmatter(제목 등)와 content(본문 내용)를 가져옴
  const { title } = frontmatter; // frontmatter에서 페이지 제목을 추출

  return (
    <>
      <SeoMeta title={title} /> {/* SEO 메타데이터 설정 */}
      <section className="section">
        <div className="container text-center">
          {markdownify(title, "h1", "h2 mb-16")} {/* 제목을 Markdown 형식으로 렌더링 */}
          <Authors authors={currentAuthors} /> {/* 저자 목록을 표시 */}
          <Pagination
            section="authors" // 페이지네이션의 대상 섹션을 지정
            totalPages={totalPages} // 전체 페이지 수를 전달
            currentPage={currentPage} // 현재 페이지 번호를 전달
          />
        </div>
      </section>
    </>
  );
};

export default AuthorPagination;

// 저자 페이지네이션의 슬러그를 생성하는 함수
export const generateStaticParams = () => {
  const getAllSlug = getSinglePage("content/authors"); // 모든 저자 데이터를 가져옴
  const allSlug = getAllSlug.map((item) => item.slug); // 각 저자 항목의 슬러그를 추출하여 배열로 만듦
  const { pagination } = config.settings; // 페이지네이션 설정 값을 가져옴
  const totalPages = Math.ceil(allSlug.length / pagination); // 저자 수에 따라 총 페이지 수 계산
  let paths = [];

  // 페이지 2부터 총 페이지 수까지 slug 배열에 추가
  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(), // 각 페이지의 슬러그를 문자열로 설정
    });
  }

  return paths; // 생성된 슬러그 경로들을 반환
};
