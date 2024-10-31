"use client"; // 클라이언트 사이드 컴포넌트 선언

// 필요한 모듈들을 임포트
import config from "@config/config.json";  // 설정 파일 임포트
import { plainify } from "@lib/utils/textConverter";  // 텍스트 변환 유틸리티 임포트
import { usePathname } from "next/navigation";  // 현재 경로를 가져오기 위한 훅 임포트

/**
 * SEO 메타 태그를 관리하는 컴포넌트
 * @param {string} title - 페이지 제목
 * @param {string} meta_title - SEO용 메타 제목 (title과 다를 경우 사용)
 * @param {string} image - 페이지 대표 이미지 경로
 * @param {string} description - 페이지 설명
 * @param {string} canonical - 표준 URL
 * @param {boolean} noindex - 검색엔진 색인 제외 여부
 */
const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
}) => {
  // config 파일에서 필요한 메타데이터 추출
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  
  // 현재 페이지의 경로 가져오기
  const pathname = usePathname();

  return (
    <>
      {/* 1. 기본 메타 태그 */}
      {/* 페이지 제목 설정: meta_title > title > config의 기본 제목 순으로 적용 */}
      <title>
        {plainify(meta_title ? meta_title : title ? title : config.site.title)}
      </title>

      {/* 검색엔진 관련 메타 태그 */}
      {/* 표준 URL이 있는 경우 canonical 태그 추가 */}
      {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

      {/* 검색엔진 색인 제외 설정이 있는 경우 noindex 태그 추가 */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* 페이지 설명 메타 태그: 제공된 설명 또는 기본 설명 사용 */}
      <meta
        name="description"
        content={plainify(description ? description : meta_description)}
      />

      {/* 작성자 정보 */}
      <meta name="author" content={meta_author} />

      {/* 2. Open Graph 메타 태그 (페이스북 등 소셜 미디어용) */}
      {/* og:title - 소셜 미디어에 표시될 제목 */}
      <meta
        property="og:title"
        content={plainify(
          meta_title ? meta_title : title ? title : config.site.title
        )}
      />

      {/* og:description - 소셜 미디어에 표시될 설명 */}
      <meta
        property="og:description"
        content={plainify(description ? description : meta_description)}
      />

      {/* og 기본 설정 */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${base_url}/${pathname.replace("/", "")}`}
      />

      {/* og:image - 소셜 미디어에 표시될 이미지 */}
      <meta
        property="og:image"
        content={`${base_url}${image ? image : meta_image}`}
      />

      {/* 3. Twitter 카드 메타 태그 */}
      {/* twitter:title - 트위터에 표시될 제목 */}
      <meta
        name="twitter:title"
        content={plainify(
          meta_title ? meta_title : title ? title : config.site.title
        )}
      />

      {/* twitter:description - 트위터에 표시될 설명 */}
      <meta
        name="twitter:description"
        content={plainify(description ? description : meta_description)}
      />

      {/* twitter:image - 트위터에 표시될 이미지 */}
      <meta
        name="twitter:image"
        content={`${base_url}${image ? image : meta_image}`}
      />

      {/* 트위터 카드 타입 설정 */}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default SeoMeta;