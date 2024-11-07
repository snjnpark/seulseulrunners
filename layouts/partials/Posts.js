// config.json과 dateFormat 함수, textConverter 유틸리티 파일에서 필요한 모듈을 불러옵니다.
import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

// Posts 컴포넌트를 정의하며, posts, className, authors를 매개변수로 받습니다.
const Posts = ({ posts, className, authors }) => {
  // config.settings에서 summary_length 값을 가져옵니다.
  const { summary_length } = config.settings;
  
  // 전체 컴포넌트 렌더링을 반환합니다.
  return (
    // 전달받은 className과 row 및 space-y-16 클래스를 가진 div 요소를 생성합니다.
    <div className={`row space-y-16 ${className}`}>
      {/* posts 배열을 map 함수로 순회하며 각각의 post에 대해 렌더링합니다. */}
      {posts.map((post, i) => (
        <div
          key={`key-${i}`} // 각 post 요소에 고유 key를 부여하여 React의 고유성을 유지합니다.
          className={i === 0 ? "col-12" : "col-12 sm:col-6"} // 첫 번째 post는 전체 폭(col-12), 나머지는 반폭(col-6) 설정
        >
          {/* post에 이미지가 있을 경우 이미지 컴포넌트를 렌더링합니다. */}
          {post.frontmatter.image && (
            <Image
              className="rounded-lg" // 이미지를 둥근 모서리로 렌더링
              src={post.frontmatter.image} // 이미지 URL 설정
              alt={post.frontmatter.title} // 이미지 대체 텍스트 설정
              width={i === 0 ? "925" : "445"} // 첫 번째 이미지는 큰 사이즈, 나머지는 작은 사이즈로 설정
              height={i === 0 ? "475" : "230"} // 첫 번째 이미지는 큰 사이즈, 나머지는 작은 사이즈로 설정
              priority={i === 0 ? true : false} // 첫 번째 이미지는 우선 로드(priority) 설정
            />
          )}

          {/* 게시글 메타 정보 (작성자, 날짜, 카테고리) 표시를 위한 리스트를 렌더링 */}
          <ul className="mb-4 mt-4 flex flex-wrap items-center space-x-3 text-text">
            {/* 작성자 목록을 필터링하고 매칭되는 작성자를 찾습니다. */}
            <li>
              {authors
                .filter((author) =>
                  // post의 작성자 목록에서 slugify 함수로 생성한 슬러그가 일치하는 작성자를 필터링합니다.
                  post.frontmatter.authors
                    .map((author) => slugify(author))
                    .includes(slugify(author.frontmatter.title))
                )
                .map((author, i) => (
                  // 매칭된 작성자 정보를 링크로 렌더링합니다.
                  <Link
                    href={`/authors/${slugify(author.frontmatter.title)}`}
                    key={`author-${i}`}
                    className="flex items-center hover:text-primary"
                  >
                    {/* 작성자 이미지가 있을 경우 이미지 컴포넌트를 렌더링 */}
                    {author.frontmatter.image && (
                      <Image
                        src={author.frontmatter.image} // 작성자 이미지 URL
                        alt={author.frontmatter.title} // 작성자 이름
                        height={50} // 이미지 높이 설정
                        width={50} // 이미지 너비 설정
                        className="mr-2 h-6 w-6 rounded-full" // 둥근 모서리 설정
                      />
                    )}
                    <span>{author.frontmatter.title}</span> {/* 작성자 이름 표시 */}
                  </Link>
                ))}
            </li>
            {/* 게시글 날짜를 표시합니다. dateFormat 함수를 사용해 포맷팅합니다. */}
            <li>{dateFormat(post.frontmatter.date)}</li>

            {/* 카테고리 목록을 표시합니다. */}
            <li>
              <ul>
                {post.frontmatter.categories.map((category, i) => (
                  // 카테고리별로 링크를 생성하고 humanize 함수로 보기 쉽게 변환합니다.
                  <li className="inline-block" key={`category-${i}`}>
                    <Link
                      href={`/categories/${slugify(category)}`} // 카테고리 링크 생성
                      className="mr-3 hover:text-primary" // 마우스 오버 시 텍스트 색상 변경
                    >
                      &#9635; {humanize(category)} {/* 카테고리 이름을 표시 */}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* 게시글 제목을 표시하고, 클릭 시 해당 게시글 페이지로 이동하는 링크를 추가합니다. */}
          <h3 className="mb-2">
            <Link href={`/${post.slug}`} className="block hover:text-primary">
              {post.frontmatter.title}
            </Link>
          </h3>

          {/* 게시글 내용을 설정된 summary_length 만큼 잘라서 표시하고 '...'을 덧붙입니다. */}
          <p className="text-text">
            {post.content && post.content.slice(0, Number(summary_length))}...
          </p>
        </div>
      ))}
    </div>
  );
};

// Posts 컴포넌트를 기본 내보내기합니다.
export default Posts;
