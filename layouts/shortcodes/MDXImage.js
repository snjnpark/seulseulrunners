// 클라이언트 사이드 렌더링을 위한 'use client' 지시어
'use client'

// 필요한 컴포넌트와 훅 임포트
import Image from "next/image";  // Next.js의 최적화된 이미지 컴포넌트
import { useState } from "react"; // React의 상태 관리 훅

// MDXImage 컴포넌트 정의
// props: src(이미지 경로), alt(대체 텍스트), caption(이미지 설명)
const MDXImage = ({ src, alt, caption }) => {
  // 이미지 크기를 저장할 상태 선언
  // 초기값은 width: 0, height: 0으로 설정
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  return (
    // figure 요소로 이미지와 캡션을 그룹화
    <figure className="my-8"> {/* 상하 마진 8 설정 */}
      {/* 이미지를 감싸는 컨테이너 */}
      <div className="relative w-full">
        {/* 이미지 크기가 로드된 경우의 렌더링 */}
        {dimensions.width > 0 && (
          <Image
            src={src}
            alt={alt}
            width={dimensions.width}     // 실제 이미지 너비
            height={dimensions.height}    // 실제 이미지 높이
            className="w-full h-auto"     // 반응형 크기 조절
            priority                      // 이미지 우선 로딩 설정
            onLoadingComplete={(target) => {
              // 이미지 크기가 아직 설정되지 않은 경우에만 업데이트
              if (dimensions.width === 0) {
                setDimensions({
                  width: target.naturalWidth,    // 원본 이미지 너비
                  height: target.naturalHeight   // 원본 이미지 높이
                });
              }
            }}
          />
        )}

        {/* 이미지 크기가 아직 로드되지 않은 경우의 렌더링 */}
        {dimensions.width === 0 && (
          <Image
            src={src}
            alt={alt}
            width={700}       // 임시 초기 너비값
            height={400}      // 임시 초기 높이값
            className="w-full h-auto"  // 반응형 크기 조절
            priority         // 이미지 우선 로딩 설정
            onLoadingComplete={(target) => {
              // 이미지 로드 완료 시 실제 크기로 상태 업데이트
              setDimensions({
                width: target.naturalWidth,
                height: target.naturalHeight
              });
            }}
          />
        )}
      </div>

      {/* 캡션이 제공된 경우에만 figcaption 렌더링 */}
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MDXImage;