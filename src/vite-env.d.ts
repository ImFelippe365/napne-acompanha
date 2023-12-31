/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MS_ACADEMIC_MANAGEMENT_URL: string;
  readonly VITE_MS_STUDENT_URL: string;
  readonly VITE_MS_GATEWAY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_MS_ACADEMIC_MANAGEMENT_URL: string;
    readonly VITE_MS_STUDENT_URL: string;
    readonly VITE_MS_GATEWAY_URL: string;
  }
}
