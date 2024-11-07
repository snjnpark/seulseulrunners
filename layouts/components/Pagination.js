// Next.js에서 Link 컴포넌트를 가져옵니다.
import Link from "next/link";
// React를 가져옵니다.
import React from "react";

// Pagination 컴포넌트 정의
// section: 현재 섹션 (예: 블로그 포스트 카테고리)
// currentPage: 현재 보고 있는 페이지 번호
// totalPages: 전체 페이지 수
const Pagination = ({ section, currentPage, totalPages }) => {
  // 첫 번째 페이지 링크가 필요할 때 사용할 변수
  const indexPageLink = currentPage === 2;
  // 이전 페이지가 있는지 확인하는 변수
  const hasPrevPage = currentPage > 1;
  // 다음 페이지가 있는지 확인하는 변수
  const hasNextPage = totalPages > currentPage;

  // 페이지 번호 목록 생성 (1부터 totalPages까지의 배열 생성)
  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  // 페이지 네비게이션 UI 렌더링
  return (
    <>
      {/* 페이지가 2개 이상일 때만 네비게이션 표시 */}
      {totalPages > 1 && (
        <nav
          className="mb-4 flex justify-center space-x-4"
          aria-label="Pagination"
        >
          {/* 이전 페이지 버튼 */}
          {hasPrevPage ? (
            // 이전 페이지가 있을 경우 클릭 가능한 Link로 표시
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="rounded-lg border border-primary px-2 py-2 text-dark"
            >
              <>
                <span className="sr-only">Previous</span>
                {/* 아이콘 표시: SVG를 통해 왼쪽 화살표 아이콘 생성 */}
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </Link>
          ) : (
            // 이전 페이지가 없을 경우 비활성화된 버튼으로 표시
            <span className="rounded-lg border border-primary px-2 py-2 text-dark">
              <>
                <span className="sr-only">Previous</span>
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </span>
          )}

          {/* 페이지 번호 목록 */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                // 현재 페이지일 경우 비활성화된 스타일 적용
                <span
                  aria-current="page"
                  className={`rounded-lg border border-primary bg-primary px-4 py-2 text-white`}
                >
                  {pagination}
                </span>
              ) : (
                // 현재 페이지가 아닌 경우 클릭 가능한 페이지 링크로 표시
                <Link
                  href={
                    i === 0
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${pagination}`
                  }
                  passHref
                  aria-current="page"
                  className={`rounded-lg border border-primary px-4 py-2 text-dark`}
                >
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* 다음 페이지 버튼 */}
          {hasNextPage ? (
            // 다음 페이지가 있을 경우 클릭 가능한 Link로 표시
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="rounded-lg border border-primary px-2 py-2 text-dark"
            >
              <>
                <span className="sr-only">Next</span>
                {/* 아이콘 표시: SVG를 통해 오른쪽 화살표 아이콘 생성 */}
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </Link>
          ) : (
            // 다음 페이지가 없을 경우 비활성화된 버튼으로 표시
            <span className="rounded-lg border border-primary px-2 py-2 text-dark">
              <>
                <span className="sr-only">Next</span>
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

// Pagination 컴포넌트를 export하여 다른 파일에서 사용할 수 있게 함
export default Pagination;
