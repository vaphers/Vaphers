// Korean translation
export const ko: Record<string, string> = {
  // --- page.tsx: Hero ---
  "hero.title": "Gemini 워터마크 리무버",
  "hero.subtitle": "Google Gemini AI 이미지의 워터마크를 즉시 제거하세요. 100% 클라이언트 측 처리.",

  // --- page.tsx: Loading ---
  "loading.title": "엔진 초기화 중",
  "loading.subtitle": "워터마크 제거 알고리즘 로드 중",

  // --- page.tsx: Steps section ---
  "steps.heading": "<blue>워터마크 리무버</blue>는 어떻게 작동하나요?",
  "steps.subheading": "Gemini 워터마크 제거는 매우 간편합니다. 전문 기술 지식 없이 단 4단계만 거치면 됩니다.",
  "step.1.title": "업로드",
  "step.1.desc": "Gemini로 생성된 이미지를 드래그 앤 드롭하거나 선택하세요.",
  "step.2.title": "감지",
  "step.2.desc": "당사의 AI 엔진이 숨겨진 워터마크를 자동으로 식별합니다.",
  "step.3.title": "처리",
  "step.3.desc": "브라우저에서 직접 워터마크가 깨끗하게 제거됩니다.",
  "step.4.title": "다운로드",
  "step.4.desc": "워터마크가 제거된 선명한 이미지를 즉시 저장하세요.",

  // --- page.tsx: Features grid ---
  "feature.clientSide.title": "100% 클라이언트 측 처리",
  "feature.clientSide.desc": "이미지가 기기를 벗어나지 않습니다. 완벽한 개인정보 보호와 최상의 보안을 제공합니다.",
  "feature.quality.title": "화질 유지",
  "feature.quality.desc": "원본 이미지 화질을 압축하거나 손상시키지 않고 워터마크만 깨끗하게 제거합니다.",
  "feature.fast.title": "번개처럼 빠른 속도",
  "feature.fast.desc": "WebGL 기술을 기반으로 복잡한 알고리즘을 밀리초 단위로 처리합니다.",
  "feature.batch.title": "일괄 처리",
  "feature.batch.desc": "속도 저하 없이 수십 장의 이미지를 동시에 업로드하고 깨끗하게 처리할 수 있습니다.",
  "feature.noReg.title": "회원가입 불필요",
  "feature.noReg.desc": "즉시 워터마크 제거를 시작하세요. 계정 생성이나 로그인이 필요하지 않습니다.",
  "feature.free.title": "무료 및 무제한",
  "feature.free.desc": "숨겨진 유료 요금 결제, 구독, 크레딧 시스템이 없습니다. 완전히 무료로 사용하세요.",

  // --- page.tsx: Preview modal ---
  "preview.showComparison": "나란히 비교 보기",
  "preview.hideComparison": "비교 숨기기",
  "preview.original": "원본",
  "preview.cleaned": "제거 후",
  "preview.close": "닫기",
  "preview.download": "이미지 다운로드",

  // --- UploadDropbox.tsx ---
  "upload.dropToStart": "업로드를 시작하려면 여기에 놓으세요",
  "upload.dragAndDrop": "이미지를 드래그 앤 드롭하세요",
  "upload.releaseFiles": "이제 파일을 놓으세요",
  "upload.clickToBrowse": "또는 클릭하여 기기에서 파일 찾기",
  "upload.formats": "JPG • PNG • WebP • 최대 20MB",

  // --- ImageOutput.tsx ---
  "output.completed": "워터마크 제거 완료",
  "output.imagesProcessed": "개의 이미지 처리됨",
  "output.totalPayload": "총 용량",
  "output.reset": "초기화",
  "output.downloadAll": "모든 이미지 다운로드",
  "output.processed": "처리 완료",
  "output.processing": "처리 중",
  "output.download": "다운로드",
  "output.filename": "파일 이름",

  // --- Faq.tsx ---
  "faq.heading": "<blue>Gemini 워터마크 제거</blue>에 대해 자주 묻는 질문",
  "faq.subheading": "개인정보 보호, 화질, 속도 및 지원되는 형식을 포함하여 Gemini AI 이미지에서 워터마크를 제거하는 데 필요한 모든 것을 확인하세요.",
  "faq.q1": "Gemini Watermark Remover는 무엇이며 어떻게 작동하나요?",
  "faq.a1": "Gemini Watermark Remover는 Google Gemini AI가 생성한 이미지에서 워터마크를 자동으로 감지하고 제거하는 무료 온라인 AI 워터마크 제거 도구입니다. 당사의 고급 AI 워터마크 리무버는 지능형 알고리즘을 사용하여 이미지를 스캔하고, Gemini 워터마크(일반적으로 48×48px 또는 96×96px) 위치를 찾아 원본 이미지 화질을 유지하면서 흔적 없이 지워줍니다. 모든 워터마크 제거 프로세스는 브라우저의 클라이언트 측에서 실행되어 완벽한 개인정보 보호와 즉각적인 결과를 보장합니다.",
  "faq.q2": "이 AI 워터마크 리무버는 정말 무료인가요?",
  "faq.a2": "네! 당사의 Gemini 워터마크 리무버는 숨겨진 비용, 구독, 또는 사용 제한 없이 100% 무료입니다. 아무런 비용 부담 없이 무제한으로 Gemini AI 이미지에서 워터마크를 제거할 수 있습니다. 여러 이미지의 일괄 처리, 모든 형식(JPG, PNG, WebP)을 지원하며, 고화질 다운로드를 무료로 제공합니다. 유료 플랜을 요구하는 다른 워터마크 제거 도구와 달리, 누구나 쉽게 사용할 수 있는 AI 워터마크 제거 서비스를 제공합니다.",
  "faq.q3": "워터마크를 제거하면 이미지 화질에 영향이 있나요?",
  "faq.a3": "아닙니다! 당사의 AI 워터마크 리무버는 원본 이미지 화질을 100% 보존하도록 정밀하게 설계되었습니다. 워터마크 제거 프로세스는 주변 이미지 데이터를 건드리지 않고 Gemini 워터마크 픽셀만 정확히 타겟팅합니다. 원본 Gemini 생성 이미지와 동일한 해상도, 색상 및 선명도를 유지하며 워터마크만 깔끔하게 제거됩니다. 압축, 노이즈, 화질 저하가 전혀 없습니다.",
  "faq.q4": "어떤 유형의 Gemini 워터마크를 제거할 수 있나요?",
  "faq.a4": "당사의 워터마크 리무버는 48×48 픽셀 워터마크(일반적으로 오른쪽 하단), 대형 이미지용 96×96 픽셀 워터마크, 반투명 Gemini 로고를 포함한 모든 표준 Google Gemini 워터마크를 지원합니다. AI 워터마크 제거 도구가 워터마크의 크기와 위치를 자동으로 감지하여 이미지 크기나 워터마크 위치에 관계없이 완벽한 결과를 내도록 제거 알고리즘을 적용합니다.",
  "faq.q5": "이 워터마크 제거 도구를 사용할 때 제 데이터는 안전한가요?",
  "faq.a5": "물론입니다! 모든 워터마크 제거 처리는 클라이언트 측 JavaScript를 사용하여 브라우저 내에서 완전히 이루어집니다. 사용자의 Gemini 이미지는 기기를 벗어나거나 서버로 업로드되지 않습니다. 당사는 이미지를 저장, 수집하거나 이미지에 접근할 수 없습니다. 이로 인해 당사의 AI 워터마크 리무버는 가장 강력한 개인정보 보호 솔루션이 됩니다. 전체 워터마크 제거 과정 동안 이미지는 100% 안전하게 보호됩니다.",
  "faq.q6": "Gemini 워터마크를 제거하는 데 얼마나 걸리나요?",
  "faq.a6": "워터마크 제거는 거의 즉시 완료됩니다! 대부분의 Gemini 이미지는 이미지 크기와 기기 성능에 따라 2~5초 만에 처리됩니다. AI 워터마크 리무버는 서버 대기 시간이나 업로드 시간 없이 브라우저에서 직접 작동합니다. 여러 이미지를 일괄 처리할 때도 이미지당 단 몇 초밖에 걸리지 않습니다. 대기열이나 처리 지연 없이 이용 가능한 가장 빠른 워터마크 제거 솔루션입니다.",
  "faq.q7": "여러 이미지의 워터마크를 한 번에 제거할 수 있나요?",
  "faq.a7": "네! 당사의 Gemini 워터마크 리무버는 일괄 워터마크 제거를 지원합니다. 여러 장의 Gemini AI 이미지를 동시에 업로드하면 도구가 모든 이미지를 자동으로 처리합니다. 그 후 개별 이미지를 다운로드하거나 '모든 이미지 다운로드' 기능을 사용하여 워터마크가 제거된 모든 이미지가 담긴 ZIP 파일을 받을 수 있습니다. 대량의 AI 생성 이미지를 처리하는 콘텐츠 크리에이터, 디자이너, 마케터에게 매우 유용합니다.",
  "faq.q8": "워터마크 제거 시 어떤 이미지 형식이 지원되나요?",
  "faq.a8": "당사의 AI 워터마크 리무버는 각각 최대 20MB의 JPG/JPEG, PNG 및 WebP 파일을 포함하여 널리 쓰이는 모든 이미지 형식을 지원합니다. 워터마크 제거 후 화질을 최대한 보존하기 위해 고품질 PNG 형식으로 제공됩니다. 제거 과정에서 형식이 자동으로 전환되므로 입력 형식과 상관없이 항상 최상의 결과를 얻을 수 있습니다.",

  // --- Filler.tsx (HowItWorksSection) ---
  "filler.heading": "AI 생성 이미지에서 <blue>AI 워터마크</blue>를 제거하는 방법은 무엇인가요?",
  "filler.subheading": "당사의 <blue>AI 워터마크 리무버</blue>를 사용하면 온라인에서 2가지 간단한 단계로 Gemini 사진의 워터마크를 제거할 수 있습니다:",
  "filler.step1.title": "1. 워터마크가 있는 Gemini AI 이미지 업로드",
  "filler.step1.desc": "Gemini로 생성된 이미지를 업로드 영역에 드래그 앤 드롭하거나 클릭하여 기기에서 파일을 선택하세요. 당사의 AI 워터마크 리무버는 JPG, PNG, WebP 형식을 지원합니다.",
  "filler.step2.title": "2. 자동 AI 워터마크 감지 및 제거",
  "filler.step2.desc": "당사의 고급 AI 워터마크 리무버는 지능형 알고리즘을 사용하여 Gemini 워터마크를 즉시 감지하고 제거합니다. 워터마크 제거 프로세스는 화질 손실 없이 단 몇 초 만에 완료됩니다.",
  "filler.step3.title": "3. 완벽한 결과를 위한 스마트 처리",
  "filler.step3.desc": "Gemini 워터마크 리무버는 머신 러닝을 활용해 노이즈 없이 깨끗한 결과를 보장합니다. 당사의 AI 워터마크 제거 기술은 이미지를 고화질로 유지하면서 워터마크를 완전히 지워줍니다.",
  "filler.step4.title": "4. 워터마크 없는 이미지 다운로드",
  "filler.step4.desc": "워터마크가 제거된 고해상도 이미지를 완전히 무료로 다운로드하세요. 개별 이미지를 다운로드하거나 여러 Gemini AI 이미지를 일괄 처리하여 워터마크를 제거할 수 있습니다.",

  // --- FullPack.tsx (FeaturesSection) ---
  "fullpack.heading": "완벽한 <blue>Google Gemini 워터마크 제거</blue> 툴킷",
  "fullpack.subheading": "픽셀 단위 정밀 복원 · 대량 자동화 · 100% 로컬 처리 · 회원가입 없이 깨끗한 결과물 제공.",
  "fullpack.f1.title": "AI 인페인팅이 아닌 역알파 블렌딩 방식",
  "fullpack.f1.desc": "보정된 알파 맵이 로고 아래의 픽셀을 재구성합니다. 지원되는 출력물에서는 가려진 영역이 픽셀 단위로 정확히 복원되어 가장자리가 번지거나 모델이 재보정되지 않습니다.",
  "fullpack.f2.title": "Gemini 로고, 별 모양 오버레이, Nano Banana 지원",
  "fullpack.f2.desc": "표준 Gemini 로고, 별 모양 오버레이 변형, 동일한 오버레이 패턴을 공유하는 Nano Banana 이미지 출력물을 감지합니다. 기타 워터마크 출처는 지원 대상에서 제외됩니다.",
  "fullpack.f3.title": "대량 병렬 처리",
  "fullpack.f3.desc": "여러 장의 Gemini 사진을 한 번에 가져와 브라우저 내에서 병렬로 처리한 뒤, 개별 다운로드하거나 하나의 ZIP 파일로 다운로드하세요.",
  "fullpack.f4.title": "100% 브라우저 로컬 — 업로드 없음",
  "fullpack.f4.desc": "모든 연산이 브라우저 내에서만 이루어집니다. 이미지가 기기를 벗어나지 않으며 서버를 거치지 않습니다.",
  "fullpack.f5.title": "지원되는 Gemini 출력 크기의 JPG, PNG, WebP",
  "fullpack.f5.desc": "지원되는 Gemini 출력물의 JPG, PNG, WebP 파일을 받아서 무손실 PNG로 내보냅니다.",
  "fullpack.f6.title": "간편한 드래그 앤 드롭",
  "fullpack.f6.desc": "복잡한 설정이나 구성이 필요 없습니다. 업로드 영역에 이미지를 직접 드래그하면 즉시 처리가 시작됩니다.",
  "fullpack.f7.title": "원본 화질 보존",
  "fullpack.f7.desc": "원본 이미지의 크기, 구조 및 색상 프로필을 유지합니다. 압축 손상 없이 깔끔하게 처리됩니다.",
  "fullpack.f8.title": "크로스 플랫폼 지원",
  "fullpack.f8.desc": "모바일을 포함한 Chrome, Firefox, Safari 및 Edge에서 검증되었습니다. 데스크톱, 태블릿, 모바일 브라우저에서 완벽하게 반응합니다.",
  "fullpack.f9.title": "무료이며 가입 불필요",
  "fullpack.f9.desc": "모든 기능을 즉시 제한 없이 사용할 수 있습니다. 신용카드, 구독, 계정 생성이 필요하지 않습니다.",

  // --- ImageComparison.tsx ---
  "comparison.heading": "실제 작동 방식 확인하기",
  "comparison.subheading": "대부분의 도구는 워터마크를 단순히 블러 처리하거나 덮어씌웁니다. 당사는 그 아래에 숨겨진 선명한 실제 픽셀을 복원합니다. Gemini Watermark Remover를 통해 손상 없는 깔끔하고 전문적인 이미지를 얻을 수 있습니다.",

  // --- GeminiFeatures.tsx ---
  "geminiFeat.privacy": "브라우저에서 직접 실행 — 업로드 필요 없음",
  "geminiFeat.speed": "노트북 기준 1MP 이미지당 약 1초",
  "geminiFeat.quality": "지원되는 Gemini 출력물에서 픽셀 단위로 정확",
};
