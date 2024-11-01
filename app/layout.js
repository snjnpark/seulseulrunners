// 필요한 설정 파일과 컴포넌트들을 임포트
import config from "@config/config.json";  // 사이트 전반적인 설정 정보
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";  // 화면 크기 표시 컴포넌트
import Footer from "@layouts/partials/Footer";  // 푸터 컴포넌트
import Header from "@layouts/partials/Header";  // 헤더 컴포넌트
import Providers from "@layouts/partials/Providers";  // 전역 상태 관리 프로바이더

// 분석 도구 관련 임포트
import { GoogleAnalytics } from "@next/third-parties/google";  // 구글 애널리틱스 컴포넌트
import "../styles/style.scss";  // 전역 스타일시트
import { Analytics } from "@vercel/analytics/react";  // Vercel 애널리틱스
import { SpeedInsights } from '@vercel/speed-insights/next';  // Vercel 성능 분석 도구

// 루트 레이아웃 컴포넌트 정의
export default function RootLayout({ children }) {
  return (
    // html 태그: 언어 설정 및 hydration 경고 억제
    <html suppressHydrationWarning={true} lang="ko">
      <head>
        {/* 네이버 사이트 인증 메타 태그*/}
        <meta 
          name="naver-site-verification" 
          content="bff8e66cbf91c66820e721558d1aa9330df9da1d" 
        />



        {/* 구글 사이트 인증 메타 태그 */}
        <meta
          name="google-site-verification" 
          content="zh6s9VC1jg9TKZXaMXscg_j7SnBefvkkSGr74SjdD4g" 
        />
        
        {/* 반응형 웹을 위한 뷰포트 설정 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* 파비콘 설정 */}
        <link rel="shortcut icon" href={config.site.favicon} />
        
        {/* 테마 관련 메타 정보 */}
        <meta name="theme-name" content="andromeda-light-nextjs" />

        {/* PWA 및 테마 관련 메타 태그들 */}
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        {/* 라이트/다크 모드에 따른 테마 색상 설정 */}
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>

      {/* body 태그: hydration 경고 억제 */}
      <body suppressHydrationWarning={true}>
        {/* 화면 크기 표시 컴포넌트 (개발 모드에서 유용) */}
        <TwSizeIndicator />
        
        {/* 헤더 영역 */}
        <Header />
        
        {/* 메인 컨텐츠 영역 (상태 관리 프로바이더로 감싸짐) */}
        <Providers>{children}</Providers>
        
        {/* 푸터 영역 */}
        <Footer />
        
        {/* 분석 도구들 */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}