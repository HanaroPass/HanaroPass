import 'dynamsoft-license';
import 'dynamsoft-barcode-reader';
import 'dynamsoft-document-normalizer';
import 'dynamsoft-label-recognizer';
import 'dynamsoft-capture-vision-router';

import {
  CodeParserModule,
  // 최신 버전에서는 개별 모듈 클래스 대신 Module 객체만 가져와 로드에 사용합니다.
} from 'dynamsoft-capture-vision-bundle';
import { CoreModule } from 'dynamsoft-core';
import { LicenseManager } from 'dynamsoft-license';

let initialized = false;

export async function init() {
  if (!initialized) {
    console.log('Initializing Dynamsoft SDKs...');
    try {
      // 1. 라이선스 초기화
      await LicenseManager.initLicense(
        process.env.NEXT_PUBLIC_DYNAMSOFT_LICENSE || '',
      );
      console.log('1');

      // 2. 엔진 리소스 경로 설정 (WASM 파일 로드 위치)
      CoreModule.engineResourcePaths.rootDirectory =
        'https://cdn.jsdelivr.net/npm/';
      console.log('2');

      // 3. 필요한 WASM 모듈 로드
      // DLR(Label Recognizer)을 포함하여 로드합니다.
      await CoreModule.loadWasm(['DDN', 'DLR', 'DBR', 'DCP']);
      console.log('3');

      // 4. 파싱 스펙 로드
      await CodeParserModule.loadSpec('MRTD_TD1_ID');
      await CodeParserModule.loadSpec('MRTD_TD2_ID');
      await CodeParserModule.loadSpec('MRTD_TD3_PASSPORT');
      await CodeParserModule.loadSpec('AAMVA_DL_ID');
      console.log('4');

      // [핵심 수정] 5. OCR(MRZ) 모델 로드 방식
      // 이제는 클래스에서 직접 호출하지 않고, CoreModule의 설정을 통해
      // 런타임에서 필요한 시점에 자동으로 모델을 가져오게 됩니다.
      // 별도의 loadRecognitionData 호출 없이 초기화만 완료하면 됩니다.

      initialized = true;
      console.log('Dynamsoft Initialization Successful');
    } catch (ex: any) {
      const errMsg = ex.message || ex;
      console.error('Initialization failed:', errMsg);
      throw ex;
    }
  }
  return true;
}
